import moment from 'moment'

export const validateDate = (value: any) => {
    if(!value){
        return false;
    }
    const date = moment(value);
    if(date.isValid()){
        return true;
    }else{
        return false;
    }
}