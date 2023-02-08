/* DB 연결 - 스키마 이름 :memo / 데이터베이스 이름 : memos */
/* DB 연결 - 스키마 이름 :hnotice / 데이터베이스 이름 : notice */
const mysql = require('mysql');
const moment = require('moment'); // 날짜 포멧을 위한 모듈

/* ura31 - heroku cleardb */
var connection = {
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b78046f24dbbb0',
    password : '655bb985',
    port : '3306',
    database : 'heroku_a10026ffac36fc8',
    dateStrings:'date'
};

/* seomun-local */
// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '1234',
//     database: 'seomun-local',
//     dateStrings:'date'
// })

var dbConnection;

/* db disconnect 에러 해결 */
function handleDisconnect() {    
    dbConnection = mysql.createConnection(connection);// Recreate the connection, since the old one cannot be reused.

    dbConnection.connect(function(err) {            
      if(err) {                            
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                   
    });  

                                           
    dbConnection.on('error', function(err) {
      console.log('db error! ', err); 
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                      
      } else {                                    
        throw err;                              
      }
    });
}

handleDisconnect();


/* 리스트 전체를 불러오는 함수 */

function getAllNotice(callback){
    dbConnection.query('select * from notice ORDER BY id DESC',
    (err, rows) => {
        for(let i=0; i<rows.length;i++){
            /* YYYY-MM-DD 형식으로 출력할 것 */
            console.log('rows'+JSON.stringify(rows[i]));
            rows[i].update_time = moment( rows[i].update_time).format('YYYY-MM-DD'); //db에서 date 타입을 Date로 했기에 필요없는 부분은 날리려구 포멧해주어서 다시 넣어준다.
        }
        if(err) throw err;
        callback(rows);
    })
}



/* 리스트에 새로운 내용을 추가하는 함수 */

function insertNotice(title,cate,content,callback){
    dbConnection.query(`insert into notice (title,cate,content, create_time, update_time) values ("${title}","${cate}","${content}",now(),now())`,(err,result)=>{
        if(err) throw err;
        callback();
    })

}



/* 리스트 중 id값이 일치하는 row만 불러오는 함수 */
function getNoticeById(id, callback){
    dbConnection.query(`select * from notice where id=${id}`,
    (err, row, fields) => {
        if(err) throw err;
        callback(row);
    })
}


/* 리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수 */

function updateNoticeById(id, title,cate,content, callback){
    dbConnection.query(`update notice set title='${title}',cate='${cate}',update_time=now(),content='${content}' where id=${id}`, (err, result)=>{
        if(err) throw err;
        callback();
    })
}

/* 리스트 중 id값이 일치하는 부분을 삭제하는 함수 */

function deleteNoticeById(id,callback){
    dbConnection.query(`delete from notice where id=${id}`,
    (err, result) => {
        if(err) throw err;
        callback();
    });
}




module.exports = {
    handleDisconnect,
    getAllNotice,
    insertNotice,
    getNoticeById,
    updateNoticeById,
    deleteNoticeById
}