package main

import leveldb "github.com/syndtr/goleveldb/leveldb"

db, err := leveldb.OpenFile("path/to/db", nil)

err = db.Put([]byte("key"), []byte("value"), nil)

data, err := db.Get([]byte("key"), nil)

err = db.Delete([]byte("key"), nil)

//iterate over database

iter := db.NewIterator(nil, nil)
for iter.Next() {
// Remember that the contents of the returned slice should not be modified, and
// only valid until the next call to Next.
key := iter.Key()
value := iter.Value()
// your code
}
iter.Release()
err = iter.Error()

//edit batch

batch := new(leveldb.Batch)
batch.Put([]byte("foo"), []byte("value"))
batch.Put([]byte("bar"), []byte("another value"))
batch.Delete([]byte("baz"))
err = db.Write(batch, nil)

defer db.Close()