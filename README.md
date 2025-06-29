# Sagashite

![Banner Image](sagashite_banner.png)

The idea is that users can search for animes by describing what they are looking for.

For example, if they search "anime about pirates," it will recommend One Piece and other animes about pirates.

![Demo](sagashite_gif.gif)

> *(Side note: I know this is a bit unrelated, but I had actually tried building something similar 4–5 months ago and failed pretty miserably. So I'm honestly kinda happy that this time I was able to get something working!)*

[Here's](https://www.notion.so/So-I-Made-an-Anime-Search-Thingy-221f1129214e8018b3cfea704d3fb542?source=copy_link) a bit more detailed write-up.


## About The Implementation

So I took the latest anime data I could find from [here](https://www.kaggle.com/datasets/abhijithkumble/my-anime-list-anime-data)

so I took a string containing  
- title: name of anime  
- Genres: genres  
- Rating: rating  
- Produced by: studio  
- Synopsis: synopsis

and then I converted it into an embedding

this was done for all the animes in the CSV file

for creating the embedding I used Sentence Transformer

Initially, I used a very basic model (one which was recommended in the docs), namely **all-MiniLM-L6-v2**  
(but I was getting very bad results with it).

so I ended up using an instructor model i.e. basically a model which takes in a prompt and then based on that prompt it creates the embedding

I used **hkunlp/instructor-base** with the prompt:
> "Represent the anime description for recommending similar anime"

with this I was getting quite accurate results so I moved forward with this

The same model and prompt are also used for creating the embedding for the user query

Then for searching the most relevant anime based on the user's search, I used faiss which is a very famous library for similarity search

So basically we create an index which is a data structure which faiss uses which does the similarity search very efficiently

In our case I used IndexFlatL2 which essentially means that based on L2 distance we find the nearest neighbours

When we are doing the search we pass faiss another argument which tells it how many nearest neighbours we want

in our case that number is provided by the user (by default 5)

so that pretty much sums up the main idea behind the thing

Rest of the project is just basic React and FastAPI which I don't think is interesting enough to add here

So I guess I'll wrap up with that

> Also if you liked the thing then do star it 👉👈
