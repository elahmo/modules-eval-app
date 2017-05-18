import json,urllib
import urllib2, base64
import re
import html2text

complete_json = {'results':[]}

categories = ['Academics', 'Business', 'Design', 'Development', 'Health & Fitness', 'IT & Software', 'Language', 'Lifestyle', 'Marketing', 'Music', 'Office Productivity', 'Personal Development', 'Photography', 'Teacher Training', 'Test Prep']

start_url = 'https://www.udemy.com/api-2.0/courses/?page_size=100&fields[course]=title,headline,url,image_100x100,description&language=en'

def tranform_html(res):
		desc = res['description'].replace('\n', '')
		res['description'] = html2text.html2text(desc, '').replace('\n', ' ')
		return res

def recurse_links(url):
	print(url)
	request = urllib2.Request(url)
	request.add_header("Authorization", "Basic YVNJWllpejhrMW1pd1VHdnJ0Q29VVkJQWHZkVWk4aUtYTEZvR3lCNDpDOENMSTBPalUwcVNlMmkzNzk1YkQ1OTQ3c09vVUwwbHpPaEZtTVdUZ3VVOG9FblNaZURzWkM1aWJTejBEWXNJcEtJRGttUk95QVY5RVNYV3c1cVVoSHBFRkN6NmV6RHZhOHBod3h0S3doMU15Y0tmTUxQVDUzZVI5QjFuWEtnRg==")
	response = urllib2.urlopen(request)
	json_response=json.loads(response.read())
	json_res = map(tranform_html, json_response['results'])
	complete_json['results'].extend(json_res)
	if json_response['next'] == None:
		print("recursion reached the end")
		return
	recurse_links(json_response['next'])


for category in categories:
	cat = category.replace(' ', '+').replace('&','%26')
	url = start_url + '&category='+cat
	recurse_links(url)

print("Total courses len:")
print(len(complete_json['results']))

print("writing courses to courses.json")
with open('courses.json', 'w') as outfile:
    json.dump(complete_json, outfile)

print("Done")
