#  pip install SpeechRecognition
# pip install pyaudio
import os

import re
from datetime import date
from cgitb import text
import webbrowser
import speech_recognition as sr

command = {
	"type": "",
	"value": "",
	"options": [],
	"error": "None"
}

r = sr.Recognizer()
with sr.Microphone() as source:
	
	# make ls of current directory
	names_current_dir = os.listdir()

	# check if "test_audio.wav" exists
	if "test_audio.wav" in names_current_dir:
		print("test_audio.wav exists")
		# get audio from "test_audio.wav"
		with sr.AudioFile("test_audio.wav") as source:
			audio = r.record(source)
			print("Audio recorded")

	else:
		print("Listening...")
		audio = r.listen(source)

		# save audio as test_audio
		with open("test_audio.wav", "wb") as f:
			f.write(audio.get_wav_data())

	try:
		text = r.recognize_google(audio, language ='es-ES')

		# lower text
		text = text.lower()

		# split word and save it in a array
		words = text.split(" ")
		print('Has dicho: ', words)

		for word in words:
			if re.search('ejercicio*',word):
				# get actual date
				today = date.today()
				# get actual month
				month = today.strftime("%B")
				# get actual year
				year = today.strftime("%Y")
				# get actual day
				day = today.strftime("%d")

				# transform day to int
				day = int(day)

				# change command
				command["type"] = "calendar"
				command["value"] = str(day)
				command['options'] = {"next_month": False, "next_year": False}

				print("command: ", command)
				# webbrowser.open('https://www.amazon.es/')

			elif 'noticias' in words:
				webbrowser.open('https://elchapuzasinformatico.com/')
	
	except:
		command["error"] = "No se ha podido reconocer el texto"


