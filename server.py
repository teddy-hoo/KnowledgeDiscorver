import SocketServer
import time
import os
import thread
import json
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import sys
import Queue
sys.path.insert(0, 'googleNgram')
from getngrams import getKnowledge

PORT = 8000

queryQueue = Queue.Queue()
resultQueue = Queue.Queue()
gkTread = getKnowledge(queryQueue, resultQueue)
# self.gkTread.setSendFunc(self.wfile.write)
gkTread.start()

class Handler(BaseHTTPRequestHandler):
	def __init__(self, *args, **kargs):
		self.waitTimeList = []
		self.waitTime = {}
		self._initWaitTime()
		BaseHTTPRequestHandler.__init__(self, *args, **kargs)

	def _initWaitTime(self):
		waitTimeFile = open('data/waitTime.json', 'r')
		self.waitTime = json.loads(waitTimeFile.read())
		waitTimeFile.close()
		self.waitTime["time"] = float(self.waitTime["time"])
		self.waitTimeList.append(float(self.waitTime["time"]))

	def do_GET(self):
		if(self.path.endswith('waitTime')):
			self.send_response(200)
			self.send_header('Content-type', 'application/json')
			self.end_headers()
			if(len(self.waitTimeList) >= 3):
				sum = 0
				for element in self.waitTimeList:
					sum += element
				self.waitTime["time"] = sum / 3
				del self.waitTimeList[:]
				self.waitTimeList.append(self.waitTime["time"])
			self.wfile.write(json.dumps(self.waitTime))
			return
		contentType = ''
		if self.path == '/':
			self.path = '/index.html'
		self.path = self.path[1:]
		try:
			sendfile = open(self.path)
		except:
			print "file not found"
			return
		if self.path.endswith(".html"):
			contentType = 'text/html'
		elif self.path.endswith('.css'):
			contentType = 'text/css'
		elif self.path.endswith('.js'):
			contentType = 'application/javascript'
		self.send_response(200)
		self.send_header('Content-type', contentType)
		self.end_headers()
		self.wfile.write(sendfile.read())

	def do_POST(self):
		length = self.headers['content-length']
		jsondata = self.rfile.read(int(length))
		if(self.path.endswith("timeused")):
			waitTimeList.append(self.waitTime["time"] - float(jsondata))
			self.send_response(200)
			self.end_headers()
			return
		data = json.loads(jsondata)
		queryQueue.put(data["words"])
		self.wfile.write(resultQueue.get())

httpd = HTTPServer(("127.0.0.1", PORT), Handler)
print "server at port", PORT
httpd.serve_forever()
