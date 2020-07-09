const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0,
  }

  repositories.push(repository)

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const project = repositories.find(project => project.id === id);

  if (!project) {
    response.status(400).json({error:"This project doesn't exist."})
  };

  const updatedProject = {
    id: project.id,
    title: title ? title : project.title,
    url: url ? url : project.url,
    techs: techs ? techs : project.techs,
    likes: project.likes,
  };

  const indexProject = repositories.indexOf(project)

  repositories.splice(project, 1, indexProject);

  console.log(updatedProject);
  return response.json(updatedProject);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;  

  const indexRepository = repositories.findIndex(repository => repository.id == id)

  if( indexRepository === -1 ){
    return response.status(400).json();
  }
  
  repositories.splice(indexRepository, 1);

  return response.status(204).json(repositories)
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  

  const repository = repositories.find(repository => repository.id == id)

  if( !repository ){
    return response.status(400).json();
  }

  repository.likes += 1 ;

  return response.json(repository);
  
});

module.exports = app;
