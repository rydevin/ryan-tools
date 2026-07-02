const DB_NAME='waypoint-db'; const DB_VERSION=1;
function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,DB_VERSION);r.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains('kv'))db.createObjectStore('kv');};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function getKV(key){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction('kv','readonly');const req=tx.objectStore('kv').get(key);req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error);});}
async function setKV(key,val){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction('kv','readwrite');const req=tx.objectStore('kv').put(val,key);req.onsuccess=()=>res();req.onerror=()=>rej(req.error);});}
async function initData(){let data=await getKV('data');if(!data){data=structuredClone(window.WAYPOINT_DEFAULT_DATA);await setKV('data',data);}return data;}
async function saveData(data){data.updatedAt=new Date().toISOString();await setKV('data',data);}
