import openai

# 발급받은 API 키 설정
OPENAI_API_KEY = ""

# openai API 키 인증
openai.api_key = OPENAI_API_KEY

gpt = "gpt-4"

query = "Hello"

# 메시지 설정하기
messages = [{
    "role": "system",
    "content": "You are a helpful assistant."
}, {
    "role": "user",
    "content": query
}]

response = openai.ChatCompletion.create(model=gpt, messages=messages)
answer = response['choices'][0]['message']['content']

import pymongo
from bson.objectid import ObjectId
import os
import re
import sys
from datetime import datetime
import urllib.request
import json
import time
import requests

import cv2
import time
import re
import pytesseract
from pytesseract import Output
import openai
import boto3
import botocore
from urllib.parse import unquote

connection_string = "-"
database_name = "-"
collection_name = "-"

def download_image_s3(bucket_name, object_key, image_path):
    s3 = boto3.client(
        's3',
        aws_access_key_id='-',
        aws_secret_access_key='-',
        # aws_session_token='your_session_token_here', # 필요한 경우
    )
    try:
        s3.download_file(bucket_name, object_key, image_path)
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("S3에서 파일을 찾을 수 없습니다.")
        else:
            raise

# 이미지 불러오기 및 전처리
def preprocess_image(image_path):
    #download_image(image_path, "temp.jpg")
    xx = image_path.split("receipts")
    ss = "receipts" + xx[1]
    
    
    bucket_name = 'sbuhacks'  # S3 버킷 이름
    object_key = ss
    image_path = "temp.jpg"  # 로컬에 이미지를 저장할 경로

    object_key_encoded = object_key
    object_key = unquote(object_key_encoded)
    
    download_image_s3(bucket_name, object_key, image_path)
    image = cv2.imread("temp.jpg")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # 흑백 처리
    blur = cv2.GaussianBlur(gray, (5,5), 0)  # 노이즈 제거를 위한 블러 처리
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # 이진화
    return image

def contains_number(s):
    return any(char.isdigit() for char in s)

def extract_text(image):
    custom_config = r'--oem 3 --psm 6'
    details = pytesseract.image_to_data(image, output_type=Output.DICT, config=custom_config)
    return details

# 물품명 추출을 위한 추가 처리
def extract_items(details):
    full_text = ""
    for i, text in enumerate(details['text']):
        if int(details['conf'][i]) > 5:  # 신뢰도가 60 이상인 텍스트만 추출
            full_text += text + " "  # 띄어쓰기를 추가하여 문장을 구성
            # 문단 끝을 확인하거나 새 문장 시작을 처리하는 로직을 추가할 수 있습니다.
    return full_text.strip()

def remover(line):
    
    if not contains_number(line):
        return ""
    
    x = line.split(" ")
    
    newline = ""
    for i in range(0, len(x)):
        if len(x[i]) >= 2:
            newline += x[i] + " "

    if len(newline.split(" ")) == 2:
        return ""
    
    return newline

def remove_non_alphanumeric(input_string):
    return re.sub(r'[^a-zA-Z0-9]', ' ', input_string)


def split_and_print_lines(text):
    lines = re.split(r'(?<=\D)\s+(?=\d)', text)  # 숫자 앞의 공백을 기준으로 분리
    newlines = ""
    for line in lines:
        if "total" in line.lower():
            break
        if remover(line) == "":
            pass
        else:
            newlines += remove_non_alphanumeric(remover(line)) + "\n"
    
    return newlines

def makelists(line):
    x = line.split(",")
    newx = []
    for i in range(0, len(x)):
        if x[i][0] == " ":
            newx.append(x[i][1:].upper())
        else:
            newx.append(x[i].upper())
    return newx

def removeduplicate(items):
    unique_items = []
    for item in items:
        if item not in unique_items:
            unique_items.append(item)
    return unique_items

def getter(collection):
    newarr = []
    for data in collection.find():
        if data.get('receipt') != None:
            user_data_id = f"{data['_id']}"
            products_lst = []
            for product in data.get('products', []):
                products_lst.append([product.get('index'), product.get('productName'), product.get('expdate'), product.get('donatable')])
            newarr.append([user_data_id, data.get('receipt'), products_lst])
            
    return newarr

