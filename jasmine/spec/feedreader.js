/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
		 //Make sure all feeds is defined and it has entries
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		
		//test that each element has a name and a URL
        it('has name', function() {
            for (feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).not.toBe(null);
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url).not.toBe(null);                
            }
        });
    });
	
	
    describe('The menu', function() {
        var bodyClass = $('body').hasClass('menu-hidden');
		
		//make sure the menu starts as hidden
        it ('hidden menu', function() {
            
            bodyClass = $('body').hasClass('menu-hidden');            

            expect(bodyClass).toBe(true);
        });

		//make sure the menu shows on first click
        it ('menu shows on first click', function() {
            $('.menu-icon-link').trigger('click');
            bodyClass = $('body').hasClass('menu-hidden');            

            expect(bodyClass).toBe(false);
        });

		//make sure the menu hides on the second click
        it ('menu hides on second click', function() {
            $('.menu-icon-link').trigger('click');
            bodyClass = $('body').hasClass('menu-hidden');            

            expect(bodyClass).toBe(true);
        }); 

    });
	
    describe('Initial Entries',function() {
		
		//function to make sure test occurs even though function is async
        beforeEach(function(done) {
                loadFeed(0, done);
            });

		//make sure there is at least one entry in the loadFeed function
        it('At least one entry loads in feed', function(done) {
            expect($('.feed').children().length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection',function() {
        var feedTitle;
        var feedName;

		//function to make sure test occurs even though function is async
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedTitle = $('.feed .entry h2').html();
                feedName = $('h1.header-title').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });
        
		//make sure the content actually changes
        it('loadFeed changes content', function(done) {
            expect($('.feed .entry h2').html()).not.toBe(feedTitle);
            done();
        });

		//make sure the header actually changes
		it('loadFeed changes header', function(done) {
            expect($('h1.header-title').html()).not.toBe(feedName);
            done();
        });
    });

}());
