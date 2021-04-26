import connectDB from '../../services/dbService';

connectDB();

export default (req, res) => {
  switch(req.method){
    case 'GET' : 
      res.status(200).json({status: req.method});
      break;
    case 'POST' : 
      res.status(200).json({status: req.method});
      break;
    case 'DELETE' : 
      res.status(200).json({status: req.method});
      break;
    default : 
      res.status(500).json({method : 'Internal Server Error'})
  }
}
