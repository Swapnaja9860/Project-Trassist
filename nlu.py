import os
from dotenv import load_dotenv
import pandas as pd
import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, KeywordsOptions

from wordcloud import WordCloud
from wordcloud import STOPWORDS

load_dotenv()

def get_charts_nlu():
    apikey = os.getenv("API_KEY")
    url = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/74e90e05-2611-4487-aa22-ff9f8a8cc820'

    tweet_df = pd.read_csv('data/dummy-tweets.csv')

    tweets = [] 
    for ind, row in enumerate(tweet_df['text']):
        tweets.append(row)


    authenticator = IAMAuthenticator(apikey)
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2022-04-07',
        authenticator=authenticator
    )

    natural_language_understanding.set_service_url(url)

    response = natural_language_understanding.analyze(
        text=str(tweets),
        features=Features(keywords=KeywordsOptions(sentiment=True,emotion=True, limit=15))).get_result()


    json_data = json.dumps(response, indent=2)
    data = json.loads(json_data)
    data_plot = data.copy()

    keywords = [entry['text'] for entry in data_plot['keywords']]
    sentiments = [entry['sentiment']['score'] for entry in data_plot['keywords']]
    emotions = {keyword: entry['emotion'] for keyword, entry in zip(keywords, data_plot['keywords'])}

    plt.figure(figsize=(10, 5))
    sns.barplot(x=sentiments, y=keywords, palette="coolwarm")
    plt.title("Sentiment Analysis of Keywords")
    plt.ylabel("Keywords")
    plt.xlabel("Sentiment Score")
    plt.xlim(-1,1)
    plt.tight_layout()
    plt.savefig('images/trending_charts.png')

    # Create a stacked bar plot for emotions
    plt.figure(figsize=(10, 5))
    bottom = [0] * len(keywords)
    emotions_list = list(emotions.values())

    for emotion in emotions_list[0].keys():
        emotion_values = [entry[emotion] for entry in emotions_list]
        plt.bar(keywords, emotion_values, bottom=bottom, label=emotion)

    plt.title("Emotion Analysis of Keywords")
    plt.xlabel("Keywords")
    plt.ylabel("Emotion Score")
    plt.legend(loc="upper right")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('images/trending_charts1.png')
   
 
    # Wordcloud with positive tweets
    # positive_tweets = df['tweet'][df["sentiment"] == 'Positive']
    stop_words = ["https", "co", "RT"] + list(STOPWORDS)
    wordcloud = WordCloud(max_font_size=50, max_words=50, background_color="white", stopwords = stop_words).generate(str(keywords))
    plt.figure()
    plt.title("Keywords - Wordcloud")
    plt.imshow(wordcloud, interpolation="bilinear")
    plt.axis("off")
    plt.savefig('images/trending_charts2.png')
        