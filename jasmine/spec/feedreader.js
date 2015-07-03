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

    describe('RSS Feeds', function() {
        //Make sure all feeds is defined and it has entries
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test that each element has a name
        it('has name', function() {
            allFeeds.forEach(function(e){
                expect(e.name).toBeDefined();
                expect(e.name).not.toBe(null);
                expect(e.name).not.toBe('');
            });
        });

        //test that each element has a URL
        it('has URL', function() {
            allFeeds.forEach(function(e){
                expect(e.url).toBeDefined();
                expect(e.url).not.toBe(null);
                expect(e.url).not.toBe('');
            });
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
