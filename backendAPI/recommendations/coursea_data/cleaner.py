import json
#import urllib2
import requests

final_array = []

base_url = "https://www.coursera.org"

with open('courses.json') as json_data:
	courses = json.load(json_data)

for course in courses['elements']:

	url =  base_url + "/learn/" +course['slug']
	print(url)
	print(course['primaryLanguages'])
	
	'''
	#request = urllib2.Request(url)
	#request.get_method = lambda : 'HEAD'
	response = requests.head(url)
	print(response.status_code)
	if response.status_code == 200:
		print("reachable")
	else:
		print("unreachable")
		raise ValueError('unreachable url found, follow the stack')
	'''
	if course['primaryLanguages'] == [u'en'] :
		print('...adding')
		final_array.append(
			{
				'title': course['name'],
				'url': url,
				'image': course['photoUrl'],
				'description': course['description'].replace('\n', ' '),
				'source': 'coursera'
			}
		)


with open('courses_clean.json', 'w') as outfile:
    json.dump(final_array, outfile)
