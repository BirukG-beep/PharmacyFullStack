export const statusMedicine = (final) => {
  if(final < 500 || 0){
      return  "Not Good"
       }
       else if(final < 1000){
        
        return "satisfatory"
       }
       else if (final < 1500){
        return "Very Good"
       }
       else if (final <2000){
       return "Ecxelent"
       }
       else if (final < 3000){
        return "Great"
       }
       else {
       return "perfect"
       }
}