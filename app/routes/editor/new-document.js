import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return `
    <p>Hello World!</p>
   `;
  }
});