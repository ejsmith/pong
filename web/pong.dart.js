function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["millisecondsSinceEpoch?", "isUtc"],
 super: "Object",
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Date))
    return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
},
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.call$1(this.get$year());
  var m = t3.call$1(this.get$month());
  var d = t3.call$1(this.get$day());
  var h = t3.call$1(this.get$hour());
  var min = t3.call$1(this.get$minute());
  var sec = t3.call$1(this.get$second());
  var ms = t2.call$1(this.get$millisecond());
  if (this.isUtc === true)
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  else
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
},
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
},
 get$year: function() {
  return $.Primitives_getYear(this);
},
 get$month: function() {
  return $.Primitives_getMonth(this);
},
 get$day: function() {
  return $.Primitives_getDay(this);
},
 get$hour: function() {
  return $.Primitives_getHours(this);
},
 get$minute: function() {
  return $.Primitives_getMinutes(this);
},
 get$second: function() {
  return $.Primitives_getSeconds(this);
},
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000))
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null)
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
},
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
},
 is$Date: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib0_value", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 super: "Object",
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib0_value;
},
 get$exception: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._exception;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    this._successListeners.push(onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    this._exceptionHandlers.push(onException);
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib0_value = value;
  this._complete$0();
},
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 get$future: function() {
  return this._futureImpl;
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys?", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 super: "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC4 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC4)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC4)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (index < 0 || index >= t1.length)
      throw $.ioore(index);
    var t2 = t1[index] === $.CTC4;
    t1 = t2;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC4;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC4);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC4))
      f.call$2(key, $.index(this._values, i));
  }
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 clear$0: function() {
  $.clear(this._backingMap);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  if (value < 0 || value >= t1.length)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true)
    return false;
  t1.remove$1(value);
  return true;
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, {E: 'E'});
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
},
 some$1: function(f) {
  return $.some(this._backingMap.getKeys$0(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_entries", "_nextValidIndex"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC4)
    this._advance$0();
  return this._nextValidIndex < t2.length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC4)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC4);
},
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC4);
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_lib0_list", "_map"],
 super: "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._lib0_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib0_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.index_1 = 0;
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.index_10 = 0;
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 forEach$1: function(f) {
  $.forEach(this._lib0_list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib0_list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'KeyValuePair<K, V>'});
  this._lib0_list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 super: "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  t1._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 super: "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC3);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC3);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 some$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      return true;
    entry = nextEntry;
  }
  return false;
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, {E: 'E'});
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib0_pattern"],
 super: "Object",
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var t1 = $.get$length($.index(m, 0));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var matchEnd = matchStart + t1;
  return $._MatchImplementation$(this.get$pattern(), str, matchStart, matchEnd, m);
},
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 get$pattern: function() {
  return this._lib0_pattern;
},
 get$multiLine: function() {
  return this._multiLine;
},
 get$ignoreCase: function() {
  return this._ignoreCase;
},
 is$JSSyntaxRegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 super: "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$._MatchImplementation = {"":
 ["pattern?", "str", "_lib0_start", "_end", "_groups"],
 super: "Object",
 start$0: function() {
  return this._lib0_start;
},
 group$1: function(index) {
  return $.index(this._groups, index);
},
 operator$index$1: function(index) {
  return this.group$1(index);
}
};

$$._AllMatchesIterable = {"":
 ["_re", "_str"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_re", "_str", "_next=", "_done"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var next = this._next;
  this._next = null;
  return next;
},
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message?"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 super: "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_pattern", "_errmsg"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$._Random = {"":
 [],
 super: "Object",
 nextDouble$0: function() {
  return Math.random();
}
};

$$.ListIterator = {"":
 ["i", "list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.ConstantMap = {"":
 ["length?", "_jsObject", "_lib2_keys?"],
 super: "Object",
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return this._jsObject[key];
},
 forEach$1: function(f) {
  $.forEach(this._lib2_keys, new $.ConstantMap_forEach_anon(this, f));
},
 getKeys$0: function() {
  return this._lib2_keys;
},
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib2_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 remove$1: function(key) {
  return this._throwImmutable$0();
},
 clear$0: function() {
  return this._throwImmutable$0();
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["_start", "str", "pattern?"],
 super: "Object",
 start$0: function() {
  return this._start;
},
 operator$index$1: function(g) {
  return this.group$1(g);
},
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
}
};

$$._Default = {"":
 [],
 super: "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$input: function() {
  return this.operator$index$1('input');
},
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
}
};

$$.EmptyElementRect = {"":
 ["client", "offset", "scroll", "bounding?", "clientRects"],
 super: "Object"
};

$$._ElementAttributeMap = {"":
 ["_lib_element?"],
 super: "Object",
 containsKey$1: function(key) {
  return this._lib_element.$dom_hasAttribute$1(key);
},
 operator$index$1: function(key) {
  return this._lib_element.$dom_getAttribute$1(key);
},
 operator$indexSet$2: function(key, value) {
  this._lib_element.$dom_setAttribute$2(key, $.S(value));
},
 remove$1: function(key) {
  var t1 = this._lib_element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
},
 clear$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
},
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1))
    this.remove$1($.index(attributes, i).get$name());
},
 forEach$1: function(f) {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var item = attributes[i];
    f.call$2(item.get$name(), item.get$value());
  }
},
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.call$2(item.get$name(), item.get$value());
  }
},
 getKeys$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, {E: 'String'});
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var t1 = attributes[i].get$name();
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 getKeys$0$bailout: function(state, attributes) {
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, {E: 'String'});
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 getValues$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, {E: 'String'});
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var t1 = attributes[i].get$value();
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 getValues$0$bailout: function(state, attributes) {
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, {E: 'String'});
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 get$length: function() {
  return $.get$length(this._lib_element.get$$$dom_attributes());
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_lib_element?"],
 super: "Object",
 toString$0: function() {
  return this._formatSet$1(this._read$0());
},
 iterator$0: function() {
  return $.iterator(this._read$0());
},
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
},
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
},
 some$1: function(f) {
  return $.some(this._read$0(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
},
 get$length: function() {
  return $.get$length(this._read$0());
},
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
},
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
},
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
},
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
},
 _modify$1: function(f) {
  var s = this._read$0();
  f.call$1(s);
  this._write$1(s);
},
 _read$0: function() {
  var s = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(s, {E: 'String'});
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true;) {
    var trimmed = $.trim(t1.next$0());
    if ($.isEmpty(trimmed) !== true)
      s.add$1(trimmed);
  }
  return s;
},
 _classname$0: function() {
  return this._lib_element.get$$$dom_className();
},
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._lib_element.set$$$dom_className(t1);
},
 _formatSet$1: function(s) {
  return $.Strings_join($.ListFactory_List$from(s), ' ');
},
 is$Collection: function() { return true; }
};

$$._SimpleClientRect = {"":
 ["left?", "top?", "width?", "height?"],
 super: "Object",
 get$right: function() {
  return $.add(this.left, this.width);
},
 get$bottom: function() {
  return $.add(this.top, this.height);
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
},
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ', ' + $.S(this.width) + ', ' + $.S(this.height) + ')';
}
};

$$._ElementRectImpl = {"":
 ["client", "offset", "scroll", "_boundingClientRect", "_clientRects"],
 super: "Object",
 get$bounding: function() {
  return this._boundingClientRect;
}
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$input: function() {
  return this.operator$index$1('input');
},
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$open: function() {
  return this.operator$index$1('open');
}
};

$$._EventsImpl = {"":
 ["_ptr?"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_ptr?", "_type"],
 super: "Object",
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); },
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 iterator$0: function() {
  return $.iterator(this._list);
},
 forEach$1: function(f) {
  return $.forEach(this._list, f);
},
 filter$1: function(f) {
  return $.filter(this._list, f);
},
 some$1: function(f) {
  return $.some(this._list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._list);
},
 get$length: function() {
  return $.get$length(this._list);
},
 operator$index$1: function(index) {
  return $.index(this._list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._list, value);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
},
 clear$0: function() {
  return $.clear(this._list);
},
 removeLast$0: function() {
  return $.removeLast(this._list);
},
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._list, start, rangeLength);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
}
};

$$._AttributeClassSet = {"":
 ["_lib_element"],
 super: "_CssClassSet",
 $dom_className$0: function() {
  return $.index(this._lib_element.get$attributes(), 'class');
},
 get$$$dom_className: function() { return new $.BoundClosure(this, '$dom_className$0'); },
 _write$1: function(s) {
  $.indexSet(this._lib_element.get$attributes(), 'class', this._formatSet$1(s));
}
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$input: function() {
  return this.operator$index$1('input');
},
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$start: function() {
  return this.operator$index$1('start');
},
 start$0: function() { return this.get$start().call$0(); },
 start$1: function(arg0) { return this.get$start().call$1(arg0); }
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$error: function() {
  return this.operator$index$1('error');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$open: function() {
  return this.operator$index$1('open');
}
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
},
 get$error: function() {
  return this.operator$index$1('error');
},
 get$input: function() {
  return this.operator$index$1('input');
},
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$message: function() {
  return this.operator$index$1('message');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$play: function() {
  return this.operator$index$1('play');
},
 play$0: function() { return this.get$play().call$0(); },
 play$1: function(arg0) { return this.get$play().call$1(arg0); },
 play$2: function(arg0, arg1) { return this.get$play().call$2(arg0, arg1); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
},
 get$waiting: function() {
  return this.operator$index$1('waiting');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
}
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._MeasurementRequest = {"":
 ["computeValue", "completer?", "value=", "exception="],
 super: "Object",
 computeValue$0: function() { return this.computeValue.call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
},
 close$0: function() {
  return $._DOMWindowCrossFrameImpl__close(this._window);
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  var t1 = messagePorts == null;
  var t2 = this._window;
  if (t1)
    $._DOMWindowCrossFrameImpl__postMessage2(t2, message, targetOrigin);
  else
    $._DOMWindowCrossFrameImpl__postMessage3(t2, message, targetOrigin, messagePorts);
},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
}
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId?", "nextManagerId", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
 super: "Object",
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["id=", "ports?", "isolateStatics"],
 super: "Object",
 initGlobals$0: function() {
$initGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

}
};

$$._IsolateEvent = {"":
 ["isolate", "fn", "message?"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 get$id: function() {
  return 0;
},
 set$id: function(i) {
  throw $.captureStackTrace($.NotImplementedException$(null));
},
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
},
 send$1: function(message) {
  return this.send$2(message,null)
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId?", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
},
 send$1: function(message) {
  return this.send$2(message,null)
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_id?", "_lib3_callback?"],
 super: "Object",
 _lib3_callback$0: function() { return this._lib3_callback.call$0(); },
 _lib3_callback$0: function() { return this._lib3_callback.call$0(); },
 _lib3_callback$2: function(arg0, arg1) { return this._lib3_callback.call$2(arg0, arg1); },
 receive$1: function(onMessage) {
  this._lib3_callback = onMessage;
},
 close$0: function() {
  this._lib3_callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitSendPort$1: function(port) {
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port._port == null)
    this.ports.push(port.get$_futurePort());
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port._isolateId, port._receivePort.get$_id()];
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
},
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 operator$index$1: function(object) {
  return;
},
 operator$indexSet$2: function(object, info) {
},
 reset$0: function() {
},
 cleanup$0: function() {
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  return this.visitObject$1(x);
},
 visitObject$1: function(x) {
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null))
    return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      return this.deserializeObject$1(x);
  }
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    var t1 = this._deserializeHelper$1(dartList[i]);
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    dartList[i] = t1;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 deserializeObject$1: function(x) {
  throw $.captureStackTrace('Unexpected serialized object');
}
};

$$._Timer = {"":
 ["_once", "_handle"],
 super: "Object",
 cancel$0: function() {
  var t1 = this._once === true;
  var t2 = this._handle;
  if (t1)
    $._window().clearTimeout$1(t2);
  else
    $._window().clearInterval$1(t2);
},
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon1(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon0(this, callback), milliSeconds);
}
};

$$._JsonParser = {"":
 ["json", "length?", "position"],
 super: "Object",
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() == null))
    this._error$1('Junk at the end of JSON input');
  return result;
},
 _parseValue$0: function() {
  var token = this._token$0();
  if (token == null)
    this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', null);
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
},
 _expectKeyword$2: function(word, value) {
  for (var t1 = word.length, i = 0; i < t1; ++i) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i)))
      this._error$1('Expected keyword \'' + word + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
},
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object' || object === null || (object.constructor !== Array || !!object.immutable$list) && !object.is$JavaScriptIndexingBehavior())
    return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0))
        throw $.iae(key);
      if (key < 0 || key >= object.length)
        throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _parseObject$0$bailout: function(state, object) {
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true;) {
      list.push(this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true)
      this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
},
 _parseString$0: function() {
  if (this._isToken$1(34) !== true)
    this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, {E: 'int'});
  for (var t1 = this.json; true;) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this)))
        this._error$1('\\ at the end of input');
      switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          if ($.gtB($.add(this.position, 5), $.get$length(this)))
            this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.parseInt('0x' + $.S(codeString));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }

          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.Strings_String$fromCharCodes(charCodes);
},
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true)
    this._error$1('Expected number literal');
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45)
    char$ = this._nextChar$0();
  if (char$ === 48)
    char$ = this._nextChar$0();
  else if (this._isDigit$1(char$) === true) {
    char$ = this._nextChar$0();
    for (; this._isDigit$1(char$) === true;)
      char$ = this._nextChar$0();
  } else
    this._error$1('Expected digit when parsing number');
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else
    isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43)
      char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      isInt = false;
    } else
      this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt)
    return $.parseInt(number);
  else
    return $.parseDouble(number);
},
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number')
    return this._isDigit$1$bailout(1, char$);
  return char$ >= 48 && char$ <= 57;
},
 _isDigit$1$bailout: function(state, char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
},
 _isToken$1: function(tokenKind) {
  var t1 = this._token$0();
  if (typeof t1 !== 'number')
    return this._isToken$1$bailout(1, tokenKind, t1);
  return t1 === tokenKind;
},
 _isToken$1$bailout: function(state, tokenKind, t1) {
  return $.eq(t1, tokenKind);
},
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._char$0$bailout(1, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._char$0$bailout(2, t1, t3);
  if (t1 >= t3)
    this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
},
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t3 = $.get$length(this);
    case 2:
      state = 0;
      if ($.geB(t1, t3))
        this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
},
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(2, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._nextChar$0$bailout(3, t1, t3);
  if (t1 >= t3)
    return 0;
  return $.charCodeAt(this.json, this.position);
},
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t3 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t3))
        return 0;
      return $.charCodeAt(this.json, this.position);
  }
},
 _token$0: function() {
  for (var t1 = this.json; true;) {
    if ($.geB(this.position, $.get$length(this)))
      return;
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($._JsonParser_tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token == null)
      return 0;
    return token;
  }
},
 _error$1: function(message) {
  throw $.captureStackTrace(message);
},
 _JsonParser$_internal$1: function(json) {
  if (!($._JsonParser_tokens == null))
    return;
  var t1 = $.ListFactory_List(126);
  $.setRuntimeTypeInfo(t1, {E: 'int'});
  $._JsonParser_tokens = t1;
  $.indexSet($._JsonParser_tokens, 9, 32);
  $.indexSet($._JsonParser_tokens, 10, 32);
  $.indexSet($._JsonParser_tokens, 13, 32);
  $.indexSet($._JsonParser_tokens, 32, 32);
  $.indexSet($._JsonParser_tokens, 48, 45);
  $.indexSet($._JsonParser_tokens, 49, 45);
  $.indexSet($._JsonParser_tokens, 50, 45);
  $.indexSet($._JsonParser_tokens, 51, 45);
  $.indexSet($._JsonParser_tokens, 52, 45);
  $.indexSet($._JsonParser_tokens, 53, 45);
  $.indexSet($._JsonParser_tokens, 54, 45);
  $.indexSet($._JsonParser_tokens, 55, 45);
  $.indexSet($._JsonParser_tokens, 56, 45);
  $.indexSet($._JsonParser_tokens, 57, 45);
  $.indexSet($._JsonParser_tokens, 45, 45);
  $.indexSet($._JsonParser_tokens, 123, 123);
  $.indexSet($._JsonParser_tokens, 125, 125);
  $.indexSet($._JsonParser_tokens, 91, 91);
  $.indexSet($._JsonParser_tokens, 93, 93);
  $.indexSet($._JsonParser_tokens, 34, 34);
  $.indexSet($._JsonParser_tokens, 58, 58);
  $.indexSet($._JsonParser_tokens, 44, 44);
  $.indexSet($._JsonParser_tokens, 110, 110);
  $.indexSet($._JsonParser_tokens, 116, 116);
  $.indexSet($._JsonParser_tokens, 102, 102);
}
};

$$.JsonUnsupportedObjectType = {"":
 [],
 super: "Object"
};

$$.JsonStringifier = {"":
 ["_sb?", "_seen"],
 super: "Object",
 _checkCycle$1: function(object) {
  for (var t1 = this._seen, i = 0; i < t1.length; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (t2 == null ? object == null : t2 === object)
      throw $.captureStackTrace('Cyclic structure');
  }
  t1.push(object);
},
 _stringify$1: function(object) {
  var t1 = {};
  if (typeof object === 'number') {
    $.add$1(this._sb, $.JsonStringifier__numberToString(object));
    return;
  } else if (object === true) {
    $.add$1(this._sb, 'true');
    return;
  } else if (object === false) {
    $.add$1(this._sb, 'false');
    return;
  } else if (object == null) {
    $.add$1(this._sb, 'null');
    return;
  } else if (typeof object === 'string') {
    t1 = this._sb;
    $.add$1(t1, '"');
    $.JsonStringifier__escape(t1, object);
    $.add$1(t1, '"');
    return;
  } else if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this._stringify$1$bailout(1, object);
    this._checkCycle$1(object);
    var t2 = this._sb;
    $.add$1(t2, '[');
    t1 = object.length;
    if (t1 > 0) {
      if (0 >= t1)
        throw $.ioore(0);
      this._stringify$1(object[0]);
      for (var i = 1; i < object.length; ++i) {
        $.add$1(t2, ',');
        if (i < 0 || i >= object.length)
          throw $.ioore(i);
        this._stringify$1(object[i]);
      }
    }
    $.add$1(t2, ']');
    this._seen.pop();
    return;
  } else if (typeof object === 'object' && object !== null && object.is$Map()) {
    this._checkCycle$1(object);
    t2 = this._sb;
    $.add$1(t2, '{');
    t1.first_10 = true;
    object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
    $.add$1(t2, '}');
    this._seen.pop();
    return;
  } else
    throw $.captureStackTrace($.CTC5);
},
 _stringify$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
    case 1:
      if (state === 0 && typeof object === 'number') {
        $.add$1(this._sb, $.JsonStringifier__numberToString(object));
        return;
      } else
        switch (state) {
          case 0:
          case 1:
            if (state === 0 && object === true) {
              $.add$1(this._sb, 'true');
              return;
            } else
              switch (state) {
                case 0:
                case 1:
                  if (state === 0 && object === false) {
                    $.add$1(this._sb, 'false');
                    return;
                  } else
                    switch (state) {
                      case 0:
                      case 1:
                        if (state === 0 && object == null) {
                          $.add$1(this._sb, 'null');
                          return;
                        } else
                          switch (state) {
                            case 0:
                            case 1:
                              if (state === 0 && typeof object === 'string') {
                                t1 = this._sb;
                                $.add$1(t1, '"');
                                $.JsonStringifier__escape(t1, object);
                                $.add$1(t1, '"');
                                return;
                              } else
                                switch (state) {
                                  case 0:
                                  case 1:
                                    if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
                                      switch (state) {
                                        case 0:
                                        case 1:
                                          state = 0;
                                          this._checkCycle$1(object);
                                          var t2 = this._sb;
                                          $.add$1(t2, '[');
                                          if ($.gtB($.get$length(object), 0)) {
                                            this._stringify$1($.index(object, 0));
                                            for (var i = 1; $.ltB(i, $.get$length(object)); ++i) {
                                              $.add$1(t2, ',');
                                              this._stringify$1($.index(object, i));
                                            }
                                          }
                                          $.add$1(t2, ']');
                                          this._seen.pop();
                                          return;
                                      }
                                    else if (typeof object === 'object' && object !== null && object.is$Map()) {
                                      this._checkCycle$1(object);
                                      t2 = this._sb;
                                      $.add$1(t2, '{');
                                      t1.first_10 = true;
                                      object.forEach$1(new $.JsonStringifier__stringify_anon(this, t1));
                                      $.add$1(t2, '}');
                                      this._seen.pop();
                                      return;
                                    } else
                                      throw $.captureStackTrace($.CTC5);
                                }
                          }
                    }
              }
        }
  }
}
};

