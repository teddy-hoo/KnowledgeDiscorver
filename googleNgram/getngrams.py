#!/usr/bin/env python
from ast import literal_eval
import re
import subprocess
import sys
import requests

corpora = dict(eng_us_2012=17, eng_us_2009=5, eng_gb_2012=18, eng_gb_2009=6,
               chi_sim_2012=23, chi_sim_2009=11, eng_2012=15, eng_2009=0,
               eng_fiction_2012=16, eng_fiction_2009=4, eng_1m_2009=1,
               fre_2012=19, fre_2009=7, ger_2012=20, ger_2009=8, heb_2012=24,
               heb_2009=9, spa_2012=21, spa_2009=10, rus_2012=25, rus_2009=12,
               ita_2012=22)


def getNgrams(query, corpus, startYear, endYear, smoothing, caseInsensitive):
    params = dict(content=query, year_start=startYear, year_end=endYear,
                  corpus=corpora[corpus], smoothing=smoothing)
    result = requests.get("http://books.google.com/ngrams/graph?", params = params)
    rawdata = result.text.encode('utf-8')
    data = re.findall('var data = (.*?);\\n', rawdata)
    return result.url, params['content'], data[0]

def runQuery(argumentString):
    query = ''
    if(type(argumentString) is list):
        for word in argumentString:
            query += word.encode('utf-8').strip() + ','
        query = query[:-1]
    else:
        query = argumentString.encode('utf-8').strip()

    if '?' in query:
        query = query.replace('?', '*')
    if '@' in query:
        query = query.replace('@', '=>')

    corpus, startYear, endYear, smoothing = 'eng_2012', 1800, 2008, 3
    printHelp, caseInsensitive, allData = False, True, False
    toSave, toPrint, toPlot = True, True, False

    url, urlquery, df = getNgrams(query, corpus, startYear, endYear, smoothing, caseInsensitive)
    return df

if __name__ == '__main__':
    argumentString = ' '.join(sys.argv[1:])
    if argumentString == '':
        argumentString = raw_input('Enter query (or -help):')
    else:
        try:
            runQuery(argumentString)
        except:
            print 'An error occurred.'
