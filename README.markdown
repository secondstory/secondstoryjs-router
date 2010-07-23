SS.Router
=========

The Secondstory router class uses <tt>jquery/controller/history</tt> to listen to the location change events, then it matches against the Routes you have setup and finally sends a new OpenAjax event containing the value of the <tt>.to()</tt> method you setup when definition the route. It also contains logic for making sure multiple events aren't published for the same location if a user clicks the same link twice, for example.

So let's go back to our project configuration file:

    steal.plugins("ss/router")
         .then(function($) {

      Router.add("/articles/:article_name").to("project_article");
    });
    
That's it! When <tt>#/articles/my-first-article</tt> is accessed, OpenAjax will publish a <tt>project_article</tt> event with "my-first-article" as the "article_name" parameter.
