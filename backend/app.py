
from init import app,api,Resource,cross_origin
from db import get_todos,add_todo,delete_todo,update_todo
from flask import request

import json



#this program will create and handle the database for our Reactjs frontend web app
#it will comminucate via an API



class TodoList(Resource):
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def get(self):
        todos=get_todos()
        JSON_PARSED = {"todos":[{"id":t.id,"name":t.name,"time":t.time, "checked":t.checked} for t in todos]}
        JSON_PARSED = json.dumps(JSON_PARSED)
        return JSON_PARSED
        pass
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def post(self):
        data = json.loads(request.get_data().decode('utf-8'))
        add_todo(data["todoName"],data["todoTime"])
        return "200",200
        pass
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def put(self):
        data = json.loads(request.get_data().decode('utf-8'))
        update_todo(data["id"])
        return "200",200
        pass
    @cross_origin(origin='*',headers=['Content-Type','Authorization'])
    def delete(self):
        data = json.loads(request.get_data().decode('utf-8'))
        delete_todo(data["id"])
        return "200",200
        pass
api.add_resource(TodoList,"/todos")


if __name__ == "__main__":
    app.run(host="localhost",port=4000, debug=True)





