const Project = require('../model/project')

exports.create = async(req,res)=>{
    try{
        if(!req.body){
            res.status(400).send({ message : "Please enter the details!"});
            return;
        }
        const {projectName, description , status} = req.body
        const newProject = new Project({
            projectName : projectName,
            description : description,
            status : status
        })
        const savedProject = await newProject.save();
        return res.send(savedProject)

    } catch(err){
        res.status(500).send({
            message : err.message || "Some error occurred while Creating a project"
        });
    }

}


exports.find = async(req, res)=>{

    try{
        if(req.query.id) {
            const id = req.query.id;
    
            const userFound = await Project.findById(id)
            if(!userFound){
                res.status(404).send({ message : "Project not found with id "+ id})
            }else{
                res.send(userFound)
            }
        }
    }catch(err) {
        res.status(500).send({ message: "Error retrieving project with id " + id})
    }
    
}

exports.update = async(req, res)=>{

    try{
        if(!req.body){
            return res.status(400).send({ message : "Please enter the details"})
        }
    
        const updateProject = {
            projectName : req.body.projectName,
            description : req.body.description,
            status : req.body.status
        }
    
        const id = req.params.id;
        const updatedOne = await Project.findByIdAndUpdate(
            id,
            updateProject,
            { new: true }
        )
        if(!updatedOne){
            res.status(404).send({ message : `Cannot Update project with ${id}. Maybe project not found!`})
        }else{
            res.send(updatedOne)
        }
    }catch(err) {
        res.status(500).send({ message : "Error while updating project information"})
    }

}

exports.delete = async(req, res)=>{

    try{
        const id = req.params.id;
        const data = await Project.findByIdAndDelete(id)
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({ message : "User was deleted successfully!"})
        }
    }catch(err) {
        res.status(500).send({
            message: "Could not delete Project with id=" + id
        });
    }
    
}