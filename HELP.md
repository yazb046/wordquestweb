### How to run Dockerfile
1. Navigate Dockerfile repository
2. build image:
```bash
docker build -f Dockerfile.dev -t frontend .
```
3. run container:
```bash
docker run -p 5173:5173 my-node-app
```

### cmd
- list hiden folders
``` bash
ls -d -a .*/
```

### list all containers ports
docker container ls --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}" -a