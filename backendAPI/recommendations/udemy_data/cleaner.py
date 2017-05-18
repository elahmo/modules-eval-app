import json
import urllib2


final_array = []

base_url = "https://www.udemy.com"

with open('courses.json') as json_data:
	courses = json.load(json_data)

for course in courses['results']:

	url = base_url + course['url']
	print(url)
	'''
	request = urllib2.Request(url)
	request.get_method = lambda : 'HEAD'
	response = urllib2.urlopen(request)
	if response.getcode() == 200:
		print("reachable")
	else:
		print("unreachable")
		raise ValueError('unreachable url found, follow the stack')
	'''
	final_array.append(
		{
			'title': course['title'],
			'url': url,
			'image': course['image_100x100'],
			'description': course['description'],
			'source': 'udemy'
		}
	)


with open('courses_clean.json', 'w') as outfile:
    json.dump(final_array, outfile)
