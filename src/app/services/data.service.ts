export class DataService {
  public objective;
  constructor(){
    this.objective = localStorage.getItem('objective');
  }
  setObjective(objective) {
    this.objective = objective;
    localStorage.setItem('objective', objective);
  }
  getObjective() {
      return this.objective;
  }
}