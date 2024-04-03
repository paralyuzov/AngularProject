# MusicLibrary

My first Angular Project

A small application for sharing electronic music, compilations, and news. Angular v16 is used for the front-end, and BackEndless is used for the backend.


## Short info and functionalities:
- Guest users can listen to available tracks, sets, the TOP10 ranking, and the news section.
- Registered users can like available tracks, create their own playlists, change their username, and add their own musical creations.

## Description of the components in the project:
- authenticate : Check if the user is authenticated upon page refresh using cookies and the user token returned by the backend.
- about : Small static page about the project idea + contacts.
- artist : It shows the artists, information about them, and the available tracks in the database.
- aside : A small active navigation for registered users containing the following functionalities: PROFILE - information about the specific user and the ability to change the username and email address, PLAYLIST - playlist of the specific user, ADD SONG - ability to add a track to the database.
- audio player: A simple audio player with the following functionalities - start, stop, pause buttons, ability to skip the selected track, increase and decrease volume.
- charts : A page with different sets of performers and the possibility to listen to their performances.
- header: A navigation containing sections for NEWS, ARTIST, CHART, ABOUT, LOGIN, REGISTER. Upon user login - the user's name and a logout button.
- new-releases: A section with the newest added tracks in the database.
- news : A page with news from the electronic music scene.
- TOP10: A section with the top 10 tracks in the database based on the number of likes each track has.
- register : Register page.
- login : Login page.

## Services :
- User Service : The user logic of the application includes the following functionalities: login, register, fetching and modifying information for the respective user, adding a track to the database, adding and deleting a track from the playlist, liking the selected track.
- API - Retrieving the necessary information from the database.
- Audio Service - Monitors user events, loads, and plays the selected track. Displays the artist and the name of the track, as well as its length.
