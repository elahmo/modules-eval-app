import json
import urllib2
import html2text

def tranform_html(desc):
		return html2text.html2text(desc, '').replace('\n', ' ')
		

final_array = []

base_url = "https://www.udacity.com"

with open('courses.json') as json_data:
	courses = json.load(json_data)

for course in courses['courses']:

	url =  course['homepage']
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
			'image': course['image'],
			'description': tranform_html(course['summary'].replace('\n', ' ') + ' ' + course['expected_learning'].replace('\n', ' ')),
			'source': 'udacity'
		}
	)


with open('courses_clean.json', 'w') as outfile:
    json.dump(final_array, outfile)
