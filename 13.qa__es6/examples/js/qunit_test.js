QUnit.test( "assert.async() test", function(assert) {
    var done = assert.async();

    setTimeout(function() {
        assert.ok( true, "Input was focused" );
        done();
    });
});

QUnit.test( "multiple call done()", function(assert) {
    var done = assert.async(3);

    assert.expect(3);

    setTimeout(function() {
        assert.ok( true, "first call done." );
        done();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "second call done." );
        done();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "third call done." );
        done();
    }, 500);
});

QUnit.test( "two async calls", function(assert) {
    var done1 = assert.async(),
        done2 = assert.async();

    assert.expect(2);

    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 1" );
        done1();
    }, 500);

    setTimeout(function() {
        assert.ok( true, "test resumed from async operation 2" );
        done2();
    }, 150);
});