$$.PongGame = {"":
 ["difficulty?", "_countdown=", "_waiting=", "rally=", "connected?", "player1=", "player2=", "ball="],
 super: "Game",
 get$state: function() {
  return this._state;
},
 set$state: function(value) {
  if ($.eqB(this._state, value))
    return;
  this._state = value;
  this.disableEntitiesByGroup$1('welcome');
  this.disableEntitiesByGroup$1('gameOver');
  this.disableEntitiesByGroup$1('computerPick');
  this.disableEntitiesByGroup$1('paused');
  this.disableEntitiesByGroup$1('stats');
  this.disableEntitiesByGroup$1('waiting');
  if ($.eqB(this._state, 1))
    this.enableEntitiesByGroup$1('welcome');
  else if ($.eqB(this._state, 4))
    this.enableEntitiesByGroup$1('gameOver');
  else if ($.eqB(this._state, 5))
    this.enableEntitiesByGroup$1('computerPick');
  else if ($.eqB(this._state, 2))
    this.enableEntitiesByGroup$1('paused');
  else if ($.eqB(this._state, 6))
    this.enableEntitiesByGroup$1('stats');
  else if ($.eqB(this._state, 7))
    this.enableEntitiesByGroup$1('waiting');
},
 init$0: function() {
  if ($.index($.window().get$localStorage(), 'win1') == null)
    $.indexSet($.window().get$localStorage(), 'win1', '0');
  if ($.index($.window().get$localStorage(), 'win2') == null)
    $.indexSet($.window().get$localStorage(), 'win2', '0');
  if ($.index($.window().get$localStorage(), 'win3') == null)
    $.indexSet($.window().get$localStorage(), 'win3', '0');
  if ($.index($.window().get$localStorage(), 'winEx') == null)
    $.indexSet($.window().get$localStorage(), 'winEx', '0');
  if ($.index($.window().get$localStorage(), 'max') == null)
    $.indexSet($.window().get$localStorage(), 'max', '0');
  if ($.index($.window().get$localStorage(), 'total') == null)
    $.indexSet($.window().get$localStorage(), 'total', '0');
  this.win1 = $.parseInt($.S($.index($.window().get$localStorage(), 'win1')));
  this.win2 = $.parseInt($.S($.index($.window().get$localStorage(), 'win2')));
  this.win3 = $.parseInt($.S($.index($.window().get$localStorage(), 'win3')));
  this.winEx = $.parseInt($.S($.index($.window().get$localStorage(), 'winEx')));
  this.totalPlayed = $.parseInt($.S($.index($.window().get$localStorage(), 'total')));
},
 start$0: function() {
  this.ball = $.Ball$(this, 0, 0);
  this.addEntity$1(this.ball);
  var t1 = this.ball.get$startVel();
  this.ball.get$momentum().set$xVel(t1);
  t1 = this.rect;
  this.player1 = $.ComputerPaddle$(this, $.neg($.sub(t1.get$halfWidth(), 10)), 10, this.difficulty);
  this.addEntity$1(this.player1);
  this.player2 = $.ComputerPaddle$(this, $.sub(t1.get$halfWidth(), 10), 10, this.difficulty);
  this.addEntity$1(this.player2);
  this.createWelcomeMenu$0();
  this.createComputerPickMenu$0();
  this.createPausedMenu$0();
  this.createWaitingMenu$0();
  this.init$0();
  this.set$state(1);
  $.Game.prototype.start$0.call(this);
},
 update$0: function() {
  var t1 = this.get$state();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(1, t1, 0);
  if (!(t1 === 3)) {
    t1 = this.get$state();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(2, t1, 0);
    t1 = t1 === 2;
  } else
    t1 = true;
  if (t1) {
    t1 = this.player1.get$score();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(3, t1, 0);
    if (!(t1 >= 10)) {
      t1 = this.player2.get$score();
      if (typeof t1 !== 'number')
        return this.update$0$bailout(4, t1, 0);
      t1 = t1 >= 10;
    } else
      t1 = true;
    if (t1)
      this.gameOver$0();
    t1 = this.input.keyCode;
    if (typeof t1 !== 'number')
      return this.update$0$bailout(5, t1, 0);
    if (t1 === 27) {
      t1 = this.get$state();
      if (typeof t1 !== 'number')
        return this.update$0$bailout(6, t1, 0);
      this.set$state(t1 === 2 ? 3 : 2);
    }
    t1 = this.get$state();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(7, t1, 0);
    if (t1 === 3)
      this.randomPowerUps$0();
    this.maxRally = $.parseInt($.S($.index($.window().get$localStorage(), 'max')));
    t1 = this.rally;
    if (typeof t1 !== 'number')
      return this.update$0$bailout(8, t1, 0);
    var t3 = this.maxRally;
    if (typeof t3 !== 'number')
      return this.update$0$bailout(9, t1, t3);
    if (t1 > t3)
      $.indexSet($.window().get$localStorage(), 'max', $.S(this.rally));
  }
  t1 = this.get$state();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(10, t1, 0);
  if (t1 === 4) {
    this.player1.set$enabled(false);
    this.player2.set$enabled(false);
    this.ball.set$enabled(false);
  }
  $.Game.prototype.update$0.call(this);
},
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      break;
    case 7:
      t1 = env0;
      break;
    case 8:
      t1 = env0;
      break;
    case 9:
      t1 = env0;
      t3 = env1;
      break;
    case 10:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.get$state();
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !$.eqB(t1, 3))
        switch (state) {
          case 0:
            t1 = this.get$state();
          case 2:
            state = 0;
            t1 = $.eqB(t1, 2);
        }
      else
        t1 = true;
    default:
      if (state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this.player1.get$score();
          case 3:
            state = 0;
          case 4:
            if (state === 4 || state === 0 && !$.geB(t1, 10))
              switch (state) {
                case 0:
                  t1 = this.player2.get$score();
                case 4:
                  state = 0;
                  t1 = $.geB(t1, 10);
              }
            else
              t1 = true;
            if (t1)
              this.gameOver$0();
            t1 = this.input.get$keyCode();
          case 5:
            state = 0;
          case 6:
            if (state === 6 || state === 0 && $.eqB(t1, 27))
              switch (state) {
                case 0:
                  t1 = this.get$state();
                case 6:
                  state = 0;
                  this.set$state($.eqB(t1, 2) ? 3 : 2);
              }
            t1 = this.get$state();
          case 7:
            state = 0;
            if ($.eqB(t1, 3))
              this.randomPowerUps$0();
            this.maxRally = $.parseInt($.S($.index($.window().get$localStorage(), 'max')));
            t1 = this.rally;
          case 8:
            state = 0;
            var t3 = this.maxRally;
          case 9:
            state = 0;
            if ($.gtB(t1, t3))
              $.indexSet($.window().get$localStorage(), 'max', $.S(this.rally));
        }
      t1 = this.get$state();
    case 10:
      state = 0;
      if ($.eqB(t1, 4)) {
        this.player1.set$enabled(false);
        this.player2.set$enabled(false);
        this.ball.set$enabled(false);
      }
      $.Game.prototype.update$0.call(this);
  }
},
 get$countdown: function() {
  return this._countdown;
},
 set$countdown: function(value) {
  this._countdown = value;
  var t1 = this._countdownTimer;
  if (!(t1 == null))
    t1.cancel$0();
  this.disableEntitiesByGroup$1('gameOver');
  this.disableEntitiesByGroup$1('welcome');
  this.disableEntitiesByGroup$1('computerPick');
  this.disableEntitiesByGroup$1('paused');
  this.disableEntitiesByGroup$1('stats');
  this.disableEntitiesByGroup$1('waiting');
  this._countdownTimer = $._TimerFactory_Timer$repeating(1000, new $.PongGame_countdown_anon(this));
},
 get$waiting: function() {
  return this._waiting;
},
 set$waiting: function(value) {
  this._waiting = value;
  var t1 = this._waitingTimer;
  if (!(t1 == null))
    t1.cancel$0();
  this.disableEntitiesByGroup$1('gameOver');
  this.disableEntitiesByGroup$1('welcome');
  this.disableEntitiesByGroup$1('computerPick');
  this.disableEntitiesByGroup$1('paused');
  this.disableEntitiesByGroup$1('stats');
  this._waitingTimer = $._TimerFactory_Timer$repeating(1000, new $.PongGame_waiting_anon(this));
},
 randomPowerUps$0: function() {
  var t1 = this.entities;
  if ($.geB($.get$length($.filter(t1, new $.PongGame_randomPowerUps_anon())), 5))
    return;
  var t2 = this.timer;
  if ($.ltB(t2.get$gameTime(), 5))
    return;
  if ($.gtB($.add(this.lastPowerUp, 4), t2.get$gameTime()))
    return;
  var powerUp = $.PowerUp$(this, 0, 0);
  var t3 = this.rect;
  do {
    powerUp.set$x($.random($.add($.neg(t3.get$halfWidth()), 100), $.sub(t3.get$halfWidth(), 100), false));
    powerUp.set$y($.random($.add($.neg(t3.get$halfHeight()), 50), $.sub(t3.get$halfHeight(), 50), false));
  } while ($.some($.filter(t1, new $.PongGame_randomPowerUps_anon0()), new $.PongGame_randomPowerUps_anon1(powerUp)) === true);
  this.lastPowerUp = t2.get$gameTime();
  this.addEntity$1(powerUp);
},
 ballHit$1: function(paddle) {
  this._ballHitHandle.fireEvent$1(paddle);
},
 gameOver$0: function() {
  this.sound.play$1('sweep');
  this._gameOverHandle.fireEvent$1($.CTC7);
  if ($.eqB(this.get$state(), 5) || $.eqB(this.get$state(), 1))
    var win = false;
  else
    win = ($.geB(this.player1.get$score(), 10) || $.geB(this.player2.get$score(), 10)) && true;
  if (win) {
    if ($.geB(this.player1.get$score(), 10))
      if ($.eqB(this.difficulty, 1)) {
        this.win1 = this.win1 + 1;
        $.indexSet($.window().get$localStorage(), 'win1', $.S(this.win1));
      } else if ($.eqB(this.difficulty, 2)) {
        this.win2 = this.win2 + 1;
        $.indexSet($.window().get$localStorage(), 'win2', $.S(this.win2));
      } else if ($.eqB(this.difficulty, 3)) {
        this.win3 = this.win3 + 1;
        $.indexSet($.window().get$localStorage(), 'win3', $.S(this.win3));
      } else if ($.eqB(this.difficulty, 4)) {
        this.winEx = this.winEx + 1;
        $.indexSet($.window().get$localStorage(), 'winEx', $.S(this.winEx));
      }
    this.removeEntitiesByFilter$1(new $.PongGame_gameOver_anon());
    this.removeEntitiesByFilter$1(new $.PongGame_gameOver_anon0());
    this.removeEntitiesByGroup$1('gameOver');
    this.createGameOverMenu$0();
    this.set$state(4);
  } else
    this.resetPoint$0();
},
 createGameOverMenu$0: function() {
  this.addEntity$1($.GameText$(this, 0, -97, $.geB(this.player1.get$score(), 10) ? $.S(this.player1.get$name()) + ' won!' : $.S(this.player2.get$name()) + ' won!', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'gameOver'));
  this.addEntity$1($.GameText$(this, 0, -31, 'Play again?', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'gameOver'));
  this.addEntity$1($.GameButton$(this, 0, 15, 'Yes', new $.PongGame_createGameOverMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'gameOver'));
  this.addEntity$1($.GameButton$(this, 0, 60, 'No', new $.PongGame_createGameOverMenu_anon0(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'gameOver'));
  this.disableEntitiesByGroup$1('gameOver');
},
 createWelcomeMenu$0: function() {
  this.addEntity$1($.GameText$(this, 0, -97, 'Welcome to Pong!', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'welcome'));
  this.addEntity$1($.GameButton$(this, 0, -31, 'Play Computer', new $.PongGame_createWelcomeMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'welcome'));
  this.addEntity$1($.GameButton$(this, 0, 15, 'Play Against A Friend', new $.PongGame_createWelcomeMenu_anon0(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'welcome'));
  this.addEntity$1($.GameButton$(this, 0, 60, 'Statistics', new $.PongGame_createWelcomeMenu_anon1(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'welcome'));
  this.disableEntitiesByGroup$1('welcome');
},
 createWaitingMenu$0: function() {
  this.addEntity$1($.GameButton$(this, -420, -280, 'Back', new $.PongGame_createWaitingMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'waiting'));
  this.disableEntitiesByGroup$1('waiting');
},
 createComputerPickMenu$0: function() {
  this.addEntity$1($.GameText$(this, 0, -97, 'Computer Difficulty', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.addEntity$1($.GameButton$(this, 0, -31, 'Level 1', new $.PongGame_createComputerPickMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.addEntity$1($.GameButton$(this, 0, 15, 'Level 2', new $.PongGame_createComputerPickMenu_anon0(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.addEntity$1($.GameButton$(this, 0, 60, 'Level 3', new $.PongGame_createComputerPickMenu_anon1(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.addEntity$1($.GameButton$(this, 0, 105, 'Extreme', new $.PongGame_createComputerPickMenu_anon2(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.addEntity$1($.GameButton$(this, -420, -280, 'Back', new $.PongGame_createComputerPickMenu_anon3(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'computerPick'));
  this.disableEntitiesByGroup$1('computerPick');
},
 createStatsMenu$0: function() {
  this.addEntity$1($.GameText$(this, 0, -160, 'Statistics', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, -94, !($.index($.window().get$localStorage(), 'win1') == null) ? 'Level 1 Wins: ' + $.S($.index($.window().get$localStorage(), 'win1')) : 'Level 1 Wins: 0', 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, -49, !($.index($.window().get$localStorage(), 'win2') == null) ? 'Level 2 Wins: ' + $.S($.index($.window().get$localStorage(), 'win2')) : 'Level 2 Wins: 0', 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, -10, !($.index($.window().get$localStorage(), 'win3') == null) ? 'Level 3 Wins: ' + $.S($.index($.window().get$localStorage(), 'win3')) : 'Level 3 Wins: 0', 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, 29, !($.index($.window().get$localStorage(), 'winEx') == null) ? 'Extreme Wins: ' + $.S($.index($.window().get$localStorage(), 'winEx')) : 'Extreme Wins: 0', 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, 74, 'Total Games: ' + $.S($.index($.window().get$localStorage(), 'total')), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameText$(this, 0, 119, 'Longest Rally: ' + $.S($.index($.window().get$localStorage(), 'max')), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameButton$(this, 0, 164, 'RESET', new $.PongGame_createStatsMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.addEntity$1($.GameButton$(this, -420, -280, 'Back', new $.PongGame_createStatsMenu_anon0(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'stats'));
  this.disableEntitiesByGroup$1('stats');
},
 createPausedMenu$0: function() {
  this.addEntity$1($.GameText$(this, 0, -31, 'PAUSED', 56, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'paused'));
  this.addEntity$1($.GameButton$(this, 0, 15, 'Quit', new $.PongGame_createPausedMenu_anon(this), 36, 'cinnamoncake, Verdana', true, '255, 255, 255', null, 'paused'));
  this.disableEntitiesByGroup$1('paused');
},
 newGameAgainstComputer$2: function(name$, diff) {
  if (!(diff == null))
    this.difficulty = diff;
  var t1 = this.player1;
  if (!(t1 == null))
    t1.removeFromGame$0();
  t1 = this.player2;
  if (!(t1 == null))
    t1.removeFromGame$0();
  t1 = this.rect;
  this.player1 = $.ClientPaddle$(this, $.neg($.sub(t1.get$halfWidth(), 10)), 10, name$);
  this.addEntity$1(this.player1);
  this.player2 = $.ComputerPaddle$(this, $.sub(t1.get$halfWidth(), 10), 10, this.difficulty);
  this.addEntity$1(this.player2);
  this.totalPlayed = this.totalPlayed + 1;
  $.indexSet($.window().get$localStorage(), 'total', $.S(this.totalPlayed));
  this.newGame$0();
  this.set$countdown(3);
},
 newGameAgainstComputer$1: function(name$) {
  return this.newGameAgainstComputer$2(name$,null)
},
 resetStats$0: function() {
  $.indexSet($.window().get$localStorage(), 'win1', '0');
  $.indexSet($.window().get$localStorage(), 'win2', '0');
  $.indexSet($.window().get$localStorage(), 'win3', '0');
  $.indexSet($.window().get$localStorage(), 'winEx', '0');
  $.indexSet($.window().get$localStorage(), 'max', '0');
  $.indexSet($.window().get$localStorage(), 'total', '0');
  this.set$state(1);
  this.removeEntitiesByGroup$1('stats');
  this.createStatsMenu$0();
  this.set$state(6);
},
 reset$0: function() {
  if (this.ball.get$enabled() !== true)
    this.ball.set$enabled(true);
  if (this.ball == null) {
    this.ball = $.Ball$(this, 0, 0);
    this.addEntity$1(this.ball);
  }
  this.ball.set$y(0);
  if (this.player1.get$enabled() !== true)
    this.player1.set$enabled(true);
  this.player1.set$height(120);
  this.player1.set$opacity(0.2);
  if (this.player2.get$enabled() !== true)
    this.player2.set$enabled(true);
  this.player2.set$y(0);
  this.player2.set$height(120);
  this.player2.set$opacity(0.2);
  this.removeEntitiesByFilter$1(new $.PongGame_reset_anon());
  this.removeEntitiesByFilter$1(new $.PongGame_reset_anon0());
  var t1 = this.ball.get$startVel();
  this.ball.get$momentum().set$xVel(t1);
},
 resetPoint$0: function() {
  this.reset$0();
  if ($.gtB($.random(0, 1, false), 0.5)) {
    var t1 = $.random(0, 200, false);
    this.ball.get$momentum().set$yVel(t1);
  } else {
    t1 = $.random(-200, 0, false);
    this.ball.get$momentum().set$yVel(t1);
  }
},
 newGame$0: function() {
  this.reset$0();
  if (!$.eqB(this.get$state(), 1) || !$.eqB(this.get$state(), 5))
    this.set$state(3);
  this.player1.set$score(0);
  this.player2.set$score(0);
},
 get$onPointOver: function() {
  return this._pointOverHandle;
},
 get$onGameOver: function() {
  return this._gameOverHandle;
},
 get$onBallHit: function() {
  return this._ballHitHandle;
}
};

$$.Paddle = {"":
 ["score=", "bullet=", "name?"],
 super: "GameEntity",
 update$0: function() {
  var t1 = this.game.get$state();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(1, t1);
  if (!(t1 === 2)) {
    t1 = this.game.get$state();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(2, t1);
    if (!(t1 === 4)) {
      t1 = this.game.get$state();
      if (typeof t1 !== 'number')
        return this.update$0$bailout(3, t1);
      if (!(t1 === 7)) {
        t1 = this.game.get$countdown();
        if (typeof t1 !== 'number')
          return this.update$0$bailout(4, t1);
        if (!(t1 > 0)) {
          t1 = this.game.get$waiting();
          if (typeof t1 !== 'number')
            return this.update$0$bailout(5, t1);
          t1 = t1 > 0 || this.enabled !== true;
        } else
          t1 = true;
      } else
        t1 = true;
    } else
      t1 = true;
  } else
    t1 = true;
  if (t1)
    return;
  this.move$0();
  $.GameEntity.prototype.update$0.call(this);
},
 update$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.game.get$state();
    case 1:
      state = 0;
    default:
      if (state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && !$.eqB(t1, 2))
        switch (state) {
          case 0:
            t1 = this.game.get$state();
          case 2:
            state = 0;
          default:
            if (state === 5 || state === 4 || state === 3 || state === 0 && !$.eqB(t1, 4))
              switch (state) {
                case 0:
                  t1 = this.game.get$state();
                case 3:
                  state = 0;
                default:
                  if (state === 5 || state === 4 || state === 0 && !$.eqB(t1, 7))
                    switch (state) {
                      case 0:
                        t1 = this.game.get$countdown();
                      case 4:
                        state = 0;
                      case 5:
                        if (state === 5 || state === 0 && !$.gtB(t1, 0))
                          switch (state) {
                            case 0:
                              t1 = this.game.get$waiting();
                            case 5:
                              state = 0;
                              t1 = $.gtB(t1, 0) || this.enabled !== true;
                          }
                        else
                          t1 = true;
                    }
                  else
                    t1 = true;
              }
            else
              t1 = true;
        }
      else
        t1 = true;
      if (t1)
        return;
      this.move$0();
      $.GameEntity.prototype.update$0.call(this);
  }
},
 move$0: function() {
},
 fire$0: function() {
  if ($.leB(this.bullet, 0))
    return;
  var t1 = this.game;
  var t2 = $.gtB(this.get$x(), 0) ? $.sub(this.get$x(), 10) : $.add(this.get$x(), 10);
  var t3 = this.get$y();
  t1.addEntity$1($.Bullet$(t1, t2, t3, $.gtB(this.get$x(), 0) ? -200 : 200));
  this.bullet = $.sub(this.bullet, 1);
},
 Paddle$3: function(game, x, y) {
  this.opacity = 0.2;
},
 is$Paddle: true
};

$$.ClientPaddle = {"":
 ["score", "bullet", "name", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "Paddle",
 move$0: function() {
  if (!(this.game.get$input().get$mouse() == null))
    this.set$y(this.game.get$input().get$mouse().get$y());
  if (!(this.game.get$input().get$click() == null))
    this.fire$0();
  $.Paddle.prototype.move$0.call(this);
},
 ClientPaddle$4: function(game, x, y, Name) {
  this.name = Name;
}
};

$$.ComputerPaddle = {"":
 ["targetPaddleSide", "targetOffset", "amountToMove", "ballComing", "_skillLevel", "lastBulletTime", "score", "bullet", "name", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "Paddle",
 move$0: function() {
  if (this.game.get$ball() == null)
    return;
  if ($.leB($.add(this.lastBulletTime, 0.25), this.game.get$timer().get$gameTime()))
    if ($.geB(this.game.get$player2().get$bullet(), 1))
      if ($.geB($.add(this.get$y(), 60), this.game.get$player1().get$y()) && $.leB($.sub(this.get$y(), 60), this.game.get$player1().get$y())) {
        this.lastBulletTime = this.game.get$timer().get$gameTime();
        this.fire$0();
      }
  if (!($.gtB(this.get$x(), 0) && $.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)))
    var newBallComing = $.ltB(this.get$x(), 0) && $.ltB(this.game.get$ball().get$momentum().get$xVel(), 0);
  else
    newBallComing = true;
  var t1 = this.ballComing;
  if (t1 == null || !(newBallComing === t1)) {
    this.targetPaddleSide = $.random(-1, 1, true);
    this.targetOffset = this.getTargetOffset$0();
    this.amountToMove = this.getAmountToMove$0();
  }
  this.ballComing = newBallComing;
  var targetPosition = this.ballComing === true ? $.add(this.game.get$ball().get$y(), $.mul(this.targetPaddleSide, $.sub($.div(this.get$height(), 2), 5))) : 0;
  if ($.leB($.abs($.sub(this.get$y(), targetPosition)), 1))
    return;
  if ($.gtB(this.get$y(), targetPosition))
    this.set$y($.sub(this.get$y(), this.amountToMove));
  else
    this.set$y($.add(this.get$y(), this.amountToMove));
},
 getAmountToMove$0: function() {
  var n = $.random(0, 100, false);
  switch (this._skillLevel) {
    case 1:
      if ($.geB(n, 60))
        return 3;
      if ($.geB(n, 10))
        return 2;
      else
        return 1;
    case 2:
      if ($.geB(n, 60))
        return 4;
      if ($.geB(n, 10))
        return 3;
      else
        return 2;
    case 3:
      if ($.geB(n, 60))
        return 5;
      if ($.geB(n, 10))
        return 4;
      else
        return 3;
    case 4:
      return 6;
  }
  return 3;
},
 getTargetOffset$0: function() {
  switch (this._skillLevel) {
    case 1:
      return $.random(-20, 20, true);
    case 2:
      return $.random(-10, 10, true);
    case 3:
      return $.random(-5, 5, true);
    case 4:
      return 0;
  }
  return 0;
},
 ComputerPaddle$4: function(game, x, y, skillLevel) {
  this._skillLevel = $.max($.min(skillLevel, 3), 1);
  if ($.eqB(skillLevel, 1))
    this.name = 'Beginner Computer';
  else if ($.eqB(skillLevel, 2))
    this.name = 'Adept Computer';
  else if ($.eqB(skillLevel, 3))
    this.name = 'Expert Computer';
  else if ($.eqB(skillLevel, 4))
    this.name = 'Extreme Computer';
  else
    this.name = 'Computer';
}
};

$$.Ball = {"":
 ["startVel?", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "GameEntity",
 update$0: function() {
  var t1 = this.game.get$state();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(1, t1, 0, 0);
  if (!(t1 === 2)) {
    t1 = this.game.get$state();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(2, t1, 0, 0);
    if (!(t1 === 4)) {
      t1 = this.game.get$state();
      if (typeof t1 !== 'number')
        return this.update$0$bailout(3, t1, 0, 0);
      if (!(t1 === 7)) {
        t1 = this.game.get$countdown();
        if (typeof t1 !== 'number')
          return this.update$0$bailout(4, t1, 0, 0);
        if (!(t1 > 0)) {
          t1 = this.game.get$waiting();
          if (typeof t1 !== 'number')
            return this.update$0$bailout(5, t1, 0, 0);
          t1 = t1 > 0 || this.enabled !== true;
        } else
          t1 = true;
      } else
        t1 = true;
    } else
      t1 = true;
  } else
    t1 = true;
  if (t1)
    return;
  $.GameEntity.prototype.update$0.call(this);
  t1 = this.momentum;
  var t2 = t1.get$xVel();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(6, t1, t2, 0);
  if (t2 > 0) {
    t2 = this.box.get$right();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(7, t1, t2, 0);
    var t4 = this.game.get$player2().get$box().get$left();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(8, t1, t4, t2);
    if (t2 > t4) {
      t2 = this.game.get$player2().get$box().get$top();
      if (typeof t2 !== 'number')
        return this.update$0$bailout(9, t1, t2, 0);
      t4 = this.box.get$bottom();
      if (typeof t4 !== 'number')
        return this.update$0$bailout(10, t1, t2, t4);
      if (t2 < t4) {
        t2 = this.game.get$player2().get$box().get$bottom();
        if (typeof t2 !== 'number')
          return this.update$0$bailout(11, t1, t2, 0);
        t4 = this.box.get$top();
        if (typeof t4 !== 'number')
          return this.update$0$bailout(12, t4, t1, t2);
        t4 = t2 > t4;
        t2 = t4;
      } else
        t2 = false;
    } else
      t2 = false;
  } else
    t2 = false;
  if (t2) {
    t2 = this.game.get$player2().get$box().get$left();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(13, t1, t2, 0);
    t4 = this.get$width();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(14, t1, t2, t4);
    this.set$x(t2 - t4 / 2);
  }
  t2 = t1.get$xVel();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(15, t1, t2, 0);
  if (t2 < 0) {
    t2 = this.box.get$left();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(16, t1, t2, 0);
    t4 = this.game.get$player1().get$box().get$right();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(17, t1, t2, t4);
    if (t2 < t4) {
      t2 = this.game.get$player1().get$box().get$top();
      if (typeof t2 !== 'number')
        return this.update$0$bailout(18, t2, t1, 0);
      t4 = this.box.get$bottom();
      if (typeof t4 !== 'number')
        return this.update$0$bailout(19, t2, t1, t4);
      if (t2 < t4) {
        t2 = this.game.get$player1().get$box().get$bottom();
        if (typeof t2 !== 'number')
          return this.update$0$bailout(20, t1, t2, 0);
        t4 = this.box.get$top();
        if (typeof t4 !== 'number')
          return this.update$0$bailout(21, t1, t2, t4);
        t4 = t2 > t4;
        t2 = t4;
      } else
        t2 = false;
    } else
      t2 = false;
  } else
    t2 = false;
  if (t2) {
    t2 = this.game.get$player1().get$box().get$right();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(22, t2, t1, 0);
    t4 = this.get$width();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(23, t2, t1, t4);
    this.set$x(t2 + t4 / 2);
  }
  t2 = t1.get$yVel();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(24, t1, t2, 0);
  if (t2 > 0) {
    t2 = this.box.get$bottom();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(25, t1, t2, 0);
    t4 = this.game.get$rect().get$halfHeight();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(26, t1, t2, t4);
    t4 = t2 > t4;
    t2 = t4;
  } else
    t2 = false;
  if (t2) {
    t2 = this.game.get$rect().get$halfHeight();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(27, t1, t2, 0);
    t4 = this.get$height();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(28, t1, t2, t4);
    this.set$y(t2 - t4 / 2);
  }
  t2 = t1.get$yVel();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(29, t1, t2, 0);
  if (t2 < 0) {
    t2 = this.box.get$top();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(30, t1, t2, 0);
    t4 = this.game.get$rect().get$halfHeight();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(31, t4, t1, t2);
    t2 = t2 < -t4;
  } else
    t2 = false;
  if (t2) {
    t2 = this.game.get$rect().get$halfHeight();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(32, t1, t2, 0);
    t2 = -t2;
    t4 = this.get$height();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(33, t4, t1, t2);
    this.set$y(t2 + t4 / 2);
  }
  t2 = this.box.get$bottom();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(34, t1, t2, 0);
  t4 = this.game.get$rect().get$halfHeight();
  if (typeof t4 !== 'number')
    return this.update$0$bailout(35, t1, t2, t4);
  if (!(t2 >= t4)) {
    t2 = this.box.get$top();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(36, t1, t2, 0);
    t4 = this.game.get$rect().get$halfHeight();
    if (typeof t4 !== 'number')
      return this.update$0$bailout(37, t4, t1, t2);
    t2 = t2 <= -t4;
  } else
    t2 = true;
  if (t2) {
    t2 = t1.get$yVel();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(38, t1, t2, 0);
    t1.set$yVel(t2 * -1);
    var volume = $.min((90 - $.atan2($.abs(t1.get$xVel()), $.abs(t1.get$yVel())) / 0.017453292519943295) / 50, 1.0);
    this.game.get$sound().play$2('hit3', volume);
  }
  t1 = this.get$x();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(39, t1, 0, 0);
  var t3 = this.game.get$rect().get$halfWidth();
  if (typeof t3 !== 'number')
    return this.update$0$bailout(40, t3, t1, 0);
  if (!(t1 > t3)) {
    t1 = this.get$x();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(41, t1, 0, 0);
    t3 = this.game.get$rect().get$halfWidth();
    if (typeof t3 !== 'number')
      return this.update$0$bailout(42, t1, t3, 0);
    t1 = t1 < -t3;
  } else
    t1 = true;
  if (t1) {
    t1 = this.get$x();
    if (typeof t1 !== 'number')
      return this.update$0$bailout(43, t1, 0, 0);
    if (t1 > 0) {
      this.set$x(400);
      this.startVel = -400;
      t1 = this.game.get$player1();
      t2 = t1.get$score();
      if (typeof t2 !== 'number')
        return this.update$0$bailout(44, t1, t2, 0);
      t1.set$score(t2 + 1);
      this.game.get$sound().play$1('sweep');
    } else {
      this.set$x(-400);
      this.startVel = 400;
      t1 = this.game.get$player2();
      t2 = t1.get$score();
      if (typeof t2 !== 'number')
        return this.update$0$bailout(45, t1, t2, 0);
      t1.set$score(t2 + 1);
      this.game.get$sound().play$1('sweep');
    }
    this.game.resetPoint$0();
  }
  if (this.collidesWith$1(this.game.get$player1()) === true && this.game.get$player1().get$enabled() === true) {
    t1 = this.game;
    t2 = t1.get$rally();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(46, t2, t1, 0);
    t1.set$rally(t2 + 1);
    t1 = this.game;
    t1.ballHit$1(t1.get$player1());
    this.ballHit$1(this.game.get$player1());
    this.game.get$sound().play$1('hit1');
  } else if (this.collidesWith$1(this.game.get$player2()) === true && this.game.get$player2().get$enabled() === true) {
    t1 = this.game;
    t2 = t1.get$rally();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(47, t2, t1, 0);
    t1.set$rally(t2 + 1);
    t1 = this.game;
    t1.ballHit$1(t1.get$player2());
    this.ballHit$1(this.game.get$player2());
    this.game.get$sound().play$1('hit2');
  }
},
 update$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      break;
    case 5:
      t1 = env0;
      break;
    case 6:
      t1 = env0;
      t2 = env1;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      break;
    case 8:
      t1 = env0;
      t4 = env1;
      t2 = env2;
      break;
    case 9:
      t1 = env0;
      t2 = env1;
      break;
    case 10:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 11:
      t1 = env0;
      t2 = env1;
      break;
    case 12:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 13:
      t1 = env0;
      t2 = env1;
      break;
    case 14:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 15:
      t1 = env0;
      t2 = env1;
      break;
    case 16:
      t1 = env0;
      t2 = env1;
      break;
    case 17:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 18:
      t2 = env0;
      t1 = env1;
      break;
    case 19:
      t2 = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 20:
      t1 = env0;
      t2 = env1;
      break;
    case 21:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 22:
      t2 = env0;
      t1 = env1;
      break;
    case 23:
      t2 = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 24:
      t1 = env0;
      t2 = env1;
      break;
    case 25:
      t1 = env0;
      t2 = env1;
      break;
    case 26:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 27:
      t1 = env0;
      t2 = env1;
      break;
    case 28:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 29:
      t1 = env0;
      t2 = env1;
      break;
    case 30:
      t1 = env0;
      t2 = env1;
      break;
    case 31:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 32:
      t1 = env0;
      t2 = env1;
      break;
    case 33:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 34:
      t1 = env0;
      t2 = env1;
      break;
    case 35:
      t1 = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 36:
      t1 = env0;
      t2 = env1;
      break;
    case 37:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 38:
      t1 = env0;
      t2 = env1;
      break;
    case 39:
      t1 = env0;
      break;
    case 40:
      t3 = env0;
      t1 = env1;
      break;
    case 41:
      t1 = env0;
      break;
    case 42:
      t1 = env0;
      t3 = env1;
      break;
    case 43:
      t1 = env0;
      break;
    case 44:
      t1 = env0;
      t2 = env1;
      break;
    case 45:
      t1 = env0;
      t2 = env1;
      break;
    case 46:
      t2 = env0;
      t1 = env1;
      break;
    case 47:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.game.get$state();
    case 1:
      state = 0;
    default:
      if (state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && !$.eqB(t1, 2))
        switch (state) {
          case 0:
            t1 = this.game.get$state();
          case 2:
            state = 0;
          default:
            if (state === 5 || state === 4 || state === 3 || state === 0 && !$.eqB(t1, 4))
              switch (state) {
                case 0:
                  t1 = this.game.get$state();
                case 3:
                  state = 0;
                default:
                  if (state === 5 || state === 4 || state === 0 && !$.eqB(t1, 7))
                    switch (state) {
                      case 0:
                        t1 = this.game.get$countdown();
                      case 4:
                        state = 0;
                      case 5:
                        if (state === 5 || state === 0 && !$.gtB(t1, 0))
                          switch (state) {
                            case 0:
                              t1 = this.game.get$waiting();
                            case 5:
                              state = 0;
                              t1 = $.gtB(t1, 0) || this.enabled !== true;
                          }
                        else
                          t1 = true;
                    }
                  else
                    t1 = true;
              }
            else
              t1 = true;
        }
      else
        t1 = true;
      if (t1)
        return;
      $.GameEntity.prototype.update$0.call(this);
      t1 = this.momentum;
      var t2 = t1.get$xVel();
    case 6:
      state = 0;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      if (state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 0 && $.gtB(t2, 0))
        switch (state) {
          case 0:
            t2 = this.box.get$right();
          case 7:
            state = 0;
            var t4 = this.game.get$player2().get$box().get$left();
          case 8:
            state = 0;
          default:
            if (state === 12 || state === 11 || state === 10 || state === 9 || state === 0 && $.gtB(t2, t4))
              switch (state) {
                case 0:
                  t2 = this.game.get$player2().get$box().get$top();
                case 9:
                  state = 0;
                  t4 = this.box.get$bottom();
                case 10:
                  state = 0;
                default:
                  if (state === 12 || state === 11 || state === 0 && $.ltB(t2, t4))
                    switch (state) {
                      case 0:
                        t2 = this.game.get$player2().get$box().get$bottom();
                      case 11:
                        state = 0;
                        t4 = this.box.get$top();
                      case 12:
                        state = 0;
                        t4 = $.gtB(t2, t4);
                        t2 = t4;
                    }
                  else
                    t2 = false;
              }
            else
              t2 = false;
        }
      else
        t2 = false;
    case 13:
    case 14:
      if (state === 14 || state === 13 || state === 0 && t2)
        switch (state) {
          case 0:
            t2 = this.game.get$player2().get$box().get$left();
          case 13:
            state = 0;
            t4 = this.get$width();
          case 14:
            state = 0;
            this.set$x($.sub(t2, $.div(t4, 2)));
        }
      t2 = t1.get$xVel();
    case 15:
      state = 0;
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      if (state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 0 && $.ltB(t2, 0))
        switch (state) {
          case 0:
            t2 = this.box.get$left();
          case 16:
            state = 0;
            t4 = this.game.get$player1().get$box().get$right();
          case 17:
            state = 0;
          default:
            if (state === 21 || state === 20 || state === 19 || state === 18 || state === 0 && $.ltB(t2, t4))
              switch (state) {
                case 0:
                  t2 = this.game.get$player1().get$box().get$top();
                case 18:
                  state = 0;
                  t4 = this.box.get$bottom();
                case 19:
                  state = 0;
                default:
                  if (state === 21 || state === 20 || state === 0 && $.ltB(t2, t4))
                    switch (state) {
                      case 0:
                        t2 = this.game.get$player1().get$box().get$bottom();
                      case 20:
                        state = 0;
                        t4 = this.box.get$top();
                      case 21:
                        state = 0;
                        t4 = $.gtB(t2, t4);
                        t2 = t4;
                    }
                  else
                    t2 = false;
              }
            else
              t2 = false;
        }
      else
        t2 = false;
    case 22:
    case 23:
      if (state === 23 || state === 22 || state === 0 && t2)
        switch (state) {
          case 0:
            t2 = this.game.get$player1().get$box().get$right();
          case 22:
            state = 0;
            t4 = this.get$width();
          case 23:
            state = 0;
            this.set$x($.add(t2, $.div(t4, 2)));
        }
      t2 = t1.get$yVel();
    case 24:
      state = 0;
    case 25:
    case 26:
      if (state === 26 || state === 25 || state === 0 && $.gtB(t2, 0))
        switch (state) {
          case 0:
            t2 = this.box.get$bottom();
          case 25:
            state = 0;
            t4 = this.game.get$rect().get$halfHeight();
          case 26:
            state = 0;
            t4 = $.gtB(t2, t4);
            t2 = t4;
        }
      else
        t2 = false;
    case 27:
    case 28:
      if (state === 28 || state === 27 || state === 0 && t2)
        switch (state) {
          case 0:
            t2 = this.game.get$rect().get$halfHeight();
          case 27:
            state = 0;
            t4 = this.get$height();
          case 28:
            state = 0;
            this.set$y($.sub(t2, $.div(t4, 2)));
        }
      t2 = t1.get$yVel();
    case 29:
      state = 0;
    case 30:
    case 31:
      if (state === 31 || state === 30 || state === 0 && $.ltB(t2, 0))
        switch (state) {
          case 0:
            t2 = this.box.get$top();
          case 30:
            state = 0;
            t4 = this.game.get$rect().get$halfHeight();
          case 31:
            state = 0;
            t2 = $.ltB(t2, $.neg(t4));
        }
      else
        t2 = false;
    case 32:
    case 33:
      if (state === 33 || state === 32 || state === 0 && t2)
        switch (state) {
          case 0:
            t2 = this.game.get$rect().get$halfHeight();
          case 32:
            state = 0;
            t2 = $.neg(t2);
            t4 = this.get$height();
          case 33:
            state = 0;
            this.set$y($.add(t2, $.div(t4, 2)));
        }
      t2 = this.box.get$bottom();
    case 34:
      state = 0;
      t4 = this.game.get$rect().get$halfHeight();
    case 35:
      state = 0;
    case 36:
    case 37:
      if (state === 37 || state === 36 || state === 0 && !$.geB(t2, t4))
        switch (state) {
          case 0:
            t2 = this.box.get$top();
          case 36:
            state = 0;
            t4 = this.game.get$rect().get$halfHeight();
          case 37:
            state = 0;
            t2 = $.leB(t2, $.neg(t4));
        }
      else
        t2 = true;
    case 38:
      if (state === 38 || state === 0 && t2)
        switch (state) {
          case 0:
            t2 = t1.get$yVel();
          case 38:
            state = 0;
            t1.set$yVel($.mul(t2, -1));
            var volume = $.min((90 - $.atan2($.abs(t1.get$xVel()), $.abs(t1.get$yVel())) / 0.017453292519943295) / 50, 1.0);
            this.game.get$sound().play$2('hit3', volume);
        }
      t1 = this.get$x();
    case 39:
      state = 0;
      var t3 = this.game.get$rect().get$halfWidth();
    case 40:
      state = 0;
    case 41:
    case 42:
      if (state === 42 || state === 41 || state === 0 && !$.gtB(t1, t3))
        switch (state) {
          case 0:
            t1 = this.get$x();
          case 41:
            state = 0;
            t3 = this.game.get$rect().get$halfWidth();
          case 42:
            state = 0;
            t1 = $.ltB(t1, $.neg(t3));
        }
      else
        t1 = true;
    case 43:
    case 44:
    case 45:
      if (state === 45 || state === 44 || state === 43 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this.get$x();
          case 43:
            state = 0;
          default:
            if (state === 44 || state === 0 && $.gtB(t1, 0))
              switch (state) {
                case 0:
                  this.set$x(400);
                  this.startVel = -400;
                  t1 = this.game.get$player1();
                  t2 = t1.get$score();
                case 44:
                  state = 0;
                  t1.set$score($.add(t2, 1));
                  this.game.get$sound().play$1('sweep');
              }
            else
              switch (state) {
                case 0:
                  this.set$x(-400);
                  this.startVel = 400;
                  t1 = this.game.get$player2();
                  t2 = t1.get$score();
                case 45:
                  state = 0;
                  t1.set$score($.add(t2, 1));
                  this.game.get$sound().play$1('sweep');
              }
            this.game.resetPoint$0();
        }
    case 46:
    case 47:
      if (state === 46 || state === 0 && this.collidesWith$1(this.game.get$player1()) === true && this.game.get$player1().get$enabled() === true)
        switch (state) {
          case 0:
            t1 = this.game;
            t2 = t1.get$rally();
          case 46:
            state = 0;
            t1.set$rally($.add(t2, 1));
            t1 = this.game;
            t1.ballHit$1(t1.get$player1());
            this.ballHit$1(this.game.get$player1());
            this.game.get$sound().play$1('hit1');
        }
      else
        switch (state) {
          case 0:
          case 47:
            if (state === 47 || state === 0 && this.collidesWith$1(this.game.get$player2()) === true && this.game.get$player2().get$enabled() === true)
              switch (state) {
                case 0:
                  t1 = this.game;
                  t2 = t1.get$rally();
                case 47:
                  state = 0;
                  t1.set$rally($.add(t2, 1));
                  t1 = this.game;
                  t1.ballHit$1(t1.get$player2());
                  this.ballHit$1(this.game.get$player2());
                  this.game.get$sound().play$1('hit2');
              }
        }
  }
},
 ballHit$1: function(paddle) {
  var t1 = $.mul($.neg($.sub(paddle.get$y(), this.get$y())), 5);
  var t2 = this.momentum;
  t2.set$yVel(t1);
  t2.set$xVel($.mul(t2.get$xVel(), -1));
  if ($.gtB(t2.get$xVel(), 600))
    t2.set$xAccel(5);
},
 Ball$3: function(game, x, y) {
  var t1 = this.momentum;
  t1.set$xMax(1400);
  t1.set$xAccel(15);
},
 is$Ball: true
};

$$.PowerUp = {"":
 ["type=", "creationTime", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "GameEntity",
 update$0: function() {
  if ($.leB($.add(this.creationTime, 10), this.game.get$timer().get$gameTime()))
    this.removeFromGame$0();
  if (this.collidesWith$1(this.game.get$ball()) === true) {
    switch (this.type) {
      case 'reflector':
        this.reflectorUpdate$0();
        break;
      case 'extendor':
        this.extendUpdate$0();
        break;
      case 'shrink':
        this.shrinkUpdate$0();
        break;
      case 'bullet':
        if ($.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          var t1 = this.game.get$player1();
          t1.set$bullet($.add(t1.get$bullet(), 2));
        } else if ($.ltB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          t1 = this.game.get$player2();
          t1.set$bullet($.add(t1.get$bullet(), 2));
        }
        break;
      case 'speedUp':
        if ($.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          t1 = this.game.get$ball().get$momentum();
          t1.set$xVel($.add(t1.get$xVel(), 200));
        } else if ($.ltB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          t1 = this.game.get$ball().get$momentum();
          t1.set$xVel($.sub(t1.get$xVel(), 200));
        }
        break;
      case 'slowDown':
        if ($.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          t1 = this.game.get$ball().get$momentum();
          t1.set$xVel($.sub(t1.get$xVel(), 200));
        } else if ($.ltB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
          t1 = this.game.get$ball().get$momentum();
          t1.set$xVel($.add(t1.get$xVel(), 200));
        }
        break;
    }
    this.game.get$sound().play$2('sweep', 0.1);
    this.removeFromGame$0();
  }
  $.GameEntity.prototype.update$0.call(this);
},
 reflectorUpdate$0: function() {
  if ($.gtB($.random(0, 1, false), 0.5)) {
    var t1 = $.random(200, 600, false);
    this.game.get$ball().get$momentum().set$yVel(t1);
  } else {
    t1 = $.random(-200, -600, false);
    this.game.get$ball().get$momentum().set$yVel(t1);
  }
},
 extendUpdate$0: function() {
  if ($.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
    var t1 = this.game.get$player1();
    t1.set$height($.add(t1.get$height(), 50));
  } else if ($.ltB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
    t1 = this.game.get$player2();
    t1.set$height($.add(t1.get$height(), 50));
  }
},
 shrinkUpdate$0: function() {
  if ($.gtB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
    var t1 = this.game.get$player1();
    t1.set$height($.sub(t1.get$height(), 50));
  } else if ($.ltB(this.game.get$ball().get$momentum().get$xVel(), 0)) {
    t1 = this.game.get$player2();
    t1.set$height($.sub(t1.get$height(), 50));
  }
},
 PowerUp$3: function(game, x, y) {
  var rType = $.random(1, 6, true);
  this.creationTime = game.get$timer().get$gameTime();
  if ($.eqB(rType, 1)) {
    this.color = '255, 255, 255';
    this.type = 'reflector';
  } else if ($.eqB(rType, 2)) {
    this.color = '255, 255, 0';
    this.type = 'extendor';
  } else if ($.eqB(rType, 3)) {
    this.color = '255, 0, 255';
    this.type = 'shrink';
  } else if ($.eqB(rType, 4)) {
    this.color = '0, 255, 255';
    this.type = 'bullet';
  } else if ($.eqB(rType, 5)) {
    this.color = '0, 255, 0';
    this.type = 'speedUp';
  } else if ($.eqB(rType, 6)) {
    this.color = '255, 155, 155';
    this.type = 'slowDown';
  } else {
    this.color = '0, 255, 0';
    this.type = 'slowDown';
  }
},
 is$PowerUp: true
};

$$.Bullet = {"":
 ["game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "GameEntity",
 update$0: function() {
  if (this.collidesWith$1(this.game.get$player1()) === true) {
    var t1 = this.game.get$player1();
    var t2 = t1.get$y();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(1, t1, t2);
    t1.set$y(t2 + 1000);
    this.game.get$player1().set$enabled(false);
    this.removeFromGame$0();
  } else if (this.collidesWith$1(this.game.get$player2()) === true) {
    t1 = this.game.get$player2();
    t2 = t1.get$y();
    if (typeof t2 !== 'number')
      return this.update$0$bailout(2, t1, t2);
    t1.set$y(t2 + 1000);
    this.game.get$player2().set$enabled(false);
    this.removeFromGame$0();
  }
  $.GameEntity.prototype.update$0.call(this);
},
 update$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state === 1 || state === 0 && this.collidesWith$1(this.game.get$player1()) === true)
        switch (state) {
          case 0:
            var t1 = this.game.get$player1();
            var t2 = t1.get$y();
          case 1:
            state = 0;
            t1.set$y($.add(t2, 1000));
            this.game.get$player1().set$enabled(false);
            this.removeFromGame$0();
        }
      else
        switch (state) {
          case 0:
          case 2:
            if (state === 2 || state === 0 && this.collidesWith$1(this.game.get$player2()) === true)
              switch (state) {
                case 0:
                  t1 = this.game.get$player2();
                  t2 = t1.get$y();
                case 2:
                  state = 0;
                  t1.set$y($.add(t2, 1000));
                  this.game.get$player2().set$enabled(false);
                  this.removeFromGame$0();
              }
        }
      $.GameEntity.prototype.update$0.call(this);
  }
},
 Bullet$4: function(game, x, y, xVel) {
  this.momentum.set$xVel(xVel);
  this.color = '255, 0, 0';
},
 is$Bullet: true
};

$$.Game = {"":
 ["entities?", "timer?", "clockTick=", "rect?", "debugMode?", "sound?", "input?", "renderer?", "bgStyle=", "showOutlines?"],
 super: "Object",
 start$0: function() {
  $.print('starting game');
  this.input.start$0();
  this.loop.start$1(new $.Game_start_anon(this));
},
 addEntity$1: function(entity) {
  $.add$1(this.entities, entity);
},
 enableEntitiesByGroup$1: function(groupId) {
  $.forEach($.filter(this.entities, new $.Game_enableEntitiesByGroup_anon(groupId)), new $.Game_enableEntitiesByGroup_anon0());
},
 disableEntitiesByGroup$1: function(groupId) {
  $.forEach($.filter(this.entities, new $.Game_disableEntitiesByGroup_anon(groupId)), new $.Game_disableEntitiesByGroup_anon0());
},
 removeEntitiesByGroup$1: function(groupId) {
  $.forEach($.filter(this.entities, new $.Game_removeEntitiesByGroup_anon(groupId)), new $.Game_removeEntitiesByGroup_anon0());
},
 removeEntitiesByFilter$1: function(f) {
  $.forEach($.filter(this.entities, new $.Game_removeEntitiesByFilter_anon(f)), new $.Game_removeEntitiesByFilter_anon0());
},
 update$0: function() {
  var t1 = this.entities;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.update$0$bailout(1, t1);
  for (var t2 = $.iterator($.filter(t1, new $.Game_update_anon())); t2.hasNext$0() === true;)
    t2.next$0().update$0();
  for (var i = t1.length - 1; i >= 0; --i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    if (t1[i].get$_removeFromGame() === true)
      $.removeRange(t1, i, 1);
  }
},
 update$0$bailout: function(state, t1) {
  $.get$length(t1);
  for (var t2 = $.iterator($.filter(t1, new $.Game_update_anon())); t2.hasNext$0() === true;)
    t2.next$0().update$0();
  for (var i = $.sub($.get$length(t1), 1); $.geB(i, 0); i = $.sub(i, 1))
    if ($.index(t1, i).get$_removeFromGame() === true)
      $.removeRange(t1, i, 1);
},
 Game$withServices$4: function(sound, input, renderer, loop) {
  this.timer = $.GameTimer$();
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'GameEntity'});
  this.entities = t1;
  t1 = this.renderer;
  this.rect = t1.get$rect();
  this.input.set$game(this);
  t1.set$game(this);
}
};

$$.GameTimer = {"":
 ["gameTime?", "wallLastTimestamp", "fps?", "fpsSampleRate"],
 super: "Object",
 tick$0: function() {
  var wallCurrent = $.DateImplementation$now().millisecondsSinceEpoch;
  var wallDelta = $.div($.sub(wallCurrent, this.wallLastTimestamp), 1000);
  this.wallLastTimestamp = wallCurrent;
  if (typeof wallDelta !== 'number')
    throw $.iae(wallDelta);
  var currentFps = 1 / wallDelta;
  var t1 = this.fps;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var t2 = currentFps - t1;
  var t3 = this.fpsSampleRate;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  this.fps = t1 + t2 / t3;
  var gameDelta = $.min(wallDelta, 0.05);
  this.gameTime = this.gameTime + gameDelta;
  return gameDelta;
}
};

$$.GameEntity = {"":
 ["game=", "id=", "groupId?", "box?", "_removeFromGame?", "radius?", "momentum?", "enabled=", "opacity=", "color?", "fill?"],
 super: "Object",
 update$0: function() {
  var t1 = this.previousBox;
  var t2 = t1 == null;
  var t3 = this.box;
  if (t2)
    this.previousBox = $.Rectangle$clone(t3);
  else
    t1.updateFrom$1(t3);
  if (this.enabled !== true)
    return;
  t1 = this.momentum;
  t1.update$1(this.game.get$clockTick());
  t2 = this.get$x();
  if (typeof t2 !== 'number')
    return this.update$0$bailout(1, t1, t2, 0, 0);
  var t4 = t1.get$xVel();
  if (typeof t4 !== 'number')
    return this.update$0$bailout(2, t4, t1, t2, 0);
  var t6 = this.game.get$clockTick();
  if (typeof t6 !== 'number')
    return this.update$0$bailout(3, t4, t6, t1, t2);
  this.set$x(t2 + t4 * t6);
  var t8 = this.get$y();
  if (typeof t8 !== 'number')
    return this.update$0$bailout(4, t8, t1, 0, 0);
  t1 = t1.get$yVel();
  if (typeof t1 !== 'number')
    return this.update$0$bailout(5, t8, t1, 0, 0);
  var t11 = this.game.get$clockTick();
  if (typeof t11 !== 'number')
    return this.update$0$bailout(6, t8, t1, t11, 0);
  this.set$y(t8 + t1 * t11);
  this.updateBox$0();
},
 update$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 3:
      t4 = env0;
      t6 = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 4:
      t8 = env0;
      t1 = env1;
      break;
    case 5:
      t8 = env0;
      t1 = env1;
      break;
    case 6:
      t8 = env0;
      t1 = env1;
      t11 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.previousBox;
      var t2 = t1 == null;
      var t3 = this.box;
      if (t2)
        this.previousBox = $.Rectangle$clone(t3);
      else
        t1.updateFrom$1(t3);
      if (this.enabled !== true)
        return;
      t1 = this.momentum;
      t1.update$1(this.game.get$clockTick());
      t2 = this.get$x();
    case 1:
      state = 0;
      var t4 = t1.get$xVel();
    case 2:
      state = 0;
      var t6 = this.game.get$clockTick();
    case 3:
      state = 0;
      this.set$x($.add(t2, $.mul(t4, t6)));
      var t8 = this.get$y();
    case 4:
      state = 0;
      t1 = t1.get$yVel();
    case 5:
      state = 0;
      var t11 = this.game.get$clockTick();
    case 6:
      state = 0;
      this.set$y($.add(t8, $.mul(t1, t11)));
      this.updateBox$0();
  }
},
 get$x: function() {
  return this._x;
},
 set$x: function(value) {
  this._x = value;
  this.updateBox$0();
},
 get$y: function() {
  return this._y;
},
 set$y: function(value) {
  this._y = value;
  this.updateBox$0();
},
 get$width: function() {
  return this._width;
},
 set$width: function(value) {
  this._width = value;
  this.updateBox$0();
},
 get$height: function() {
  return this._height;
},
 set$height: function(value) {
  this._height = value;
  this.updateBox$0();
},
 updateBox$0: function() {
  if (this.box == null)
    this.box = $.Rectangle$(0, 0, 0, 0);
  var t1 = $.sub(this.get$x(), $.div(this.get$width(), 2));
  this.box.set$left(t1);
  t1 = $.sub(this.get$y(), $.div(this.get$height(), 2));
  this.box.set$top(t1);
  t1 = $.add(this.box.get$left(), this.get$width());
  this.box.set$right(t1);
  t1 = $.add(this.box.get$top(), this.get$height());
  this.box.set$bottom(t1);
},
 removeFromGame$0: function() {
  this._removeFromGame = true;
},
 collidesWith$1: function(entity) {
  if (entity.get$enabled() !== true)
    return false;
  return entity.get$box().intersectsWith$1(this.box);
},
 GameEntity$withPosition$7: function(game, x, y, width, height, id, groupId) {
  this.momentum = $.Momentum$(0, 0, null, null, null, null);
  this.set$x(x);
  this.set$y(y);
  this.set$width(width);
  this.set$height(height);
}
};

$$.Vector = {"":
 ["x=", "y="],
 super: "Object",
 updateFrom$1: function(vect) {
  this.x = vect.get$x();
  this.y = vect.get$y();
}
};

$$.Rectangle = {"":
 ["top=", "left=", "right=", "bottom="],
 super: "Object",
 updateFrom$1: function(rect) {
  this.top = rect.get$top();
  this.left = rect.get$left();
  this.right = rect.get$right();
  this.bottom = rect.get$bottom();
},
 intersectsWith$1: function(other) {
  return $.Rectangle_intersect(this, other);
},
 contains$1: function(point) {
  if (point == null)
    return false;
  return $.geB(point.get$x(), this.left) && $.leB(point.get$x(), this.right) && $.geB(point.get$y(), this.top) && $.leB(point.get$y(), this.bottom);
},
 get$width: function() {
  return $.sub(this.right, this.left);
},
 get$height: function() {
  return $.sub(this.bottom, this.top);
},
 get$x: function() {
  return this.left;
},
 get$y: function() {
  return this.top;
},
 get$halfWidth: function() {
  return $.div(this.get$width(), 2);
},
 get$halfHeight: function() {
  return $.div(this.get$height(), 2);
}
};

$$.Momentum = {"":
 ["xVel=", "yVel=", "xAccel!", "yAccel", "xMax!", "yMax"],
 super: "Object",
 update$1: function(clockTick) {
  var t1 = this.xAccel;
  if (!(t1 == null) && !$.eqB(t1, 0) && $.ltB($.abs(this.xVel), this.xMax)) {
    t1 = $.gtB(this.xVel, 0);
    var t2 = this.xVel;
    var t3 = this.xAccel;
    if (t1)
      this.xVel = $.add(t2, $.mul(t3, clockTick));
    else
      this.xVel = $.sub(t2, $.mul(t3, clockTick));
  }
  t1 = this.yAccel;
  if (!(t1 == null) && !$.eqB(t1, 0) && $.ltB($.abs(this.yVel), this.yMax)) {
    t2 = $.gtB(this.yVel, 0);
    t3 = this.yVel;
    if (t2)
      this.yVel = $.add(t3, $.mul(t1, clockTick));
    else
      this.yVel = $.sub(t3, $.mul(t1, clockTick));
  }
  t1 = this.xVel;
  if (!(t1 == null) && !(this.xMax == null) && $.gtB($.abs(t1), this.xMax)) {
    t1 = $.gtB(this.xVel, 0);
    t2 = this.xMax;
    this.xVel = t1 ? t2 : $.neg(t2);
  }
  t1 = this.yVel;
  if (!(t1 == null)) {
    t2 = this.yMax;
    t1 = !(t2 == null) && $.gtB($.abs(t1), t2);
  } else
    t1 = false;
  if (t1) {
    t1 = $.gtB(this.yVel, 0);
    t2 = this.yMax;
    this.yVel = t1 ? t2 : $.neg(t2);
  }
}
};

$$.GameSound = {"":
 ["enabled="],
 super: "Object",
 get$rootDirectory: function() {
  return this._rootDirectory;
},
 play$2: function(sound, volume) {
},
 play$1: function(sound) {
  return this.play$2(sound,1.0)
}
};

$$.GameInput = {"":
 ["click=", "mouse=", "keyCode=", "mouseDown=", "game="],
 super: "Object",
 start$0: function() {
},
 reset$0: function() {
  this.click = null;
  this.keyCode = -1;
}
};

$$.GameRenderer = {"":
 ["rect?"],
 super: "Object",
 get$game: function() {
  return this._game;
},
 set$game: function(value) {
  this._game = value;
  this.init$0();
},
 init$0: function() {
},
 render$0: function() {
}
};

$$.GameLoop = {"":
 [],
 super: "Object",
 start$1: function(callback) {
  $._TimerFactory_Timer$repeating(50, new $.GameLoop_start_anon(callback));
}
};

$$.GameText = {"":
 ["text=", "centered", "font=", "size?", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "GameEntity",
 updateBox$0: function() {
  if (this.box == null)
    this.box = $.Rectangle$(0, 0, 0, 0);
  this._height = this.size;
  if (this.centered === true)
    $.GameEntity.prototype.updateBox$0.call(this);
  else {
    var t1 = this.get$x();
    this.box.set$left(t1);
    t1 = this.get$y();
    this.box.set$top(t1);
    t1 = $.add(this.box.get$left(), this.get$width());
    this.box.set$right(t1);
    t1 = $.add(this.box.get$top(), this.get$height());
    this.box.set$bottom(t1);
  }
},
 GameText$10: function(game, x, y, text, size, font, centered, color, id, groupId) {
  this.opacity = 0.4;
},
 is$GameText: true
};

$$.GameButton = {"":
 ["_callback?", "text", "centered", "font", "size", "game", "_x", "_y", "_width", "_height", "id", "groupId", "box", "previousBox", "_removeFromGame", "radius", "momentum", "enabled", "opacity", "color", "fill", "sprite"],
 super: "GameText",
 _callback$0: function() { return this._callback.call$0(); },
 _callback$0: function() { return this._callback.call$0(); },
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 update$0: function() {
  $.GameEntity.prototype.update$0.call(this);
  if (this.enabled !== true)
    return;
  if (!(this.game.get$input().get$click() == null)) {
    $.print('x: ' + $.S(this.game.get$input().get$click().get$x()) + ' y: ' + $.S(this.game.get$input().get$click().get$y()));
    $.print($.contains$1(this.box, this.game.get$input().get$click()));
  }
  if (!(this.game.get$input().get$mouse() == null) && $.contains$1(this.box, this.game.get$input().get$mouse()) === true)
    this.opacity = 1.0;
  else
    this.opacity = 0.5;
  if (!(this.game.get$input().get$click() == null) && $.contains$1(this.box, this.game.get$input().get$click()) === true) {
    this.opacity = 1.0;
    $._TimerFactory_Timer(250, new $.GameButton_update_anon(this));
    this._callback$0();
  }
},
 GameButton$11: function(game, x, y, text, _callback, size, font, centered, color, id, groupId) {
  this.opacity = 0.5;
}
};

$$.DisposableImpl = {"":
 [],
 super: "Object"
};

$$.EventArgs = {"":
 [],
 super: "Object"
};

$$.EventHandle = {"":
 ["_handlers", "_disposed"],
 super: "DisposableImpl",
 fireEvent$1: function(args) {
  var t1 = this._handlers;
  if (!(t1 == null))
    $.forEach(t1, new $.EventHandle_fireEvent_anon(args));
},
 add$1: function(handler) {
  var id = $.GlobalId_GlobalId();
  if (this._handlers == null)
    this._handlers = $.HashMapImplementation$();
  $.indexSet(this._handlers, id, handler);
  return id;
},
 remove$1: function(id) {
  var t1 = this._handlers;
  if (!(t1 == null))
    return !(t1.remove$1(id) == null);
  else
    return false;
}
};

$$.GlobalId = {"":
 ["id?", "_hashCode"],
 super: "Object",
 hashCode$0: function() {
  return this._hashCode;
},
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(other.get$id(), this.id);
}
};

$$.PongGameRenderer = {"":
 ["y=", "n", "powerUpRenderer", "targetId", "ctx", "defaultRenderer", "assetManager", "textRenderer", "_game", "rect"],
 super: "CanvasGameRenderer",
 init$0: function() {
  $.add$1(this.get$game().get$onGameOver(), new $.PongGameRenderer_init_anon(this));
  $.add$1(this.get$game().get$onBallHit(), new $.PongGameRenderer_init_anon0(this));
  $.add$1(this.get$game().get$onPointOver(), new $.PongGameRenderer_init_anon1(this));
},
 getRenderer$1: function(e) {
  var t1 = this.get$game().get$countdown();
  if (typeof t1 !== 'number')
    return this.getRenderer$1$bailout(1, e, t1);
  if (!(t1 > 0)) {
    t1 = this.get$game().get$waiting();
    if (typeof t1 !== 'number')
      return this.getRenderer$1$bailout(2, e, t1);
    if (t1 > 0)
      t1 = typeof e === 'object' && e !== null && !!e.is$Ball || typeof e === 'object' && e !== null && !!e.is$Paddle || typeof e === 'object' && e !== null && !!e.is$PowerUp;
    else
      t1 = false;
  } else
    t1 = true;
  if (t1)
    return;
  if (typeof e === 'object' && e !== null && !!e.is$PowerUp)
    return this.powerUpRenderer;
  return $.CanvasGameRenderer.prototype.getRenderer$1.call(this, e);
},
 getRenderer$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var e = env0;
      t1 = env1;
      break;
    case 2:
      e = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.get$game().get$countdown();
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !$.gtB(t1, 0))
        switch (state) {
          case 0:
            t1 = this.get$game().get$waiting();
          case 2:
            state = 0;
            if ($.gtB(t1, 0))
              t1 = typeof e === 'object' && e !== null && !!e.is$Ball || typeof e === 'object' && e !== null && !!e.is$Paddle || typeof e === 'object' && e !== null && !!e.is$PowerUp;
            else
              t1 = false;
        }
      else
        t1 = true;
      if (t1)
        return;
      if (typeof e === 'object' && e !== null && !!e.is$PowerUp)
        return this.powerUpRenderer;
      return $.CanvasGameRenderer.prototype.getRenderer$1.call(this, e);
  }
},
 drawBeforeCtxRestore$0: function() {
  this.drawMiddleLine$0();
  if (!(this.get$game().get$player1() == null) && !(this.get$game().get$player2() == null))
    this.drawScore$0();
  this.drawCountDown$0();
  this.drawWaitDots$0();
  $.CanvasGameRenderer.prototype.drawBeforeCtxRestore$0.call(this);
},
 drawCountDown$0: function() {
  if ($.eqB(this.get$game().get$countdown(), 0))
    return;
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 1)');
  t1.set$font('54px cinnamoncake, Verdana');
  t1.fillText$3($.S(this.get$game().get$countdown()), -7, 0);
},
 drawWaitDots$0: function() {
  if (this.get$game().get$connected() === true)
    return;
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 1)');
  t1.set$font('32px cinnamoncake, Verdana');
  if ($.eqB(this.get$game().get$waiting(), 1))
    t1.fillText$3('Waiting For Connection', -140, 0);
  else if ($.eqB(this.get$game().get$waiting(), 2))
    t1.fillText$3('Waiting For Connection .', -140, 0);
  else if ($.eqB(this.get$game().get$waiting(), 3))
    t1.fillText$3('Waiting For Connection . .', -140, 0);
  else if ($.eqB(this.get$game().get$waiting(), 4))
    t1.fillText$3('Waiting For Connection . . .', -140, 0);
},
 drawDebugInfo$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 0.2)');
  t1.set$font('16px Verdana');
  t1.fillText$3('V: ' + $.S($.toStringAsFixed(this.get$game().get$ball().get$momentum().get$xVel(), 0)), $.neg($.sub(this.get$game().get$rect().get$halfWidth(), 20)), $.neg($.sub(this.get$game().get$rect().get$halfHeight(), 30)));
  $.CanvasGameRenderer.prototype.drawDebugInfo$0.call(this);
},
 drawScore$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 1)');
  t1.set$font('26px cinnamoncake, Verdana');
  t1.fillText$3($.S(this.get$game().get$player1().get$score()) + '              ' + $.S(this.get$game().get$player2().get$score()), -60, $.neg($.sub(this.get$game().get$rect().get$halfHeight(), 30)));
},
 drawMiddleLine$0: function() {
  var t1 = this.ctx;
  t1.set$strokeStyle('rgba(255, 255, 255, 0.1)');
  t1.set$lineWidth(3);
  t1.beginPath$0();
  $.RenderUtils_drawDashedLine(t1, 0, $.neg(this.get$game().get$rect().get$halfHeight()), 0, this.get$game().get$rect().get$halfHeight(), null);
  t1.stroke$0();
},
 doPaddleHitEffect$1: function(paddle) {
  this.subtleBgFade$0();
  paddle.set$opacity(0.5);
  $.window().setTimeout$2(new $.PongGameRenderer_doPaddleHitEffect_anon(paddle), 50);
  $.window().setTimeout$2(new $.PongGameRenderer_doPaddleHitEffect_anon0(paddle), 100);
  $.window().setTimeout$2(new $.PongGameRenderer_doPaddleHitEffect_anon1(paddle), 150);
},
 subtleBgFade$0: function() {
  this.get$game().set$bgStyle('rgba(0, 0, 0, 0.84)');
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon(this), 25);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon0(this), 50);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon1(this), 75);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon2(this), 100);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon3(this), 125);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon4(this), 150);
  $.window().setTimeout$2(new $.PongGameRenderer_subtleBgFade_anon5(this), 175);
},
 bgFade$0: function() {
  this.get$game().set$bgStyle('rgba(0, 0, 0, 0.8)');
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon(this), 25);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon0(this), 50);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon1(this), 75);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon2(this), 100);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon3(this), 125);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon4(this), 150);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon5(this), 175);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon6(this), 200);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon7(this), 225);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon8(this), 250);
  $.window().setTimeout$2(new $.PongGameRenderer_bgFade_anon9(this), 275);
},
 PongGameRenderer$1: function(targetId) {
  this.powerUpRenderer = $.PowerUpRenderer$(this);
}
};

