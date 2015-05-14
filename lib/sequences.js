
/*
A sequence stores multiple commands
commands are
*/

/*
command f: data -> call-desc
sequence(<list of commands>)
sequence(sequence) {
 return function(data) {
 (map replace this.seq data) };
}

replace : ["line",["@X","@Y"]] -> ["line"],[7,8]

unify(<list of commands>,<data>)
sequence(prepare_commands, draw-commands, finalize-commands)

  sequence(["setcolor",["green"]])([]) + sequence(["moveTo",["foo"]], cycle([lineTo, moveTo])])(data)
*/

var _ = require("lodash");

var replaceArgs = function(args, data){
  return _.map(args, function(arg){
    if(arg[0] == "@"){
      return _.get(data, arg.slice(1));
    }
    return arg;
  });
};

var seq_for_data = function(seq, data){
  var newSeqData = [];
  var seq_i = 0;
  var i = 0;
  while(i < data.length && seq_i < seq.length){
    if(typeof(seq[seq_i]) === "function"){
      var s_elem = seq[seq_i]();
      if(s_elem){
        newSeqData.push([s_elem,data[i]]);
        i++;
        continue;
      }
      seq_i++;
    } else {
      newSeqData.push([seq[seq_i],data[i]]);
      i++; seq_i++;
    }
  }
  return newSeqData;
};

var Sequence = {
  sequence: function(){
    var sequence_args = _.values(arguments);
    return function(data){
      data = data || Array(sequence_args.length);
      seq_data = seq_for_data(sequence_args, data);
      return _.map(seq_data, function(ds){
            return [ds[0][0],replaceArgs(ds[0][1],ds[1])];
          });
      };
  },
  cycle: function(){
    var idx = 0;
    var sequence_args = _.values(arguments);
    var len = sequence_args.length;
    return function(){
      var curI = idx; idx++;
      return sequence_args[curI%len];
    };
  },
  repeat: function(x){
    return Sequence.cycle([x]);
  }
};

module.exports = Sequence;
