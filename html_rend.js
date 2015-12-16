this.Documents= new Mongo.Collection('document');

if (Meteor.isClient) {
  //helper to find first document in document collection and return its id
  Template.editor.helpers({
    mydoc: function(){
      var doc = Documents.findOne();
      if(doc){
        return doc._id;
      }
      else return undefined;
    },
    //helper to configure code mirror editor
    config: function(){
      return function(editor){
        editor.setOption("lineNumbers",true);// add line number before the line
        editor.setOption("mode","html");// set mode to html
        editor.setOption("smartIndent",true);// add indentation feature
        editor.setOption("dragDrop",true);// add drap drop of text
        editor.setSize(500,550); // change size of editor
        // function to change preview template
        editor.on("change",function(cm_editor,info){   
          $("#preview_frame").contents().find("html").html(cm_editor.getValue()); //jquery to fetch content and render content
        });
      }
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });
}