$$.PowerUpRenderer = {"":
 ["gr"],
 super: "DefaultCanvasEntityRenderer",
 render$1: function(e) {
  $.DefaultCanvasEntityRenderer.prototype.render$1.call(this, e);
  var t1 = this.gr;
  t1.get$ctx().set$fillStyle('rgba(0, 0, 0, .5)');
  t1.get$ctx().set$font('24px Verdana');
  switch (e.get$type()) {
    case 'reflector':
      t1.get$ctx().fillText$3('R', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
    case 'extendor':
      t1.get$ctx().fillText$3('E', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
    case 'shrink':
      t1.get$ctx().fillText$3('S', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
    case 'bullet':
      t1.get$ctx().fillText$3('B', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
    case 'speedUp':
      t1.get$ctx().fillText$3('U', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
    case 'slowDown':
      t1.get$ctx().fillText$3('D', $.sub(e.get$x(), 8), $.add(e.get$y(), 8));
      break;
  }
}
};

$$.PongGameClient = {"":
 ["_ws", "_serverUrl", "_messageQueue", "lastPowerUp", "difficulty", "_state", "_countdown", "_waiting", "win1", "win2", "win3", "winEx", "totalPlayed", "rally", "maxRally", "connected", "_countdownTimer", "_waitingTimer", "player1", "player2", "ball", "_pointOverHandle", "_gameOverHandle", "_ballHitHandle", "entities", "timer", "clockTick", "rect", "debugMode", "sound", "input", "renderer", "loop", "bgStyle", "showOutlines"],
 super: "PongGame",
 start$0: function() {
  this.connect$0();
  $.PongGame.prototype.start$0.call(this);
},
 update$0: function() {
  for (var t1 = this._messageQueue; $.gtB($.get$length(t1), 0);)
    for (var t2 = $.iterator($.JSON_parse(t1.removeFirst$0())); t2.hasNext$0() === true;) {
      var t3 = t2.next$0();
      switch ($.index(t3, 'n')) {
        case 10:
          var t4 = $.index($.index(t3, 'd'), 'b');
          this.player1.set$bullet(t4);
          t4 = $.index($.index(t3, 'd'), 'h');
          this.player1.set$height(t4);
          t4 = $.index($.index(t3, 'd'), 's');
          this.player1.set$score(t4);
          t4 = $.index($.index(t3, 'd'), 'x');
          this.player1.set$x(t4);
          break;
        case 20:
          t4 = $.index($.index(t3, 'd'), 'b');
          this.player2.set$bullet(t4);
          t4 = $.index($.index(t3, 'd'), 'h');
          this.player2.set$height(t4);
          t4 = $.index($.index(t3, 'd'), 's');
          this.player2.set$score(t4);
          t4 = $.index($.index(t3, 'd'), 'x');
          this.player2.set$x(t4);
          break;
      }
    }
  $.PongGame.prototype.update$0.call(this);
  if (this.get$isConnected() === true)
    this.sendMessage$1($.JSON_stringify([$.makeLiteralMap(['n', 20, 'd', $.makeLiteralMap(['y', this.player1.get$y()])])]));
},
 handleMessage$1: function(e) {
  $.add$1(this._messageQueue, e.get$data());
},
 sendMessage$1: function(message) {
  if ($.isEmpty(message) === true)
    return;
  if (this.get$isConnected() !== true)
    throw $.captureStackTrace($.ExceptionImplementation$('You must be connected to the server before sending a message.'));
  this._ws.send$1(message);
},
 get$isConnecting: function() {
  var t1 = this._ws;
  return !(t1 == null) && $.eqB(t1.get$readyState(), 0);
},
 get$isConnected: function() {
  var t1 = this._ws;
  return !(t1 == null) && $.eqB(t1.get$readyState(), 1);
},
 connect$0: function() {
  this._print$1('Connecting to server.');
  if (this.get$isConnecting() === true || this.get$isConnected() === true) {
    this._print$1('Already connected.');
    return true;
  }
  try {
    this._ws = $._WebSocketFactoryProvider_WebSocket(this._serverUrl);
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    if (t1 == null || typeof t1 === 'object' && t1 !== null && !!t1.is$Exception) {
      var e = t1;
      this._print$1('Failed to connect to server ' + $.S(e) + '.ToString()');
      return false;
    } else
      throw exception;
  }

  $.add$1(this._ws.get$on().get$open(), new $.PongGameClient_connect_anon(this));
  $.add$1(this._ws.get$on().get$close(), new $.PongGameClient_connect_anon0(this));
  $.add$1(this._ws.get$on().get$message(), new $.PongGameClient_connect_anon1(this));
  $.add$1(this._ws.get$on().get$error(), new $.PongGameClient_connect_anon2(this));
  return true;
},
 _print$1: function(message) {
  $.print('[Client] ' + message);
},
 PongGameClient$1: function(serverUrl) {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._messageQueue = t1;
  this._serverUrl = serverUrl;
}
};

$$.CanvasGameRenderer = {"":
 ["ctx?"],
 super: "GameRenderer",
 getRenderer$1: function(e) {
  if (typeof e === 'object' && e !== null && !!e.is$GameText)
    return this.textRenderer;
  return this.defaultRenderer;
},
 render$0: function() {
  var t1 = this.ctx;
  t1.clearRect$4(0, 0, t1.get$canvas().get$width(), t1.get$canvas().get$height());
  t1.set$fillStyle(this.get$game().get$bgStyle());
  t1.fillRect$4(0, 0, t1.get$canvas().get$width(), t1.get$canvas().get$height());
  t1.save$0();
  t1.translate$2($.div(t1.get$canvas().get$width(), 2), $.div(t1.get$canvas().get$height(), 2));
  for (var t2 = $.iterator(this.get$game().get$entities()); t2.hasNext$0() === true;) {
    var t3 = t2.next$0();
    if (t3.get$enabled() !== true)
      continue;
    var r = this.getRenderer$1(t3);
    if (!(r == null))
      r.render$1(t3);
  }
  this.drawBeforeCtxRestore$0();
  t1.restore$0();
},
 drawBeforeCtxRestore$0: function() {
  if (this.get$game().get$debugMode() === true)
    this.drawDebugInfo$0();
},
 drawDebugInfo$0: function() {
  var t1 = this.ctx;
  t1.set$fillStyle('rgba(255, 255, 255, 0.2)');
  t1.set$font('16px Verdana');
  var t2 = 'FPS: ' + $.S($.toStringAsFixed(this.get$game().get$timer().get$fps(), 1));
  var t3 = this.rect;
  t1.fillText$3(t2, $.sub(t3.get$halfWidth(), 120), $.neg($.sub(t3.get$halfHeight(), 30)));
},
 CanvasGameRenderer$1: function(targetId) {
  this.ctx = $.query('#' + $.S(this.targetId)).getContext$1('2d');
  var t1 = this.ctx;
  this.rect = $.Rectangle$(0, 0, t1.get$canvas().get$width(), t1.get$canvas().get$height());
  t1.get$canvas().get$rect().then$1(new $.anon(this));
  this.defaultRenderer = $.DefaultCanvasEntityRenderer$(this);
  this.textRenderer = $.TextRenderer$(this);
}
};

$$.DefaultCanvasEntityRenderer = {"":
 ["gr"],
 super: "Object",
 render$1: function(e) {
  if (!(e.get$color() == null)) {
    var t1 = e.get$fill() === true;
    var t2 = this.gr;
    if (t1) {
      t1 = 'rgba(' + $.S(e.get$color()) + ', ' + $.S(e.get$opacity()) + ')';
      t2.get$ctx().set$fillStyle(t1);
      t2.get$ctx().fillRect$4(e.get$box().get$left(), e.get$box().get$top(), e.get$box().get$width(), e.get$box().get$height());
    } else {
      t1 = 'rgba(' + $.S(e.get$color()) + ', ' + $.S(e.get$opacity()) + ')';
      t2.get$ctx().set$strokeStyle(t1);
      t2.get$ctx().strokeRect$4(e.get$box().get$left(), e.get$box().get$top(), e.get$box().get$width(), e.get$box().get$height());
    }
  }
  t1 = this.gr;
  if (t1.get$game().get$showOutlines() === true) {
    t1.get$ctx().beginPath$0();
    t1.get$ctx().set$strokeStyle('green');
    t1.get$ctx().arc$6(e.get$x(), e.get$y(), e.get$radius(), 0, 6.283185307179586, false);
    t1.get$ctx().stroke$0();
    t1.get$ctx().closePath$0();
  }
}
};

$$.TextRenderer = {"":
 ["gr"],
 super: "DefaultCanvasEntityRenderer",
 render$1: function(b) {
  var t1 = 'rgba(' + $.S(b.get$color()) + ', ' + $.S(b.get$opacity()) + ')';
  var t2 = this.gr;
  t2.get$ctx().set$fillStyle(t1);
  t1 = $.S(b.get$size()) + 'px ' + $.S(b.get$font());
  t2.get$ctx().set$font(t1);
  b.set$width(t2.get$ctx().measureText$1(b.get$text()).get$width());
  t2.get$ctx().fillText$3(b.get$text(), b.get$box().get$left(), b.get$box().get$bottom());
}
};

$$.HtmlGameInput = {"":
 ["click", "mouse", "keyCode", "mouseDown", "game"],
 super: "GameInput",
 start$0: function() {
  $.print('Starting input');
  var t1 = new $.HtmlGameInput_start_getXandY(this);
  $.add$1($.document().get$on().get$click(), new $.HtmlGameInput_start_anon(this, t1));
  $.add$1($.document().get$on().get$mouseMove(), new $.HtmlGameInput_start_anon0(this, t1));
  $.add$1($.document().get$on().get$touchMove(), new $.HtmlGameInput_start_anon1(this, t1));
  $.add$1($.document().get$on().get$touchStart(), new $.HtmlGameInput_start_anon2());
  $.document().get$window().get$on().get$keyDown().add$2(new $.HtmlGameInput_start_anon3(this), false);
  $.add$1($.document().get$on().get$mouseDown(), new $.HtmlGameInput_start_anon4(this));
  $.add$1($.document().get$on().get$mouseUp(), new $.HtmlGameInput_start_anon5(this));
  $.print('Input started');
}
};

$$.HtmlGameSound = {"":
 ["enabled", "_rootDirectory"],
 super: "GameSound",
 play$2: function(sound, volume) {
  var t1 = {};
  if (this.enabled !== true)
    return;
  $.print('Playing: ' + $.S(sound));
  var sourceAudio = $.query('#sound_' + $.S(sound));
  if (sourceAudio == null)
    sourceAudio = $.query('#' + $.S(sound));
  t1.audioCopy_1 = null;
  if (sourceAudio == null) {
    sourceAudio = $._AudioElementFactoryProvider_AudioElement(null);
    sourceAudio.set$id('sound_' + $.S(sound));
    sourceAudio.set$preload('auto');
    var s = $._Elements_SourceElement();
    s.set$src($.S(this.get$rootDirectory()) + $.S(sound) + '.mp3');
    s.set$type('audio/mp3');
    $.add$1(sourceAudio.get$nodes(), s);
    s = $._Elements_SourceElement();
    s.set$src($.S(this.get$rootDirectory()) + $.S(sound) + '.ogg');
    s.set$type('audio/ogg');
    $.add$1(sourceAudio.get$nodes(), s);
    $.add$1($.document().get$body().get$nodes(), sourceAudio);
  }
  t1.audioCopy_1 = sourceAudio.clone$1(true);
  t1.audioCopy_1.set$id('');
  $.add$1($.document().get$body().get$nodes(), t1.audioCopy_1);
  t1.audioCopy_1.$dom_addEventListener$2('ended', new $.HtmlGameSound_play_anon(t1));
  if (!(volume == null)) {
    var t2 = $.round0(volume, 3);
    t1.audioCopy_1.set$volume(t2);
  }
  t1.audioCopy_1.play$0();
  $.add$1(t1.audioCopy_1.get$classes(), 'sound-clone');
},
 play$1: function(sound) {
  return this.play$2(sound,1.0)
},
 play$1: function(sound) {
  return this.play$2(sound,1.0)
}
};

$$.HtmlGameLoop = {"":
 ["_lib1_callback?"],
 super: "GameLoop",
 _lib1_callback$0: function() { return this._lib1_callback.call$0(); },
 _lib1_callback$0: function() { return this._lib1_callback.call$0(); },
 _lib1_callback$2: function(arg0, arg1) { return this._lib1_callback.call$2(arg0, arg1); },
 start$1: function(callback) {
  this._lib1_callback = callback;
  $.window().requestAnimationFrame$1(this.get$loop());
},
 loop$1: function(time) {
  this._lib1_callback$0();
  $.window().requestAnimationFrame$1(this.get$loop());
},
 get$loop: function() { return new $.BoundClosure1(this, 'loop$1'); }
};

$$.Game_start_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  var t1 = this.this_0.get$timer().tick$0();
  this.this_0.set$clockTick(t1);
  this.this_0.update$0();
  this.this_0.get$renderer().render$0();
  this.this_0.get$input().reset$0();
}
};

$$.PongGame_reset_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_reset_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$Bullet;
}
};

$$.Game_removeEntitiesByFilter_anon = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(e) {
  return this.f_0.call$1(e);
}
};

