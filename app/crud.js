const conexion = require('./conexion');

async function consultaDatos() {
  let datagrf = {}
  datagrf.p1 = await consultaDatos1();
  datagrf.p2 = await consultaDatos2();
  datagrf.p3 = await consultaDatos3();
  datagrf.p4 = await consultaDatos4();
  datagrf.p5 = await consultaDatos5();
  datagrf.p6 = await consultaDatos6();
  return datagrf;
}

function consultaDatos1() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.genero from demograficos d group by d.genero';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

function consultaDatos2() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.semestre from demograficos d group by d.semestre';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

function consultaDatos3() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.compu_propio from demograficos d group by d.compu_propio';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

function consultaDatos4() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.frecuencia_internet from demograficos d group by d.frecuencia_internet ;';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

function consultaDatos5() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.frecuencia_pag_udenar from demograficos d group by d.frecuencia_pag_udenar;';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

function consultaDatos6() {
  return new Promise((resolve, reject) => {
      let p1 = 'select count(*) as cant, d.navegador from demograficos d group by d.navegador;';
      conexion.query(p1, (err, rows) => {
      if(err) throw err;
      resolve(rows);
    }); 
  })
}

async function crearRasgos(user_id, data) {
  let stmt = `INSERT INTO rasgo_personalidades(user_id,evaluation)
  VALUES(?,?)`;
  let todo = [user_id, data];
  try {
    await conexion.query(stmt, todo); 
    console.log('Todo Id:');  
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    //conexion.end();
  }  
}

async function crearDemo(user_id, data) {
  let stmt = `INSERT INTO demograficos(genero,semestre,compu_propio,frecuencia_internet,frecuencia_pag_udenar,navegador,user_id)
  VALUES(?,?,?,?,?,?,?)`;
  let todo = [data['6'].r,data['7'].r,data['8'].r,data['9'].r,data['10'].r,data['11'].r,user_id];
  try {
    await conexion.query(stmt, todo); 
    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    //conexion.end();
  }  
}

function asynqQuery(query, params) {
  return new Promise((resolve, reject) =>{
      conexion.query(query, params, (err, result) => {
          if (err)
              return reject(err);
          resolve(result);
      });
  });

}

async function crearUser(email) {
  // execute the insert statment
  return await  asynqQuery('INSERT INTO users set ?', {email})
}

module.exports = {
  crearRasgos,
  crearUser,
  crearDemo,
  consultaDatos,
}