def getter_images(collection):
    newarr = []
    for data in collection.find():
        if data.get('receipt') != None:
            newarr.append(data.get('receipt'))
            
    return newarr

# 메인 함수
def main(image_path):
    preprocessed_image = preprocess_image(image_path)
    
    ##### 이 부분이 여러 확률
    
    
    details = extract_text(preprocessed_image)
    items_text = extract_items(details)
    data = items_text #split_and_print_lines(items_text)
    
    
    
    query = data + "\n\n" +"""


    Please identify and list all the edible food items mentioned in the given text. 
    Exclude any non-edible items. 
    Provide the full names of each edible item (as they are often shortened) and separate them with commas. 
    Give me only the list, without any comment.
    
    
    """
#     print(query)
    
    
    messages = [{
        "role": "system",
        "content": "You are a helpful assistant."
    }, {
        "role": "user",
        "content": query
    }]

    response = openai.ChatCompletion.create(model=gpt, messages=messages)
    answer = response['choices'][0]['message']['content']
    return makelists(answer)

def datasenderDB(collection, user_data_id, new_products, num):
    num = num
    
    newstr = ""
#     for i in range(0, len(new_products)):
#         newstr += new_products[i] + ", "
    
#     query = newstr + "\n" + """
#     Classify the following items as either 'donatable' or 'not donatable' to a local food bank. Exclude fresh food, raw meat, and vegetable. 
#     Please present the results in a comma-separated true/false format without providing any additional explanations. 
#     """
    
    
#     messages = [{
#         "role": "system",
#         "content": "You are a helpful assistant."
#     }, {
#         "role": "user",
#         "content": query
#     }]

#     response = openai.ChatCompletion.create(model=gpt, messages=messages)
#     answer = response['choices'][0]['message']['content']
    
    
    
    tlist = answer.split(',')
    newtlist = []
    
    
    
    for i in range(0, len(tlist)):
        if 'true' in tlist[i].lower():
            newtlist.append(True)
        else:
            newtlist.append(False)

    tt = 0
    for productName in new_products:
        product_id = ObjectId()
        converted_word = ' '.join([w.capitalize() for w in productName.split()])

        product_to_add = {
            '_id': product_id, 
            'index' : num,
            'productName': converted_word,
            'expdate': None,
            'donatable': False
        }
        
        collection.update_one(
            {'_id': ObjectId(user_data_id)},
            {'$push': {'products': product_to_add}}
        )
        
        collection.update_one(
            {'_id': ObjectId(user_data_id)},
            {'$set': {'receipt': ""}}  # 'receipt' 속성을 빈 문자열로 설정
        )
        
        tt +=1
        num +=1

def clear_products_array(collection, user_data_id):
    # 문서의 `products` 배열을 빈 배열로 설정
    collection.update_one(
        {'_id': ObjectId(user_data_id)},  # user_data_id가 문자열인 경우 ObjectId로 변환
        {'$set': {'products': []}}
    )
    print(f"Products array cleared for user ID: {user_data_id}")
        
if __name__ == "__main__":
    old = []
    while True:
        client = pymongo.MongoClient(connection_string)
        db = client[database_name]
        collection = db[collection_name]

        lst = getter(collection)
        images = getter_images(collection)
        changed_indices = [i for i, image in enumerate(images) if i >= len(old) or image != old[i]]
        
        if changed_indices:
            for i in changed_indices:
                
                #clear_products_array(collection, lst[i][0])
                
                
                if lst[i][1] != '':
                    productNum = len(lst[i][2])

                    data = main(lst[i][1])

    

                    #print(data)
                    datasenderDB(collection, lst[i][0], data, productNum)
                    print("DONE")
                else:
                    print("WAITING")
            old = images[:]  # 변경사항 업데이트
            
        else:
            print("Waiting for Change")
#         if images != old:
#             for i in range(0, len(lst)):
#                 productNum = len(lst[i][2])
#                 data = main(lst[i][1])
                
#                 #clear_products_array(collection, lst[i][0])
                
                
#                 #print(data)
#                 datasenderDB(collection, lst[i][0], data, productNum)
#                 print("DONE")
#             old = images[:] 
#         else:
#             print("Waiting for Change")

        time.sleep(1)
    