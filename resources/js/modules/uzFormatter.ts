export default class uzFormatter{
   max = 9
   
   onlyNumber(text) {
      return text.replace(/[^-\d]/g, '')
   }
   
   clearMinuses(text) {
      return text.replaceAll('-', '')
   }
   limitsLetters(text) {
      return text.substring(0, this.max)
   }
   
   addMinuses(text) {
      const order = this.max - text.length
   
      for (let index = 0; index < order; index++) {
         text += '-'
      }
   
      return text
   }
   
   caretPosition(target) {
      var caret = this.clearMinuses(target.value)
      caret = caret.trimEnd()
      target.selectionStart = caret.length
      target.selectionEnd = caret.length
   }
   
   placeholder(text) {
      var text = this.onlyNumber(text)
      text = this.clearProbels(text) //Ikkinchi marta kelganda probellari boladi
      text = this.clearMinuses(text) //Ikkinchi marta kelganda minuslari boladi
      text = this.limitsLetters(text) //Maksimum raqamlar soni
      text = this.addMinuses(text) //Raqamlar yetmaganiga minuslar qoshadi
      return this.phoneFormat(text)
   }
   
   
   clearOne(target) {
      var text = target.value
      text = this.clearProbels(text)
      text = this.clearMinuses(text)
      text = text.slice(0, -1);
      text = this.addMinuses(text)
   
      return this.phoneFormat(text)
   }
   
   clearAll(target) {
      var text = target.value
      text = this.clearProbels(text)
      text = this.clearMinuses(text)
      text = text.substring(10)
      text = this.addMinuses(text)
   
      return this.phoneFormat(text)
   }

   phoneFormat(number){
      var text = number.toString()
      return text.replace(/([-\d]{2})([-\d]{3})([-\d]{2})([-\d]{2})/, "$1 $2 $3 $4")
   }
   
   clearProbels(text){
      text = '' +text
      return text.replaceAll(' ', '')
   }
   
   //Call eventes
   input(event) {
      event.target.value = this.placeholder(event.target.value)
      this.caretPosition(event.target)
   }
   
   //Call eventes
   keydown(event) {
      if (event.keyCode != 8) return
      event.preventDefault()
   
      if(event.ctrlKey) event.target.value = this.clearAll(event.target)
      else event.target.value = this.clearOne(event.target)

      this.caretPosition(event.target)

   }

   allFormats(phone){
      const noprobels = this.clearProbels(phone)
      const cleared = this.clearMinuses(noprobels)
      var Valid = false
      if(cleared.length == 9) Valid = true

      return {
         number: phone,
         clearNumber: noprobels ,
         fullNumber: '998'+noprobels,
         pure: cleared,
         isValid: Valid
      }
   }
   
}