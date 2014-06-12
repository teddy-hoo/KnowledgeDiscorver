import re
import requests
import threading
import Queue
import time

class getKnowledge(threading.Thread):
    def __init__(self, queryQueue, resultQueue):
        super(getKnowledge, self).__init__()
        self.corpora = dict(eng_us_2012=17, eng_us_2009=5, eng_gb_2012=18, eng_gb_2009=6, chi_sim_2012=23, chi_sim_2009=11, eng_2012=15, eng_2009=0, eng_fiction_2012=16, eng_fiction_2009=4, eng_1m_2009=1, fre_2012=19, fre_2009=7, ger_2012=20, ger_2009=8, heb_2012=24, heb_2009=9, spa_2012=21, spa_2009=10, rus_2012=25, rus_2009=12, ita_2012=22)
        self.corpus = 'eng_2012'
        self.startYear = 1800
        self.endYear = 2008
        self.caseInsensitive = True
        self.allData = False
        self.url = "http://books.google.com/ngrams/graph?"
        self.queryQueue = queryQueue
        self.resultQueue = resultQueue
        self.query = ''

    def setSendFunc(self, sendFunc):
        self.sendFunc = sendFunc

    def _getQuery(self, argumentString):
        if(type(argumentString) is list):
            for word in argumentString:
                self.query = ''
                self.query += word.encode('utf-8').strip() + ','
                self.query = self.query[:-1]
        else:
            self.query = argumentString.encode('utf-8').strip()

    def run(self):
        while(1):
            try:
                self._getQuery(self.queryQueue.get(True, 0.05))
                self._getNgrams()
                # self.sendFunc.wfile.write(self.data)
                self.resultQueue.put(self.data)
            except Queue.Empty:
                continue

    def _getNgrams(self):
        params = dict(content=self.query, year_start=self.startYear, year_end=self.endYear, corpus=self.corpora[self.corpus])
        result = requests.get(self.url, params = params)
        rawdata = result.text.encode('utf-8')
        data = re.findall('var data = (.*?);\\n', rawdata)
        self.data = data[0]
