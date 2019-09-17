# Using "secret" config vars in Django

If you need to use secret keys in your Django project for API access, etc., here’s an approach very similar to what we did in Express:

1. `$ pip3 install django-environ`

2. Create a `.env` file in the same folder where `settings.py` is.

3. Put your secrets inside of `.env` (one per line, no spaces). For example:

	```python
	SECRET_KEY=abc123
	```

4. Anywhere in `settings.py` add this code:
	
	```python
	import environ
	environ.Env()
	environ.Env.read_env()
	```

5. Then in whatever module you need access to the secrets:
	
	```python
	import os
	
	def some_function(request):
	    my_key = os.environ['SECRET_KEY']
	```

Don’t forget after deploying, you’ll need to set the exact same config vars in Heroku using `config:set`, for example:

```bash
$ config:set SECRET_KEY=abc123
```