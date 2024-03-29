# Fanta4_Immobiliare

A project made by a group of 4 UNICAL students:

- Giovanni Gualtieri (Github: @Giovix92)
- Gaetano Masci (Github: @GTN-0906)
- Bruno Brigandi' (Github: @BrunoBrigandi99)
- Alessandro Barletta

## What's this?

This is a project that basically mimics a classic home sales site.

It has 2 main branches: `frontend` and `backend`.

- Frontend branch: made entirely using Angular and Angular Material Components, implements:
  - localStorage for keeping track of the user's informations after a successful login.
  - Cards to show houses available for rent, direct sell or even in auction.
    - Auctions have a countdown time, a "last offer by" label and a counter-offer option till the time's up.
  - A quick and flexible search bar that updates the cards right after clicking its search button.
  - An easy admin control panel.
  - A quick way to add new listings, with every option available for your needs.
  - Extra stuff
- Backend branch: it's essentially a SpringBoot server, operating with a PostgreSQL database.

## How-to

Clone both branches in 2 separate folders, then:

- Import the DB dump (located in the backend branch) in DBeaver or any other DB Manager for PostgreSQL.
- Backend: start it using OpenJDK >= 17.
- Frontend: run `npm install`, then `ng serve`.

Fire up your browser at `localhost:4200/home`, and enjoy!