$$.Game_removeEntitiesByFilter_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return e.removeFromGame$0();
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$.JsonStringifier__stringify_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.box_0.first_10 !== true;
  var t2 = this.this_2;
  if (t1)
    $.add$1(t2.get$_sb(), ',"');
  else
    $.add$1(t2.get$_sb(), '"');
  $.JsonStringifier__escape(this.this_2.get$_sb(), key);
  $.add$1(this.this_2.get$_sb(), '":');
  this.this_2._stringify$1(value);
  this.box_0.first_10 = false;
}
};

$$.Game_update_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return e.get$_removeFromGame() !== true;
}
};

$$.PongGame_randomPowerUps_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_randomPowerUps_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_randomPowerUps_anon1 = {"":
 ["powerUp_0"],
 super: "Closure",
 call$1: function(e) {
  return this.powerUp_0.collidesWith$1(e);
}
};

$$.PongGame_gameOver_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_gameOver_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$Bullet;
}
};

$$.PongGame_createGameOverMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.newGame$0();
  this.this_0.newGameAgainstComputer$1('Player 1');
}
};

$$.PongGame_createGameOverMenu_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  this.this_1.removeEntitiesByFilter$1(new $.PongGame_createGameOverMenu_anon1());
  this.this_1.removeEntitiesByFilter$1(new $.PongGame_createGameOverMenu_anon2());
  if (!(this.this_1.get$player1() == null))
    this.this_1.get$player1().removeFromGame$0();
  if (!(this.this_1.get$player2() == null))
    this.this_1.get$player2().removeFromGame$0();
  if (!(this.this_1.get$ball() == null))
    this.this_1.get$ball().removeFromGame$0();
  var t1 = $.Ball$(this.this_1, 0, 0);
  this.this_1.set$ball(t1);
  t1 = this.this_1;
  t1.addEntity$1(t1.get$ball());
  t1 = this.this_1.get$ball().get$startVel();
  this.this_1.get$ball().get$momentum().set$xVel(t1);
  t1 = this.this_1;
  t1 = $.ComputerPaddle$(t1, $.neg($.sub(t1.get$rect().get$halfWidth(), 10)), 10, this.this_1.get$difficulty());
  this.this_1.set$player1(t1);
  t1 = this.this_1;
  t1.addEntity$1(t1.get$player1());
  t1 = this.this_1;
  t1 = $.ComputerPaddle$(t1, $.sub(t1.get$rect().get$halfWidth(), 10), 10, this.this_1.get$difficulty());
  this.this_1.set$player2(t1);
  t1 = this.this_1;
  t1.addEntity$1(t1.get$player2());
  this.this_1.set$state(1);
}
};

