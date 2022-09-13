export function isObject(object) {
    return typeof object === 'object' && object !== null;
  }

  export function isArray(value){
    if(value instanceof Object && value instanceof Array) {
        return true
    }
    return false;
  }

  export const checkIfElementExists =(element)=>{
    if(
    element?.length === 0 || 
    !element|| 
    element === null || 
    element === "undefined" ){
      return false
    }
    return true
  }

  export const  deleteOneItem = (array,index)=>{
    if (index > -1) { 
      array.splice(index, 1); 
    }
  }


  export const customAlertTimer =(state)=>{
    state(true);
    setTimeout(() => {
      state(false);
    }, 2000);
  }



export const checkLocalStorageKey = (key) => {
    let existingKey = localStorage.getItem(key);
    const storageKeyExists=checkIfElementExists(existingKey);
    if (!storageKeyExists) {
        return false;
    }
    if (storageKeyExists) {
        return true;
    }
}



export const getLocalStorageItem = (key) => {
    const storedItem = localStorage?.getItem(key);
    try {
        if(storedItem){
     const storageData = JSON.parse(storedItem);  
    return storageData}

    } catch (error) {
      // TODO: better error handling
    }
  


}

export function addToExistingStoredList(key, value) {

  let existingStorage = localStorage.getItem(key);
  const storageExists = checkIfElementExists(existingStorage);
  if (!storageExists) {

      localStorage.setItem(key, JSON.stringify([value]));
  }
  if ( storageExists) {
    let existingStorage = JSON.parse(localStorage.getItem(key));
    if(isArray(existingStorage)){
  existingStorage.push(value);
  localStorage.setItem(key, JSON.stringify(existingStorage));
    }  
    if(!isArray(existingStorage)){
  Object.assign(existingStorage,value)
  localStorage.setItem(key, JSON.stringify(existingStorage));
    }  
      
  } 
}

export function getCurrentQuestionnaireName() {
    const data = JSON.parse(localStorage.getItem('currentQuestionnaire'));
    return data;
}
export function createNewStorageItem(key,value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getCurrentQuestionnaire() {
    const {questionnaireName} = getCurrentQuestionnaireName();
    const data = JSON.parse(localStorage.getItem(questionnaireName));
    return data;
}


