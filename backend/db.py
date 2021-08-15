from typing import List
from flask_sqlalchemy import SQLAlchemy
from init import db


class Todo(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    time = db.Column(db.Integer,nullable=False)
    checked = db.Column(db.Boolean)
    def __repr__(self) -> str:
        return f"<Todo: {self.name} -> {self.time}s | *{self.checked}"

def get_todos() -> List[Todo]:
    return Todo.query.all()

def update_todo(id):
    current_todo = Todo.query.filter_by(id=id).first()
    current_todo.checked = not current_todo.checked 
    db.session.commit()
def add_todo(name,time):
    new_todo = Todo(name=name, time=time)
    db.session.add(new_todo)
    db.session.commit()
def delete_todo(id):
    current_todo = Todo.query.filter_by(id=id).first()
    db.session.delete(current_todo)
    db.session.commit()







def main():
    t1 = Todo(name="Hello",time=60,checked=True)
    db.session.add(t1)
    db.session.commit()
    db.create_all()



    pass


if __name__ == "__main__":
    main()