$$.PongGame_createGameOverMenu_anon1 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_createGameOverMenu_anon2 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$Bullet;
}
};

$$.Game_disableEntitiesByGroup_anon = {"":
 ["groupId_0"],
 super: "Closure",
 call$1: function(e) {
  return $.eq(e.get$groupId(), this.groupId_0);
}
};

$$.Game_disableEntitiesByGroup_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  e.set$enabled(false);
  return false;
}
};

$$.GameButton_update_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(t) {
  this.this_0.set$opacity(0.5);
  return 0.5;
}
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  return $._ElementRectImpl$(this.this_0);
}
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return $._completeMeasurementFutures();
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $.CTC9;
}
};

$$.PongGame_countdown_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(t) {
  var t1 = $.gtB(this.this_0.get$_countdown(), 0);
  var t2 = this.this_0;
  if (t1)
    t2.set$_countdown($.sub(t2.get$_countdown(), 1));
  else {
    t2.set$state(3);
    t.cancel$0();
  }
}
};

$$.Game_removeEntitiesByGroup_anon = {"":
 ["groupId_0"],
 super: "Closure",
 call$1: function(e) {
  return $.eq(e.get$groupId(), this.groupId_0);
}
};

$$.Game_removeEntitiesByGroup_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return e.removeFromGame$0();
}
};

