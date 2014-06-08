import SocketServer
import os
import thread
import json
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import sys
sys.path.insert(0, 'googleNgram')
from getngrams import runQuery

PORT = 8000
waitTimeFile = open('data/waitTime.json', 'r')
waitTime = json.loads(waitTimeFile.read())
waitTimeFile.close()
waitTime["time"] = float(waitTime["time"])
waitTimeList = []
waitTimeList.append(float(waitTime["time"]))

class Handler(BaseHTTPRequestHandler):
	def __call__(self, content):
		print "5"
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
		self.wfile.write("xxx")
		print "6"
	def do_GET(self):
		if(self.path.endswith('waitTime')):
			self.send_response(200)
			self.send_header('Content-type', 'application/json')
			self.end_headers()
			if(len(waitTimeList) >= 3):
				sum = 0
				for element in waitTimeList:
					sum += element
				waitTime["time"] = sum / 3
				del waitTimeList[:]
				waitTimeList.append(waitTime["time"])
			self.wfile.write(json.dumps(waitTime))
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
			waitTimeList.append(waitTime["time"] - float(jsondata))
			self.send_response(200)
			self.end_headers()
			return
		data = json.loads(jsondata)
		self.content = ''
		#runQuery(data["words"], postData, self)
		thread.start_new_thread(runQuery, (data["words"], self.content))
		thread.start_new_thread(self.postData, (self.content, "xxx"))
	# def postData(self, content):
	# 	self.send_response(200)
	# 	self.send_header('Content-type', 'text/html')
	# 	self.end_headers()
	# 	self.wfile.write(content)
	def postData(self, content, nothing):
		while(content == ''):
			pass
		print content
		print "3"
		self.send_response(200)
		self.send_header('Content-type', 'text/html')
		self.end_headers()
		self.wfile.write("xxx")
		print "4"	

httpd = HTTPServer(("127.0.0.1", PORT), Handler)

print "server at port", PORT
httpd.serve_forever()