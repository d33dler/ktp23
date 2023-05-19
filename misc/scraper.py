import re
from typing import List

import bs4
import pandas as pd
import requests
from unidecode import unidecode
from bs4 import BeautifulSoup
import numpy as np
import xgboost as xgb


def extract_number(value):
    return int(re.sub('[^0-9]', '', value))


def get_listings(base_url, url) -> List[dict]:
    headers = {
        'Accept-Language': 'ro',
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    listings = soup.find_all('li', class_='ads-list-detail-item')
    results = []
    for listing in listings:
        ad = {}
        listing: bs4.Tag
        ad_url = listing.find('a', class_='js-item-ad')['href']
        try:
            response = requests.get(base_url + ad_url)
        except requests.exceptions.ConnectTimeout:
            continue
        ad_soup = BeautifulSoup(response.text, "html.parser")
        title = ad_soup.find("title").text
        description = ad_soup.find("meta", {"name": "description"})["content"]

        features_section = ad_soup.find("div", class_="adPage__content__features")
        if features_section:
            features_list = features_section.find_all("li", class_="m-value")
            for feature in features_list:
                key = feature.find("span", itemprop="name").text.strip()
                value = feature.find("span", itemprop="value").text.strip()

                # Data cleanup
                if value.isdigit():
                    value = int(value)
                else:
                    try:
                        value = extract_number(value)
                    except ValueError:
                        pass
                ad[key] = value

        prices_list = ad_soup.find_all("span", itemprop="priceCurrency")
        price = None
        for price_item in prices_list:
            if price_item.text.strip() == "€":
                price = price_item.find_previous("span", itemprop="price").text.strip()
                price = int(price.replace('\xa0€', '').replace(' ', '').replace("≈", ''))
                break

        address_section = ad_soup.find("div", class_="adPage__aside__address-feature")
        address = address_section.find("span", class_="adPage__aside__address-feature__text").text.strip()

        ad.update({
            'title': title,
            'description': description,
            'price': price,
            'link': ad_url,
            'address': address
        })
        results.append(ad)
    return results


def change_language(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    lang_button = soup.find('button', {'id': 'user-language-btn', 'data-lang': 'ro'})
    if lang_button:
        lang_button.click()
        return True
    return False


if __name__ == '__main__':
    apartments_url = 'https://999.md/ro/list/real-estate/apartments-and-rooms?hide_duplicates=no&cadastral_number=no' \
                     '&applied=1&show_all_checked_childrens=no&eo=12900,12912,12885,13859&ef=33,2307,30,' \
                     '2203&o_33_1=912,922&r_4251_1385_from=&r_4251_1385_to=&r_4251_1385_unit=eur&view_type=detail'
    houses_url = 'https://999.md/ro/list/real-estate/house-and-garden?applied=1&o_41_1=912&eo=12900&eo=12912&eo=12885' \
                 '&eo=13859&ef=40&ef=41&view_type=detail'
    # if change_language(apartments_url):
    #     print("Language changed to Romanian")

    # Scraping houses
    # house_ls = []
    # for i in range(1, 6):
    #     print(f"Scraping house page {i}")
    #     house_ls += get_listings('https://999.md', f'{houses_url}&page={i}')
    # pd.DataFrame.from_records(house_ls).to_csv('999MD_houses.csv', index=False)

    # Scraping apartments
    # apartments_ls = []
    # for i in range(1, 65):  # Change the range to the desired number of pages
    #     print(f"Scraping apartments page {i}")
    #     apartments_ls += get_listings('https://999.md', f'{apartments_url}&page={i}')
    #     pd.DataFrame.from_records(apartments_ls).to_csv('999MD_apartments_raw.csv', index=False)
    df = pd.read_csv('999MD_apartments_raw.csv')
    # columns
    # ['Suprafață totală', 'Nivelul', 'Număr de nivele', 'Numărul de camere',
    #        'Autorul anunțului', 'Fond locativ', 'Copii', 'Animale', 'title',
    #        'description', 'price', 'link', 'address', 'Balcon',
    #        'Starea apartamentului', 'Bloc sanitar', 'Tipul clădirii',
    #        'Loc de parcat', 'Suprafață locativă', 'Planul', 'Suprafața bucătăriei',
    #        'Înălțimea tavanului', 'Этаж', 'Dezvoltator']

    # mapper for the columns above to english, lower case, no spaces
    column_rename_mapper = {
        'Suprafață totală': 'area_m2',
        'Nivelul': 'floor',
        'Număr de nivele': 'num_floors',
        'Numărul de camere': 'num_rooms',
        'Autorul anunțului': 'author',
        'Fond locativ': 'housing_fund',
        'Copii': 'children',
        'Animale': 'animals',
        'title': 'title',
        'description': 'description',
        'price': 'price',
        'link': 'link',
        'address': 'street',
        'Balcon': 'balcony',
        'Starea apartamentului': 'condition',
        'Bloc sanitar': 'bathroom',
        'Tipul clădirii': 'building_type',
        'Loc de parcat': 'parking',
        'Suprafață locativă': 'living_area',
        'Planul': 'layout',
        'Suprafața bucătăriei': 'kitchen_area',
        'Înălțimea tavanului': 'ceiling_height',
        'Dezvoltator': 'developer'
    }
    # drop columns not in mapper
    df = df.drop(columns=[col for col in df.columns if col not in column_rename_mapper.keys()])
    # renaming all columns using mapper
    df = df.rename(columns=column_rename_mapper)
    # change num_floors from float to int
    df['num_floors'] = df['num_floors'].fillna(-1).astype(int)
    # balcony is object because it has ['Nu', 1, 2, ...] values , change to int by replacing 'Nu' with 0
    df['balcony'] = df['balcony'].fillna(-1).replace('Nu', 0).astype(int)
    # extract features from title eg. (Apartament cu 2 camere, 50 m², Botanica, Chișinău) ( ignore, area, region, city)
    # area_m2 only where nan
    df['area_m2'] = df['area_m2'].fillna(
        df['title'].str.extract(r'(\d+) m²', expand=False).astype(float))  # TODO check this
    # region new column
    df['region'] = df['title'].str.extract(r'(\w+), Chișinău', expand=False)
    # city new column
    df['city'] = df['title'].str.extract(r'Chișinău, (\w+)', expand=False)

    # update `street` column with street name from `street` column example: Moldova,  Chișinău mun.,  Chișinău,  Centru,  str. Armenească 3.
    # The street name is the last part of the string, extract only street name , extract the number in a separate column
    df['street_name'] = df['street'].str.extract(r'str. (\w+)', expand=False)
    # remove any digits from street_name
    df['street_name'] = df['street_name'].str.replace(r'\d+', '')
    # extract the number in a separate column, number can be x or x/x , where x is int, take first x always and handle nan
    df['street_number'] = df['street'].str.extract(r'(\d+)', expand=False)
    # drop columns that are of no use anymore
    df = df.drop(columns=['link', 'title', 'street', 'description', 'street_number'])
    # remove diacritics from all columns of type string using unidecode and a loop

    for col in ['author', 'floor', 'housing_fund', 'children', 'animals', 'condition', 'layout', 'region', 'city',
                'street_name']:
        if df[col].dtype == 'object':
            print(f"Removing diacritics from column {col}")
            df[col] = df[col].apply(lambda x: unidecode(x) if isinstance(x, str) else x)

    # filling missing data using xgboost RF on each column
    # first continuous columns
    continuous_columns = ['area_m2', 'num_floors', 'price', 'living_area',
                          'kitchen_area', 'ceiling_height']
    # fit xgboost random forest model for prediction of each column
    xgboost_reg_params = {
        'booster': 'dart',
        'objective': 'reg:squarederror',
        'max_depth': 8,
        'verbosity': 0,
        'colsample_bynode': 0.7,
        'num_boost_rounds': 100,
        'subsample': 0.7,
        'gamma': 1,
        'sample_type': 'weighted',
        'rate_drop': 0.3,
        'skip_drop': 0.5,
        'lambda': 0.3,
        'enable_categorical': True,
        'max_cat_to_onehot': 8,
        'eta': 0.1,
    }
    # change type of categorical columns to category
    categorical_columns = ['housing_fund', 'floor', 'children', 'animals', 'author', 'condition', 'bathroom',
                           'building_type',
                           'balcony', 'parking', 'layout', 'developer', 'region', 'city', 'num_rooms', 'street_name']
    # df = df.copy()

    for col in categorical_columns:
        df[col] = df[col].astype('category')
    # fill missing data for continuous columns
    for col in continuous_columns:
        print(f"Predicting missing values for column {col}")
        # get data for training
        train_data = df[~df[col].isna()]
        # get data for prediction
        predict_data = df[df[col].isna()]
        if len(predict_data) == 0:
            print(f"No missing values for column {col}")
            continue
        # get features for training
        train_features = train_data.drop(columns=[col])
        # get target for training
        train_target = train_data[col]
        # get features for prediction
        predict_features = predict_data.drop(columns=[col])
        # fit RF model
        # create dmatrix
        train_dmatrix = xgb.DMatrix(train_features, label=train_target, enable_categorical=True)
        booster = xgb.train(params=xgboost_reg_params, dtrain=train_dmatrix, evals=[(train_dmatrix, 'train')], num_boost_round=120)
        # predict
        predict_dmatrix = xgb.DMatrix(predict_features, enable_categorical=True)
        predict_target = booster.predict(predict_dmatrix)
        # fill missing data
        print(predict_target)
        df.loc[df[col].isna(), col] = pd.Series(predict_target)
    # fill missing data for categorical columns
    # categorical columns list of strings, (not tuples)
    cat_cols_names = []
    for col in categorical_columns:
        if len(df[col].unique()) > 3:
            # print(f"Setting multi:softmax for column {col}")
            cat_cols_names.append((col, 'multi:softmax'))
        else:
            # print(f"Setting binary:hinge for column {col}")
            cat_cols_names.append((col, 'binary:hinge'))

    # fit xgboost RF model for prediction of each column
    xgboost_clf_params = {
        'booster':'dart',
        'objective': 'multi:softmax',
        'max_depth': 8,
        'verbosity': 0,
        'colsample_bynode': 0.7,
        'num_boost_round': 200,
        'subsample': 0.7,
        'gamma': 1,
        'sample_type': 'weighted',
        'rate_drop': 0.25,
        'skip_drop': 0.5,
        'lambda': 0.3,
        'enable_categorical': True,
        'max_cat_to_onehot': 8,
        'eta': 0.1,
    }
    for col, clf_type in cat_cols_names:
        print(f"Predicting missing values for column: `{col}`")
        # get data for training
        train_data = df[~df[col].isna()]
        # get data for prediction
        predict_data = df[df[col].isna()]
        if len(predict_data) == 0:
            print(f"No missing values for column {col}")
            continue
        if train_data[col].nunique() < 2:
            print("Not enough unique values for binary classification, skipping")
            # filling nan with the other value
            df[col] = df[col].fillna(train_data[col].unique()[0])
            continue
        # get features for training
        train_features = train_data.drop(columns=[col])
        # get target for training
        train_target = train_data[col]
        # get features for prediction
        predict_features = predict_data.drop(columns=[col])
        # fit model
        unique_values = train_target.unique()
        target_remap = {}
        if clf_type == 'binary:hinge':
            # for binary we need to map target to 0, 1
            # get unique values and map
            train_target = train_target.map({unique_values[0]: 0, unique_values[1]: 1})
            # fit model
            xgboost_clf_params['objective'] = 'binary:hinge'
            xgboost_clf_params['num_class'] = None
        else:
            # map target to 0, 1, 2, ...
            target_remap = {i: value for i, value in enumerate(unique_values)}
            train_target = train_target.map({value: i for i, value in enumerate(unique_values)})
            xgboost_clf_params['objective'] = 'multi:softmax'
            xgboost_clf_params['num_class'] = train_target.nunique()
        train_matrix = xgb.DMatrix(train_features, label=train_target, enable_categorical=True)
        booster = xgb.train(params=xgboost_clf_params, dtrain=train_matrix, evals=[(train_matrix, 'train')], num_boost_round=120)
        # predict
        predict_matrix = xgb.DMatrix(predict_features, enable_categorical=True)
        predict_target = booster.predict(predict_matrix)
        # if binary we need to map back to original values
        if clf_type == 'binary:hinge':
            predict_target = pd.Series(predict_target, dtype=int).map({0: unique_values[0], 1: unique_values[1]})
        else:
            predict_target = pd.Series(predict_target, dtype=int).map(target_remap)
        # fill missing data
        df.loc[df[col].isna(), col] = predict_target

        df.to_csv('999MD_apartments_processed.csv', index=False)