$$.Game_enableEntitiesByGroup_anon = {"":
 ["groupId_0"],
 super: "Closure",
 call$1: function(e) {
  return $.eq(e.get$groupId(), this.groupId_0);
}
};

$$.Game_enableEntitiesByGroup_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  e.set$enabled(true);
  return true;
}
};

$$.PongGame_createWaitingMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.set$state(1);
  return 1;
}
};

$$.PongGame_createPausedMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.removeEntitiesByFilter$1(new $.PongGame_createPausedMenu_anon0());
  this.this_0.removeEntitiesByFilter$1(new $.PongGame_createPausedMenu_anon1());
  if (!(this.this_0.get$player1() == null))
    this.this_0.get$player1().removeFromGame$0();
  if (!(this.this_0.get$player2() == null))
    this.this_0.get$player2().removeFromGame$0();
  if (!(this.this_0.get$ball() == null))
    this.this_0.get$ball().removeFromGame$0();
  var t1 = $.Ball$(this.this_0, 0, 0);
  this.this_0.set$ball(t1);
  t1 = this.this_0;
  t1.addEntity$1(t1.get$ball());
  t1 = this.this_0.get$ball().get$startVel();
  this.this_0.get$ball().get$momentum().set$xVel(t1);
  t1 = this.this_0;
  t1 = $.ComputerPaddle$(t1, $.neg($.sub(t1.get$rect().get$halfWidth(), 10)), 10, this.this_0.get$difficulty());
  this.this_0.set$player1(t1);
  t1 = this.this_0;
  t1.addEntity$1(t1.get$player1());
  t1 = this.this_0;
  t1 = $.ComputerPaddle$(t1, $.sub(t1.get$rect().get$halfWidth(), 10), 10, this.this_0.get$difficulty());
  this.this_0.set$player2(t1);
  t1 = this.this_0;
  t1.addEntity$1(t1.get$player2());
  this.this_0.set$state(1);
}
};

$$.PongGame_createPausedMenu_anon0 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$PowerUp;
}
};

$$.PongGame_createPausedMenu_anon1 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  return typeof e === 'object' && e !== null && !!e.is$Bullet;
}
};

$$.PongGame_createComputerPickMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  return this.this_0.newGameAgainstComputer$2('Player 1', 1);
}
};

$$.PongGame_createComputerPickMenu_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  return this.this_1.newGameAgainstComputer$2('Player 1', 2);
}
};

$$.PongGame_createComputerPickMenu_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$0: function() {
  return this.this_2.newGameAgainstComputer$2('Player 1', 3);
}
};

$$.PongGame_createComputerPickMenu_anon2 = {"":
 ["this_3"],
 super: "Closure",
 call$0: function() {
  return this.this_3.newGameAgainstComputer$2('Player 1', 4);
}
};

$$.PongGame_createComputerPickMenu_anon3 = {"":
 ["this_4"],
 super: "Closure",
 call$0: function() {
  this.this_4.set$state(1);
  return 1;
}
};

$$.PongGame_createWelcomeMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.set$state(5);
  return 5;
}
};

$$.PongGame_createWelcomeMenu_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  this.this_1.set$state(7);
  this.this_1.set$waiting(1);
}
};

$$.PongGame_createWelcomeMenu_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$0: function() {
  this.this_2.removeEntitiesByGroup$1('stats');
  this.this_2.createStatsMenu$0();
  this.this_2.set$state(6);
}
};

$$.PongGame_createStatsMenu_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  return this.this_0.resetStats$0();
}
};

$$.PongGame_createStatsMenu_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  this.this_1.set$state(1);
  return 1;
}
};

$$.PongGame_waiting_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(t) {
  var t1 = this.this_0.get$connected() !== true && $.eqB(this.this_0.get$state(), 7);
  var t2 = this.this_0;
  if (t1)
    t2.set$_waiting($.add(t2.get$_waiting(), 1));
  else {
    t2.set$_waiting(0);
    this.this_0.set$state(1);
    t.cancel$0();
  }
  if ($.eqB(this.this_0.get$_waiting(), 5))
    this.this_0.set$_waiting(1);
}
};

$$.PongGameClient_connect_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(c) {
  this.this_0._print$1('Connected to ' + $.S(c));
}
};

$$.PongGameClient_connect_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(c) {
  this.this_1._print$1('Disconnected from ' + $.S(c));
}
};

$$.PongGameClient_connect_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$1: function(e) {
  this.this_2.handleMessage$1(e);
}
};

$$.PongGameClient_connect_anon2 = {"":
 ["this_3"],
 super: "Closure",
 call$1: function(e) {
  this.this_3._print$1('An error occurred: ' + $.S(e));
}
};

$$.EventHandle_fireEvent_anon = {"":
 ["args_0"],
 super: "Closure",
 call$2: function(id, handler) {
  handler.call$1(this.args_0);
}
};

$$.GameLoop_start_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(t) {
  return this.callback_0.call$0();
}
};

$$.anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(r) {
  var t1 = r.get$bounding().get$top();
  this.this_0.get$rect().set$top(t1);
  t1 = r.get$bounding().get$left();
  this.this_0.get$rect().set$left(t1);
  t1 = r.get$bounding().get$right();
  this.this_0.get$rect().set$right(t1);
  t1 = r.get$bounding().get$bottom();
  this.this_0.get$rect().set$bottom(t1);
}
};

$$.HtmlGameInput_start_getXandY = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return $.Vector$($.sub($.sub(e.get$clientX(), this.this_0.get$game().get$rect().get$x()), this.this_0.get$game().get$rect().get$halfWidth()), $.sub($.sub(e.get$clientY(), this.this_0.get$game().get$rect().get$y()), this.this_0.get$game().get$rect().get$halfHeight()));
}
};

$$.HtmlGameInput_start_anon = {"":
 ["this_2", "getXandY_1"],
 super: "Closure",
 call$1: function(e) {
  var t1 = this.getXandY_1.call$1(e);
  this.this_2.set$click(t1);
}
};

$$.HtmlGameInput_start_anon0 = {"":
 ["this_4", "getXandY_3"],
 super: "Closure",
 call$1: function(e) {
  var t1 = this.getXandY_3.call$1(e);
  this.this_4.set$mouse(t1);
}
};

$$.HtmlGameInput_start_anon1 = {"":
 ["this_6", "getXandY_5"],
 super: "Closure",
 call$1: function(e) {
  e.preventDefault$0();
  var t1 = this.getXandY_5.call$1($.index(e.get$touches(), 0));
  this.this_6.set$mouse(t1);
  return false;
}
};

$$.HtmlGameInput_start_anon2 = {"":
 [],
 super: "Closure",
 call$1: function(e) {
  e.preventDefault$0();
  return false;
}
};

$$.HtmlGameInput_start_anon3 = {"":
 ["this_7"],
 super: "Closure",
 call$1: function(e) {
  var t1 = e.get$keyCode();
  this.this_7.set$keyCode(t1);
}
};

$$.HtmlGameInput_start_anon4 = {"":
 ["this_8"],
 super: "Closure",
 call$1: function(e) {
  this.this_8.set$mouseDown(true);
}
};

$$.HtmlGameInput_start_anon5 = {"":
 ["this_9"],
 super: "Closure",
 call$1: function(e) {
  this.this_9.set$mouseDown(false);
}
};

$$.HtmlGameSound_play_anon = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(e) {
  $.print('removed');
  this.box_0.audioCopy_1.remove$0();
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0.call$1(key);
}
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.f_0.call$1(key) === true)
    $.add$1(this.result_1, key);
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 super: "Closure",
 call$1: function(s) {
  return $.add$1(s, this.value_0);
}
};

$$._CssClassSet_clear_anon = {"":
 [],
 super: "Closure",
 call$1: function(s) {
  return $.clear(s);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$1: function(key) {
  return this.f_0.call$2(key, $.index(this.this_1, key));
}
};

$$.PongGameRenderer_init_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0.bgFade$0();
}
};

$$.PongGameRenderer_init_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(p) {
  return this.this_1.doPaddleHitEffect$1(p);
}
};

$$.PongGameRenderer_init_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$1: function(e) {
  return this.this_2.bgFade$0();
}
};

$$.PongGameRenderer_bgFade_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.get$game().set$bgStyle('rgba(0, 0, 0, 0.75)');
  return 'rgba(0, 0, 0, 0.75)';
}
};

$$.PongGameRenderer_bgFade_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  this.this_1.get$game().set$bgStyle('rgba(0, 0, 0, 0.70)');
  return 'rgba(0, 0, 0, 0.70)';
}
};

$$.PongGameRenderer_bgFade_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$0: function() {
  this.this_2.get$game().set$bgStyle('rgba(0, 0, 0, 0.65)');
  return 'rgba(0, 0, 0, 0.65)';
}
};

$$.PongGameRenderer_bgFade_anon2 = {"":
 ["this_3"],
 super: "Closure",
 call$0: function() {
  this.this_3.get$game().set$bgStyle('rgba(0, 0, 0, 0.60)');
  return 'rgba(0, 0, 0, 0.60)';
}
};

$$.PongGameRenderer_bgFade_anon3 = {"":
 ["this_4"],
 super: "Closure",
 call$0: function() {
  this.this_4.get$game().set$bgStyle('rgba(0, 0, 0, 0.55)');
  return 'rgba(0, 0, 0, 0.55)';
}
};

$$.PongGameRenderer_bgFade_anon4 = {"":
 ["this_5"],
 super: "Closure",
 call$0: function() {
  this.this_5.get$game().set$bgStyle('rgba(0, 0, 0, 0.60)');
  return 'rgba(0, 0, 0, 0.60)';
}
};

$$.PongGameRenderer_bgFade_anon5 = {"":
 ["this_6"],
 super: "Closure",
 call$0: function() {
  this.this_6.get$game().set$bgStyle('rgba(0, 0, 0, 0.65)');
  return 'rgba(0, 0, 0, 0.65)';
}
};

$$.PongGameRenderer_bgFade_anon6 = {"":
 ["this_7"],
 super: "Closure",
 call$0: function() {
  this.this_7.get$game().set$bgStyle('rgba(0, 0, 0, 0.70)');
  return 'rgba(0, 0, 0, 0.70)';
}
};

$$.PongGameRenderer_bgFade_anon7 = {"":
 ["this_8"],
 super: "Closure",
 call$0: function() {
  this.this_8.get$game().set$bgStyle('rgba(0, 0, 0, 0.75)');
  return 'rgba(0, 0, 0, 0.75)';
}
};

$$.PongGameRenderer_bgFade_anon8 = {"":
 ["this_9"],
 super: "Closure",
 call$0: function() {
  this.this_9.get$game().set$bgStyle('rgba(0, 0, 0, 0.80)');
  return 'rgba(0, 0, 0, 0.80)';
}
};

$$.PongGameRenderer_bgFade_anon9 = {"":
 ["this_10"],
 super: "Closure",
 call$0: function() {
  this.this_10.get$game().set$bgStyle('rgba(0, 0, 0, 0.85)');
  return 'rgba(0, 0, 0, 0.85)';
}
};

$$.PongGameRenderer_doPaddleHitEffect_anon = {"":
 ["paddle_0"],
 super: "Closure",
 call$0: function() {
  this.paddle_0.set$opacity(0.4);
  return 0.4;
}
};

$$.PongGameRenderer_doPaddleHitEffect_anon0 = {"":
 ["paddle_1"],
 super: "Closure",
 call$0: function() {
  this.paddle_1.set$opacity(0.3);
  return 0.3;
}
};

