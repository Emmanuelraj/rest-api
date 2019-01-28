module.exports = function (app)
{


     const book = require('../models/book');


    //welcome method
     app.get('/',function (request,response)
     {
       console.log('get method');

        response.render('welcome',{title:'List Of Books'});
     });


   //get addBooks
     app.get('/api/addBooks',function (request,response)
     {
         console.log('addBooks method');

        response.render('addBooks',{title:'Add Books'});


     })



       //get findAll method
        app.get('/api/findAll',function (request,response)
        {
          console.log('findAll data method  called');
               book.find({},function (err, listBooks) {
                         if(err)
                          {
                            response.send(err);
                          }
                          else {
//response.send(listBooks);
        response.render('welcome',{title:'List Of Books',books:listBooks});
                          }
               });
        });


      //post method
      app.post('/api/addBooks',function (request,response)
      {
        console.log('addBooks post method'+request.body.author);
                new book({
                 title: request.body.title,
                 author:request.body.author,
                 body:request.body.body,
                createdDate : request.body.createdDate
                }).save(function (err,books)
                {
                if(err)
                  {
                  console.log('err add db'+err);
                 }
                else
                  {
                    //basically we have to redirect
                    //response.render('addBooks',{books:books})

                    response.send('addArticles');
                  }
                })
      });



   app.get('/api/edit/:id',function (request,response)
   {

     console.log('edit get method');

     book.findById(request.params.id,function(error,bookDetails)
     {
           response.render('editBook',{title : 'Edit Articles ...', books : bookDetails});
      });


   })



      //editById
      app.post('/api/edit/:id',function (request,response)
      {
         console.log('edit by id'+request.params.id);

          book.findByIdAndUpdate(request.params.id,
          {
            $set:{
              title: request.body.title,
              description:request.body.description,
              body:request.body.body,
              createdDate : request.body.createdDate
            }
          },
           function (err,UpdateBook)
           {
               if(err)
                {
                  console.log('err'+err);
                }
                else {
                  console.log(UpdateBook);
                  //response.json(UpdateBook);
                  response.redirect('/api/findAll');
                }
           })
      });

      //deleteById
      app.delete('/api/del/:id',function (request,response)
      {
            console.log('deleteById method');


            book.remove({_id:request.params.id},function (err, deleteBook)
            {
                if(err)
                   {
                     console.log('err'+err);
                   }
                   else {
                     response.send(deleteBook);
                     response.redirect('/api/findAll');
                   }

            })

      })




      //findById
      app.get('/api/:id', function (request,response)
      {

          book.findById({_id:request.params.id}, function (err,bookById)
          {
              if(err)
                {
                  console.log('err'+err);
                }
                else {
                  console.log(bookById);

//                  response.render(bookById);

response.render('editBook',{title : 'Edit Articles ...', books : bookById});

                }

          })

      })

}
