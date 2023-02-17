import * as SQLite from 'expo-sqlite';
import { SQLResultSet } from 'expo-sqlite';

import { Place } from '../types/places';

const database = SQLite.openDatabase('places.db');

export function init(): Promise<void> {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL)`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place: Place): Promise<SQLResultSet> {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces(): Promise<Place[]> {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places ORDER BY id DESC`,
        [],
        (_, result) => {
          const places = result.rows._array.map<Place>((x) => ({
            id: `${x.id}`,
            title: x.title,
            imageUri: x.imageUri,
            address: x.address,
            location: {
              lat: x.lat,
              lng: x.lng,
            },
          }));

          resolve(places);
        },
        (_, error) => {
          reject(error);

          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id: string): Promise<Place | undefined> {
  const promise = new Promise<Place | undefined>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          if (result.rows._array.length === 0) {
            resolve(undefined);
            return;
          }

          const places = result.rows._array.map<Place>((x) => ({
            id: `${x.id}`,
            title: x.title,
            imageUri: x.imageUri,
            address: x.address,
            location: {
              lat: x.lat,
              lng: x.lng,
            },
          }));

          resolve(places[0]);
        },
        (_, error) => {
          reject(error);

          return false;
        }
      );
    });
  });

  return promise;
}