$$.PongGameRenderer_doPaddleHitEffect_anon1 = {"":
 ["paddle_2"],
 super: "Closure",
 call$0: function() {
  this.paddle_2.set$opacity(0.2);
  return 0.2;
}
};

$$.PongGameRenderer_subtleBgFade_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.get$game().set$bgStyle('rgba(0, 0, 0, 0.83)');
  return 'rgba(0, 0, 0, 0.83)';
}
};

$$.PongGameRenderer_subtleBgFade_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$0: function() {
  this.this_1.get$game().set$bgStyle('rgba(0, 0, 0, 0.82)');
  return 'rgba(0, 0, 0, 0.82)';
}
};

$$.PongGameRenderer_subtleBgFade_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$0: function() {
  this.this_2.get$game().set$bgStyle('rgba(0, 0, 0, 0.81)');
  return 'rgba(0, 0, 0, 0.81)';
}
};

$$.PongGameRenderer_subtleBgFade_anon2 = {"":
 ["this_3"],
 super: "Closure",
 call$0: function() {
  this.this_3.get$game().set$bgStyle('rgba(0, 0, 0, 0.82)');
  return 'rgba(0, 0, 0, 0.82)';
}
};

$$.PongGameRenderer_subtleBgFade_anon3 = {"":
 ["this_4"],
 super: "Closure",
 call$0: function() {
  this.this_4.get$game().set$bgStyle('rgba(0, 0, 0, 0.83)');
  return 'rgba(0, 0, 0, 0.83)';
}
};

$$.PongGameRenderer_subtleBgFade_anon4 = {"":
 ["this_5"],
 super: "Closure",
 call$0: function() {
  this.this_5.get$game().set$bgStyle('rgba(0, 0, 0, 0.84)');
  return 'rgba(0, 0, 0, 0.84)';
}
};

$$.PongGameRenderer_subtleBgFade_anon5 = {"":
 ["this_6"],
 super: "Closure",
 call$0: function() {
  this.this_6.get$game().set$bgStyle('rgba(0, 0, 0, 0.85)');
  return 'rgba(0, 0, 0, 0.85)';
}
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000))
    return $.S(n);
  if ($.geB(absN, 100))
    return sign + '0' + $.S(absN);
  if ($.geB(absN, 10))
    return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.geB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  $._TimerFactory__factory = $._timerFactory;
  return;
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_5.get$isComplete() !== true)
    this.completer_3.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_8.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, value);
}
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = {};
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_4.get$_receivePort().get$_lib3_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_lib3_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._lib3_callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon1 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$4: function(p0, p1, p2, p3) { return this.self[this.target](p0, p1, p2, p3); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$5: function(p0, p1, p2, p3, p4) { return this.self[this.target](p0, p1, p2, p3, p4); },
 call$2: function(method,url) {
  return this.call$5(method,url,null,null,null)
},
 call$3: function(method,url,async) {
  return this.call$5(method,url,async,null,null)
},
 call$4: function(method,url,async,user) {
  return this.call$5(method,url,async,user,null)
}
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); },
 call$1: function(name$) {
  return this.call$2(name$,null)
}
};
$$.BoundClosure4 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); },
 call$0: function() {
  return this.call$2(null,null)
},
 call$1: function(code) {
  return this.call$2(code,null)
}
};
$$.BoundClosure5 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); },
 call$2: function(url,name$) {
  return this.call$3(url,name$,null)
}
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.floor = function(receiver) {
  return Math.floor(receiver);
};

$.TextRenderer$ = function(gr) {
  return new $.TextRenderer(gr);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false))
    return;
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests == null))
    for (var t1 = $.iterator($._pendingRequests); t1.hasNext$0() === true;) {
      var request = t1.next$0();
      try {
        var t2 = request.computeValue$0();
        request.set$value(t2);
      } catch (exception) {
        t2 = $.unwrapException(exception);
        var e = t2;
        t2 = e;
        request.set$value(t2);
        request.set$exception(true);
      }

    }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = null;
  $._pendingMeasurementFrameCallbacks = null;
  if (!(completedRequests == null))
    for (t1 = $.iterator(completedRequests); t1.hasNext$0() === true;) {
      t2 = t1.next$0();
      if (t2.get$exception() === true)
        t2.get$completer().completeException$1(t2.get$value());
      else
        t2.get$completer().complete$1(t2.get$value());
    }
  if (!(readyMeasurementFrameCallbacks == null))
    for (t1 = $.iterator(readyMeasurementFrameCallbacks); t1.hasNext$0() === true;)
      t1.next$0().call$0();
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation($.Primitives_dateNow(), false);
  t1.DateImplementation$now$0();
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.HtmlGameSound$ = function() {
  return new $.HtmlGameSound(true, 'Sounds/');
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_pattern, _errmsg);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  return name$;
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.Vector$ = function(x, y) {
  return new $.Vector(x, y);
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (a > b)
      return a;
    if (a < b)
      return b;
    if (typeof b === 'number') {
      if (typeof a === 'number')
        if (a === 0.0)
          return a + b;
      if ($.isNaN(b) === true)
        return b;
      return a;
    }
    if (b === 0 && $.isNegative(a) === true)
      return b;
    return a;
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.removeRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = receiver.length;
  if (start < 0 || start >= receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.JSSyntaxRegExp$ = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.GlobalId$_internal = function(value) {
  return new $.GlobalId(value, $.Util_getHashCode([value]));
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.GameTimer$ = function() {
  return new $.GameTimer(0, 0, 0, 60);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(_start, str, pattern);
};

$.Rectangle$ = function(top$, left, right, bottom) {
  return new $.Rectangle(top$, left, right, bottom);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests == null) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$(computeValue, completer));
  return completer.get$future();
};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win, message, targetOrigin) {
    win.postMessage(message, targetOrigin);

};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true)
    return;
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $._maybeScheduleMeasurementFrame_anon());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$.parseInt = function(str) {
  $.checkString(str);
  if (!/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))
    throw $.captureStackTrace($.FormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2))
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  else
    t1 = false;
  if (!t1)
    if ($.gtB($.get$length(trimmed), 3))
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    else
      t1 = false;
  else
    t1 = true;
  var base = t1 ? 16 : 10;
  var ret = parseInt(trimmed, base);
  if ($.isNaN(ret) === true)
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.some = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.some$1(f);
  else
    return $.Collections_some(receiver, f);
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.RenderUtils_drawDashedLine = function(ctx, x, y, x2, y2, da) {
  if (typeof y !== 'number')
    return $.RenderUtils_drawDashedLine$bailout(1, ctx, x, y, x2, y2, da, 0, 0);
  if (da == null)
    da = [10, 5];
  if (typeof da !== 'object' || da === null || da.constructor !== Array || !!da.fixed$length)
    return $.RenderUtils_drawDashedLine$bailout(2, ctx, x, da, y, y2, x2, 0, 0);
  var dashCount = da.length;
  ctx.moveTo$2(x, y);
  var dx = x2 - x;
  var dy = $.sub(y2, y);
  var slope = !(dx === 0) ? $.div(dy, dx) : dy;
  if (typeof slope !== 'number')
    return $.RenderUtils_drawDashedLine$bailout(3, ctx, x, da, y, dashCount, slope, dx, dy);
  var t2 = dx * dx;
  var t3 = $.mul(dy, dy);
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  var distRemaining = $.sqrt(t2 + t3);
  var t1 = 1 + slope * slope;
  var drawLine = true;
  var dashIndex = 0;
  while (true) {
    if (!(distRemaining >= 0.1 && dashIndex < 10000))
      break;
    var dashIndex0 = dashIndex + 1;
    t2 = $.mod(dashIndex, dashCount);
    if (t2 < 0 || t2 >= da.length)
      throw $.ioore(t2);
    var dashLength = da[t2];
    if ($.gtB(dashLength, distRemaining))
      dashLength = distRemaining;
    var xStep = $.sqrt($.div($.mul(dashLength, dashLength), t1));
    x += xStep;
    y += slope * xStep;
    if (drawLine)
      ctx.lineTo$2(x, y);
    else
      ctx.moveTo$2(x, y);
    if (typeof dashLength !== 'number')
      throw $.iae(dashLength);
    distRemaining -= dashLength;
    drawLine = !drawLine;
    dashIndex = dashIndex0;
  }
  ctx.moveTo$2(0, 0);
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  return nativeKey;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.HtmlGameLoop$ = function() {
  return new $.HtmlGameLoop(null);
};

$.JsonStringifier__numberToString = function(x) {
  if (typeof x === 'number' && x === (x | 0))
    return $.toString(x);
  else if (typeof x === 'number')
    return $.toString(x);
  else
    return $.toString($.toDouble(x));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._DOMWindowCrossFrameImpl__close = function(win) {
win.close()
};

$.JSSyntaxRegExp__globalVersionOf = function(other) {
  var re = $.JSSyntaxRegExp$(other.get$pattern(), other.get$multiLine(), other.get$ignoreCase());
  $.regExpAttachGlobalNative(re);
  return re;
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.Rectangle_intersect = function(r1, r2) {
  return !($.gtB(r1.left, r2.get$right()) || $.ltB(r1.right, r2.get$left()) || $.gtB(r1.top, r2.get$bottom()) || $.ltB(r1.bottom, r2.get$top()));
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  return name$;
};

$._WebSocketFactoryProvider_WebSocket = function(url) {
return new WebSocket(url);
};

$.Primitives_getDay = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCDate() : $.Primitives_lazyAsJsDate(receiver).getDate();
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.Momentum$ = function(xVel, yVel, xAccel, yAccel, xMax, yMax) {
  return new $.Momentum(xVel, yVel, xAccel, yAccel, xMax, yMax);
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  return receiver.split(pattern);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal = function(json) {
  var t1 = new $._JsonParser(json, $.get$length(json), 0);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.Rectangle$clone = function(rect) {
  return new $.Rectangle(rect.get$top(), rect.get$left(), rect.get$right(), rect.get$bottom());
};

$._TimerFactory_Timer$repeating = function(milliSeconds, callback) {
  if ($._TimerFactory__factory == null)
    throw $.captureStackTrace($.UnsupportedOperationException$('Timer interface not supported.'));
  return $._TimerFactory__factory.call$3(milliSeconds, callback, true);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = $.regExpGetNative(regExp).exec(str);
  if (result === null)
    return;
  return result;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMinutes() : $.Primitives_lazyAsJsDate(receiver).getMinutes();
};

$.Primitives_getMonth = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMonth() + 1 : $.Primitives_lazyAsJsDate(receiver).getMonth() + 1;
};

$.GameButton$ = function(game, x, y, text, _callback, size, font, centered, color, id, groupId) {
  var t1 = new $.GameButton(_callback, text, centered, font, size, game, 0, 0, 1, 1, id, groupId, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 10, 10, id, groupId);
  t1.GameText$10(game, x, y, text, size, font, centered, color, id, groupId);
  t1.GameButton$11(game, x, y, text, _callback, size, font, centered, color, id, groupId);
  return t1;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.atan2 = function(a, b) {
  return Math.atan2($.checkNum(a), $.checkNum(b));
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(false, null);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
return window;
};

$._MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $._MatchImplementation(pattern, str, _start, _end, _groups);
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.EventHandle$ = function() {
  return new $.EventHandle(null, false);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$.JSON_stringify = function(object) {
  return $.JsonStringifier_stringify(object);
};

$.JsonStringifier_stringify = function(object) {
  var output = $.StringBufferImpl$('');
  $.JsonStringifier$_internal(output)._stringify$1(object);
  return output.toString$0();
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.PowerUp$ = function(game, x, y) {
  var t1 = new $.PowerUp(null, 0, game, 0, 0, 1, 1, null, null, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 36, 36, null, null);
  t1.PowerUp$3(game, x, y);
  return t1;
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0))
    receiver.date = new Date(receiver.millisecondsSinceEpoch);
  return receiver.date;
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(isolate, fn, message);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._Elements_SourceElement = function() {
  return $._document().$dom_createElement$1('source');
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$._MeasurementRequest$ = function(computeValue, completer) {
  return new $._MeasurementRequest(computeValue, completer, null, false);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.DefaultCanvasEntityRenderer$ = function(gr) {
  return new $.DefaultCanvasEntityRenderer(gr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._SimpleClientRect$ = function(left, top$, width, height) {
  return new $._SimpleClientRect(left, top$, width, height);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.PongGameRenderer$ = function(targetId) {
  var t1 = new $.PongGameRenderer(null, null, null, targetId, null, null, null, null, null, null);
  t1.CanvasGameRenderer$1(targetId);
  t1.PongGameRenderer$1(targetId);
  return t1;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._TimerFactory_Timer = function(milliSeconds, callback) {
  if ($._TimerFactory__factory == null)
    throw $.captureStackTrace($.UnsupportedOperationException$('Timer interface not supported.'));
  return $._TimerFactory__factory.call$3(milliSeconds, callback, false);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Primitives_getYear = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCFullYear() : $.Primitives_lazyAsJsDate(receiver).getFullYear();
};

$._Manager$ = function() {
  var t1 = new $._Manager(0, 0, 1, null, null, null, null, null, null, null, null, null);
  t1._Manager$0();
  return t1;
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'E'});
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true;)
    result.push(iterator.next$0());
  return result;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var game = $.PongGameClient$('ws://localhost:8000/ws');
  game.sound.set$enabled(true);
  game.start$0();
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(true, null);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_workerId, _receivePortId, isolateId);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(set_.get$_backingMap().get$_keys(), -1);
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$.Ball$ = function(game, x, y) {
  var t1 = new $.Ball(400, game, 0, 0, 1, 1, null, null, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 8, 8, null, null);
  t1.Ball$3(game, x, y);
  return t1;
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator($.JSSyntaxRegExp__globalVersionOf(re), _str, null, false);
};

$.FutureImpl$ = function() {
  return new $.FutureImpl(false, null, null, null, false, [], [], []);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  return isNaN(receiver);
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.round$0();
  if (receiver < 0)
    return -Math.round(-receiver);
  else
    return Math.round(receiver);
};

$.round0 = function(value, decimals) {
  var o = $.pow(10, decimals);
  return $.div($.round($.mul(value, o)), o);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'Match'});
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.toStringAsFixed = function(receiver, fractionDigits) {
  if (!(typeof receiver === 'number'))
    return receiver.toStringAsFixed$1(fractionDigits);
  $.checkNum(fractionDigits);
  var result = receiver.toFixed(fractionDigits);
  if (receiver === 0 && $.isNegative(receiver) === true)
    return '-' + result;
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_re, _str);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0))
        throw $.iae(i);
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t1 = src[i];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t1;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t2 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t2;
    }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds() : $.Primitives_lazyAsJsDate(receiver).getMilliseconds();
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(0, list);
};

$._DOMWindowCrossFrameImpl__top = function(win) {
return win.top;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$.JSON_parse = function(json) {
  return $._JsonParser$_internal(json)._parseToplevel$0();
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), array, 0);
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.ComputerPaddle$ = function(game, x, y, skillLevel) {
  var t1 = new $.ComputerPaddle(0, 0, 3, null, null, 0, 0, 0, null, game, 0, 0, 1, 1, null, null, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 8, 120, null, null);
  t1.Paddle$3(game, x, y);
  t1.ComputerPaddle$4(game, x, y, skillLevel);
  return t1;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.JsonStringifier$_internal = function(_sb) {
  return new $.JsonStringifier(_sb, []);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.Random_Random = function(seed) {
  return $.CTC6;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_ptr, _type);
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.Primitives_getSeconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCSeconds() : $.Primitives_lazyAsJsDate(receiver).getSeconds();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$.random = function(min, max, wholeNumbers) {
  var value = $.add(min, $.mul($.Random_Random(null).nextDouble$0(), $.sub(max, min)));
  return wholeNumbers ? $.round(value) : value;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCHours() : $.Primitives_lazyAsJsDate(receiver).getHours();
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$._globalState = function() {
return $globalState;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.GlobalId_GlobalId = function() {
  var t1 = $.GlobalId__globalId;
  $.GlobalId__globalId = $.add(t1, 1);
  return $.GlobalId$_internal(t1);
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(t1, null);
  t1._ReceivePortImpl$0();
  return t1;
};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win, message, targetOrigin, messagePorts) {
    win.postMessage(message, targetOrigin, messagePorts);

};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$._HttpRequestEventsImpl$ = function(_ptr) {
  return new $._HttpRequestEventsImpl(_ptr);
};

$.JsonStringifier__escape = function(sb, s) {
  var length$ = $.get$length(s);
  var charCodes = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(charCodes, {E: 'int'});
  for (var needsEscape = false, i = 0; $.ltB(i, length$); ++i) {
    var charCode = $.charCodeAt(s, i);
    if ($.ltB(charCode, 32)) {
      charCodes.push(92);
      switch (charCode) {
        case 8:
          charCodes.push(98);
          break;
        case 9:
          charCodes.push(116);
          break;
        case 10:
          charCodes.push(110);
          break;
        case 12:
          charCodes.push(102);
          break;
        case 13:
          charCodes.push(114);
          break;
        default:
          charCodes.push(117);
          var t1 = $.and($.shr(charCode, 12), 15);
          if ($.ltB(t1, 10)) {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 48 + t1;
          } else {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 87 + t1;
          }
          charCodes.push(t1);
          t1 = $.and($.shr(charCode, 8), 15);
          if ($.ltB(t1, 10)) {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 48 + t1;
          } else {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 87 + t1;
          }
          charCodes.push(t1);
          t1 = $.and($.shr(charCode, 4), 15);
          if ($.ltB(t1, 10)) {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 48 + t1;
          } else {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 87 + t1;
          }
          charCodes.push(t1);
          t1 = $.and(charCode, 15);
          if ($.ltB(t1, 10)) {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 48 + t1;
          } else {
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            t1 = 87 + t1;
          }
          charCodes.push(t1);
          break;
      }
      needsEscape = true;
    } else if ($.eqB(charCode, 34) || $.eqB(charCode, 92)) {
      charCodes.push(92);
      charCodes.push(charCode);
      needsEscape = true;
    } else
      charCodes.push(charCode);
  }
  $.add$1(sb, needsEscape ? $.Strings_String$fromCharCodes(charCodes) : s);
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ElementRectImpl$ = function(element) {
  return new $._ElementRectImpl($._SimpleClientRect$(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight()), $._SimpleClientRect$(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight()), $._SimpleClientRect$(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight()), element.$dom_getBoundingClientRect$0(), element.$dom_getClientRects$0());
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: '_IsolateEvent'});
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(key, value);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.print = function(obj) {
  if (typeof obj === 'string')
    $.Primitives_printString(obj);
  else
    $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$._AudioElementFactoryProvider_AudioElement = function(src) {
      if (src == null) return new Audio();
      return new Audio(src);
    
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!(typeof t2 === 'number' && t2 === (t2 | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC13)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(millisecondsSinceEpoch, isUtc);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.HtmlGameInput$ = function() {
  return new $.HtmlGameInput(null, null, null, false, null);
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  return name$;
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.GameText$ = function(game, x, y, text, size, font, centered, color, id, groupId) {
  var t1 = new $.GameText(text, centered, font, size, game, 0, 0, 1, 1, id, groupId, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 10, 10, id, groupId);
  t1.GameText$10(game, x, y, text, size, font, centered, color, id, groupId);
  return t1;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (a > b)
      return b;
    if (a < b)
      return a;
    if (typeof b === 'number') {
      if (typeof a === 'number')
        if (a === 0.0)
          return (a + b) * a * b;
      if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
        return b;
      return a;
    }
    return a;
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if (!$.isJsArray(charCodes))
    charCodes = $.ListFactory_List$from(charCodes);
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return receiver.trim();
};

$.PongGameClient$ = function(serverUrl) {
  var t1 = $.HtmlGameSound$();
  var t2 = $.HtmlGameInput$();
  var t3 = $.PongGameRenderer$('surface');
  var t4 = $.HtmlGameLoop$();
  var t5 = $.EventHandle$();
  $.setRuntimeTypeInfo(t5, {T: 'EventArgs'});
  var t6 = $.EventHandle$();
  $.setRuntimeTypeInfo(t6, {T: 'EventArgs'});
  var t7 = $.EventHandle$();
  $.setRuntimeTypeInfo(t7, {T: 'Paddle'});
  t7 = new $.PongGameClient(null, 'ws://localhost:8000/ws', null, 5, 2, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, null, null, null, null, null, t5, t6, t7, null, null, null, null, false, t1, t2, t3, t4, 'rgba(0, 0, 0, 0.85)', false);
  t7.Game$withServices$4(t1, t2, t3, t4);
  t7.PongGameClient$1(serverUrl);
  return t7;
};

$.PowerUpRenderer$ = function(gr) {
  return new $.PowerUpRenderer(gr);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
return document;
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.toDouble = function(receiver) {
  return receiver;
};

$.parseDouble = function(str) {
  $.checkString(str);
  var ret = parseFloat(str);
  if (ret === 0)
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  else
    t1 = false;
  if (t1)
    ret = parseInt(str);
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1)
    return w;
  else
    return $._DOMWindowCrossFrameImpl$(w);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.Bullet$ = function(game, x, y, xVel) {
  var t1 = new $.Bullet(game, 0, 0, 1, 1, null, null, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 8, 8, null, null);
  t1.Bullet$4(game, x, y, xVel);
  return t1;
};

$.Util_getHashCode = function(source) {
  for (var t1 = $.iterator(source), hash = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var next = t2 == null ? 0 : $.hashCode(t2);
    if (typeof next !== 'number')
      throw $.iae(next);
    var hash0 = 536870911 & hash + next;
    var hash1 = 536870911 & hash0 + ((524287 & hash0) << 10 >>> 0);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + ((67108863 & hash) << 3 >>> 0);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + ((16383 & hash0) << 15 >>> 0);
};

$.Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    if (f.call$1(t1.next$0()) === true)
      return true;
  return false;
};

$.Strings_join = function(strings, separator) {
  return $.StringBase_join(strings, separator);
};

$._Collections_some = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    if (f.call$1(t1.next$0()) === true)
      return true;
  return false;
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.StringBase_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), separator);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$._convertDartToNative_IDBKey = function(dartKey) {
  return dartKey;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.ClientPaddle$ = function(game, x, y, Name) {
  var t1 = new $.ClientPaddle(0, 0, null, game, 0, 0, 1, 1, null, null, null, null, false, null, null, true, 1, '255, 255, 255', true, null);
  t1.GameEntity$withPosition$7(game, x, y, 8, 120, null, null);
  t1.Paddle$3(game, x, y);
  t1.ClientPaddle$4(game, x, y, Name);
  return t1;
};

$.document = function() {
return document;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else if ($.contains$1(message, ' is not a function') === true || $.contains$1(message, 'doesn\'t support property or method') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$._HttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._HttpRequestUploadEventsImpl(_ptr);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j)
      $.indexSet(dst, j, $.index(src, i));
  else
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.RenderUtils_drawDashedLine$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var ctx = env0;
      var x = env1;
      var y = env2;
      var x2 = env3;
      var y2 = env4;
      var da = env5;
      break;
    case 2:
      ctx = env0;
      x = env1;
      da = env2;
      y = env3;
      y2 = env4;
      x2 = env5;
      break;
    case 3:
      ctx = env0;
      x = env1;
      da = env2;
      y = env3;
      dashCount = env4;
      slope = env5;
      dx = env6;
      dy = env7;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (da == null)
        da = [10, 5];
    case 2:
      state = 0;
      var dashCount = $.get$length(da);
      ctx.moveTo$2(x, y);
      var dx = x2 - x;
      var dy = $.sub(y2, y);
      var slope = !(dx === 0) ? $.div(dy, dx) : dy;
    case 3:
      state = 0;
      var t2 = dx * dx;
      var t3 = $.mul(dy, dy);
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      var distRemaining = $.sqrt(t2 + t3);
      var drawLine = true;
      var dashIndex = 0;
      while (true) {
        if (!(distRemaining >= 0.1 && dashIndex < 10000))
          break;
        var dashIndex0 = dashIndex + 1;
        if (typeof dashCount !== 'number')
          throw $.iae(dashCount);
        var dashLength = $.index(da, $.mod(dashIndex, dashCount));
        if ($.gtB(dashLength, distRemaining))
          dashLength = distRemaining;
        var t1 = $.mul(dashLength, dashLength);
        t2 = $.mul(slope, slope);
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        var xStep = $.sqrt($.div(t1, 1 + t2));
        x += xStep;
        y = $.add(y, $.mul(slope, xStep));
        if (drawLine)
          ctx.lineTo$2(x, y);
        else
          ctx.moveTo$2(x, y);
        if (typeof dashLength !== 'number')
          throw $.iae(dashLength);
        distRemaining -= dashLength;
        drawLine = !drawLine;
        dashIndex = dashIndex0;
      }
      ctx.moveTo$2(0, 0);
  }
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC11 = new Isolate.$isolateProperties.ConstantMap(0, {}, Isolate.$isolateProperties.CTC);
$.CTC13 = new Isolate.$isolateProperties.Object();
$.CTC6 = new Isolate.$isolateProperties._Random();
$.CTC7 = new Isolate.$isolateProperties.EventArgs();
$.CTC8 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC9 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC8, Isolate.$isolateProperties.CTC8, Isolate.$isolateProperties.CTC8, Isolate.$isolateProperties.CTC8, Isolate.$isolateProperties.CTC);
$.CTC4 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC12 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC5 = new Isolate.$isolateProperties.JsonUnsupportedObjectType();
$.CTC1 = new Isolate.$isolateProperties._Default();
$.CTC10 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC3 = new Isolate.$isolateProperties.EmptyQueueException();
$._pendingRequests = null;
$.GlobalId__globalId = 0;
$._JsonParser_tokens = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$._TimerFactory__factory = null;
$._nextMeasurementFrameScheduled = false;
$._firstMeasurementRequest = true;
$._pendingMeasurementFrameCallbacks = null;
$._ReceivePortImpl__nextFreeId = 1;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLAnchorElement', ["name?", "type="], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
 play$0: function() {
  return this.play();
}
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["height=", "name?", "width="], {
});

$.$defineNativeClass('Attr', ["name?", "value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('AudioParam', ["name?", "value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); }
});

$.$defineNativeClass('HTMLBaseFontElement', ["color?", "size?"], {
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["size?", "type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLButtonElement', ["name?", "type=", "value="], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
},
 set$bottom: function(value) {
  this.setProperty$3('bottom', value, '');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$color: function() {
  return this.getPropertyValue$1('color');
},
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$font: function() {
  return this.getPropertyValue$1('font');
},
 set$font: function(value) {
  this.setProperty$3('font', value, '');
},
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 get$left: function() {
  return this.getPropertyValue$1('left');
},
 set$left: function(value) {
  this.setProperty$3('left', value, '');
},
 get$opacity: function() {
  return this.getPropertyValue$1('opacity');
},
 set$opacity: function(value) {
  this.setProperty$3('opacity', value, '');
},
 get$right: function() {
  return this.getPropertyValue$1('right');
},
 set$right: function(value) {
  this.setProperty$3('right', value, '');
},
 get$size: function() {
  return this.getPropertyValue$1('size');
},
 set$src: function(value) {
  this.setProperty$3('src', value, '');
},
 get$top: function() {
  return this.getPropertyValue$1('top');
},
 set$top: function(value) {
  this.setProperty$3('top', value, '');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$3('width', value, '');
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["height=", "width="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
}
});

$.$defineNativeClass('CanvasRenderingContext', ["canvas?"], {
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!", "font=", "lineWidth!", "strokeStyle!"], {
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
},
 beginPath$0: function() {
  return this.beginPath();
},
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
},
 closePath$0: function() {
  return this.closePath();
},
 fill$0: function() {
  return this.fill();
},
 get$fill: function() { return new $.BoundClosure(this, 'fill$0'); },
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
},
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
},
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
},
 measureText$1: function(text) {
  return this.measureText(text);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
},
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
},
 get$rect: function() { return new $.BoundClosure0(this, 'rect$4'); },
 restore$0: function() {
  return this.restore();
},
 save$0: function() {
  return this.save();
},
 stroke$0: function() {
  return this.stroke();
},
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return this.strokeRect(x,y,width,height,lineWidth);
},
 strokeRect$4: function(x,y,width,height) {
  return this.strokeRect(x,y,width,height);
},
 translate$2: function(tx, ty) {
  return this.translate(tx,ty);
}
});

$.$defineNativeClass('CharacterData', ["data?", "length?"], {
});

$.$defineNativeClass('ClientRect', ["bottom?", "height?", "left?", "right?", "top?", "width?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.error$1 = function(arg) {
  return this.error(arg);
};
_ConsoleImpl.get$error = function() { return new $.BoundClosure1(this, 'error$1'); };
$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 update$0: function() {
  return this.update();
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?", "name?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', ["open?"], {
});

$.$defineNativeClass('HTMLDocument', ["body?", "readyState?"], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 get$window: function() {
return this.defaultView;
},
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
},
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 query$1: function(selectors) {
  if ($.CTC10.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
}
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$rect: function() {
  var t1 = new $._DocumentFragmentImpl_rect_anon();
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, {T: 'ElementRect'});
  return $._createMeasurementFuture(t1, t2);
},
 get$translate: function() {
  return false;
},
 translate$2: function(arg0, arg1) { return this.get$translate().call$2(arg0, arg1); },
 get$id: function() {
  return '';
},
 get$parent: function() {
  return;
},
 get$attributes: function() {
  return $.CTC11;
},
 get$classes: function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  return t1;
},
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
}
});

