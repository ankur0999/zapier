// how to setup locally


primary backend
  -> yarn install
  -> start docker
  docker run -p 5432:5432 -e POSTGRES_PASSWORD=ankur postgres
  -> start kafka
  -> crate topic
  -> migrate your postgres from backend
    npx prisma migrate dev

    // how to know that you are migrated
        -> docker ps
        ->docker exec -it `container id` /bin/bash
        ->psql -U postgres
        ->\dt;  // see all databases
  -> npm run dev  // start the backend  
  ->npx prisma migrate dev
  ->npx prisma generate   in all folder 
  -> npx prisma studio  // see all databases

// first start primary backend then seed
  ->database seed
  


frontend
  -> npm install / yarn install
  ->npm run dev

// hooks
-> npm run dev

// processor
->npm run dev

// worker
->npm run dev
