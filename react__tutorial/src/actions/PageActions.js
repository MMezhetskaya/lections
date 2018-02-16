/* eslint-disable */

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAIL,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

let photosArr = [],
    cached = false;

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = [];

    photos.forEach((item) => {
        createdYear = new Date(item.created*1000).getFullYear();

        if (createdYear === selectedYear ) {
            yearPhotos.push(item)
        }
    });

    yearPhotos.sort((a,b) => b.likes.count - a.likes.count);

    return yearPhotos;
}

function getMorePhotos(offset, count, year, dispatch) {
    FB.api(
        "/me/photos_all",
        function (response) {
            debugger;
            if (response && !response.error) {
                /* handle the result */
            }
        }
    );
}

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        });

        if (cached) {
            let photos = makeYearPhotos(photosArr, year);

            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: photos
            })
        } else {
            getMorePhotos(0, 200, year, dispatch)
        }
    }
}

// VK.Api.call('photos.getAll', {extended:1, count: count, offset: offset},(r) => { // eslint-disable-line no-undef
//     try {
//         if (offset <= r.response[0] - count) {
//             offset += 200;
//             photosArr = photosArr.concat(r.response);
//             getMorePhotos(offset,count,year,dispatch);
//         } else {
//             let photos = makeYearPhotos(photosArr, year);
//
//             cached = true;
//
//             dispatch({
//                 type: GET_PHOTOS_SUCCESS,
//                 payload: photos
//             })
//         }
//     }
//     catch(e) {
//         dispatch({
//             type: GET_PHOTOS_FAIL,
//             error: true,
//             payload: new Error(e)
//         })
//     }
//
// })
//
//
// function makeFacebookPhotoURL( id, accessToken ) {
//     return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
// }
// function login( callback ) {
//     FB.login(function(response) {
//         if (response.authResponse) {
//             //console.log('Welcome!  Fetching your information.... ');
//             if (callback) {
//                 callback(response);
//             }
//         } else {
//             console.log('User cancelled login or did not fully authorize.');
//         }
//     },{scope: 'user_photos'} );
// }
// function getAlbums( callback ) {
//     FB.api(
//         '/me/albums',
//         {fields: 'id,cover_photo'},
//         function(albumResponse) {
//             //console.log( ' got albums ' );
//             if (callback) {
//                 callback(albumResponse);
//             }
//         }
//     );
// }
// function getPhotosForAlbumId( albumId, callback ) {
//     FB.api(
//         '/'+albumId+'/photos',
//         {fields: 'id'},
//         function(albumPhotosResponse) {
//             //console.log( ' got photos for album ' + albumId );
//             if (callback) {
//                 callback( albumId, albumPhotosResponse );
//             }
//         }
//     );
// }
// function getLikesForPhotoId( photoId, callback ) {
//     FB.api(
//         '/'+albumId+'/photos/'+photoId+'/likes',
//         {},
//         function(photoLikesResponse) {
//             if (callback) {
//                 callback( photoId, photoLikesResponse );
//             }
//         }
//     );
// }
// function getPhotos(callback) {
//     var allPhotos = [];
//     var accessToken = '';
//     login(function(loginResponse) {
//         accessToken = loginResponse.authResponse.accessToken || '';
//         getAlbums(function(albumResponse) {
//             var i, album, deferreds = {}, listOfDeferreds = [];
//             for (i = 0; i < albumResponse.data.length; i++) {
//                 album = albumResponse.data[i];
//                 deferreds[album.id] = $.Deferred();
//                 listOfDeferreds.push( deferreds[album.id] );
//                 getPhotosForAlbumId( album.id, function( albumId, albumPhotosResponse ) {
//                     var i, facebookPhoto;
//                     for (i = 0; i < albumPhotosResponse.data.length; i++) {
//                         facebookPhoto = albumPhotosResponse.data[i];
//                         allPhotos.push({
//                             'id'	:	facebookPhoto.id,
//                             'added'	:	facebookPhoto.created_time,
//                             'url'	:	makeFacebookPhotoURL( facebookPhoto.id, accessToken )
//                         });
//                     }
//                     deferreds[albumId].resolve();
//                 });
//             }
//             $.when.apply($, listOfDeferreds ).then( function() {
//                 if (callback) {
//                     callback( allPhotos );
//                 }
//             }, function( error ) {
//                 if (callback) {
//                     callback( allPhotos, error );
//                 }
//             });
//         });
//     });
// }