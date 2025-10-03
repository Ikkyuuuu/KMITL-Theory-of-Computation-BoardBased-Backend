# Theory of Computation BoardBased Backend
01076121 THEORY OF COMPUTATION

## Instruction
```bash
npm install
npm run start
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

### Get item by id
```bash
GET {{url}}/board-games/1
```

### Get item by range (specific range)
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

### Filter catagory
```bash
GET {{url}}/board-games?categories=Dice
```

### Combine multiple filter
```bash
GET {{url}}/board-games?q=The&sort=id:asc&pageSize=5&categories=Dice
```