$.$defineNativeClass('DocumentType', ["entities?", "name?"], {
});

$.$defineNativeClass('Element', ["id="], {
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
  {
  return $._CssClassSet$(this);
}
  } else {
    return Object.prototype.get$classes.call(this);
  }

},
 get$rect: function() {
  var t1 = new $._ElementImpl_rect_anon(this);
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, {T: 'ElementRect'});
  return $._createMeasurementFuture(t1, t2);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 translate$2: function(arg0, arg1) { return this.translate.call$2(arg0, arg1); },
 click$0: function() {
  return this.click();
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$$$dom_className: function() {
return this.className;
},
 set$$$dom_className: function(value) {
this.className = value;
},
 get$$$dom_clientHeight: function() {
return this.clientHeight;
},
 get$$$dom_clientLeft: function() {
return this.clientLeft;
},
 get$$$dom_clientTop: function() {
return this.clientTop;
},
 get$$$dom_clientWidth: function() {
return this.clientWidth;
},
 get$$$dom_offsetHeight: function() {
return this.offsetHeight;
},
 get$$$dom_offsetLeft: function() {
return this.offsetLeft;
},
 get$$$dom_offsetTop: function() {
return this.offsetTop;
},
 get$$$dom_offsetWidth: function() {
return this.offsetWidth;
},
 get$$$dom_scrollHeight: function() {
return this.scrollHeight;
},
 get$$$dom_scrollLeft: function() {
return this.scrollLeft;
},
 get$$$dom_scrollTop: function() {
return this.scrollTop;
},
 get$$$dom_scrollWidth: function() {
return this.scrollWidth;
},
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
},
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
},
 $dom_getClientRects$0: function() {
  return this.getClientRects();
},
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
},
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
}
});

$.$defineNativeClass('HTMLEmbedElement', ["height=", "name?", "src!", "type=", "width="], {
});

$.$defineNativeClass('Entry', ["name?"], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
},
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
},
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
},
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["type?"], {
 preventDefault$0: function() {
  return this.preventDefault();
}
});

$.$defineNativeClass('EventException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', ["readyState?"], {
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$2: function(type,listener) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$2')) {
    listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);  } else {
    return Object.prototype.$dom_addEventListener$2.call(this, type,listener);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?", "type?"], {
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["error?", "readyState?"], {
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriter', ["error?", "length?", "readyState?"], {
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["color?", "size?"], {
});

$.$defineNativeClass('HTMLFormElement', ["length?", "name?"], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('HTMLFrameElement', ["height?", "name?", "src!", "width?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
}
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["size?", "width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?", "state?"], {
});

$.$defineNativeClass('XMLHttpRequest', ["readyState?"], {
 get$on: function() {
  return $._HttpRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 open$5: function(method, url, async, user, password) {
  return this.open(method,url,async,user,password);
},
 get$open: function() { return new $.BoundClosure2(this, 'open$5'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 send$1: function(data) {
  return this.send(data);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function() {
  return $._HttpRequestUploadEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
},
 update$1: function(value) {
  return this.update(value);
}
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBDatabaseException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBFactory', [], {
 open$2: function(name, version) {
  return this.open(name,version);
},
 get$open: function() { return new $.BoundClosure3(this, 'open$2'); }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 add$2: function(value, key) {
  if (!($.CTC1 === key))
    return this._add_1$2(value, $._convertDartToNative_IDBKey(key));
  return this._add_2$1(value);
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC1)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBRequest', ["error?", "readyState?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$2: function(type,listener) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$2')) {
    listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);  } else {
    return Object.prototype.$dom_addEventListener$2.call(this, type,listener);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('IDBTransaction', ["error?"], {
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["height=", "name?", "src!", "width="], {
});

$.$defineNativeClass('ImageData', ["data?", "height?", "width?"], {
});

$.$defineNativeClass('HTMLImageElement', ["height=", "name?", "src!", "width=", "x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["height=", "name?", "pattern?", "size?", "src!", "type=", "value=", "width="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
}
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["name?", "type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["type=", "value="], {
});

$.$defineNativeClass('HTMLLinkElement', ["type="], {
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
});

$.$defineNativeClass('HTMLMarqueeElement', ["height=", "width="], {
 start$0: function() {
  return this.start();
}
});

$.$defineNativeClass('MediaController', ["volume!"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 play$0: function() {
  return this.play();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', ["error?", "preload!", "readyState?", "src!", "volume!"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 play$0: function() {
  return this.play();
}
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_addEventListener$2: function(type,listener) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$2')) {
    listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);  } else {
    return Object.prototype.$dom_addEventListener$2.call(this, type,listener);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["enabled=", "readyState?"], {
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
},
 add$1: function(track) {
  return this.add(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MessageEvent', ["data?", "ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 start$0: function() {
  return this.start();
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
});

$.$defineNativeClass('Metadata', ["size?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["clientX?", "clientY?", "x?", "y?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 get$$$dom_attributes: function() {
return this.attributes;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$text: function() {
return this.textContent;
},
 set$text: function(value) {
this.textContent = value;
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 clone$1: function(deep) {
  return this.cloneNode(deep);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function() {
  return $._NotificationEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 cancel$0: function() {
  return this.cancel();
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLOListElement', ["type="], {
 start$0: function() { return this.start.call$0(); },
 start$1: function(arg0) { return this.start.call$1(arg0); }
});

$.$defineNativeClass('HTMLObjectElement', ["data?", "height=", "name?", "type=", "width="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["name?", "type?", "value="], {
});

$.$defineNativeClass('HTMLParamElement', ["name?", "type=", "value="], {
});

$.$defineNativeClass('PeerConnection00', ["readyState?"], {
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["x=", "y="], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('Rect', ["bottom?", "left?", "right?", "top?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$classes: function() {
  if (this.get$_cssClassSet() == null)
    this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
},
 get$id: function() {
return this.id;
},
 set$id: function(value) {
this.id = value;
}
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?", "height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFETileElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?", "height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFilterElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["x=", "y="], {
});

$.$defineNativeClass('SVGImageElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGMaskElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGMatrix', [], {
 translate$2: function(x, y) {
  return this.translate(x,y);
}
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegArcAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPatternElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGPoint', ["x=", "y="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGRect', ["height=", "width=", "x=", "y="], {
});

$.$defineNativeClass('SVGRectElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGSVGElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
});

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', ["height?", "width?", "x?", "y?"], {
});

$.$defineNativeClass('Screen', ["height?", "width?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["src!", "type="], {
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "name?", "size?", "type?", "value="], {
 add$2: function(element, before) {
  return this.add(element,before);
}
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', ["src!", "type="], {
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 start$0: function() {
  return this.start();
}
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type="], {
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["height=", "width="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["name?", "type?", "value="], {
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCue', ["id=", "size?", "text="], {
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
}
});

$.$defineNativeClass('Touch', ["clientX?", "clientY?"], {
});

$.$defineNativeClass('TouchEvent', ["touches?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["readyState?", "src!"], {
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 some$1: function(f) {
  return $._Collections_some(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["height=", "width="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["name?", "size?", "type?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
}
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', ["readyState?"], {
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure4(this, 'close$2'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 send$1: function(data) {
  return this.send(data);
}
});

$.$defineNativeClass('DOMWindow', ["length?", "localStorage?", "name?", "navigator?", "window?"], {
 get$_top: function() {
return this.top;
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
},
 _open2$2: function(url, name) {
return this.open(url, name);
},
 _open3$3: function(url, name, options) {
return this.open(url, name, options);
},
 open$3: function(url, name$, options) {
  if (options == null)
    return $._DOMWindowCrossFrameImpl__createSafe(this._open2$2(url, name$));
  else
    return $._DOMWindowCrossFrameImpl__createSafe(this._open3$3(url, name$, options));
},
 get$open: function() { return new $.BoundClosure5(this, 'open$3'); },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
},
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
},
 _ensureRequestAnimationFrame$0: function() {
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }

},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
},
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
},
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
},
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener, 1);
  return this.addEventListener(type,listener);
},
 clearInterval$1: function(handle) {
  return this.clearInterval(handle);
},
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
},
 close$0: function() {
  return this.close();
},
 get$close: function() { return new $.BoundClosure(this, 'close$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["message?", "name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 get$id: function() {
return this.id;
},
 set$id: function(i) {
this.id = i;
},
 postMessage$1: function(msg) {
return this.postMessage(msg);
}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 277 dynamic classes.
// 407 classes
// 35 !leaf
(function(){
  var v0/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v3/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v4/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v5/*class(_UIEventImpl)*/ = [v0/*class(_MouseEventImpl)*/,v0/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|');
  var v6/*class(_ElementImpl)*/ = [v3/*class(_SVGElementImpl)*/,v4/*class(_MediaElementImpl)*/,v3/*class(_SVGElementImpl)*/,v4/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v7/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v8/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v9/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v10/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v11/*class(_NodeImpl)*/ = [v6/*class(_ElementImpl)*/,v7/*class(_DocumentFragmentImpl)*/,v8/*class(_DocumentImpl)*/,v9/*class(_CharacterDataImpl)*/,v6/*class(_ElementImpl)*/,v7/*class(_DocumentFragmentImpl)*/,v8/*class(_DocumentImpl)*/,v9/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v12/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v13/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v14/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v14/*class(_AbstractWorkerImpl)*/],
    ['MouseEvent', v0/*class(_MouseEventImpl)*/],
    ['UIEvent', v5/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['WorkerContext', v10/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CanvasRenderingContext', 'CanvasRenderingContext|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D'],
    ['CharacterData', v9/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v8/*class(_DocumentImpl)*/],
    ['DocumentFragment', v7/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v2/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGElement', v3/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v4/*class(_MediaElementImpl)*/],
    ['Element', v6/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v5/*class(_UIEventImpl)*/,v5/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v11/*class(_NodeImpl)*/],
    ['MediaStream', v12/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v13/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v10/*class(_WorkerContextImpl)*/,v11/*class(_NodeImpl)*/,v12/*class(_MediaStreamImpl)*/,v13/*class(_IDBRequestImpl)*/,v14/*class(_AbstractWorkerImpl)*/,v10/*class(_WorkerContextImpl)*/,v11/*class(_NodeImpl)*/,v12/*class(_MediaStreamImpl)*/,v13/*class(_IDBRequestImpl)*/,v14/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
