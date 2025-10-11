# Theory of Computation BoardBased Backend
01076121 THEORY OF COMPUTATION

## Instruction
```bash
npm install
npm run start
```

## Local Environment
```bash
# Server 
PORT=3000
NODE_ENV=development

# PostgreSQL (Aiven) 
PGHOST=pg-xxxxxxxx-yourproject-xxx.aivencloud.com
PGPORT=26941
PGDATABASE=defaultdb
PGUSER=avnadmin
PGPASSWORD=__REPLACE_WITH_YOUR_PASSWORD__

# SSL 
PGSSLMODE=require
PGSSLROOTCERT=./ca.pem

```

## HTTP Request Method

### Import CSV
```bash
GET {{url}}/board-games/export.csv
```

### Get random item (default 20 item)
```bash
GET {{url}}/board-games/
```

### Get random item (specific amount)
```bash
GET {{url}}/board-games?pageSize=50
```

### Get item by id (specific id)
```bash
GET {{url}}/board-games/1
```

### Get item by id (specific range)
```bash
GET {{url}}/board-games?range=1-20
```

### Search by keyword (case-insensitive)
```bash
GET {{url}}/board-games?q=Coup
```

### Sort by ascending order
```bash
GET {{url}}/board-games?sort=id:asc
```

### Filter catagory (case-insensitive)
```bash
GET {{url}}/board-games?categories=Action%20/%20Dexterity
```

### Combine multiple filter
```bash
GET {{url}}/board-games?sort=id:asc&categories=Action%20/%20Dexterity&q=coup
```







