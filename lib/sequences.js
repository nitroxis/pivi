
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

var Sequence;

var replaceArgs = function(seq_data){
  if(typeof(seq_data[0]) === "function"){
    return seq_data[0]([Sequence.repeat(seq_data[1])]);
  }
  else {
    var call_desc = seq_data[0];
    var fn = call_desc.call;
    var args = call_desc.args;
    var data = seq_data[1];
    return {call: fn, args:_.map(args, function(arg){
      if(arg[0] == "@"){
        return _.get(data, arg.slice(1));
      }
      return arg;
    })};
  }
};

var seq_for_data = function(seq, data){
  var newSeqData = [];
  var seq_i = 0;
  var i = 0;
  while(i < data.length && seq_i < seq.length){
    var next_seq = seq[seq_i];
    if(typeof(next_seq) === "function"){
      next_seq = next_seq();
      if(next_seq === undefined){
        seq_i++;
        continue;
      }
    } else {
      seq_i++;
    }
    var next_data = data[i];
    if(typeof(nex_data) === "function"){
      next_data = next_data();
      if(next_data === undefined){
        i++;
        continue;
      }
    } else {
      i++;
    }
    newSeqData.push([next_seq, next_data]);
  }
  return newSeqData;
};

Sequence = {
  sequence: function(){
    var sequence_args = _.values(arguments);
    return function(data){
      data = data || Array(sequence_args.length);
      seq_data = seq_for_data(sequence_args, data);
      console.log(data);
      console.log(seq_data);
      return _(seq_data).chain()
        .map(function(sd){
          return replaceArgs(sd);
        })
        .flatten()
        .value();
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
    return Sequence.cycle(x);
  }
};

module.exports = Sequence;
