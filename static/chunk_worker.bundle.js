(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
  };
  var __decorate = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS((exports, module) => {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS((exports, module) => {
    var freeGlobal = typeof window == "object" && window && window.Object === Object && window;
    module.exports = freeGlobal;
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS((exports, module) => {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  });

  // node_modules/lodash/now.js
  var require_now = __commonJS((exports, module) => {
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS((exports, module) => {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS((exports, module) => {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS((exports, module) => {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS((exports, module) => {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS((exports, module) => {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS((exports, module) => {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  });

  // node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS((exports, module) => {
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  });

  // node_modules/lodash/debounce.js
  var require_debounce = __commonJS((exports, module) => {
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce3(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce3;
  });

  // node_modules/lodash/throttle.js
  var require_throttle = __commonJS((exports, module) => {
    var debounce3 = require_debounce();
    var isObject = require_isObject();
    var FUNC_ERROR_TEXT = "Expected a function";
    function throttle4(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce3(func, wait, {
        leading,
        maxWait: wait,
        trailing
      });
    }
    module.exports = throttle4;
  });

  // src/neuroglancer/mesh/draco/index.ts
  var require_draco = __commonJS((exports) => {
    __export(exports, {
      decodeDracoPartitioned: () => decodeDracoPartitioned
    });
    /**
     * @license
     * Copyright 2019 Google Inc.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const memory = new WebAssembly.Memory({initial: 1});
    let heap8;
    function updateHeapViews() {
      heap8 = new Uint8Array(memory.buffer);
    }
    updateHeapViews();
    var heap32 = new Uint32Array(memory.buffer);
    var DYNAMIC_BASE = 38592;
    var DYNAMICTOP_PTR = 5568;
    heap32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
    function abort() {
      throw "abort";
    }
    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }
      return x;
    }
    function emscripten_realloc_buffer(size) {
      var PAGE_MULTIPLE = 65536;
      size = alignUp(size, PAGE_MULTIPLE);
      var oldSize = heap8.byteLength;
      try {
        var result = memory.grow((size - oldSize) / 65536);
        if (result !== (-1 | 0)) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    let decodeResult = void 0;
    let numPartitions = 0;
    const imports = {
      env: {
        memory,
        table: new WebAssembly.Table({initial: 368, maximum: 368, element: "anyfunc"}),
        __memory_base: 1024,
        __table_base: 0,
        _neuroglancer_draco_receive_decoded_mesh: function(numFaces, numVertices, indicesPointer, vertexPositionsPointer, subchunkOffsetsPointer) {
          const numIndices = numFaces * 3;
          const indices = new Uint32Array(memory.buffer, indicesPointer, numIndices).slice();
          const vertexPositions = new Uint32Array(memory.buffer, vertexPositionsPointer, 3 * numVertices).slice();
          const subChunkOffsets = new Uint32Array(memory.buffer, subchunkOffsetsPointer, numPartitions + 1).slice();
          const mesh = {
            indices,
            vertexPositions,
            subChunkOffsets
          };
          decodeResult = mesh;
        },
        _emscripten_memcpy_big: function(d, s, n) {
          heap8.set(heap8.subarray(s, s + n), d);
        },
        _emscripten_get_heap_size: function() {
          return heap8.length;
        },
        DYNAMICTOP_PTR,
        _abort: abort,
        abort,
        abortOnCannotGrowMemory: abort,
        ___cxa_pure_virtual: abort,
        _llvm_trap: abort,
        ___setErrNo: abort,
        _emscripten_resize_heap: function(requestedSize) {
          var oldSize = heap8.length;
          var PAGE_MULTIPLE = 65536;
          var LIMIT = 2147483648 - PAGE_MULTIPLE;
          if (requestedSize > LIMIT) {
            return false;
          }
          var MIN_TOTAL_MEMORY = 16777216;
          var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
          while (newSize < requestedSize) {
            if (newSize <= 536870912) {
              newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
            } else {
              newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
            }
          }
          var replacement = emscripten_realloc_buffer(newSize);
          if (!replacement) {
            return false;
          }
          updateHeapViews();
          return true;
        }
      }
    };
    const dracoModulePromise = fetch(neuroglancer_draco_default).then((response) => response.arrayBuffer()).then((wasmCode) => WebAssembly.instantiate(wasmCode, imports));
    function decodeDracoPartitioned(buffer, vertexQuantizationBits, partition) {
      return dracoModulePromise.then((m) => {
        const offset = m.instance.exports._malloc(buffer.byteLength);
        heap8.set(buffer, offset);
        numPartitions = partition ? 8 : 1;
        const code = m.instance.exports._neuroglancer_draco_decode(offset, buffer.byteLength, partition, vertexQuantizationBits);
        if (code === 0) {
          const r = decodeResult;
          decodeResult = void 0;
          if (r instanceof Error)
            throw r;
          return r;
        }
        throw new Error(`Failed to decode draco mesh: ${code}`);
      });
    }
  });

  // node_modules/nifti-reader-js/src/utilities.js
  var require_utilities = __commonJS((exports, module) => {
    "use strict";
    var nifti = nifti || {};
    nifti.Utils = nifti.Utils || {};
    nifti.Utils.crcTable = null;
    nifti.Utils.GUNZIP_MAGIC_COOKIE1 = 31;
    nifti.Utils.GUNZIP_MAGIC_COOKIE2 = 139;
    nifti.Utils.getStringAt = function(data, start, end) {
      var str6 = "", ctr, ch;
      for (ctr = start; ctr < end; ctr += 1) {
        ch = data.getUint8(ctr);
        if (ch !== 0) {
          str6 += String.fromCharCode(ch);
        }
      }
      return str6;
    };
    nifti.Utils.getByteAt = function(data, start) {
      return data.getInt8(start);
    };
    nifti.Utils.getShortAt = function(data, start, littleEndian) {
      return data.getInt16(start, littleEndian);
    };
    nifti.Utils.getIntAt = function(data, start, littleEndian) {
      return data.getInt32(start, littleEndian);
    };
    nifti.Utils.getFloatAt = function(data, start, littleEndian) {
      return data.getFloat32(start, littleEndian);
    };
    nifti.Utils.getDoubleAt = function(data, start, littleEndian) {
      return data.getFloat64(start, littleEndian);
    };
    nifti.Utils.getLongAt = function(data, start, littleEndian) {
      var ctr, array7 = [], value = 0;
      for (ctr = 0; ctr < 8; ctr += 1) {
        array7[ctr] = nifti.Utils.getByteAt(data, start + ctr, littleEndian);
      }
      for (ctr = array7.length - 1; ctr >= 0; ctr--) {
        value = value * 256 + array7[ctr];
      }
      return value;
    };
    nifti.Utils.toArrayBuffer = function(buffer) {
      var ab, view, i;
      ab = new ArrayBuffer(buffer.length);
      view = new Uint8Array(ab);
      for (i = 0; i < buffer.length; i += 1) {
        view[i] = buffer[i];
      }
      return ab;
    };
    nifti.Utils.isString = function(obj) {
      return typeof obj === "string" || obj instanceof String;
    };
    nifti.Utils.formatNumber = function(num, shortFormat) {
      var val = 0;
      if (nifti.Utils.isString(num)) {
        val = Number(num);
      } else {
        val = num;
      }
      if (shortFormat) {
        val = val.toPrecision(5);
      } else {
        val = val.toPrecision(7);
      }
      return parseFloat(val);
    };
    nifti.Utils.makeCRCTable = function() {
      var c;
      var crcTable = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        crcTable[n] = c;
      }
      return crcTable;
    };
    nifti.Utils.crc32 = function(dataView) {
      var crcTable = nifti.Utils.crcTable || (nifti.Utils.crcTable = nifti.Utils.makeCRCTable());
      var crc = 0 ^ -1;
      for (var i = 0; i < dataView.byteLength; i++) {
        crc = crc >>> 8 ^ crcTable[(crc ^ dataView.getUint8(i)) & 255];
      }
      return (crc ^ -1) >>> 0;
    };
    var moduleType = typeof module;
    if (moduleType !== "undefined" && module.exports) {
      module.exports = nifti.Utils;
    }
  });

  // node_modules/nifti-reader-js/src/nifti1.js
  var require_nifti1 = __commonJS((exports, module) => {
    "use strict";
    var nifti = nifti || {};
    nifti.Utils = nifti.Utils || require_utilities();
    nifti.NIFTI1 = nifti.NIFTI1 || function() {
      this.littleEndian = false;
      this.dim_info = 0;
      this.dims = [];
      this.intent_p1 = 0;
      this.intent_p2 = 0;
      this.intent_p3 = 0;
      this.intent_code = 0;
      this.datatypeCode = 0;
      this.numBitsPerVoxel = 0;
      this.slice_start = 0;
      this.slice_end = 0;
      this.slice_code = 0;
      this.pixDims = [];
      this.vox_offset = 0;
      this.scl_slope = 1;
      this.scl_inter = 0;
      this.xyzt_units = 0;
      this.cal_max = 0;
      this.cal_min = 0;
      this.slice_duration = 0;
      this.toffset = 0;
      this.description = "";
      this.aux_file = "";
      this.intent_name = "";
      this.qform_code = 0;
      this.sform_code = 0;
      this.quatern_b = 0;
      this.quatern_c = 0;
      this.quatern_d = 0;
      this.qoffset_x = 0;
      this.qoffset_y = 0;
      this.qoffset_z = 0;
      this.affine = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
      this.magic = 0;
      this.isHDR = false;
      this.extensionFlag = [0, 0, 0, 0];
      this.extensionSize = 0;
      this.extensionCode = 0;
    };
    nifti.NIFTI1.TYPE_NONE = 0;
    nifti.NIFTI1.TYPE_BINARY = 1;
    nifti.NIFTI1.TYPE_UINT8 = 2;
    nifti.NIFTI1.TYPE_INT16 = 4;
    nifti.NIFTI1.TYPE_INT32 = 8;
    nifti.NIFTI1.TYPE_FLOAT32 = 16;
    nifti.NIFTI1.TYPE_COMPLEX64 = 32;
    nifti.NIFTI1.TYPE_FLOAT64 = 64;
    nifti.NIFTI1.TYPE_RGB24 = 128;
    nifti.NIFTI1.TYPE_INT8 = 256;
    nifti.NIFTI1.TYPE_UINT16 = 512;
    nifti.NIFTI1.TYPE_UINT32 = 768;
    nifti.NIFTI1.TYPE_INT64 = 1024;
    nifti.NIFTI1.TYPE_UINT64 = 1280;
    nifti.NIFTI1.TYPE_FLOAT128 = 1536;
    nifti.NIFTI1.TYPE_COMPLEX128 = 1792;
    nifti.NIFTI1.TYPE_COMPLEX256 = 2048;
    nifti.NIFTI1.XFORM_UNKNOWN = 0;
    nifti.NIFTI1.XFORM_SCANNER_ANAT = 1;
    nifti.NIFTI1.XFORM_ALIGNED_ANAT = 2;
    nifti.NIFTI1.XFORM_TALAIRACH = 3;
    nifti.NIFTI1.XFORM_MNI_152 = 4;
    nifti.NIFTI1.SPATIAL_UNITS_MASK = 7;
    nifti.NIFTI1.TEMPORAL_UNITS_MASK = 56;
    nifti.NIFTI1.UNITS_UNKNOWN = 0;
    nifti.NIFTI1.UNITS_METER = 1;
    nifti.NIFTI1.UNITS_MM = 2;
    nifti.NIFTI1.UNITS_MICRON = 3;
    nifti.NIFTI1.UNITS_SEC = 8;
    nifti.NIFTI1.UNITS_MSEC = 16;
    nifti.NIFTI1.UNITS_USEC = 24;
    nifti.NIFTI1.UNITS_HZ = 32;
    nifti.NIFTI1.UNITS_PPM = 40;
    nifti.NIFTI1.UNITS_RADS = 48;
    nifti.NIFTI1.MAGIC_COOKIE = 348;
    nifti.NIFTI1.STANDARD_HEADER_SIZE = 348;
    nifti.NIFTI1.MAGIC_NUMBER_LOCATION = 344;
    nifti.NIFTI1.MAGIC_NUMBER = [110, 43, 49];
    nifti.NIFTI1.MAGIC_NUMBER2 = [110, 105, 49];
    nifti.NIFTI1.EXTENSION_HEADER_SIZE = 8;
    nifti.NIFTI1.prototype.readHeader = function(data) {
      var rawData = new DataView(data), magicCookieVal = nifti.Utils.getIntAt(rawData, 0, this.littleEndian), ctr, ctrOut, ctrIn, index2;
      if (magicCookieVal !== nifti.NIFTI1.MAGIC_COOKIE) {
        this.littleEndian = true;
        magicCookieVal = nifti.Utils.getIntAt(rawData, 0, this.littleEndian);
      }
      if (magicCookieVal !== nifti.NIFTI1.MAGIC_COOKIE) {
        throw new Error("This does not appear to be a NIFTI file!");
      }
      this.dim_info = nifti.Utils.getByteAt(rawData, 39);
      for (ctr = 0; ctr < 8; ctr += 1) {
        index2 = 40 + ctr * 2;
        this.dims[ctr] = nifti.Utils.getShortAt(rawData, index2, this.littleEndian);
      }
      this.intent_p1 = nifti.Utils.getFloatAt(rawData, 56, this.littleEndian);
      this.intent_p2 = nifti.Utils.getFloatAt(rawData, 60, this.littleEndian);
      this.intent_p3 = nifti.Utils.getFloatAt(rawData, 64, this.littleEndian);
      this.intent_code = nifti.Utils.getShortAt(rawData, 68, this.littleEndian);
      this.datatypeCode = nifti.Utils.getShortAt(rawData, 70, this.littleEndian);
      this.numBitsPerVoxel = nifti.Utils.getShortAt(rawData, 72, this.littleEndian);
      this.slice_start = nifti.Utils.getShortAt(rawData, 74, this.littleEndian);
      for (ctr = 0; ctr < 8; ctr += 1) {
        index2 = 76 + ctr * 4;
        this.pixDims[ctr] = nifti.Utils.getFloatAt(rawData, index2, this.littleEndian);
      }
      this.vox_offset = nifti.Utils.getFloatAt(rawData, 108, this.littleEndian);
      this.scl_slope = nifti.Utils.getFloatAt(rawData, 112, this.littleEndian);
      this.scl_inter = nifti.Utils.getFloatAt(rawData, 116, this.littleEndian);
      this.slice_end = nifti.Utils.getShortAt(rawData, 120, this.littleEndian);
      this.slice_code = nifti.Utils.getByteAt(rawData, 122);
      this.xyzt_units = nifti.Utils.getByteAt(rawData, 123);
      this.cal_max = nifti.Utils.getFloatAt(rawData, 124, this.littleEndian);
      this.cal_min = nifti.Utils.getFloatAt(rawData, 128, this.littleEndian);
      this.slice_duration = nifti.Utils.getFloatAt(rawData, 132, this.littleEndian);
      this.toffset = nifti.Utils.getFloatAt(rawData, 136, this.littleEndian);
      this.description = nifti.Utils.getStringAt(rawData, 148, 228);
      this.aux_file = nifti.Utils.getStringAt(rawData, 228, 252);
      this.qform_code = nifti.Utils.getShortAt(rawData, 252, this.littleEndian);
      this.sform_code = nifti.Utils.getShortAt(rawData, 254, this.littleEndian);
      this.quatern_b = nifti.Utils.getFloatAt(rawData, 256, this.littleEndian);
      this.quatern_c = nifti.Utils.getFloatAt(rawData, 260, this.littleEndian);
      this.quatern_d = nifti.Utils.getFloatAt(rawData, 264, this.littleEndian);
      this.qoffset_x = nifti.Utils.getFloatAt(rawData, 268, this.littleEndian);
      this.qoffset_y = nifti.Utils.getFloatAt(rawData, 272, this.littleEndian);
      this.qoffset_z = nifti.Utils.getFloatAt(rawData, 276, this.littleEndian);
      for (ctrOut = 0; ctrOut < 3; ctrOut += 1) {
        for (ctrIn = 0; ctrIn < 4; ctrIn += 1) {
          index2 = 280 + (ctrOut * 4 + ctrIn) * 4;
          this.affine[ctrOut][ctrIn] = nifti.Utils.getFloatAt(rawData, index2, this.littleEndian);
        }
      }
      this.affine[3][0] = 0;
      this.affine[3][1] = 0;
      this.affine[3][2] = 0;
      this.affine[3][3] = 1;
      this.intent_name = nifti.Utils.getStringAt(rawData, 328, 344);
      this.magic = nifti.Utils.getStringAt(rawData, 344, 348);
      this.isHDR = this.magic === nifti.NIFTI1.MAGIC_NUMBER2;
      if (rawData.byteLength > nifti.NIFTI1.MAGIC_COOKIE) {
        this.extensionFlag[0] = nifti.Utils.getByteAt(rawData, 348);
        this.extensionFlag[1] = nifti.Utils.getByteAt(rawData, 348 + 1);
        this.extensionFlag[2] = nifti.Utils.getByteAt(rawData, 348 + 2);
        this.extensionFlag[3] = nifti.Utils.getByteAt(rawData, 348 + 3);
        if (this.extensionFlag[0]) {
          this.extensionSize = this.getExtensionSize(rawData);
          this.extensionCode = this.getExtensionCode(rawData);
        }
      }
    };
    nifti.NIFTI1.prototype.toFormattedString = function() {
      var fmt = nifti.Utils.formatNumber, string2 = "";
      string2 += "Dim Info = " + this.dim_info + "\n";
      string2 += "Image Dimensions (1-8): " + this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] + ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7] + "\n";
      string2 += "Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3 + "\n";
      string2 += "Intent Code = " + this.intent_code + "\n";
      string2 += "Datatype = " + this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode) + ")\n";
      string2 += "Bits Per Voxel = " + this.numBitsPerVoxel + "\n";
      string2 += "Slice Start = " + this.slice_start + "\n";
      string2 += "Voxel Dimensions (1-8): " + fmt(this.pixDims[0]) + ", " + fmt(this.pixDims[1]) + ", " + fmt(this.pixDims[2]) + ", " + fmt(this.pixDims[3]) + ", " + fmt(this.pixDims[4]) + ", " + fmt(this.pixDims[5]) + ", " + fmt(this.pixDims[6]) + ", " + fmt(this.pixDims[7]) + "\n";
      string2 += "Image Offset = " + this.vox_offset + "\n";
      string2 += "Data Scale:  Slope = " + fmt(this.scl_slope) + "  Intercept = " + fmt(this.scl_inter) + "\n";
      string2 += "Slice End = " + this.slice_end + "\n";
      string2 += "Slice Code = " + this.slice_code + "\n";
      string2 += "Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(nifti.NIFTI1.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(nifti.NIFTI1.TEMPORAL_UNITS_MASK & this.xyzt_units) + ")\n";
      string2 += "Display Range:  Max = " + fmt(this.cal_max) + "  Min = " + fmt(this.cal_min) + "\n";
      string2 += "Slice Duration = " + this.slice_duration + "\n";
      string2 += "Time Axis Shift = " + this.toffset + "\n";
      string2 += 'Description: "' + this.description + '"\n';
      string2 += 'Auxiliary File: "' + this.aux_file + '"\n';
      string2 += "Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code) + ")\n";
      string2 += "S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code) + ")\n";
      string2 += "Quaternion Parameters:  b = " + fmt(this.quatern_b) + "  c = " + fmt(this.quatern_c) + "  d = " + fmt(this.quatern_d) + "\n";
      string2 += "Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z + "\n";
      string2 += "S-Form Parameters X: " + fmt(this.affine[0][0]) + ", " + fmt(this.affine[0][1]) + ", " + fmt(this.affine[0][2]) + ", " + fmt(this.affine[0][3]) + "\n";
      string2 += "S-Form Parameters Y: " + fmt(this.affine[1][0]) + ", " + fmt(this.affine[1][1]) + ", " + fmt(this.affine[1][2]) + ", " + fmt(this.affine[1][3]) + "\n";
      string2 += "S-Form Parameters Z: " + fmt(this.affine[2][0]) + ", " + fmt(this.affine[2][1]) + ", " + fmt(this.affine[2][2]) + ", " + fmt(this.affine[2][3]) + "\n";
      string2 += 'Intent Name: "' + this.intent_name + '"\n';
      if (this.extensionFlag[0]) {
        string2 += "Extension: Size = " + this.extensionSize + "  Code = " + this.extensionCode + "\n";
      }
      return string2;
    };
    nifti.NIFTI1.prototype.getDatatypeCodeString = function(code) {
      if (code === nifti.NIFTI1.TYPE_UINT8) {
        return "1-Byte Unsigned Integer";
      } else if (code === nifti.NIFTI1.TYPE_INT16) {
        return "2-Byte Signed Integer";
      } else if (code === nifti.NIFTI1.TYPE_INT32) {
        return "4-Byte Signed Integer";
      } else if (code === nifti.NIFTI1.TYPE_FLOAT32) {
        return "4-Byte Float";
      } else if (code === nifti.NIFTI1.TYPE_FLOAT64) {
        return "8-Byte Float";
      } else if (code === nifti.NIFTI1.TYPE_RGB24) {
        return "RGB";
      } else if (code === nifti.NIFTI1.TYPE_INT8) {
        return "1-Byte Signed Integer";
      } else if (code === nifti.NIFTI1.TYPE_UINT16) {
        return "2-Byte Unsigned Integer";
      } else if (code === nifti.NIFTI1.TYPE_UINT32) {
        return "4-Byte Unsigned Integer";
      } else if (code === nifti.NIFTI1.TYPE_INT64) {
        return "8-Byte Signed Integer";
      } else if (code === nifti.NIFTI1.TYPE_UINT64) {
        return "8-Byte Unsigned Integer";
      } else {
        return "Unknown";
      }
    };
    nifti.NIFTI1.prototype.getTransformCodeString = function(code) {
      if (code === nifti.NIFTI1.XFORM_SCANNER_ANAT) {
        return "Scanner";
      } else if (code === nifti.NIFTI1.XFORM_ALIGNED_ANAT) {
        return "Aligned";
      } else if (code === nifti.NIFTI1.XFORM_TALAIRACH) {
        return "Talairach";
      } else if (code === nifti.NIFTI1.XFORM_MNI_152) {
        return "MNI";
      } else {
        return "Unknown";
      }
    };
    nifti.NIFTI1.prototype.getUnitsCodeString = function(code) {
      if (code === nifti.NIFTI1.UNITS_METER) {
        return "Meters";
      } else if (code === nifti.NIFTI1.UNITS_MM) {
        return "Millimeters";
      } else if (code === nifti.NIFTI1.UNITS_MICRON) {
        return "Microns";
      } else if (code === nifti.NIFTI1.UNITS_SEC) {
        return "Seconds";
      } else if (code === nifti.NIFTI1.UNITS_MSEC) {
        return "Milliseconds";
      } else if (code === nifti.NIFTI1.UNITS_USEC) {
        return "Microseconds";
      } else if (code === nifti.NIFTI1.UNITS_HZ) {
        return "Hz";
      } else if (code === nifti.NIFTI1.UNITS_PPM) {
        return "PPM";
      } else if (code === nifti.NIFTI1.UNITS_RADS) {
        return "Rads";
      } else {
        return "Unknown";
      }
    };
    nifti.NIFTI1.prototype.getQformMat = function() {
      return this.convertNiftiQFormToNiftiSForm(this.quatern_b, this.quatern_c, this.quatern_d, this.qoffset_x, this.qoffset_y, this.qoffset_z, this.pixDims[1], this.pixDims[2], this.pixDims[3], this.pixDims[0]);
    };
    nifti.NIFTI1.prototype.convertNiftiQFormToNiftiSForm = function(qb, qc, qd, qx, qy, qz, dx, dy, dz, qfac) {
      var R = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], a, b = qb, c = qc, d = qd, xd, yd, zd;
      R[3][0] = R[3][1] = R[3][2] = 0;
      R[3][3] = 1;
      a = 1 - (b * b + c * c + d * d);
      if (a < 1e-7) {
        a = 1 / Math.sqrt(b * b + c * c + d * d);
        b *= a;
        c *= a;
        d *= a;
        a = 0;
      } else {
        a = Math.sqrt(a);
      }
      xd = dx > 0 ? dx : 1;
      yd = dy > 0 ? dy : 1;
      zd = dz > 0 ? dz : 1;
      if (qfac < 0) {
        zd = -zd;
      }
      R[0][0] = (a * a + b * b - c * c - d * d) * xd;
      R[0][1] = 2 * (b * c - a * d) * yd;
      R[0][2] = 2 * (b * d + a * c) * zd;
      R[1][0] = 2 * (b * c + a * d) * xd;
      R[1][1] = (a * a + c * c - b * b - d * d) * yd;
      R[1][2] = 2 * (c * d - a * b) * zd;
      R[2][0] = 2 * (b * d - a * c) * xd;
      R[2][1] = 2 * (c * d + a * b) * yd;
      R[2][2] = (a * a + d * d - c * c - b * b) * zd;
      R[0][3] = qx;
      R[1][3] = qy;
      R[2][3] = qz;
      return R;
    };
    nifti.NIFTI1.prototype.convertNiftiSFormToNEMA = function(R) {
      var xi, xj, xk, yi, yj, yk, zi, zj, zk, val, detQ, detP, i, j, k, p, q, r, ibest, jbest, kbest, pbest, qbest, rbest, M, vbest, Q, P, iChar, jChar, kChar, iSense, jSense, kSense;
      k = 0;
      Q = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      P = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      xi = R[0][0];
      xj = R[0][1];
      xk = R[0][2];
      yi = R[1][0];
      yj = R[1][1];
      yk = R[1][2];
      zi = R[2][0];
      zj = R[2][1];
      zk = R[2][2];
      val = Math.sqrt(xi * xi + yi * yi + zi * zi);
      if (val === 0) {
        return null;
      }
      xi /= val;
      yi /= val;
      zi /= val;
      val = Math.sqrt(xj * xj + yj * yj + zj * zj);
      if (val === 0) {
        return null;
      }
      xj /= val;
      yj /= val;
      zj /= val;
      val = xi * xj + yi * yj + zi * zj;
      if (Math.abs(val) > 1e-4) {
        xj -= val * xi;
        yj -= val * yi;
        zj -= val * zi;
        val = Math.sqrt(xj * xj + yj * yj + zj * zj);
        if (val === 0) {
          return null;
        }
        xj /= val;
        yj /= val;
        zj /= val;
      }
      val = Math.sqrt(xk * xk + yk * yk + zk * zk);
      if (val === 0) {
        xk = yi * zj - zi * yj;
        yk = zi * xj - zj * xi;
        zk = xi * yj - yi * xj;
      } else {
        xk /= val;
        yk /= val;
        zk /= val;
      }
      val = xi * xk + yi * yk + zi * zk;
      if (Math.abs(val) > 1e-4) {
        xk -= val * xi;
        yk -= val * yi;
        zk -= val * zi;
        val = Math.sqrt(xk * xk + yk * yk + zk * zk);
        if (val === 0) {
          return null;
        }
        xk /= val;
        yk /= val;
        zk /= val;
      }
      val = xj * xk + yj * yk + zj * zk;
      if (Math.abs(val) > 1e-4) {
        xk -= val * xj;
        yk -= val * yj;
        zk -= val * zj;
        val = Math.sqrt(xk * xk + yk * yk + zk * zk);
        if (val === 0) {
          return null;
        }
        xk /= val;
        yk /= val;
        zk /= val;
      }
      Q[0][0] = xi;
      Q[0][1] = xj;
      Q[0][2] = xk;
      Q[1][0] = yi;
      Q[1][1] = yj;
      Q[1][2] = yk;
      Q[2][0] = zi;
      Q[2][1] = zj;
      Q[2][2] = zk;
      detQ = this.nifti_mat33_determ(Q);
      if (detQ === 0) {
        return null;
      }
      vbest = -666;
      ibest = pbest = qbest = rbest = 1;
      jbest = 2;
      kbest = 3;
      for (i = 1; i <= 3; i += 1) {
        for (j = 1; j <= 3; j += 1) {
          if (i !== j) {
            for (k = 1; k <= 3; k += 1) {
              if (!(i === k || j === k)) {
                P[0][0] = P[0][1] = P[0][2] = P[1][0] = P[1][1] = P[1][2] = P[2][0] = P[2][1] = P[2][2] = 0;
                for (p = -1; p <= 1; p += 2) {
                  for (q = -1; q <= 1; q += 2) {
                    for (r = -1; r <= 1; r += 2) {
                      P[0][i - 1] = p;
                      P[1][j - 1] = q;
                      P[2][k - 1] = r;
                      detP = this.nifti_mat33_determ(P);
                      if (detP * detQ > 0) {
                        M = this.nifti_mat33_mul(P, Q);
                        val = M[0][0] + M[1][1] + M[2][2];
                        if (val > vbest) {
                          vbest = val;
                          ibest = i;
                          jbest = j;
                          kbest = k;
                          pbest = p;
                          qbest = q;
                          rbest = r;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      iChar = jChar = kChar = iSense = jSense = kSense = 0;
      switch (ibest * pbest) {
        case 1:
          iChar = "X";
          iSense = "+";
          break;
        case -1:
          iChar = "X";
          iSense = "-";
          break;
        case 2:
          iChar = "Y";
          iSense = "+";
          break;
        case -2:
          iChar = "Y";
          iSense = "-";
          break;
        case 3:
          iChar = "Z";
          iSense = "+";
          break;
        case -3:
          iChar = "Z";
          iSense = "-";
          break;
      }
      switch (jbest * qbest) {
        case 1:
          jChar = "X";
          jSense = "+";
          break;
        case -1:
          jChar = "X";
          jSense = "-";
          break;
        case 2:
          jChar = "Y";
          jSense = "+";
          break;
        case -2:
          jChar = "Y";
          jSense = "-";
          break;
        case 3:
          jChar = "Z";
          jSense = "+";
          break;
        case -3:
          jChar = "Z";
          jSense = "-";
          break;
      }
      switch (kbest * rbest) {
        case 1:
          kChar = "X";
          kSense = "+";
          break;
        case -1:
          kChar = "X";
          kSense = "-";
          break;
        case 2:
          kChar = "Y";
          kSense = "+";
          break;
        case -2:
          kChar = "Y";
          kSense = "-";
          break;
        case 3:
          kChar = "Z";
          kSense = "+";
          break;
        case -3:
          kChar = "Z";
          kSense = "-";
          break;
      }
      return iChar + jChar + kChar + iSense + jSense + kSense;
    };
    nifti.NIFTI1.prototype.nifti_mat33_mul = function(A, B) {
      var C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], i, j;
      for (i = 0; i < 3; i += 1) {
        for (j = 0; j < 3; j += 1) {
          C[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
        }
      }
      return C;
    };
    nifti.NIFTI1.prototype.nifti_mat33_determ = function(R) {
      var r11, r12, r13, r21, r22, r23, r31, r32, r33;
      r11 = R[0][0];
      r12 = R[0][1];
      r13 = R[0][2];
      r21 = R[1][0];
      r22 = R[1][1];
      r23 = R[1][2];
      r31 = R[2][0];
      r32 = R[2][1];
      r33 = R[2][2];
      return r11 * r22 * r33 - r11 * r32 * r23 - r21 * r12 * r33 + r21 * r32 * r13 + r31 * r12 * r23 - r31 * r22 * r13;
    };
    nifti.NIFTI1.prototype.getExtensionLocation = function() {
      return nifti.NIFTI1.MAGIC_COOKIE + 4;
    };
    nifti.NIFTI1.prototype.getExtensionSize = function(data) {
      return nifti.Utils.getIntAt(data, this.getExtensionLocation(), this.littleEndian);
    };
    nifti.NIFTI1.prototype.getExtensionCode = function(data) {
      return nifti.Utils.getIntAt(data, this.getExtensionLocation() + 4, this.littleEndian);
    };
    var moduleType = typeof module;
    if (moduleType !== "undefined" && module.exports) {
      module.exports = nifti.NIFTI1;
    }
  });

  // node_modules/nifti-reader-js/src/nifti2.js
  var require_nifti2 = __commonJS((exports, module) => {
    "use strict";
    var nifti = nifti || {};
    nifti.Utils = nifti.Utils || require_utilities();
    nifti.NIFTI1 = nifti.NIFTI1 || require_nifti1();
    nifti.NIFTI2 = nifti.NIFTI2 || function() {
      this.littleEndian = false;
      this.dim_info = 0;
      this.dims = [];
      this.intent_p1 = 0;
      this.intent_p2 = 0;
      this.intent_p3 = 0;
      this.intent_code = 0;
      this.datatypeCode = 0;
      this.numBitsPerVoxel = 0;
      this.slice_start = 0;
      this.slice_end = 0;
      this.slice_code = 0;
      this.pixDims = [];
      this.vox_offset = 0;
      this.scl_slope = 1;
      this.scl_inter = 0;
      this.xyzt_units = 0;
      this.cal_max = 0;
      this.cal_min = 0;
      this.slice_duration = 0;
      this.toffset = 0;
      this.description = "";
      this.aux_file = "";
      this.intent_name = "";
      this.qform_code = 0;
      this.sform_code = 0;
      this.quatern_b = 0;
      this.quatern_c = 0;
      this.quatern_d = 0;
      this.qoffset_x = 0;
      this.qoffset_y = 0;
      this.qoffset_z = 0;
      this.affine = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
      this.magic = 0;
      this.extensionFlag = [0, 0, 0, 0];
    };
    nifti.NIFTI2.MAGIC_COOKIE = 540;
    nifti.NIFTI2.MAGIC_NUMBER_LOCATION = 4;
    nifti.NIFTI2.MAGIC_NUMBER = [110, 43, 50, 0, 13, 10, 26, 10];
    nifti.NIFTI2.prototype.readHeader = function(data) {
      var rawData = new DataView(data), magicCookieVal = nifti.Utils.getIntAt(rawData, 0, this.littleEndian), ctr, ctrOut, ctrIn, index2, array7;
      if (magicCookieVal !== nifti.NIFTI2.MAGIC_COOKIE) {
        this.littleEndian = true;
        magicCookieVal = nifti.Utils.getIntAt(rawData, 0, this.littleEndian);
      }
      if (magicCookieVal !== nifti.NIFTI2.MAGIC_COOKIE) {
        throw new Error("This does not appear to be a NIFTI file!");
      }
      this.datatypeCode = nifti.Utils.getShortAt(rawData, 12, this.littleEndian);
      this.numBitsPerVoxel = nifti.Utils.getShortAt(rawData, 14, this.littleEndian);
      for (ctr = 0; ctr < 8; ctr += 1) {
        index2 = 16 + ctr * 8;
        this.dims[ctr] = nifti.Utils.getLongAt(rawData, index2, this.littleEndian);
      }
      this.intent_p1 = nifti.Utils.getDoubleAt(rawData, 80, this.littleEndian);
      this.intent_p2 = nifti.Utils.getDoubleAt(rawData, 88, this.littleEndian);
      this.intent_p3 = nifti.Utils.getDoubleAt(rawData, 96, this.littleEndian);
      for (ctr = 0; ctr < 8; ctr += 1) {
        index2 = 104 + ctr * 8;
        this.pixDims[ctr] = nifti.Utils.getDoubleAt(rawData, index2, this.littleEndian);
      }
      this.vox_offset = nifti.Utils.getLongAt(rawData, 168, this.littleEndian);
      this.scl_slope = nifti.Utils.getDoubleAt(rawData, 176, this.littleEndian);
      this.scl_inter = nifti.Utils.getDoubleAt(rawData, 184, this.littleEndian);
      this.cal_max = nifti.Utils.getDoubleAt(rawData, 192, this.littleEndian);
      this.cal_min = nifti.Utils.getDoubleAt(rawData, 200, this.littleEndian);
      this.slice_duration = nifti.Utils.getDoubleAt(rawData, 208, this.littleEndian);
      this.toffset = nifti.Utils.getDoubleAt(rawData, 216, this.littleEndian);
      this.slice_start = nifti.Utils.getLongAt(rawData, 224, this.littleEndian);
      this.slice_end = nifti.Utils.getLongAt(rawData, 232, this.littleEndian);
      this.description = nifti.Utils.getStringAt(rawData, 240, 240 + 80);
      this.aux_file = nifti.Utils.getStringAt(rawData, 320, 320 + 24);
      this.qform_code = nifti.Utils.getIntAt(rawData, 344, this.littleEndian);
      this.sform_code = nifti.Utils.getIntAt(rawData, 348, this.littleEndian);
      this.quatern_b = nifti.Utils.getDoubleAt(rawData, 352, this.littleEndian);
      this.quatern_c = nifti.Utils.getDoubleAt(rawData, 360, this.littleEndian);
      this.quatern_d = nifti.Utils.getDoubleAt(rawData, 368, this.littleEndian);
      this.qoffset_x = nifti.Utils.getDoubleAt(rawData, 376, this.littleEndian);
      this.qoffset_y = nifti.Utils.getDoubleAt(rawData, 384, this.littleEndian);
      this.qoffset_z = nifti.Utils.getDoubleAt(rawData, 392, this.littleEndian);
      for (ctrOut = 0; ctrOut < 3; ctrOut += 1) {
        for (ctrIn = 0; ctrIn < 4; ctrIn += 1) {
          index2 = 400 + (ctrOut * 4 + ctrIn) * 8;
          this.affine[ctrOut][ctrIn] = nifti.Utils.getDoubleAt(rawData, index2, this.littleEndian);
        }
      }
      this.affine[3][0] = 0;
      this.affine[3][1] = 0;
      this.affine[3][2] = 0;
      this.affine[3][3] = 1;
      this.slice_code = nifti.Utils.getIntAt(rawData, 496, this.littleEndian);
      this.xyzt_units = nifti.Utils.getIntAt(rawData, 500, this.littleEndian);
      this.intent_code = nifti.Utils.getIntAt(rawData, 504, this.littleEndian);
      this.intent_name = nifti.Utils.getStringAt(rawData, 508, 508 + 16);
      this.dim_info = nifti.Utils.getByteAt(rawData, 524);
      if (rawData.byteLength > nifti.NIFTI2.MAGIC_COOKIE) {
        this.extensionFlag[0] = nifti.Utils.getByteAt(rawData, 540);
        this.extensionFlag[1] = nifti.Utils.getByteAt(rawData, 540 + 1);
        this.extensionFlag[2] = nifti.Utils.getByteAt(rawData, 540 + 2);
        this.extensionFlag[3] = nifti.Utils.getByteAt(rawData, 540 + 3);
        if (this.extensionFlag[0]) {
          this.extensionSize = this.getExtensionSize(rawData);
          this.extensionCode = this.getExtensionCode(rawData);
        }
      }
    };
    nifti.NIFTI2.prototype.toFormattedString = function() {
      var fmt = nifti.Utils.formatNumber, string2 = "";
      string2 += "Datatype = " + +this.datatypeCode + " (" + this.getDatatypeCodeString(this.datatypeCode) + ")\n";
      string2 += "Bits Per Voxel =  = " + this.numBitsPerVoxel + "\n";
      string2 += "Image Dimensions (1-8): " + this.dims[0] + ", " + this.dims[1] + ", " + this.dims[2] + ", " + this.dims[3] + ", " + this.dims[4] + ", " + this.dims[5] + ", " + this.dims[6] + ", " + this.dims[7] + "\n";
      string2 += "Intent Parameters (1-3): " + this.intent_p1 + ", " + this.intent_p2 + ", " + this.intent_p3 + "\n";
      string2 += "Voxel Dimensions (1-8): " + fmt(this.pixDims[0]) + ", " + fmt(this.pixDims[1]) + ", " + fmt(this.pixDims[2]) + ", " + fmt(this.pixDims[3]) + ", " + fmt(this.pixDims[4]) + ", " + fmt(this.pixDims[5]) + ", " + fmt(this.pixDims[6]) + ", " + fmt(this.pixDims[7]) + "\n";
      string2 += "Image Offset = " + this.vox_offset + "\n";
      string2 += "Data Scale:  Slope = " + fmt(this.scl_slope) + "  Intercept = " + fmt(this.scl_inter) + "\n";
      string2 += "Display Range:  Max = " + fmt(this.cal_max) + "  Min = " + fmt(this.cal_min) + "\n";
      string2 += "Slice Duration = " + this.slice_duration + "\n";
      string2 += "Time Axis Shift = " + this.toffset + "\n";
      string2 += "Slice Start = " + this.slice_start + "\n";
      string2 += "Slice End = " + this.slice_end + "\n";
      string2 += 'Description: "' + this.description + '"\n';
      string2 += 'Auxiliary File: "' + this.aux_file + '"\n';
      string2 += "Q-Form Code = " + this.qform_code + " (" + this.getTransformCodeString(this.qform_code) + ")\n";
      string2 += "S-Form Code = " + this.sform_code + " (" + this.getTransformCodeString(this.sform_code) + ")\n";
      string2 += "Quaternion Parameters:  b = " + fmt(this.quatern_b) + "  c = " + fmt(this.quatern_c) + "  d = " + fmt(this.quatern_d) + "\n";
      string2 += "Quaternion Offsets:  x = " + this.qoffset_x + "  y = " + this.qoffset_y + "  z = " + this.qoffset_z + "\n";
      string2 += "S-Form Parameters X: " + fmt(this.affine[0][0]) + ", " + fmt(this.affine[0][1]) + ", " + fmt(this.affine[0][2]) + ", " + fmt(this.affine[0][3]) + "\n";
      string2 += "S-Form Parameters Y: " + fmt(this.affine[1][0]) + ", " + fmt(this.affine[1][1]) + ", " + fmt(this.affine[1][2]) + ", " + fmt(this.affine[1][3]) + "\n";
      string2 += "S-Form Parameters Z: " + fmt(this.affine[2][0]) + ", " + fmt(this.affine[2][1]) + ", " + fmt(this.affine[2][2]) + ", " + fmt(this.affine[2][3]) + "\n";
      string2 += "Slice Code = " + this.slice_code + "\n";
      string2 += "Units Code = " + this.xyzt_units + " (" + this.getUnitsCodeString(nifti.NIFTI1.SPATIAL_UNITS_MASK & this.xyzt_units) + ", " + this.getUnitsCodeString(nifti.NIFTI1.TEMPORAL_UNITS_MASK & this.xyzt_units) + ")\n";
      string2 += "Intent Code = " + this.intent_code + "\n";
      string2 += 'Intent Name: "' + this.intent_name + '"\n';
      string2 += "Dim Info = " + this.dim_info + "\n";
      return string2;
    };
    nifti.NIFTI2.prototype.getExtensionLocation = function() {
      return nifti.NIFTI2.MAGIC_COOKIE + 4;
    };
    nifti.NIFTI2.prototype.getExtensionSize = nifti.NIFTI1.prototype.getExtensionSize;
    nifti.NIFTI2.prototype.getExtensionCode = nifti.NIFTI1.prototype.getExtensionCode;
    nifti.NIFTI2.prototype.getDatatypeCodeString = nifti.NIFTI1.prototype.getDatatypeCodeString;
    nifti.NIFTI2.prototype.getTransformCodeString = nifti.NIFTI1.prototype.getTransformCodeString;
    nifti.NIFTI2.prototype.getUnitsCodeString = nifti.NIFTI1.prototype.getUnitsCodeString;
    nifti.NIFTI2.prototype.getQformMat = nifti.NIFTI1.prototype.getQformMat;
    nifti.NIFTI2.prototype.convertNiftiQFormToNiftiSForm = nifti.NIFTI1.prototype.convertNiftiQFormToNiftiSForm;
    nifti.NIFTI2.prototype.convertNiftiSFormToNEMA = nifti.NIFTI1.prototype.convertNiftiSFormToNEMA;
    nifti.NIFTI2.prototype.nifti_mat33_mul = nifti.NIFTI1.prototype.nifti_mat33_mul;
    nifti.NIFTI2.prototype.nifti_mat33_determ = nifti.NIFTI1.prototype.nifti_mat33_determ;
    var moduleType = typeof module;
    if (moduleType !== "undefined" && module.exports) {
      module.exports = nifti.NIFTI2;
    }
  });

  // node_modules/pako/dist/pako.esm.mjs
  var require_pako_esm = __commonJS((exports) => {
    __export(exports, {
      default: () => pako_esm_default
    });
    /*! pako 2.0.1 https://github.com/nodeca/pako @license (MIT AND Zlib) */
    const Z_FIXED = 4;
    const Z_BINARY = 0;
    const Z_TEXT = 1;
    const Z_UNKNOWN = 2;
    function zero3(buf) {
      let len4 = buf.length;
      while (--len4 >= 0) {
        buf[len4] = 0;
      }
    }
    const STORED_BLOCK = 0;
    const STATIC_TREES = 1;
    const DYN_TREES = 2;
    const MIN_MATCH = 3;
    const MAX_MATCH = 258;
    const LENGTH_CODES = 29;
    const LITERALS = 256;
    const L_CODES = LITERALS + 1 + LENGTH_CODES;
    const D_CODES = 30;
    const BL_CODES = 19;
    const HEAP_SIZE = 2 * L_CODES + 1;
    const MAX_BITS = 15;
    const Buf_size = 16;
    const MAX_BL_BITS = 7;
    const END_BLOCK = 256;
    const REP_3_6 = 16;
    const REPZ_3_10 = 17;
    const REPZ_11_138 = 18;
    const extra_lbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
    const extra_dbits = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
    const extra_blbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
    const bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    const DIST_CODE_LEN = 512;
    const static_ltree = new Array((L_CODES + 2) * 2);
    zero3(static_ltree);
    const static_dtree = new Array(D_CODES * 2);
    zero3(static_dtree);
    const _dist_code = new Array(DIST_CODE_LEN);
    zero3(_dist_code);
    const _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
    zero3(_length_code);
    const base_length = new Array(LENGTH_CODES);
    zero3(base_length);
    const base_dist = new Array(D_CODES);
    zero3(base_dist);
    function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
      this.static_tree = static_tree;
      this.extra_bits = extra_bits;
      this.extra_base = extra_base;
      this.elems = elems;
      this.max_length = max_length;
      this.has_stree = static_tree && static_tree.length;
    }
    let static_l_desc;
    let static_d_desc;
    let static_bl_desc;
    function TreeDesc(dyn_tree, stat_desc) {
      this.dyn_tree = dyn_tree;
      this.max_code = 0;
      this.stat_desc = stat_desc;
    }
    const d_code = (dist3) => {
      return dist3 < 256 ? _dist_code[dist3] : _dist_code[256 + (dist3 >>> 7)];
    };
    const put_short = (s, w) => {
      s.pending_buf[s.pending++] = w & 255;
      s.pending_buf[s.pending++] = w >>> 8 & 255;
    };
    const send_bits = (s, value, length4) => {
      if (s.bi_valid > Buf_size - length4) {
        s.bi_buf |= value << s.bi_valid & 65535;
        put_short(s, s.bi_buf);
        s.bi_buf = value >> Buf_size - s.bi_valid;
        s.bi_valid += length4 - Buf_size;
      } else {
        s.bi_buf |= value << s.bi_valid & 65535;
        s.bi_valid += length4;
      }
    };
    const send_code = (s, c, tree) => {
      send_bits(s, tree[c * 2], tree[c * 2 + 1]);
    };
    const bi_reverse = (code, len4) => {
      let res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len4 > 0);
      return res >>> 1;
    };
    const bi_flush = (s) => {
      if (s.bi_valid === 16) {
        put_short(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;
      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 255;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    };
    const gen_bitlen = (s, desc) => {
      const tree = desc.dyn_tree;
      const max_code = desc.max_code;
      const stree = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const extra = desc.stat_desc.extra_bits;
      const base39 = desc.stat_desc.extra_base;
      const max_length = desc.stat_desc.max_length;
      let h;
      let n, m;
      let bits;
      let xbits;
      let f;
      let overflow = 0;
      for (bits = 0; bits <= MAX_BITS; bits++) {
        s.bl_count[bits] = 0;
      }
      tree[s.heap[s.heap_max] * 2 + 1] = 0;
      for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1] = bits;
        if (n > max_code) {
          continue;
        }
        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base39) {
          xbits = extra[n - base39];
        }
        f = tree[n * 2];
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1] + xbits);
        }
      }
      if (overflow === 0) {
        return;
      }
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) {
          bits--;
        }
        s.bl_count[bits]--;
        s.bl_count[bits + 1] += 2;
        s.bl_count[max_length]--;
        overflow -= 2;
      } while (overflow > 0);
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) {
            continue;
          }
          if (tree[m * 2 + 1] !== bits) {
            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
            tree[m * 2 + 1] = bits;
          }
          n--;
        }
      }
    };
    const gen_codes = (tree, max_code, bl_count) => {
      const next_code = new Array(MAX_BITS + 1);
      let code = 0;
      let bits;
      let n;
      for (bits = 1; bits <= MAX_BITS; bits++) {
        next_code[bits] = code = code + bl_count[bits - 1] << 1;
      }
      for (n = 0; n <= max_code; n++) {
        let len4 = tree[n * 2 + 1];
        if (len4 === 0) {
          continue;
        }
        tree[n * 2] = bi_reverse(next_code[len4]++, len4);
      }
    };
    const tr_static_init = () => {
      let n;
      let bits;
      let length4;
      let code;
      let dist3;
      const bl_count = new Array(MAX_BITS + 1);
      length4 = 0;
      for (code = 0; code < LENGTH_CODES - 1; code++) {
        base_length[code] = length4;
        for (n = 0; n < 1 << extra_lbits[code]; n++) {
          _length_code[length4++] = code;
        }
      }
      _length_code[length4 - 1] = code;
      dist3 = 0;
      for (code = 0; code < 16; code++) {
        base_dist[code] = dist3;
        for (n = 0; n < 1 << extra_dbits[code]; n++) {
          _dist_code[dist3++] = code;
        }
      }
      dist3 >>= 7;
      for (; code < D_CODES; code++) {
        base_dist[code] = dist3 << 7;
        for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
          _dist_code[256 + dist3++] = code;
        }
      }
      for (bits = 0; bits <= MAX_BITS; bits++) {
        bl_count[bits] = 0;
      }
      n = 0;
      while (n <= 143) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree[n * 2 + 1] = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree[n * 2 + 1] = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      gen_codes(static_ltree, L_CODES + 1, bl_count);
      for (n = 0; n < D_CODES; n++) {
        static_dtree[n * 2 + 1] = 5;
        static_dtree[n * 2] = bi_reverse(n, 5);
      }
      static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
      static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
      static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
    };
    const init_block = (s) => {
      let n;
      for (n = 0; n < L_CODES; n++) {
        s.dyn_ltree[n * 2] = 0;
      }
      for (n = 0; n < D_CODES; n++) {
        s.dyn_dtree[n * 2] = 0;
      }
      for (n = 0; n < BL_CODES; n++) {
        s.bl_tree[n * 2] = 0;
      }
      s.dyn_ltree[END_BLOCK * 2] = 1;
      s.opt_len = s.static_len = 0;
      s.last_lit = s.matches = 0;
    };
    const bi_windup = (s) => {
      if (s.bi_valid > 8) {
        put_short(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    };
    const copy_block = (s, buf, len4, header) => {
      bi_windup(s);
      if (header) {
        put_short(s, len4);
        put_short(s, ~len4);
      }
      s.pending_buf.set(s.window.subarray(buf, buf + len4), s.pending);
      s.pending += len4;
    };
    const smaller = (tree, n, m, depth) => {
      const _n2 = n * 2;
      const _m2 = m * 2;
      return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
    };
    const pqdownheap = (s, tree, k) => {
      const v = s.heap[k];
      let j = k << 1;
      while (j <= s.heap_len) {
        if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        if (smaller(tree, v, s.heap[j], s.depth)) {
          break;
        }
        s.heap[k] = s.heap[j];
        k = j;
        j <<= 1;
      }
      s.heap[k] = v;
    };
    const compress_block = (s, ltree, dtree) => {
      let dist3;
      let lc;
      let lx = 0;
      let code;
      let extra;
      if (s.last_lit !== 0) {
        do {
          dist3 = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
          lc = s.pending_buf[s.l_buf + lx];
          lx++;
          if (dist3 === 0) {
            send_code(s, lc, ltree);
          } else {
            code = _length_code[lc];
            send_code(s, code + LITERALS + 1, ltree);
            extra = extra_lbits[code];
            if (extra !== 0) {
              lc -= base_length[code];
              send_bits(s, lc, extra);
            }
            dist3--;
            code = d_code(dist3);
            send_code(s, code, dtree);
            extra = extra_dbits[code];
            if (extra !== 0) {
              dist3 -= base_dist[code];
              send_bits(s, dist3, extra);
            }
          }
        } while (lx < s.last_lit);
      }
      send_code(s, END_BLOCK, ltree);
    };
    const build_tree = (s, desc) => {
      const tree = desc.dyn_tree;
      const stree = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const elems = desc.stat_desc.elems;
      let n, m;
      let max_code = -1;
      let node;
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE;
      for (n = 0; n < elems; n++) {
        if (tree[n * 2] !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
        } else {
          tree[n * 2 + 1] = 0;
        }
      }
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
        tree[node * 2] = 1;
        s.depth[node] = 0;
        s.opt_len--;
        if (has_stree) {
          s.static_len -= stree[node * 2 + 1];
        }
      }
      desc.max_code = max_code;
      for (n = s.heap_len >> 1; n >= 1; n--) {
        pqdownheap(s, tree, n);
      }
      node = elems;
      do {
        n = s.heap[1];
        s.heap[1] = s.heap[s.heap_len--];
        pqdownheap(s, tree, 1);
        m = s.heap[1];
        s.heap[--s.heap_max] = n;
        s.heap[--s.heap_max] = m;
        tree[node * 2] = tree[n * 2] + tree[m * 2];
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1] = tree[m * 2 + 1] = node;
        s.heap[1] = node++;
        pqdownheap(s, tree, 1);
      } while (s.heap_len >= 2);
      s.heap[--s.heap_max] = s.heap[1];
      gen_bitlen(s, desc);
      gen_codes(tree, max_code, s.bl_count);
    };
    const scan_tree = (s, tree, max_code) => {
      let n;
      let prevlen = -1;
      let curlen;
      let nextlen = tree[0 * 2 + 1];
      let count = 0;
      let max_count = 7;
      let min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1] = 65535;
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          s.bl_tree[curlen * 2] += count;
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            s.bl_tree[curlen * 2]++;
          }
          s.bl_tree[REP_3_6 * 2]++;
        } else if (count <= 10) {
          s.bl_tree[REPZ_3_10 * 2]++;
        } else {
          s.bl_tree[REPZ_11_138 * 2]++;
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    const send_tree = (s, tree, max_code) => {
      let n;
      let prevlen = -1;
      let curlen;
      let nextlen = tree[0 * 2 + 1];
      let count = 0;
      let max_count = 7;
      let min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          do {
            send_code(s, curlen, s.bl_tree);
          } while (--count !== 0);
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code(s, curlen, s.bl_tree);
            count--;
          }
          send_code(s, REP_3_6, s.bl_tree);
          send_bits(s, count - 3, 2);
        } else if (count <= 10) {
          send_code(s, REPZ_3_10, s.bl_tree);
          send_bits(s, count - 3, 3);
        } else {
          send_code(s, REPZ_11_138, s.bl_tree);
          send_bits(s, count - 11, 7);
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    const build_bl_tree = (s) => {
      let max_blindex;
      scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
      build_tree(s, s.bl_desc);
      for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
          break;
        }
      }
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex;
    };
    const send_all_trees = (s, lcodes, dcodes, blcodes) => {
      let rank2;
      send_bits(s, lcodes - 257, 5);
      send_bits(s, dcodes - 1, 5);
      send_bits(s, blcodes - 4, 4);
      for (rank2 = 0; rank2 < blcodes; rank2++) {
        send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
      }
      send_tree(s, s.dyn_ltree, lcodes - 1);
      send_tree(s, s.dyn_dtree, dcodes - 1);
    };
    const detect_data_type = (s) => {
      let black_mask = 4093624447;
      let n;
      for (n = 0; n <= 31; n++, black_mask >>>= 1) {
        if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
          return Z_BINARY;
        }
      }
      if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
        return Z_TEXT;
      }
      for (n = 32; n < LITERALS; n++) {
        if (s.dyn_ltree[n * 2] !== 0) {
          return Z_TEXT;
        }
      }
      return Z_BINARY;
    };
    let static_init_done = false;
    const _tr_init = (s) => {
      if (!static_init_done) {
        tr_static_init();
        static_init_done = true;
      }
      s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
      s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
      s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
      s.bi_buf = 0;
      s.bi_valid = 0;
      init_block(s);
    };
    const _tr_stored_block = (s, buf, stored_len, last) => {
      send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
      copy_block(s, buf, stored_len, true);
    };
    const _tr_align = (s) => {
      send_bits(s, STATIC_TREES << 1, 3);
      send_code(s, END_BLOCK, static_ltree);
      bi_flush(s);
    };
    const _tr_flush_block = (s, buf, stored_len, last) => {
      let opt_lenb, static_lenb;
      let max_blindex = 0;
      if (s.level > 0) {
        if (s.strm.data_type === Z_UNKNOWN) {
          s.strm.data_type = detect_data_type(s);
        }
        build_tree(s, s.l_desc);
        build_tree(s, s.d_desc);
        max_blindex = build_bl_tree(s);
        opt_lenb = s.opt_len + 3 + 7 >>> 3;
        static_lenb = s.static_len + 3 + 7 >>> 3;
        if (static_lenb <= opt_lenb) {
          opt_lenb = static_lenb;
        }
      } else {
        opt_lenb = static_lenb = stored_len + 5;
      }
      if (stored_len + 4 <= opt_lenb && buf !== -1) {
        _tr_stored_block(s, buf, stored_len, last);
      } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
        send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
        compress_block(s, static_ltree, static_dtree);
      } else {
        send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
        send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block(s, s.dyn_ltree, s.dyn_dtree);
      }
      init_block(s);
      if (last) {
        bi_windup(s);
      }
    };
    const _tr_tally = (s, dist3, lc) => {
      s.pending_buf[s.d_buf + s.last_lit * 2] = dist3 >>> 8 & 255;
      s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist3 & 255;
      s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
      s.last_lit++;
      if (dist3 === 0) {
        s.dyn_ltree[lc * 2]++;
      } else {
        s.matches++;
        dist3--;
        s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
        s.dyn_dtree[d_code(dist3) * 2]++;
      }
      return s.last_lit === s.lit_bufsize - 1;
    };
    var _tr_init_1 = _tr_init;
    var _tr_stored_block_1 = _tr_stored_block;
    var _tr_flush_block_1 = _tr_flush_block;
    var _tr_tally_1 = _tr_tally;
    var _tr_align_1 = _tr_align;
    var trees = {
      _tr_init: _tr_init_1,
      _tr_stored_block: _tr_stored_block_1,
      _tr_flush_block: _tr_flush_block_1,
      _tr_tally: _tr_tally_1,
      _tr_align: _tr_align_1
    };
    const adler32 = (adler, buf, len4, pos) => {
      let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
      while (len4 !== 0) {
        n = len4 > 2e3 ? 2e3 : len4;
        len4 -= n;
        do {
          s1 = s1 + buf[pos++] | 0;
          s2 = s2 + s1 | 0;
        } while (--n);
        s1 %= 65521;
        s2 %= 65521;
      }
      return s1 | s2 << 16 | 0;
    };
    var adler32_1 = adler32;
    const makeTable = () => {
      let c, table = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        table[n] = c;
      }
      return table;
    };
    const crcTable = new Uint32Array(makeTable());
    const crc32 = (crc, buf, len4, pos) => {
      const t = crcTable;
      const end = pos + len4;
      crc ^= -1;
      for (let i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
      }
      return crc ^ -1;
    };
    var crc32_1 = crc32;
    var messages = {
      2: "need dictionary",
      1: "stream end",
      0: "",
      "-1": "file error",
      "-2": "stream error",
      "-3": "data error",
      "-4": "insufficient memory",
      "-5": "buffer error",
      "-6": "incompatible version"
    };
    var constants = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_MEM_ERROR: -4,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8
    };
    const {_tr_init: _tr_init$1, _tr_stored_block: _tr_stored_block$1, _tr_flush_block: _tr_flush_block$1, _tr_tally: _tr_tally$1, _tr_align: _tr_align$1} = trees;
    const {
      Z_NO_FLUSH,
      Z_PARTIAL_FLUSH,
      Z_FULL_FLUSH,
      Z_FINISH,
      Z_BLOCK,
      Z_OK,
      Z_STREAM_END,
      Z_STREAM_ERROR,
      Z_DATA_ERROR,
      Z_BUF_ERROR,
      Z_DEFAULT_COMPRESSION,
      Z_FILTERED,
      Z_HUFFMAN_ONLY,
      Z_RLE,
      Z_FIXED: Z_FIXED$1,
      Z_DEFAULT_STRATEGY,
      Z_UNKNOWN: Z_UNKNOWN$1,
      Z_DEFLATED
    } = constants;
    const MAX_MEM_LEVEL = 9;
    const MAX_WBITS = 15;
    const DEF_MEM_LEVEL = 8;
    const LENGTH_CODES$1 = 29;
    const LITERALS$1 = 256;
    const L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
    const D_CODES$1 = 30;
    const BL_CODES$1 = 19;
    const HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
    const MAX_BITS$1 = 15;
    const MIN_MATCH$1 = 3;
    const MAX_MATCH$1 = 258;
    const MIN_LOOKAHEAD = MAX_MATCH$1 + MIN_MATCH$1 + 1;
    const PRESET_DICT = 32;
    const INIT_STATE = 42;
    const EXTRA_STATE = 69;
    const NAME_STATE = 73;
    const COMMENT_STATE = 91;
    const HCRC_STATE = 103;
    const BUSY_STATE = 113;
    const FINISH_STATE = 666;
    const BS_NEED_MORE = 1;
    const BS_BLOCK_DONE = 2;
    const BS_FINISH_STARTED = 3;
    const BS_FINISH_DONE = 4;
    const OS_CODE = 3;
    const err = (strm, errorCode) => {
      strm.msg = messages[errorCode];
      return errorCode;
    };
    const rank = (f) => {
      return (f << 1) - (f > 4 ? 9 : 0);
    };
    const zero$1 = (buf) => {
      let len4 = buf.length;
      while (--len4 >= 0) {
        buf[len4] = 0;
      }
    };
    let HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
    let HASH = HASH_ZLIB;
    const flush_pending = (strm) => {
      const s = strm.state;
      let len4 = s.pending;
      if (len4 > strm.avail_out) {
        len4 = strm.avail_out;
      }
      if (len4 === 0) {
        return;
      }
      strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len4), strm.next_out);
      strm.next_out += len4;
      s.pending_out += len4;
      strm.total_out += len4;
      strm.avail_out -= len4;
      s.pending -= len4;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    };
    const flush_block_only = (s, last) => {
      _tr_flush_block$1(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending(s.strm);
    };
    const put_byte = (s, b) => {
      s.pending_buf[s.pending++] = b;
    };
    const putShortMSB = (s, b) => {
      s.pending_buf[s.pending++] = b >>> 8 & 255;
      s.pending_buf[s.pending++] = b & 255;
    };
    const read_buf = (strm, buf, start, size) => {
      let len4 = strm.avail_in;
      if (len4 > size) {
        len4 = size;
      }
      if (len4 === 0) {
        return 0;
      }
      strm.avail_in -= len4;
      buf.set(strm.input.subarray(strm.next_in, strm.next_in + len4), start);
      if (strm.state.wrap === 1) {
        strm.adler = adler32_1(strm.adler, buf, len4, start);
      } else if (strm.state.wrap === 2) {
        strm.adler = crc32_1(strm.adler, buf, len4, start);
      }
      strm.next_in += len4;
      strm.total_in += len4;
      return len4;
    };
    const longest_match = (s, cur_match) => {
      let chain_length = s.max_chain_length;
      let scan = s.strstart;
      let match;
      let len4;
      let best_len = s.prev_length;
      let nice_match = s.nice_match;
      const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
      const _win = s.window;
      const wmask = s.w_mask;
      const prev = s.prev;
      const strend = s.strstart + MAX_MATCH$1;
      let scan_end1 = _win[scan + best_len - 1];
      let scan_end = _win[scan + best_len];
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      if (nice_match > s.lookahead) {
        nice_match = s.lookahead;
      }
      do {
        match = cur_match;
        if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
          continue;
        }
        scan += 2;
        match++;
        do {
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
        len4 = MAX_MATCH$1 - (strend - scan);
        scan = strend - MAX_MATCH$1;
        if (len4 > best_len) {
          s.match_start = cur_match;
          best_len = len4;
          if (len4 >= nice_match) {
            break;
          }
          scan_end1 = _win[scan + best_len - 1];
          scan_end = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    };
    const fill_window = (s) => {
      const _w_size = s.w_size;
      let p, n, m, more, str6;
      do {
        more = s.window_size - s.lookahead - s.strstart;
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
          s.window.set(s.window.subarray(_w_size, _w_size + _w_size), 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          s.block_start -= _w_size;
          n = s.hash_size;
          p = n;
          do {
            m = s.head[--p];
            s.head[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          n = _w_size;
          p = n;
          do {
            m = s.prev[--p];
            s.prev[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }
        n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;
        if (s.lookahead + s.insert >= MIN_MATCH$1) {
          str6 = s.strstart - s.insert;
          s.ins_h = s.window[str6];
          s.ins_h = HASH(s, s.ins_h, s.window[str6 + 1]);
          while (s.insert) {
            s.ins_h = HASH(s, s.ins_h, s.window[str6 + MIN_MATCH$1 - 1]);
            s.prev[str6 & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str6;
            str6++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH$1) {
              break;
            }
          }
        }
      } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    };
    const deflate_stored = (s, flush) => {
      let max_block_size = 65535;
      if (max_block_size > s.pending_buf_size - 5) {
        max_block_size = s.pending_buf_size - 5;
      }
      for (; ; ) {
        if (s.lookahead <= 1) {
          fill_window(s);
          if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.strstart += s.lookahead;
        s.lookahead = 0;
        const max_start = s.block_start + max_block_size;
        if (s.strstart === 0 || s.strstart >= max_start) {
          s.lookahead = s.strstart - max_start;
          s.strstart = max_start;
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.strstart > s.block_start) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_NEED_MORE;
    };
    const deflate_fast = (s, flush) => {
      let hash_head;
      let bflush;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH$1) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
        }
        if (s.match_length >= MIN_MATCH$1) {
          bflush = _tr_tally$1(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);
          s.lookahead -= s.match_length;
          if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH$1) {
            s.match_length--;
            do {
              s.strstart++;
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            } while (--s.match_length !== 0);
            s.strstart++;
          } else {
            s.strstart += s.match_length;
            s.match_length = 0;
            s.ins_h = s.window[s.strstart];
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
          }
        } else {
          bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    const deflate_slow = (s, flush) => {
      let hash_head;
      let bflush;
      let max_insert;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH$1) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH$1 - 1;
        if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
          if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096)) {
            s.match_length = MIN_MATCH$1 - 1;
          }
        }
        if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
          bflush = _tr_tally$1(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH$1 - 1]);
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH$1 - 1;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        } else if (s.match_available) {
          bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
          if (bflush) {
            flush_block_only(s, false);
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        } else {
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      if (s.match_available) {
        bflush = _tr_tally$1(s, 0, s.window[s.strstart - 1]);
        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    const deflate_rle = (s, flush) => {
      let bflush;
      let prev;
      let scan, strend;
      const _win = s.window;
      for (; ; ) {
        if (s.lookahead <= MAX_MATCH$1) {
          fill_window(s);
          if (s.lookahead <= MAX_MATCH$1 && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH$1;
            do {
            } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
            s.match_length = MAX_MATCH$1 - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
        }
        if (s.match_length >= MIN_MATCH$1) {
          bflush = _tr_tally$1(s, 1, s.match_length - MIN_MATCH$1);
          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    const deflate_huff = (s, flush) => {
      let bflush;
      for (; ; ) {
        if (s.lookahead === 0) {
          fill_window(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            break;
          }
        }
        s.match_length = 0;
        bflush = _tr_tally$1(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    function Config(good_length, max_lazy, nice_length, max_chain, func) {
      this.good_length = good_length;
      this.max_lazy = max_lazy;
      this.nice_length = nice_length;
      this.max_chain = max_chain;
      this.func = func;
    }
    const configuration_table = [
      new Config(0, 0, 0, 0, deflate_stored),
      new Config(4, 4, 8, 4, deflate_fast),
      new Config(4, 5, 16, 8, deflate_fast),
      new Config(4, 6, 32, 32, deflate_fast),
      new Config(4, 4, 16, 16, deflate_slow),
      new Config(8, 16, 32, 32, deflate_slow),
      new Config(8, 16, 128, 128, deflate_slow),
      new Config(8, 32, 128, 256, deflate_slow),
      new Config(32, 128, 258, 1024, deflate_slow),
      new Config(32, 258, 258, 4096, deflate_slow)
    ];
    const lm_init = (s) => {
      s.window_size = 2 * s.w_size;
      zero$1(s.head);
      s.max_lazy_match = configuration_table[s.level].max_lazy;
      s.good_match = configuration_table[s.level].good_length;
      s.nice_match = configuration_table[s.level].nice_length;
      s.max_chain_length = configuration_table[s.level].max_chain;
      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH$1 - 1;
      s.match_available = 0;
      s.ins_h = 0;
    };
    function DeflateState() {
      this.strm = null;
      this.status = 0;
      this.pending_buf = null;
      this.pending_buf_size = 0;
      this.pending_out = 0;
      this.pending = 0;
      this.wrap = 0;
      this.gzhead = null;
      this.gzindex = 0;
      this.method = Z_DEFLATED;
      this.last_flush = -1;
      this.w_size = 0;
      this.w_bits = 0;
      this.w_mask = 0;
      this.window = null;
      this.window_size = 0;
      this.prev = null;
      this.head = null;
      this.ins_h = 0;
      this.hash_size = 0;
      this.hash_bits = 0;
      this.hash_mask = 0;
      this.hash_shift = 0;
      this.block_start = 0;
      this.match_length = 0;
      this.prev_match = 0;
      this.match_available = 0;
      this.strstart = 0;
      this.match_start = 0;
      this.lookahead = 0;
      this.prev_length = 0;
      this.max_chain_length = 0;
      this.max_lazy_match = 0;
      this.level = 0;
      this.strategy = 0;
      this.good_match = 0;
      this.nice_match = 0;
      this.dyn_ltree = new Uint16Array(HEAP_SIZE$1 * 2);
      this.dyn_dtree = new Uint16Array((2 * D_CODES$1 + 1) * 2);
      this.bl_tree = new Uint16Array((2 * BL_CODES$1 + 1) * 2);
      zero$1(this.dyn_ltree);
      zero$1(this.dyn_dtree);
      zero$1(this.bl_tree);
      this.l_desc = null;
      this.d_desc = null;
      this.bl_desc = null;
      this.bl_count = new Uint16Array(MAX_BITS$1 + 1);
      this.heap = new Uint16Array(2 * L_CODES$1 + 1);
      zero$1(this.heap);
      this.heap_len = 0;
      this.heap_max = 0;
      this.depth = new Uint16Array(2 * L_CODES$1 + 1);
      zero$1(this.depth);
      this.l_buf = 0;
      this.lit_bufsize = 0;
      this.last_lit = 0;
      this.d_buf = 0;
      this.opt_len = 0;
      this.static_len = 0;
      this.matches = 0;
      this.insert = 0;
      this.bi_buf = 0;
      this.bi_valid = 0;
    }
    const deflateResetKeep = (strm) => {
      if (!strm || !strm.state) {
        return err(strm, Z_STREAM_ERROR);
      }
      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN$1;
      const s = strm.state;
      s.pending = 0;
      s.pending_out = 0;
      if (s.wrap < 0) {
        s.wrap = -s.wrap;
      }
      s.status = s.wrap ? INIT_STATE : BUSY_STATE;
      strm.adler = s.wrap === 2 ? 0 : 1;
      s.last_flush = Z_NO_FLUSH;
      _tr_init$1(s);
      return Z_OK;
    };
    const deflateReset = (strm) => {
      const ret = deflateResetKeep(strm);
      if (ret === Z_OK) {
        lm_init(strm.state);
      }
      return ret;
    };
    const deflateSetHeader = (strm, head) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      if (strm.state.wrap !== 2) {
        return Z_STREAM_ERROR;
      }
      strm.state.gzhead = head;
      return Z_OK;
    };
    const deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
      if (!strm) {
        return Z_STREAM_ERROR;
      }
      let wrap = 1;
      if (level === Z_DEFAULT_COMPRESSION) {
        level = 6;
      }
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else if (windowBits > 15) {
        wrap = 2;
        windowBits -= 16;
      }
      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED$1) {
        return err(strm, Z_STREAM_ERROR);
      }
      if (windowBits === 8) {
        windowBits = 9;
      }
      const s = new DeflateState();
      strm.state = s;
      s.strm = strm;
      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;
      s.hash_bits = memLevel + 7;
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);
      s.window = new Uint8Array(s.w_size * 2);
      s.head = new Uint16Array(s.hash_size);
      s.prev = new Uint16Array(s.w_size);
      s.lit_bufsize = 1 << memLevel + 6;
      s.pending_buf_size = s.lit_bufsize * 4;
      s.pending_buf = new Uint8Array(s.pending_buf_size);
      s.d_buf = 1 * s.lit_bufsize;
      s.l_buf = (1 + 2) * s.lit_bufsize;
      s.level = level;
      s.strategy = strategy;
      s.method = method;
      return deflateReset(strm);
    };
    const deflateInit = (strm, level) => {
      return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
    };
    const deflate = (strm, flush) => {
      let beg, val;
      if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
        return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
      }
      const s = strm.state;
      if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
        return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
      }
      s.strm = strm;
      const old_flush = s.last_flush;
      s.last_flush = flush;
      if (s.status === INIT_STATE) {
        if (s.wrap === 2) {
          strm.adler = 0;
          put_byte(s, 31);
          put_byte(s, 139);
          put_byte(s, 8);
          if (!s.gzhead) {
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, OS_CODE);
            s.status = BUSY_STATE;
          } else {
            put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
            put_byte(s, s.gzhead.time & 255);
            put_byte(s, s.gzhead.time >> 8 & 255);
            put_byte(s, s.gzhead.time >> 16 & 255);
            put_byte(s, s.gzhead.time >> 24 & 255);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte(s, s.gzhead.extra.length & 255);
              put_byte(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE;
          }
        } else {
          let header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
          let level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT;
          }
          header += 31 - header % 31;
          s.status = BUSY_STATE;
          putShortMSB(s, header);
          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 65535);
          }
          strm.adler = 1;
        }
      }
      if (s.status === EXTRA_STATE) {
        if (s.gzhead.extra) {
          beg = s.pending;
          while (s.gzindex < (s.gzhead.extra.length & 65535)) {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                break;
              }
            }
            put_byte(s, s.gzhead.extra[s.gzindex] & 255);
            s.gzindex++;
          }
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (s.gzindex === s.gzhead.extra.length) {
            s.gzindex = 0;
            s.status = NAME_STATE;
          }
        } else {
          s.status = NAME_STATE;
        }
      }
      if (s.status === NAME_STATE) {
        if (s.gzhead.name) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.gzindex = 0;
            s.status = COMMENT_STATE;
          }
        } else {
          s.status = COMMENT_STATE;
        }
      }
      if (s.status === COMMENT_STATE) {
        if (s.gzhead.comment) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.status = HCRC_STATE;
          }
        } else {
          s.status = HCRC_STATE;
        }
      }
      if (s.status === HCRC_STATE) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending(strm);
          }
          if (s.pending + 2 <= s.pending_buf_size) {
            put_byte(s, strm.adler & 255);
            put_byte(s, strm.adler >> 8 & 255);
            strm.adler = 0;
            s.status = BUSY_STATE;
          }
        } else {
          s.status = BUSY_STATE;
        }
      }
      if (s.pending !== 0) {
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
        return err(strm, Z_BUF_ERROR);
      }
      if (s.status === FINISH_STATE && strm.avail_in !== 0) {
        return err(strm, Z_BUF_ERROR);
      }
      if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
        let bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
        if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
          s.status = FINISH_STATE;
        }
        if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
          }
          return Z_OK;
        }
        if (bstate === BS_BLOCK_DONE) {
          if (flush === Z_PARTIAL_FLUSH) {
            _tr_align$1(s);
          } else if (flush !== Z_BLOCK) {
            _tr_stored_block$1(s, 0, 0, false);
            if (flush === Z_FULL_FLUSH) {
              zero$1(s.head);
              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        }
      }
      if (flush !== Z_FINISH) {
        return Z_OK;
      }
      if (s.wrap <= 0) {
        return Z_STREAM_END;
      }
      if (s.wrap === 2) {
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        put_byte(s, strm.adler >> 16 & 255);
        put_byte(s, strm.adler >> 24 & 255);
        put_byte(s, strm.total_in & 255);
        put_byte(s, strm.total_in >> 8 & 255);
        put_byte(s, strm.total_in >> 16 & 255);
        put_byte(s, strm.total_in >> 24 & 255);
      } else {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      flush_pending(strm);
      if (s.wrap > 0) {
        s.wrap = -s.wrap;
      }
      return s.pending !== 0 ? Z_OK : Z_STREAM_END;
    };
    const deflateEnd = (strm) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      const status3 = strm.state.status;
      if (status3 !== INIT_STATE && status3 !== EXTRA_STATE && status3 !== NAME_STATE && status3 !== COMMENT_STATE && status3 !== HCRC_STATE && status3 !== BUSY_STATE && status3 !== FINISH_STATE) {
        return err(strm, Z_STREAM_ERROR);
      }
      strm.state = null;
      return status3 === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
    };
    const deflateSetDictionary = (strm, dictionary) => {
      let dictLength = dictionary.length;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      const s = strm.state;
      const wrap = s.wrap;
      if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
        return Z_STREAM_ERROR;
      }
      if (wrap === 1) {
        strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
      }
      s.wrap = 0;
      if (dictLength >= s.w_size) {
        if (wrap === 0) {
          zero$1(s.head);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        let tmpDict = new Uint8Array(s.w_size);
        tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      const avail = strm.avail_in;
      const next = strm.next_in;
      const input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window(s);
      while (s.lookahead >= MIN_MATCH$1) {
        let str6 = s.strstart;
        let n = s.lookahead - (MIN_MATCH$1 - 1);
        do {
          s.ins_h = HASH(s, s.ins_h, s.window[str6 + MIN_MATCH$1 - 1]);
          s.prev[str6 & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str6;
          str6++;
        } while (--n);
        s.strstart = str6;
        s.lookahead = MIN_MATCH$1 - 1;
        fill_window(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH$1 - 1;
      s.match_available = 0;
      strm.next_in = next;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK;
    };
    var deflateInit_1 = deflateInit;
    var deflateInit2_1 = deflateInit2;
    var deflateReset_1 = deflateReset;
    var deflateResetKeep_1 = deflateResetKeep;
    var deflateSetHeader_1 = deflateSetHeader;
    var deflate_2 = deflate;
    var deflateEnd_1 = deflateEnd;
    var deflateSetDictionary_1 = deflateSetDictionary;
    var deflateInfo = "pako deflate (from Nodeca project)";
    var deflate_1 = {
      deflateInit: deflateInit_1,
      deflateInit2: deflateInit2_1,
      deflateReset: deflateReset_1,
      deflateResetKeep: deflateResetKeep_1,
      deflateSetHeader: deflateSetHeader_1,
      deflate: deflate_2,
      deflateEnd: deflateEnd_1,
      deflateSetDictionary: deflateSetDictionary_1,
      deflateInfo
    };
    const _has = (obj, key) => {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
    var assign = function(obj) {
      const sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        const source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (const p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    };
    var flattenChunks = (chunks) => {
      let len4 = 0;
      for (let i = 0, l = chunks.length; i < l; i++) {
        len4 += chunks[i].length;
      }
      const result = new Uint8Array(len4);
      for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
        let chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    };
    var common = {
      assign,
      flattenChunks
    };
    let STR_APPLY_UIA_OK = true;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (__) {
      STR_APPLY_UIA_OK = false;
    }
    const _utf8len = new Uint8Array(256);
    for (let q = 0; q < 256; q++) {
      _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
    }
    _utf8len[254] = _utf8len[254] = 1;
    var string2buf = (str6) => {
      let buf, c, c2, m_pos, i, str_len = str6.length, buf_len = 0;
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str6.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str6.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      buf = new Uint8Array(buf_len);
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str6.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str6.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        if (c < 128) {
          buf[i++] = c;
        } else if (c < 2048) {
          buf[i++] = 192 | c >>> 6;
          buf[i++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i++] = 224 | c >>> 12;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        } else {
          buf[i++] = 240 | c >>> 18;
          buf[i++] = 128 | c >>> 12 & 63;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        }
      }
      return buf;
    };
    const buf2binstring = (buf, len4) => {
      if (len4 < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK) {
          return String.fromCharCode.apply(null, buf.length === len4 ? buf : buf.subarray(0, len4));
        }
      }
      let result = "";
      for (let i = 0; i < len4; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    };
    var buf2string = (buf, max4) => {
      let i, out;
      const len4 = max4 || buf.length;
      const utf16buf = new Array(len4 * 2);
      for (out = 0, i = 0; i < len4; ) {
        let c = buf[i++];
        if (c < 128) {
          utf16buf[out++] = c;
          continue;
        }
        let c_len = _utf8len[c];
        if (c_len > 4) {
          utf16buf[out++] = 65533;
          i += c_len - 1;
          continue;
        }
        c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
        while (c_len > 1 && i < len4) {
          c = c << 6 | buf[i++] & 63;
          c_len--;
        }
        if (c_len > 1) {
          utf16buf[out++] = 65533;
          continue;
        }
        if (c < 65536) {
          utf16buf[out++] = c;
        } else {
          c -= 65536;
          utf16buf[out++] = 55296 | c >> 10 & 1023;
          utf16buf[out++] = 56320 | c & 1023;
        }
      }
      return buf2binstring(utf16buf, out);
    };
    var utf8border = (buf, max4) => {
      max4 = max4 || buf.length;
      if (max4 > buf.length) {
        max4 = buf.length;
      }
      let pos = max4 - 1;
      while (pos >= 0 && (buf[pos] & 192) === 128) {
        pos--;
      }
      if (pos < 0) {
        return max4;
      }
      if (pos === 0) {
        return max4;
      }
      return pos + _utf8len[buf[pos]] > max4 ? pos : max4;
    };
    var strings = {
      string2buf,
      buf2string,
      utf8border
    };
    function ZStream() {
      this.input = null;
      this.next_in = 0;
      this.avail_in = 0;
      this.total_in = 0;
      this.output = null;
      this.next_out = 0;
      this.avail_out = 0;
      this.total_out = 0;
      this.msg = "";
      this.state = null;
      this.data_type = 2;
      this.adler = 0;
    }
    var zstream = ZStream;
    const toString = Object.prototype.toString;
    const {
      Z_NO_FLUSH: Z_NO_FLUSH$1,
      Z_SYNC_FLUSH,
      Z_FULL_FLUSH: Z_FULL_FLUSH$1,
      Z_FINISH: Z_FINISH$1,
      Z_OK: Z_OK$1,
      Z_STREAM_END: Z_STREAM_END$1,
      Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
      Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
      Z_DEFLATED: Z_DEFLATED$1
    } = constants;
    function Deflate(options) {
      this.options = common.assign({
        level: Z_DEFAULT_COMPRESSION$1,
        method: Z_DEFLATED$1,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Z_DEFAULT_STRATEGY$1
      }, options || {});
      let opt = this.options;
      if (opt.raw && opt.windowBits > 0) {
        opt.windowBits = -opt.windowBits;
      } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
        opt.windowBits += 16;
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new zstream();
      this.strm.avail_out = 0;
      let status3 = deflate_1.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
      if (status3 !== Z_OK$1) {
        throw new Error(messages[status3]);
      }
      if (opt.header) {
        deflate_1.deflateSetHeader(this.strm, opt.header);
      }
      if (opt.dictionary) {
        let dict;
        if (typeof opt.dictionary === "string") {
          dict = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
          dict = new Uint8Array(opt.dictionary);
        } else {
          dict = opt.dictionary;
        }
        status3 = deflate_1.deflateSetDictionary(this.strm, dict);
        if (status3 !== Z_OK$1) {
          throw new Error(messages[status3]);
        }
        this._dict_set = true;
      }
    }
    Deflate.prototype.push = function(data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      let status3, _flush_mode;
      if (this.ended) {
        return false;
      }
      if (flush_mode === ~~flush_mode)
        _flush_mode = flush_mode;
      else
        _flush_mode = flush_mode === true ? Z_FINISH$1 : Z_NO_FLUSH$1;
      if (typeof data === "string") {
        strm.input = strings.string2buf(data);
      } else if (toString.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      for (; ; ) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH$1) && strm.avail_out <= 6) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
        status3 = deflate_1.deflate(strm, _flush_mode);
        if (status3 === Z_STREAM_END$1) {
          if (strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
          }
          status3 = deflate_1.deflateEnd(this.strm);
          this.onEnd(status3);
          this.ended = true;
          return status3 === Z_OK$1;
        }
        if (strm.avail_out === 0) {
          this.onData(strm.output);
          continue;
        }
        if (_flush_mode > 0 && strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
        if (strm.avail_in === 0)
          break;
      }
      return true;
    };
    Deflate.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Deflate.prototype.onEnd = function(status3) {
      if (status3 === Z_OK$1) {
        this.result = common.flattenChunks(this.chunks);
      }
      this.chunks = [];
      this.err = status3;
      this.msg = this.strm.msg;
    };
    function deflate$1(input, options) {
      const deflator = new Deflate(options);
      deflator.push(input, true);
      if (deflator.err) {
        throw deflator.msg || messages[deflator.err];
      }
      return deflator.result;
    }
    function deflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return deflate$1(input, options);
    }
    function gzip(input, options) {
      options = options || {};
      options.gzip = true;
      return deflate$1(input, options);
    }
    var deflate_1$1 = {
      Deflate,
      deflate: deflate$1,
      deflateRaw,
      gzip,
      constants
    };
    const BAD = 30;
    const TYPE = 12;
    var inffast = function inflate_fast(strm, start) {
      let _in;
      let last;
      let _out;
      let beg;
      let end;
      let dmax;
      let wsize;
      let whave;
      let wnext;
      let s_window;
      let hold;
      let bits;
      let lcode;
      let dcode;
      let lmask;
      let dmask;
      let here;
      let op;
      let len4;
      let dist3;
      let from;
      let from_source;
      let input, output;
      const state = strm.state;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
      dmax = state.dmax;
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;
      top:
        do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen:
            for (; ; ) {
              op = here >>> 24;
              hold >>>= op;
              bits -= op;
              op = here >>> 16 & 255;
              if (op === 0) {
                output[_out++] = here & 65535;
              } else if (op & 16) {
                len4 = here & 65535;
                op &= 15;
                if (op) {
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  len4 += hold & (1 << op) - 1;
                  hold >>>= op;
                  bits -= op;
                }
                if (bits < 15) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                here = dcode[hold & dmask];
                dodist:
                  for (; ; ) {
                    op = here >>> 24;
                    hold >>>= op;
                    bits -= op;
                    op = here >>> 16 & 255;
                    if (op & 16) {
                      dist3 = here & 65535;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist3 += hold & (1 << op) - 1;
                      if (dist3 > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist3 > op) {
                        op = dist3 - op;
                        if (op > whave) {
                          if (state.sane) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD;
                            break top;
                          }
                        }
                        from = 0;
                        from_source = s_window;
                        if (wnext === 0) {
                          from += wsize - op;
                          if (op < len4) {
                            len4 -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist3;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len4) {
                            len4 -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = 0;
                            if (wnext < len4) {
                              op = wnext;
                              len4 -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist3;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len4) {
                            len4 -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist3;
                            from_source = output;
                          }
                        }
                        while (len4 > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len4 -= 3;
                        }
                        if (len4) {
                          output[_out++] = from_source[from++];
                          if (len4 > 1) {
                            output[_out++] = from_source[from++];
                          }
                        }
                      } else {
                        from = _out - dist3;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len4 -= 3;
                        } while (len4 > 2);
                        if (len4) {
                          output[_out++] = output[from++];
                          if (len4 > 1) {
                            output[_out++] = output[from++];
                          }
                        }
                      }
                    } else if ((op & 64) === 0) {
                      here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                      continue dodist;
                    } else {
                      strm.msg = "invalid distance code";
                      state.mode = BAD;
                      break top;
                    }
                    break;
                  }
              } else if ((op & 64) === 0) {
                here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                continue dolen;
              } else if (op & 32) {
                state.mode = TYPE;
                break top;
              } else {
                strm.msg = "invalid literal/length code";
                state.mode = BAD;
                break top;
              }
              break;
            }
        } while (_in < last && _out < end);
      len4 = bits >> 3;
      _in -= len4;
      bits -= len4 << 3;
      hold &= (1 << bits) - 1;
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
      strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
      state.hold = hold;
      state.bits = bits;
      return;
    };
    const MAXBITS = 15;
    const ENOUGH_LENS = 852;
    const ENOUGH_DISTS = 592;
    const CODES = 0;
    const LENS = 1;
    const DISTS = 2;
    const lbase = new Uint16Array([
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      15,
      17,
      19,
      23,
      27,
      31,
      35,
      43,
      51,
      59,
      67,
      83,
      99,
      115,
      131,
      163,
      195,
      227,
      258,
      0,
      0
    ]);
    const lext = new Uint8Array([
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      16,
      72,
      78
    ]);
    const dbase = new Uint16Array([
      1,
      2,
      3,
      4,
      5,
      7,
      9,
      13,
      17,
      25,
      33,
      49,
      65,
      97,
      129,
      193,
      257,
      385,
      513,
      769,
      1025,
      1537,
      2049,
      3073,
      4097,
      6145,
      8193,
      12289,
      16385,
      24577,
      0,
      0
    ]);
    const dext = new Uint8Array([
      16,
      16,
      16,
      16,
      17,
      17,
      18,
      18,
      19,
      19,
      20,
      20,
      21,
      21,
      22,
      22,
      23,
      23,
      24,
      24,
      25,
      25,
      26,
      26,
      27,
      27,
      28,
      28,
      29,
      29,
      64,
      64
    ]);
    const inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
      const bits = opts.bits;
      let len4 = 0;
      let sym = 0;
      let min4 = 0, max4 = 0;
      let root = 0;
      let curr = 0;
      let drop = 0;
      let left = 0;
      let used = 0;
      let huff = 0;
      let incr;
      let fill;
      let low;
      let mask;
      let next;
      let base39 = null;
      let base_index = 0;
      let end;
      const count = new Uint16Array(MAXBITS + 1);
      const offs = new Uint16Array(MAXBITS + 1);
      let extra = null;
      let extra_index = 0;
      let here_bits, here_op, here_val;
      for (len4 = 0; len4 <= MAXBITS; len4++) {
        count[len4] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }
      root = bits;
      for (max4 = MAXBITS; max4 >= 1; max4--) {
        if (count[max4] !== 0) {
          break;
        }
      }
      if (root > max4) {
        root = max4;
      }
      if (max4 === 0) {
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        opts.bits = 1;
        return 0;
      }
      for (min4 = 1; min4 < max4; min4++) {
        if (count[min4] !== 0) {
          break;
        }
      }
      if (root < min4) {
        root = min4;
      }
      left = 1;
      for (len4 = 1; len4 <= MAXBITS; len4++) {
        left <<= 1;
        left -= count[len4];
        if (left < 0) {
          return -1;
        }
      }
      if (left > 0 && (type === CODES || max4 !== 1)) {
        return -1;
      }
      offs[1] = 0;
      for (len4 = 1; len4 < MAXBITS; len4++) {
        offs[len4 + 1] = offs[len4] + count[len4];
      }
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }
      if (type === CODES) {
        base39 = extra = work;
        end = 19;
      } else if (type === LENS) {
        base39 = lbase;
        base_index -= 257;
        extra = lext;
        extra_index -= 257;
        end = 256;
      } else {
        base39 = dbase;
        extra = dext;
        end = -1;
      }
      huff = 0;
      sym = 0;
      len4 = min4;
      next = table_index;
      curr = root;
      drop = 0;
      low = -1;
      used = 1 << root;
      mask = used - 1;
      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
        return 1;
      }
      for (; ; ) {
        here_bits = len4 - drop;
        if (work[sym] < end) {
          here_op = 0;
          here_val = work[sym];
        } else if (work[sym] > end) {
          here_op = extra[extra_index + work[sym]];
          here_val = base39[base_index + work[sym]];
        } else {
          here_op = 32 + 64;
          here_val = 0;
        }
        incr = 1 << len4 - drop;
        fill = 1 << curr;
        min4 = fill;
        do {
          fill -= incr;
          table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
        } while (fill !== 0);
        incr = 1 << len4 - 1;
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }
        sym++;
        if (--count[len4] === 0) {
          if (len4 === max4) {
            break;
          }
          len4 = lens[lens_index + work[sym]];
        }
        if (len4 > root && (huff & mask) !== low) {
          if (drop === 0) {
            drop = root;
          }
          next += min4;
          curr = len4 - drop;
          left = 1 << curr;
          while (curr + drop < max4) {
            left -= count[curr + drop];
            if (left <= 0) {
              break;
            }
            curr++;
            left <<= 1;
          }
          used += 1 << curr;
          if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
            return 1;
          }
          low = huff & mask;
          table[low] = root << 24 | curr << 16 | next - table_index | 0;
        }
      }
      if (huff !== 0) {
        table[next + huff] = len4 - drop << 24 | 64 << 16 | 0;
      }
      opts.bits = root;
      return 0;
    };
    var inftrees = inflate_table;
    const CODES$1 = 0;
    const LENS$1 = 1;
    const DISTS$1 = 2;
    const {
      Z_FINISH: Z_FINISH$2,
      Z_BLOCK: Z_BLOCK$1,
      Z_TREES,
      Z_OK: Z_OK$2,
      Z_STREAM_END: Z_STREAM_END$2,
      Z_NEED_DICT,
      Z_STREAM_ERROR: Z_STREAM_ERROR$1,
      Z_DATA_ERROR: Z_DATA_ERROR$1,
      Z_MEM_ERROR,
      Z_BUF_ERROR: Z_BUF_ERROR$1,
      Z_DEFLATED: Z_DEFLATED$2
    } = constants;
    const HEAD = 1;
    const FLAGS = 2;
    const TIME = 3;
    const OS = 4;
    const EXLEN = 5;
    const EXTRA = 6;
    const NAME = 7;
    const COMMENT = 8;
    const HCRC = 9;
    const DICTID = 10;
    const DICT = 11;
    const TYPE$1 = 12;
    const TYPEDO = 13;
    const STORED = 14;
    const COPY_ = 15;
    const COPY = 16;
    const TABLE = 17;
    const LENLENS = 18;
    const CODELENS = 19;
    const LEN_ = 20;
    const LEN = 21;
    const LENEXT = 22;
    const DIST = 23;
    const DISTEXT = 24;
    const MATCH = 25;
    const LIT = 26;
    const CHECK = 27;
    const LENGTH = 28;
    const DONE = 29;
    const BAD$1 = 30;
    const MEM = 31;
    const SYNC = 32;
    const ENOUGH_LENS$1 = 852;
    const ENOUGH_DISTS$1 = 592;
    const MAX_WBITS$1 = 15;
    const DEF_WBITS = MAX_WBITS$1;
    const zswap32 = (q) => {
      return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
    };
    function InflateState() {
      this.mode = 0;
      this.last = false;
      this.wrap = 0;
      this.havedict = false;
      this.flags = 0;
      this.dmax = 0;
      this.check = 0;
      this.total = 0;
      this.head = null;
      this.wbits = 0;
      this.wsize = 0;
      this.whave = 0;
      this.wnext = 0;
      this.window = null;
      this.hold = 0;
      this.bits = 0;
      this.length = 0;
      this.offset = 0;
      this.extra = 0;
      this.lencode = null;
      this.distcode = null;
      this.lenbits = 0;
      this.distbits = 0;
      this.ncode = 0;
      this.nlen = 0;
      this.ndist = 0;
      this.have = 0;
      this.next = null;
      this.lens = new Uint16Array(320);
      this.work = new Uint16Array(288);
      this.lendyn = null;
      this.distdyn = null;
      this.sane = 0;
      this.back = 0;
      this.was = 0;
    }
    const inflateResetKeep = (strm) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = "";
      if (state.wrap) {
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD;
      state.last = 0;
      state.havedict = 0;
      state.dmax = 32768;
      state.head = null;
      state.hold = 0;
      state.bits = 0;
      state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS$1);
      state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS$1);
      state.sane = 1;
      state.back = -1;
      return Z_OK$2;
    };
    const inflateReset = (strm) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep(strm);
    };
    const inflateReset2 = (strm, windowBits) => {
      let wrap;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else {
        wrap = (windowBits >> 4) + 1;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR$1;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset(strm);
    };
    const inflateInit2 = (strm, windowBits) => {
      if (!strm) {
        return Z_STREAM_ERROR$1;
      }
      const state = new InflateState();
      strm.state = state;
      state.window = null;
      const ret = inflateReset2(strm, windowBits);
      if (ret !== Z_OK$2) {
        strm.state = null;
      }
      return ret;
    };
    const inflateInit = (strm) => {
      return inflateInit2(strm, DEF_WBITS);
    };
    let virgin = true;
    let lenfix;
    let distfix;
    const fixedtables = (state) => {
      if (virgin) {
        lenfix = new Int32Array(512);
        distfix = new Int32Array(32);
        let sym = 0;
        while (sym < 144) {
          state.lens[sym++] = 8;
        }
        while (sym < 256) {
          state.lens[sym++] = 9;
        }
        while (sym < 280) {
          state.lens[sym++] = 7;
        }
        while (sym < 288) {
          state.lens[sym++] = 8;
        }
        inftrees(LENS$1, state.lens, 0, 288, lenfix, 0, state.work, {bits: 9});
        sym = 0;
        while (sym < 32) {
          state.lens[sym++] = 5;
        }
        inftrees(DISTS$1, state.lens, 0, 32, distfix, 0, state.work, {bits: 5});
        virgin = false;
      }
      state.lencode = lenfix;
      state.lenbits = 9;
      state.distcode = distfix;
      state.distbits = 5;
    };
    const updatewindow = (strm, src, end, copy7) => {
      let dist3;
      const state = strm.state;
      if (state.window === null) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;
        state.window = new Uint8Array(state.wsize);
      }
      if (copy7 >= state.wsize) {
        state.window.set(src.subarray(end - state.wsize, end), 0);
        state.wnext = 0;
        state.whave = state.wsize;
      } else {
        dist3 = state.wsize - state.wnext;
        if (dist3 > copy7) {
          dist3 = copy7;
        }
        state.window.set(src.subarray(end - copy7, end - copy7 + dist3), state.wnext);
        copy7 -= dist3;
        if (copy7) {
          state.window.set(src.subarray(end - copy7, end), 0);
          state.wnext = copy7;
          state.whave = state.wsize;
        } else {
          state.wnext += dist3;
          if (state.wnext === state.wsize) {
            state.wnext = 0;
          }
          if (state.whave < state.wsize) {
            state.whave += dist3;
          }
        }
      }
      return 0;
    };
    const inflate = (strm, flush) => {
      let state;
      let input, output;
      let next;
      let put;
      let have, left;
      let hold;
      let bits;
      let _in, _out;
      let copy7;
      let from;
      let from_source;
      let here = 0;
      let here_bits, here_op, here_val;
      let last_bits, last_op, last_val;
      let len4;
      let ret;
      const hbuf = new Uint8Array(4);
      let opts;
      let n;
      const order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
        return Z_STREAM_ERROR$1;
      }
      state = strm.state;
      if (state.mode === TYPE$1) {
        state.mode = TYPEDO;
      }
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      _in = have;
      _out = left;
      ret = Z_OK$2;
      inf_leave:
        for (; ; ) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 2 && hold === 35615) {
                state.check = 0;
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
                hold = 0;
                bits = 0;
                state.mode = FLAGS;
                break;
              }
              state.flags = 0;
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
                strm.msg = "incorrect header check";
                state.mode = BAD$1;
                break;
              }
              if ((hold & 15) !== Z_DEFLATED$2) {
                strm.msg = "unknown compression method";
                state.mode = BAD$1;
                break;
              }
              hold >>>= 4;
              bits -= 4;
              len4 = (hold & 15) + 8;
              if (state.wbits === 0) {
                state.wbits = len4;
              } else if (len4 > state.wbits) {
                strm.msg = "invalid window size";
                state.mode = BAD$1;
                break;
              }
              state.dmax = 1 << state.wbits;
              strm.adler = state.check = 1;
              state.mode = hold & 512 ? DICTID : TYPE$1;
              hold = 0;
              bits = 0;
              break;
            case FLAGS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.flags = hold;
              if ((state.flags & 255) !== Z_DEFLATED$2) {
                strm.msg = "unknown compression method";
                state.mode = BAD$1;
                break;
              }
              if (state.flags & 57344) {
                strm.msg = "unknown header flags set";
                state.mode = BAD$1;
                break;
              }
              if (state.head) {
                state.head.text = hold >> 8 & 1;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = TIME;
            case TIME:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                hbuf[2] = hold >>> 16 & 255;
                hbuf[3] = hold >>> 24 & 255;
                state.check = crc32_1(state.check, hbuf, 4, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = OS;
            case OS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.xflags = hold & 255;
                state.head.os = hold >> 8;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = EXLEN;
            case EXLEN:
              if (state.flags & 1024) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32_1(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
              } else if (state.head) {
                state.head.extra = null;
              }
              state.mode = EXTRA;
            case EXTRA:
              if (state.flags & 1024) {
                copy7 = state.length;
                if (copy7 > have) {
                  copy7 = have;
                }
                if (copy7) {
                  if (state.head) {
                    len4 = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      state.head.extra = new Uint8Array(state.head.extra_len);
                    }
                    state.head.extra.set(input.subarray(next, next + copy7), len4);
                  }
                  if (state.flags & 512) {
                    state.check = crc32_1(state.check, input, copy7, next);
                  }
                  have -= copy7;
                  next += copy7;
                  state.length -= copy7;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME;
            case NAME:
              if (state.flags & 2048) {
                if (have === 0) {
                  break inf_leave;
                }
                copy7 = 0;
                do {
                  len4 = input[next + copy7++];
                  if (state.head && len4 && state.length < 65536) {
                    state.head.name += String.fromCharCode(len4);
                  }
                } while (len4 && copy7 < have);
                if (state.flags & 512) {
                  state.check = crc32_1(state.check, input, copy7, next);
                }
                have -= copy7;
                next += copy7;
                if (len4) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
            case COMMENT:
              if (state.flags & 4096) {
                if (have === 0) {
                  break inf_leave;
                }
                copy7 = 0;
                do {
                  len4 = input[next + copy7++];
                  if (state.head && len4 && state.length < 65536) {
                    state.head.comment += String.fromCharCode(len4);
                  }
                } while (len4 && copy7 < have);
                if (state.flags & 512) {
                  state.check = crc32_1(state.check, input, copy7, next);
                }
                have -= copy7;
                next += copy7;
                if (len4) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
            case HCRC:
              if (state.flags & 512) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.check & 65535)) {
                  strm.msg = "header crc mismatch";
                  state.mode = BAD$1;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              if (state.head) {
                state.head.hcrc = state.flags >> 9 & 1;
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE$1;
              break;
            case DICTID:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              strm.adler = state.check = zswap32(hold);
              hold = 0;
              bits = 0;
              state.mode = DICT;
            case DICT:
              if (state.havedict === 0) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                return Z_NEED_DICT;
              }
              strm.adler = state.check = 1;
              state.mode = TYPE$1;
            case TYPE$1:
              if (flush === Z_BLOCK$1 || flush === Z_TREES) {
                break inf_leave;
              }
            case TYPEDO:
              if (state.last) {
                hold >>>= bits & 7;
                bits -= bits & 7;
                state.mode = CHECK;
                break;
              }
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.last = hold & 1;
              hold >>>= 1;
              bits -= 1;
              switch (hold & 3) {
                case 0:
                  state.mode = STORED;
                  break;
                case 1:
                  fixedtables(state);
                  state.mode = LEN_;
                  if (flush === Z_TREES) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;
                case 2:
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = "invalid block type";
                  state.mode = BAD$1;
              }
              hold >>>= 2;
              bits -= 2;
              break;
            case STORED:
              hold >>>= bits & 7;
              bits -= bits & 7;
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                strm.msg = "invalid stored block lengths";
                state.mode = BAD$1;
                break;
              }
              state.length = hold & 65535;
              hold = 0;
              bits = 0;
              state.mode = COPY_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            case COPY_:
              state.mode = COPY;
            case COPY:
              copy7 = state.length;
              if (copy7) {
                if (copy7 > have) {
                  copy7 = have;
                }
                if (copy7 > left) {
                  copy7 = left;
                }
                if (copy7 === 0) {
                  break inf_leave;
                }
                output.set(input.subarray(next, next + copy7), put);
                have -= copy7;
                next += copy7;
                left -= copy7;
                put += copy7;
                state.length -= copy7;
                break;
              }
              state.mode = TYPE$1;
              break;
            case TABLE:
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.nlen = (hold & 31) + 257;
              hold >>>= 5;
              bits -= 5;
              state.ndist = (hold & 31) + 1;
              hold >>>= 5;
              bits -= 5;
              state.ncode = (hold & 15) + 4;
              hold >>>= 4;
              bits -= 4;
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = "too many length or distance symbols";
                state.mode = BAD$1;
                break;
              }
              state.have = 0;
              state.mode = LENLENS;
            case LENLENS:
              while (state.have < state.ncode) {
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.lens[order[state.have++]] = hold & 7;
                hold >>>= 3;
                bits -= 3;
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = {bits: state.lenbits};
              ret = inftrees(CODES$1, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid code lengths set";
                state.mode = BAD$1;
                break;
              }
              state.have = 0;
              state.mode = CODELENS;
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_val < 16) {
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    if (state.have === 0) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD$1;
                      break;
                    }
                    len4 = state.lens[state.have - 1];
                    copy7 = 3 + (hold & 3);
                    hold >>>= 2;
                    bits -= 2;
                  } else if (here_val === 17) {
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len4 = 0;
                    copy7 = 3 + (hold & 7);
                    hold >>>= 3;
                    bits -= 3;
                  } else {
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len4 = 0;
                    copy7 = 11 + (hold & 127);
                    hold >>>= 7;
                    bits -= 7;
                  }
                  if (state.have + copy7 > state.nlen + state.ndist) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD$1;
                    break;
                  }
                  while (copy7--) {
                    state.lens[state.have++] = len4;
                  }
                }
              }
              if (state.mode === BAD$1) {
                break;
              }
              if (state.lens[256] === 0) {
                strm.msg = "invalid code -- missing end-of-block";
                state.mode = BAD$1;
                break;
              }
              state.lenbits = 9;
              opts = {bits: state.lenbits};
              ret = inftrees(LENS$1, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid literal/lengths set";
                state.mode = BAD$1;
                break;
              }
              state.distbits = 6;
              state.distcode = state.distdyn;
              opts = {bits: state.distbits};
              ret = inftrees(DISTS$1, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              state.distbits = opts.bits;
              if (ret) {
                strm.msg = "invalid distances set";
                state.mode = BAD$1;
                break;
              }
              state.mode = LEN_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            case LEN_:
              state.mode = LEN;
            case LEN:
              if (have >= 6 && left >= 258) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                inffast(strm, _out);
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                if (state.mode === TYPE$1) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_op && (here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                state.back = -1;
                state.mode = TYPE$1;
                break;
              }
              if (here_op & 64) {
                strm.msg = "invalid literal/length code";
                state.mode = BAD$1;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
            case LENEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              state.was = state.length;
              state.mode = DIST;
            case DIST:
              for (; ; ) {
                here = state.distcode[hold & (1 << state.distbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = "invalid distance code";
                state.mode = BAD$1;
                break;
              }
              state.offset = here_val;
              state.extra = here_op & 15;
              state.mode = DISTEXT;
            case DISTEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.offset += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              if (state.offset > state.dmax) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD$1;
                break;
              }
              state.mode = MATCH;
            case MATCH:
              if (left === 0) {
                break inf_leave;
              }
              copy7 = _out - left;
              if (state.offset > copy7) {
                copy7 = state.offset - copy7;
                if (copy7 > state.whave) {
                  if (state.sane) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break;
                  }
                }
                if (copy7 > state.wnext) {
                  copy7 -= state.wnext;
                  from = state.wsize - copy7;
                } else {
                  from = state.wnext - copy7;
                }
                if (copy7 > state.length) {
                  copy7 = state.length;
                }
                from_source = state.window;
              } else {
                from_source = output;
                from = put - state.offset;
                copy7 = state.length;
              }
              if (copy7 > left) {
                copy7 = left;
              }
              left -= copy7;
              state.length -= copy7;
              do {
                output[put++] = from_source[from++];
              } while (--copy7);
              if (state.length === 0) {
                state.mode = LEN;
              }
              break;
            case LIT:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
                }
                _out = left;
                if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = "incorrect data check";
                  state.mode = BAD$1;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = LENGTH;
            case LENGTH:
              if (state.wrap && state.flags) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.total & 4294967295)) {
                  strm.msg = "incorrect length check";
                  state.mode = BAD$1;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = DONE;
            case DONE:
              ret = Z_STREAM_END$2;
              break inf_leave;
            case BAD$1:
              ret = Z_DATA_ERROR$1;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR;
            case SYNC:
            default:
              return Z_STREAM_ERROR$1;
          }
        }
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      if (state.wsize || _out !== strm.avail_out && state.mode < BAD$1 && (state.mode < CHECK || flush !== Z_FINISH$2)) {
        if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
          ;
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if (state.wrap && _out) {
        strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE$1 ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
      if ((_in === 0 && _out === 0 || flush === Z_FINISH$2) && ret === Z_OK$2) {
        ret = Z_BUF_ERROR$1;
      }
      return ret;
    };
    const inflateEnd = (strm) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      let state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK$2;
    };
    const inflateGetHeader = (strm, head) => {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      if ((state.wrap & 2) === 0) {
        return Z_STREAM_ERROR$1;
      }
      state.head = head;
      head.done = false;
      return Z_OK$2;
    };
    const inflateSetDictionary = (strm, dictionary) => {
      const dictLength = dictionary.length;
      let state;
      let dictid;
      let ret;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR$1;
      }
      state = strm.state;
      if (state.wrap !== 0 && state.mode !== DICT) {
        return Z_STREAM_ERROR$1;
      }
      if (state.mode === DICT) {
        dictid = 1;
        dictid = adler32_1(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR$1;
        }
      }
      ret = updatewindow(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
      state.havedict = 1;
      return Z_OK$2;
    };
    var inflateReset_1 = inflateReset;
    var inflateReset2_1 = inflateReset2;
    var inflateResetKeep_1 = inflateResetKeep;
    var inflateInit_1 = inflateInit;
    var inflateInit2_1 = inflateInit2;
    var inflate_2 = inflate;
    var inflateEnd_1 = inflateEnd;
    var inflateGetHeader_1 = inflateGetHeader;
    var inflateSetDictionary_1 = inflateSetDictionary;
    var inflateInfo = "pako inflate (from Nodeca project)";
    var inflate_1 = {
      inflateReset: inflateReset_1,
      inflateReset2: inflateReset2_1,
      inflateResetKeep: inflateResetKeep_1,
      inflateInit: inflateInit_1,
      inflateInit2: inflateInit2_1,
      inflate: inflate_2,
      inflateEnd: inflateEnd_1,
      inflateGetHeader: inflateGetHeader_1,
      inflateSetDictionary: inflateSetDictionary_1,
      inflateInfo
    };
    function GZheader() {
      this.text = 0;
      this.time = 0;
      this.xflags = 0;
      this.os = 0;
      this.extra = null;
      this.extra_len = 0;
      this.name = "";
      this.comment = "";
      this.hcrc = 0;
      this.done = false;
    }
    var gzheader = GZheader;
    const toString$1 = Object.prototype.toString;
    const {
      Z_NO_FLUSH: Z_NO_FLUSH$2,
      Z_FINISH: Z_FINISH$3,
      Z_OK: Z_OK$3,
      Z_STREAM_END: Z_STREAM_END$3,
      Z_NEED_DICT: Z_NEED_DICT$1,
      Z_STREAM_ERROR: Z_STREAM_ERROR$2,
      Z_DATA_ERROR: Z_DATA_ERROR$2,
      Z_MEM_ERROR: Z_MEM_ERROR$1
    } = constants;
    function Inflate(options) {
      this.options = common.assign({
        chunkSize: 1024 * 64,
        windowBits: 15,
        to: ""
      }, options || {});
      const opt = this.options;
      if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
        opt.windowBits = -opt.windowBits;
        if (opt.windowBits === 0) {
          opt.windowBits = -15;
        }
      }
      if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
        opt.windowBits += 32;
      }
      if (opt.windowBits > 15 && opt.windowBits < 48) {
        if ((opt.windowBits & 15) === 0) {
          opt.windowBits |= 15;
        }
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new zstream();
      this.strm.avail_out = 0;
      let status3 = inflate_1.inflateInit2(this.strm, opt.windowBits);
      if (status3 !== Z_OK$3) {
        throw new Error(messages[status3]);
      }
      this.header = new gzheader();
      inflate_1.inflateGetHeader(this.strm, this.header);
      if (opt.dictionary) {
        if (typeof opt.dictionary === "string") {
          opt.dictionary = strings.string2buf(opt.dictionary);
        } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
          opt.dictionary = new Uint8Array(opt.dictionary);
        }
        if (opt.raw) {
          status3 = inflate_1.inflateSetDictionary(this.strm, opt.dictionary);
          if (status3 !== Z_OK$3) {
            throw new Error(messages[status3]);
          }
        }
      }
    }
    Inflate.prototype.push = function(data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      const dictionary = this.options.dictionary;
      let status3, _flush_mode, last_avail_out;
      if (this.ended)
        return false;
      if (flush_mode === ~~flush_mode)
        _flush_mode = flush_mode;
      else
        _flush_mode = flush_mode === true ? Z_FINISH$3 : Z_NO_FLUSH$2;
      if (toString$1.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      for (; ; ) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status3 = inflate_1.inflate(strm, _flush_mode);
        if (status3 === Z_NEED_DICT$1 && dictionary) {
          status3 = inflate_1.inflateSetDictionary(strm, dictionary);
          if (status3 === Z_OK$3) {
            status3 = inflate_1.inflate(strm, _flush_mode);
          } else if (status3 === Z_DATA_ERROR$2) {
            status3 = Z_NEED_DICT$1;
          }
        }
        while (strm.avail_in > 0 && status3 === Z_STREAM_END$3 && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
          inflate_1.inflateReset(strm);
          status3 = inflate_1.inflate(strm, _flush_mode);
        }
        switch (status3) {
          case Z_STREAM_ERROR$2:
          case Z_DATA_ERROR$2:
          case Z_NEED_DICT$1:
          case Z_MEM_ERROR$1:
            this.onEnd(status3);
            this.ended = true;
            return false;
        }
        last_avail_out = strm.avail_out;
        if (strm.next_out) {
          if (strm.avail_out === 0 || status3 === Z_STREAM_END$3) {
            if (this.options.to === "string") {
              let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
              let tail = strm.next_out - next_out_utf8;
              let utf8str = strings.buf2string(strm.output, next_out_utf8);
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail)
                strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
              this.onData(utf8str);
            } else {
              this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
            }
          }
        }
        if (status3 === Z_OK$3 && last_avail_out === 0)
          continue;
        if (status3 === Z_STREAM_END$3) {
          status3 = inflate_1.inflateEnd(this.strm);
          this.onEnd(status3);
          this.ended = true;
          return true;
        }
        if (strm.avail_in === 0)
          break;
      }
      return true;
    };
    Inflate.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Inflate.prototype.onEnd = function(status3) {
      if (status3 === Z_OK$3) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = common.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status3;
      this.msg = this.strm.msg;
    };
    function inflate$1(input, options) {
      const inflator = new Inflate(options);
      inflator.push(input);
      if (inflator.err)
        throw inflator.msg || messages[inflator.err];
      return inflator.result;
    }
    function inflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return inflate$1(input, options);
    }
    var inflate_1$1 = {
      Inflate,
      inflate: inflate$1,
      inflateRaw,
      ungzip: inflate$1,
      constants
    };
    const {Deflate: Deflate$1, deflate: deflate$2, deflateRaw: deflateRaw$1, gzip: gzip$1} = deflate_1$1;
    const {Inflate: Inflate$1, inflate: inflate$2, inflateRaw: inflateRaw$1, ungzip} = inflate_1$1;
    var pako = {
      Deflate: Deflate$1,
      deflate: deflate$2,
      deflateRaw: deflateRaw$1,
      gzip: gzip$1,
      Inflate: Inflate$1,
      inflate: inflate$2,
      inflateRaw: inflateRaw$1,
      ungzip,
      constants
    };
    var pako_esm_default = pako;
  });

  // node_modules/nifti-reader-js/src/nifti.js
  var require_nifti = __commonJS((exports, module) => {
    "use strict";
    var nifti = nifti || {};
    nifti.NIFTI1 = nifti.NIFTI1 || require_nifti1();
    nifti.NIFTI2 = nifti.NIFTI2 || require_nifti2();
    nifti.Utils = nifti.Utils || require_utilities();
    var pako = pako || require_pako_esm();
    nifti.isNIFTI1 = function(data) {
      var buf, mag1, mag2, mag3;
      if (data.byteLength < nifti.NIFTI1.STANDARD_HEADER_SIZE) {
        return false;
      }
      buf = new DataView(data);
      if (buf)
        mag1 = buf.getUint8(nifti.NIFTI1.MAGIC_NUMBER_LOCATION);
      mag2 = buf.getUint8(nifti.NIFTI1.MAGIC_NUMBER_LOCATION + 1);
      mag3 = buf.getUint8(nifti.NIFTI1.MAGIC_NUMBER_LOCATION + 2);
      return mag1 === nifti.NIFTI1.MAGIC_NUMBER[0] && mag2 === nifti.NIFTI1.MAGIC_NUMBER[1] && mag3 === nifti.NIFTI1.MAGIC_NUMBER[2];
    };
    nifti.isNIFTI2 = function(data) {
      var buf, mag1, mag2, mag3;
      if (data.byteLength < nifti.NIFTI1.STANDARD_HEADER_SIZE) {
        return false;
      }
      buf = new DataView(data);
      mag1 = buf.getUint8(nifti.NIFTI2.MAGIC_NUMBER_LOCATION);
      mag2 = buf.getUint8(nifti.NIFTI2.MAGIC_NUMBER_LOCATION + 1);
      mag3 = buf.getUint8(nifti.NIFTI2.MAGIC_NUMBER_LOCATION + 2);
      return mag1 === nifti.NIFTI2.MAGIC_NUMBER[0] && mag2 === nifti.NIFTI2.MAGIC_NUMBER[1] && mag3 === nifti.NIFTI2.MAGIC_NUMBER[2];
    };
    nifti.isNIFTI = function(data) {
      return nifti.isNIFTI1(data) || nifti.isNIFTI2(data);
    };
    nifti.isCompressed = function(data) {
      var buf, magicCookie1, magicCookie2;
      if (data) {
        buf = new DataView(data);
        magicCookie1 = buf.getUint8(0);
        magicCookie2 = buf.getUint8(1);
        if (magicCookie1 === nifti.Utils.GUNZIP_MAGIC_COOKIE1) {
          return true;
        }
        if (magicCookie2 === nifti.Utils.GUNZIP_MAGIC_COOKIE2) {
          return true;
        }
      }
      return false;
    };
    nifti.decompress = function(data) {
      return pako.inflate(data).buffer;
    };
    nifti.readHeader = function(data) {
      var header = null;
      if (nifti.isCompressed(data)) {
        data = nifti.decompress(data);
      }
      if (nifti.isNIFTI1(data)) {
        header = new nifti.NIFTI1();
      } else if (nifti.isNIFTI2(data)) {
        header = new nifti.NIFTI2();
      }
      if (header) {
        header.readHeader(data);
      } else {
        console.error("That file does not appear to be NIFTI!");
      }
      return header;
    };
    nifti.hasExtension = function(header) {
      return header.extensionFlag[0] != 0;
    };
    nifti.readImage = function(header, data) {
      var imageOffset = header.vox_offset, timeDim = 1, statDim = 1;
      if (header.dims[4]) {
        timeDim = header.dims[4];
      }
      if (header.dims[5]) {
        statDim = header.dims[5];
      }
      var imageSize = header.dims[1] * header.dims[2] * header.dims[3] * timeDim * statDim * (header.numBitsPerVoxel / 8);
      return data.slice(imageOffset, imageOffset + imageSize);
    };
    nifti.readExtension = function(header, data) {
      var loc = header.getExtensionLocation(), size = header.extensionSize;
      return data.slice(loc, loc + size);
    };
    nifti.readExtensionData = function(header, data) {
      var loc = header.getExtensionLocation(), size = header.extensionSize;
      return data.slice(loc + 8, loc + size - 8);
    };
    var moduleType = typeof module;
    if (moduleType !== "undefined" && module.exports) {
      module.exports = nifti;
    }
  });

  // src/neuroglancer/util/cancellation.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class CancellationError {
    constructor() {
      this.name = "CancellationError";
      this.message = "CANCELED";
    }
    toString() {
      return "CANCELED";
    }
  }
  const CANCELED = new CancellationError();
  const noopFunction = () => {
  };
  const uncancelableToken = {
    isCanceled: false,
    add: () => noopFunction,
    remove: noopFunction
  };
  class CancellationTokenSource {
    cancel() {
      const {handlers: handlers2} = this;
      if (handlers2 !== null) {
        this.handlers = null;
        if (handlers2 !== void 0) {
          for (let handler of handlers2) {
            handler();
          }
        }
      }
    }
    get isCanceled() {
      return this.handlers === null;
    }
    add(handler) {
      let {handlers: handlers2} = this;
      if (handlers2 === null) {
        handler();
        return noopFunction;
      }
      if (handlers2 === void 0) {
        handlers2 = this.handlers = new Set();
      }
      handlers2.add(handler);
      return () => {
        this.remove(handler);
      };
    }
    remove(handler) {
      const {handlers: handlers2} = this;
      if (handlers2 != null) {
        handlers2.delete(handler);
      }
    }
  }
  class MultipleConsumerCancellationTokenSource extends CancellationTokenSource {
    constructor() {
      super(...arguments);
      this.consumers = new Set();
    }
    addConsumer(cancellationToken = uncancelableToken) {
      const {consumers} = this;
      if (consumers.has(cancellationToken) || cancellationToken.isCanceled) {
        return;
      }
      consumers.add(cancellationToken);
      cancellationToken.add(() => {
        consumers.delete(cancellationToken);
        if (consumers.size === 0) {
          this.cancel();
        }
      });
    }
  }
  function makeCancelablePromise(cancellationToken, executor) {
    return new Promise((resolve, reject) => {
      if (cancellationToken === uncancelableToken) {
        executor(resolve, reject, uncancelableToken);
        return;
      }
      const scopedToken = new CancellationTokenSource();
      const unregister = cancellationToken.add(() => {
        scopedToken.cancel();
      });
      executor((value) => {
        unregister();
        resolve(value);
      }, (error) => {
        unregister();
        reject(error);
      }, scopedToken);
    });
  }

  // src/neuroglancer/util/disposable.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG_REF_COUNTS = false;
  function invokeDisposer(disposer) {
    if (typeof disposer === "object") {
      disposer.dispose();
    } else {
      disposer();
    }
  }
  function invokeDisposers(disposers) {
    for (let i = disposers.length; i > 0; --i) {
      invokeDisposer(disposers[i - 1]);
    }
  }
  function registerEventListener(target, type, listener, options) {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
  }
  class RefCounted {
    constructor() {
      this.refCount = 1;
    }
    addRef() {
      ++this.refCount;
      return this;
    }
    dispose() {
      if (DEBUG_REF_COUNTS) {
        if (this.refCount === 0) {
          debugger;
        }
        (this.disposedStacks = this.disposedStacks || []).push(new Error().stack);
      }
      if (--this.refCount !== 0) {
        return;
      }
      this.refCountReachedZero();
    }
    refCountReachedZero() {
      this.disposed();
      let {disposers} = this;
      if (disposers !== void 0) {
        invokeDisposers(disposers);
        this.disposers = void 0;
      }
      this.wasDisposed = true;
    }
    disposed() {
    }
    registerDisposer(f) {
      let {disposers} = this;
      if (disposers == null) {
        this.disposers = [f];
      } else {
        disposers.push(f);
      }
      return f;
    }
    unregisterDisposer(f) {
      let {disposers} = this;
      if (disposers != null) {
        let index2 = disposers.indexOf(f);
        if (index2 !== -1) {
          disposers.splice(index2, 1);
        }
      }
      return f;
    }
    registerEventListener(target, type, listener, options) {
      this.registerDisposer(registerEventListener(target, type, listener, options));
    }
    registerCancellable(cancellable) {
      this.registerDisposer(() => {
        cancellable.cancel();
      });
      return cancellable;
    }
  }
  class RefCountedValue extends RefCounted {
    constructor(value) {
      super();
      this.value = value;
    }
  }

  // src/neuroglancer/worker_rpc.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const IS_WORKER = !(typeof Window !== "undefined" && self instanceof Window);
  const DEBUG = false;
  const DEBUG_MESSAGES = false;
  const PROMISE_RESPONSE_ID = "rpc.promise.response";
  const PROMISE_CANCEL_ID = "rpc.promise.cancel";
  var handlers = new Map();
  function registerRPC(key, handler) {
    handlers.set(key, handler);
  }
  class RPCError extends Error {
    constructor(name, message) {
      super(message);
      this.name = name;
      this.message = message;
    }
  }
  function registerPromiseRPC(key, handler) {
    registerRPC(key, function(x) {
      let id = x["id"];
      const cancellationToken = new CancellationTokenSource();
      let promise = handler.call(this, x, cancellationToken);
      this.set(id, {promise, cancellationToken});
      promise.then(({value, transfers}) => {
        this.delete(id);
        this.invoke(PROMISE_RESPONSE_ID, {id, value}, transfers);
      }, (error) => {
        this.delete(id);
        this.invoke(PROMISE_RESPONSE_ID, {id, error: error.message, errorName: error.name});
      });
    });
  }
  registerRPC(PROMISE_CANCEL_ID, function(x) {
    let id = x["id"];
    const request11 = this.get(id);
    if (request11 !== void 0) {
      let {cancellationToken} = request11;
      cancellationToken.cancel();
    }
  });
  registerRPC(PROMISE_RESPONSE_ID, function(x) {
    let id = x["id"];
    let {resolve, reject} = this.get(id);
    this.delete(id);
    if (x.hasOwnProperty("value")) {
      resolve(x["value"]);
    } else {
      const errorName = x["errorName"];
      if (errorName === CANCELED.name) {
        reject(CANCELED);
      } else {
        reject(new RPCError(x["errorName"], x["error"]));
      }
    }
  });
  const INITIAL_RPC_ID = IS_WORKER ? -1 : 0;
  class RPC {
    constructor(target) {
      this.target = target;
      this.objects = new Map();
      this.nextId = INITIAL_RPC_ID;
      target.onmessage = (e) => {
        let data = e.data;
        if (DEBUG_MESSAGES) {
          console.log("Received message", data);
        }
        handlers.get(data.functionName).call(this, data);
      };
    }
    get numObjects() {
      return this.objects.size;
    }
    set(id, value) {
      this.objects.set(id, value);
    }
    delete(id) {
      this.objects.delete(id);
    }
    get(id) {
      return this.objects.get(id);
    }
    getRef(x) {
      let rpcId = x["id"];
      let obj = this.get(rpcId);
      obj.referencedGeneration = x["gen"];
      obj.addRef();
      return obj;
    }
    getOptionalRef(x) {
      if (x === void 0)
        return void 0;
      let rpcId = x["id"];
      let obj = this.get(rpcId);
      obj.referencedGeneration = x["gen"];
      obj.addRef();
      return obj;
    }
    invoke(name, x, transfers) {
      x.functionName = name;
      if (DEBUG_MESSAGES) {
        console.trace("Sending message", x);
      }
      this.target.postMessage(x, transfers);
    }
    promiseInvoke(name, x, cancellationToken = uncancelableToken, transfers) {
      return makeCancelablePromise(cancellationToken, (resolve, reject, token) => {
        const id = x["id"] = this.newId();
        this.set(id, {resolve, reject});
        this.invoke(name, x, transfers);
        token.add(() => {
          this.invoke(PROMISE_CANCEL_ID, {id});
        });
      });
    }
    newId() {
      return IS_WORKER ? this.nextId-- : this.nextId++;
    }
  }
  class SharedObject extends RefCounted {
    constructor() {
      super(...arguments);
      this.rpc = null;
      this.rpcId = null;
    }
    initializeSharedObject(rpc2, rpcId = rpc2.newId()) {
      this.rpc = rpc2;
      this.rpcId = rpcId;
      this.isOwner = false;
      rpc2.set(rpcId, this);
    }
    initializeCounterpart(rpc2, options = {}) {
      this.initializeSharedObject(rpc2);
      this.unreferencedGeneration = 0;
      this.referencedGeneration = 0;
      this.isOwner = true;
      options["id"] = this.rpcId;
      options["type"] = this.RPC_TYPE_ID;
      rpc2.invoke("SharedObject.new", options);
    }
    dispose() {
      super.dispose();
    }
    addCounterpartRef() {
      return {id: this.rpcId, gen: ++this.referencedGeneration};
    }
    refCountReachedZero() {
      if (this.isOwner === true) {
        if (this.referencedGeneration === this.unreferencedGeneration) {
          this.ownerDispose();
        }
      } else if (this.isOwner === false) {
        this.rpc.invoke("SharedObject.refCountReachedZero", {id: this.rpcId, gen: this.referencedGeneration});
      } else {
        super.refCountReachedZero();
      }
    }
    ownerDispose() {
      if (DEBUG) {
        console.log(`[${IS_WORKER}] #rpc object = ${this.rpc.numObjects}`);
      }
      let {rpc: rpc2, rpcId} = this;
      super.refCountReachedZero();
      rpc2.delete(rpcId);
      rpc2.invoke("SharedObject.dispose", {id: rpcId});
    }
    counterpartRefCountReachedZero(generation) {
      this.unreferencedGeneration = generation;
      if (this.refCount === 0 && generation === this.referencedGeneration) {
        this.ownerDispose();
      }
    }
  }
  function initializeSharedObjectCounterpart(obj, rpc2, options = {}) {
    if (rpc2 != null) {
      obj.initializeSharedObject(rpc2, options["id"]);
    }
  }
  class SharedObjectCounterpart extends SharedObject {
    constructor(rpc2, options = {}) {
      super();
      initializeSharedObjectCounterpart(this, rpc2, options);
    }
  }
  registerRPC("SharedObject.dispose", function(x) {
    let obj = this.get(x["id"]);
    if (obj.refCount !== 0) {
      throw new Error(`Attempted to dispose object with non-zero reference count.`);
    }
    if (DEBUG) {
      console.log(`[${IS_WORKER}] #rpc objects: ${this.numObjects}`);
    }
    obj.disposed();
    this.delete(obj.rpcId);
    obj.rpcId = null;
    obj.rpc = null;
  });
  registerRPC("SharedObject.refCountReachedZero", function(x) {
    let obj = this.get(x["id"]);
    let generation = x["gen"];
    obj.counterpartRefCountReachedZero(generation);
  });
  const sharedObjectConstructors = new Map();
  function registerSharedObjectOwner(identifier) {
    return (constructorFunction) => {
      constructorFunction.prototype.RPC_TYPE_ID = identifier;
    };
  }
  function registerSharedObject(identifier) {
    return (constructorFunction) => {
      if (identifier !== void 0) {
        constructorFunction.prototype.RPC_TYPE_ID = identifier;
      } else {
        identifier = constructorFunction.prototype.RPC_TYPE_ID;
        if (identifier === void 0) {
          throw new Error("RPC_TYPE_ID should have already been defined");
        }
      }
      sharedObjectConstructors.set(identifier, constructorFunction);
    };
  }
  registerRPC("SharedObject.new", function(x) {
    let rpc2 = this;
    let typeName = x["type"];
    let constructorFunction = sharedObjectConstructors.get(typeName);
    let obj = new constructorFunction(rpc2, x);
    --obj.refCount;
  });

  // src/neuroglancer/worker_rpc_context.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var rpc = new RPC(self);
  self.rpc = rpc;

  // src/neuroglancer/chunk_manager/backend.ts
  const throttle = __toModule(require_throttle());

  // src/neuroglancer/chunk_manager/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var ChunkState;
  (function(ChunkState2) {
    ChunkState2[ChunkState2["GPU_MEMORY"] = 0] = "GPU_MEMORY";
    ChunkState2[ChunkState2["SYSTEM_MEMORY"] = 1] = "SYSTEM_MEMORY";
    ChunkState2[ChunkState2["SYSTEM_MEMORY_WORKER"] = 2] = "SYSTEM_MEMORY_WORKER";
    ChunkState2[ChunkState2["DOWNLOADING"] = 3] = "DOWNLOADING";
    ChunkState2[ChunkState2["QUEUED"] = 4] = "QUEUED";
    ChunkState2[ChunkState2["NEW"] = 5] = "NEW";
    ChunkState2[ChunkState2["FAILED"] = 6] = "FAILED";
    ChunkState2[ChunkState2["EXPIRED"] = 7] = "EXPIRED";
  })(ChunkState || (ChunkState = {}));
  const numChunkStates = 8;
  var ChunkPriorityTier;
  (function(ChunkPriorityTier2) {
    ChunkPriorityTier2[ChunkPriorityTier2["FIRST_TIER"] = 0] = "FIRST_TIER";
    ChunkPriorityTier2[ChunkPriorityTier2["FIRST_ORDERED_TIER"] = 0] = "FIRST_ORDERED_TIER";
    ChunkPriorityTier2[ChunkPriorityTier2["VISIBLE"] = 0] = "VISIBLE";
    ChunkPriorityTier2[ChunkPriorityTier2["PREFETCH"] = 1] = "PREFETCH";
    ChunkPriorityTier2[ChunkPriorityTier2["LAST_ORDERED_TIER"] = 1] = "LAST_ORDERED_TIER";
    ChunkPriorityTier2[ChunkPriorityTier2["RECENT"] = 2] = "RECENT";
    ChunkPriorityTier2[ChunkPriorityTier2["LAST_TIER"] = 2] = "LAST_TIER";
  })(ChunkPriorityTier || (ChunkPriorityTier = {}));
  const numChunkPriorityTiers = 3;
  var ChunkDownloadStatistics;
  (function(ChunkDownloadStatistics2) {
    ChunkDownloadStatistics2[ChunkDownloadStatistics2["totalTime"] = 0] = "totalTime";
    ChunkDownloadStatistics2[ChunkDownloadStatistics2["totalChunks"] = 1] = "totalChunks";
  })(ChunkDownloadStatistics || (ChunkDownloadStatistics = {}));
  var ChunkMemoryStatistics;
  (function(ChunkMemoryStatistics2) {
    ChunkMemoryStatistics2[ChunkMemoryStatistics2["numChunks"] = 0] = "numChunks";
    ChunkMemoryStatistics2[ChunkMemoryStatistics2["systemMemoryBytes"] = 1] = "systemMemoryBytes";
    ChunkMemoryStatistics2[ChunkMemoryStatistics2["gpuMemoryBytes"] = 2] = "gpuMemoryBytes";
  })(ChunkMemoryStatistics || (ChunkMemoryStatistics = {}));
  const numChunkMemoryStatistics = 3;
  const numChunkDownloadStatistics = 2;
  const numChunkStatistics = numChunkStates * numChunkPriorityTiers * numChunkMemoryStatistics + numChunkDownloadStatistics;
  function getChunkStateStatisticIndex(state, priorityTier) {
    return state * numChunkPriorityTiers + priorityTier;
  }
  function getChunkDownloadStatisticIndex(statistic) {
    return numChunkStates * numChunkPriorityTiers * numChunkMemoryStatistics + statistic;
  }
  const PREFETCH_PRIORITY_MULTIPLIER = 1e13;
  const CHUNK_QUEUE_MANAGER_RPC_ID = "ChunkQueueManager";
  const CHUNK_MANAGER_RPC_ID = "ChunkManager";
  const CHUNK_SOURCE_INVALIDATE_RPC_ID = "ChunkSource.invalidate";
  const REQUEST_CHUNK_STATISTICS_RPC_ID = "ChunkQueueManager.requestChunkStatistics";
  const CHUNK_LAYER_STATISTICS_RPC_ID = "ChunkManager.chunkLayerStatistics";

  // src/neuroglancer/util/linked_list.0.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class linked_list_0_default {
    static insertAfter(head, x) {
      let next = head.next0;
      x.next0 = next;
      x.prev0 = head;
      head.next0 = x;
      next.prev0 = x;
    }
    static insertBefore(head, x) {
      let prev = head.prev0;
      x.prev0 = prev;
      x.next0 = head;
      head.prev0 = x;
      prev.next0 = x;
    }
    static front(head) {
      let next = head.next0;
      if (next === head) {
        return null;
      }
      return next;
    }
    static back(head) {
      let next = head.prev0;
      if (next === head) {
        return null;
      }
      return next;
    }
    static pop(x) {
      let next = x.next0;
      let prev = x.prev0;
      next.prev0 = prev;
      prev.next0 = next;
      x.next0 = null;
      x.prev0 = null;
      return x;
    }
    static *iterator(head) {
      for (let x = head.next0; x !== head; x = x.next0) {
        yield x;
      }
    }
    static *reverseIterator(head) {
      for (let x = head.prev0; x !== head; x = x.prev0) {
        yield x;
      }
    }
    static initializeHead(head) {
      head.next0 = head.prev0 = head;
    }
  }

  // src/neuroglancer/util/linked_list.1.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class linked_list_1_default {
    static insertAfter(head, x) {
      let next = head.next1;
      x.next1 = next;
      x.prev1 = head;
      head.next1 = x;
      next.prev1 = x;
    }
    static insertBefore(head, x) {
      let prev = head.prev1;
      x.prev1 = prev;
      x.next1 = head;
      head.prev1 = x;
      prev.next1 = x;
    }
    static front(head) {
      let next = head.next1;
      if (next === head) {
        return null;
      }
      return next;
    }
    static back(head) {
      let next = head.prev1;
      if (next === head) {
        return null;
      }
      return next;
    }
    static pop(x) {
      let next = x.next1;
      let prev = x.prev1;
      next.prev1 = prev;
      prev.next1 = next;
      x.next1 = null;
      x.prev1 = null;
      return x;
    }
    static *iterator(head) {
      for (let x = head.next1; x !== head; x = x.next1) {
        yield x;
      }
    }
    static *reverseIterator(head) {
      for (let x = head.prev1; x !== head; x = x.prev1) {
        yield x;
      }
    }
    static initializeHead(head) {
      head.next1 = head.prev1 = head;
    }
  }

  // node_modules/gl-matrix/esm/common.js
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var RANDOM = Math.random;
  var degree = Math.PI / 180;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0, i = arguments.length;
      while (i--) {
        y += arguments[i] * arguments[i];
      }
      return Math.sqrt(y);
    };

  // node_modules/gl-matrix/esm/mat3.js
  const mat3_exports = {};
  __export(mat3_exports, {
    add: () => add,
    adjoint: () => adjoint,
    clone: () => clone,
    copy: () => copy,
    create: () => create,
    determinant: () => determinant,
    equals: () => equals,
    exactEquals: () => exactEquals,
    frob: () => frob,
    fromMat2d: () => fromMat2d,
    fromMat4: () => fromMat4,
    fromQuat: () => fromQuat,
    fromRotation: () => fromRotation,
    fromScaling: () => fromScaling,
    fromTranslation: () => fromTranslation,
    fromValues: () => fromValues,
    identity: () => identity,
    invert: () => invert,
    mul: () => mul,
    multiply: () => multiply,
    multiplyScalar: () => multiplyScalar,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd,
    normalFromMat4: () => normalFromMat4,
    projection: () => projection,
    rotate: () => rotate,
    scale: () => scale,
    set: () => set,
    str: () => str,
    sub: () => sub,
    subtract: () => subtract,
    translate: () => translate,
    transpose: () => transpose
  });
  function create() {
    var out = new ARRAY_TYPE(9);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  function clone(a) {
    var out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function transpose(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20;
    var det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate(out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale(out, a, v) {
    var x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  function fromRotation(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  function normalFromMat4(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  function str(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
  }
  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  function multiplyScalarAndAdd(out, a, b, scale6) {
    out[0] = a[0] + b[0] * scale6;
    out[1] = a[1] + b[1] * scale6;
    out[2] = a[2] + b[2] * scale6;
    out[3] = a[3] + b[3] * scale6;
    out[4] = a[4] + b[4] * scale6;
    out[5] = a[5] + b[5] * scale6;
    out[6] = a[6] + b[6] * scale6;
    out[7] = a[7] + b[7] * scale6;
    out[8] = a[8] + b[8] * scale6;
    return out;
  }
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
  }
  var mul = multiply;
  var sub = subtract;

  // node_modules/gl-matrix/esm/mat4.js
  const mat4_exports = {};
  __export(mat4_exports, {
    add: () => add2,
    adjoint: () => adjoint2,
    clone: () => clone2,
    copy: () => copy2,
    create: () => create2,
    determinant: () => determinant2,
    equals: () => equals2,
    exactEquals: () => exactEquals2,
    frob: () => frob2,
    fromQuat: () => fromQuat3,
    fromQuat2: () => fromQuat2,
    fromRotation: () => fromRotation2,
    fromRotationTranslation: () => fromRotationTranslation,
    fromRotationTranslationScale: () => fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
    fromScaling: () => fromScaling2,
    fromTranslation: () => fromTranslation2,
    fromValues: () => fromValues2,
    fromXRotation: () => fromXRotation,
    fromYRotation: () => fromYRotation,
    fromZRotation: () => fromZRotation,
    frustum: () => frustum,
    getRotation: () => getRotation,
    getScaling: () => getScaling,
    getTranslation: () => getTranslation,
    identity: () => identity2,
    invert: () => invert2,
    lookAt: () => lookAt,
    mul: () => mul2,
    multiply: () => multiply2,
    multiplyScalar: () => multiplyScalar2,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd2,
    ortho: () => ortho,
    perspective: () => perspective,
    perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
    rotate: () => rotate2,
    rotateX: () => rotateX,
    rotateY: () => rotateY,
    rotateZ: () => rotateZ,
    scale: () => scale2,
    set: () => set2,
    str: () => str2,
    sub: () => sub2,
    subtract: () => subtract2,
    targetTo: () => targetTo,
    translate: () => translate2,
    transpose: () => transpose2
  });
  function create2() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function clone2(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function transpose2(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a03 = a[3];
      var a12 = a[6], a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  }
  function invert2(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function adjoint2(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  function determinant2(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply2(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate2(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale2(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate2(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len4 = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len4 < EPSILON) {
      return null;
    }
    len4 = 1 / len4;
    x *= len4;
    y *= len4;
    z *= len4;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  function fromTranslation2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromScaling2(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotation2(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len4 = Math.hypot(x, y, z);
    var s, c, t;
    if (len4 < EPSILON) {
      return null;
    }
    len4 = 1 / len4;
    x *= len4;
    y *= len4;
    z *= len4;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotationTranslation(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw;
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  function fromRotationTranslationScale(out, q, v, s) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  function fromQuat3(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    var xScale = 2 / (leftTan + rightTan);
    var yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
  }
  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len4;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity2(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len4 = 1 / Math.hypot(z0, z1, z2);
    z0 *= len4;
    z1 *= len4;
    z2 *= len4;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len4 = Math.hypot(x0, x1, x2);
    if (!len4) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len4 = 1 / len4;
      x0 *= len4;
      x1 *= len4;
      x2 *= len4;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len4 = Math.hypot(y0, y1, y2);
    if (!len4) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len4 = 1 / len4;
      y0 *= len4;
      y1 *= len4;
      y2 *= len4;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    var len4 = z0 * z0 + z1 * z1 + z2 * z2;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
      z0 *= len4;
      z1 *= len4;
      z2 *= len4;
    }
    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len4 = x0 * x0 + x1 * x1 + x2 * x2;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
      x0 *= len4;
      x1 *= len4;
      x2 *= len4;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  function str2(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  function frob2(a) {
    return Math.hypot(a[0], a[1], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  function add2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  function multiplyScalar2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  function multiplyScalarAndAdd2(out, a, b, scale6) {
    out[0] = a[0] + b[0] * scale6;
    out[1] = a[1] + b[1] * scale6;
    out[2] = a[2] + b[2] * scale6;
    out[3] = a[3] + b[3] * scale6;
    out[4] = a[4] + b[4] * scale6;
    out[5] = a[5] + b[5] * scale6;
    out[6] = a[6] + b[6] * scale6;
    out[7] = a[7] + b[7] * scale6;
    out[8] = a[8] + b[8] * scale6;
    out[9] = a[9] + b[9] * scale6;
    out[10] = a[10] + b[10] * scale6;
    out[11] = a[11] + b[11] * scale6;
    out[12] = a[12] + b[12] * scale6;
    out[13] = a[13] + b[13] * scale6;
    out[14] = a[14] + b[14] * scale6;
    out[15] = a[15] + b[15] * scale6;
    return out;
  }
  function exactEquals2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  function equals2(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
    var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
    var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
  }
  var mul2 = multiply2;
  var sub2 = subtract2;

  // node_modules/gl-matrix/esm/quat.js
  const quat_exports = {};
  __export(quat_exports, {
    add: () => add5,
    calculateW: () => calculateW,
    clone: () => clone5,
    conjugate: () => conjugate,
    copy: () => copy5,
    create: () => create5,
    dot: () => dot3,
    equals: () => equals5,
    exactEquals: () => exactEquals5,
    exp: () => exp,
    fromEuler: () => fromEuler,
    fromMat3: () => fromMat3,
    fromValues: () => fromValues5,
    getAngle: () => getAngle,
    getAxisAngle: () => getAxisAngle,
    identity: () => identity3,
    invert: () => invert3,
    len: () => len3,
    length: () => length3,
    lerp: () => lerp3,
    ln: () => ln,
    mul: () => mul5,
    multiply: () => multiply5,
    normalize: () => normalize3,
    pow: () => pow,
    random: () => random3,
    rotateX: () => rotateX3,
    rotateY: () => rotateY3,
    rotateZ: () => rotateZ3,
    rotationTo: () => rotationTo,
    scale: () => scale5,
    set: () => set5,
    setAxes: () => setAxes,
    setAxisAngle: () => setAxisAngle,
    slerp: () => slerp,
    sqlerp: () => sqlerp,
    sqrLen: () => sqrLen3,
    squaredLength: () => squaredLength3,
    str: () => str5
  });

  // node_modules/gl-matrix/esm/vec3.js
  const vec3_exports = {};
  __export(vec3_exports, {
    add: () => add3,
    angle: () => angle,
    bezier: () => bezier,
    ceil: () => ceil,
    clone: () => clone3,
    copy: () => copy3,
    create: () => create3,
    cross: () => cross,
    dist: () => dist,
    distance: () => distance,
    div: () => div,
    divide: () => divide,
    dot: () => dot,
    equals: () => equals3,
    exactEquals: () => exactEquals3,
    floor: () => floor,
    forEach: () => forEach,
    fromValues: () => fromValues3,
    hermite: () => hermite,
    inverse: () => inverse,
    len: () => len,
    length: () => length,
    lerp: () => lerp,
    max: () => max,
    min: () => min,
    mul: () => mul3,
    multiply: () => multiply3,
    negate: () => negate,
    normalize: () => normalize,
    random: () => random,
    rotateX: () => rotateX2,
    rotateY: () => rotateY2,
    rotateZ: () => rotateZ2,
    round: () => round,
    scale: () => scale3,
    scaleAndAdd: () => scaleAndAdd,
    set: () => set3,
    sqrDist: () => sqrDist,
    sqrLen: () => sqrLen,
    squaredDistance: () => squaredDistance,
    squaredLength: () => squaredLength,
    str: () => str3,
    sub: () => sub3,
    subtract: () => subtract3,
    transformMat3: () => transformMat3,
    transformMat4: () => transformMat4,
    transformQuat: () => transformQuat,
    zero: () => zero
  });
  function create3() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone3(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  function fromValues3(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set3(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract3(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply3(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  function scale3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function scaleAndAdd(out, a, b, scale6) {
    out[0] = a[0] + b[0] * scale6;
    out[1] = a[1] + b[1] * scale6;
    out[2] = a[2] + b[2] * scale6;
    return out;
  }
  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len4 = x * x + y * y + z * z;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
    }
    out[0] = a[0] * len4;
    out[1] = a[1] * len4;
    out[2] = a[2] * len4;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function random(out, scale6) {
    scale6 = scale6 || 1;
    var r = RANDOM() * 2 * Math.PI;
    var z = RANDOM() * 2 - 1;
    var zScale = Math.sqrt(1 - z * z) * scale6;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale6;
    return out;
  }
  function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var x = a[0], y = a[1], z = a[2];
    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function rotateX2(out, a, b, c) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateY2(out, a, b, c) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateZ2(out, a, b, c) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function angle(a, b) {
    var tempA2 = fromValues3(a[0], a[1], a[2]);
    var tempB2 = fromValues3(b[0], b[1], b[2]);
    normalize(tempA2, tempA2);
    normalize(tempB2, tempB2);
    var cosine = dot(tempA2, tempB2);
    if (cosine > 1) {
      return 0;
    } else if (cosine < -1) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }
  function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }
  function str3(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  function exactEquals3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  function equals3(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
  }
  var sub3 = subtract3;
  var mul3 = multiply3;
  var div = divide;
  var dist = distance;
  var sqrDist = squaredDistance;
  var len = length;
  var sqrLen = squaredLength;
  var forEach = function() {
    var vec = create3();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/vec4.js
  const vec4_exports = {};
  __export(vec4_exports, {
    add: () => add4,
    ceil: () => ceil2,
    clone: () => clone4,
    copy: () => copy4,
    create: () => create4,
    cross: () => cross2,
    dist: () => dist2,
    distance: () => distance2,
    div: () => div2,
    divide: () => divide2,
    dot: () => dot2,
    equals: () => equals4,
    exactEquals: () => exactEquals4,
    floor: () => floor2,
    forEach: () => forEach2,
    fromValues: () => fromValues4,
    inverse: () => inverse2,
    len: () => len2,
    length: () => length2,
    lerp: () => lerp2,
    max: () => max2,
    min: () => min2,
    mul: () => mul4,
    multiply: () => multiply4,
    negate: () => negate2,
    normalize: () => normalize2,
    random: () => random2,
    round: () => round2,
    scale: () => scale4,
    scaleAndAdd: () => scaleAndAdd2,
    set: () => set4,
    sqrDist: () => sqrDist2,
    sqrLen: () => sqrLen2,
    squaredDistance: () => squaredDistance2,
    squaredLength: () => squaredLength2,
    str: () => str4,
    sub: () => sub4,
    subtract: () => subtract4,
    transformMat4: () => transformMat42,
    transformQuat: () => transformQuat2,
    zero: () => zero2
  });
  function create4() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  function clone4(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function fromValues4(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function copy4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function set4(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function add4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  function subtract4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  function multiply4(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
  }
  function divide2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
  }
  function ceil2(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
  }
  function floor2(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
  }
  function min2(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
  }
  function max2(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
  }
  function round2(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
  }
  function scale4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  function scaleAndAdd2(out, a, b, scale6) {
    out[0] = a[0] + b[0] * scale6;
    out[1] = a[1] + b[1] * scale6;
    out[2] = a[2] + b[2] * scale6;
    out[3] = a[3] + b[3] * scale6;
    return out;
  }
  function distance2(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return Math.hypot(x, y, z, w);
  }
  function squaredDistance2(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
  }
  function length2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
  }
  function squaredLength2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  function negate2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
  }
  function inverse2(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    out[3] = 1 / a[3];
    return out;
  }
  function normalize2(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len4 = x * x + y * y + z * z + w * w;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
    }
    out[0] = x * len4;
    out[1] = y * len4;
    out[2] = z * len4;
    out[3] = w * len4;
    return out;
  }
  function dot2(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  function cross2(out, u, v, w) {
    var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
    var G = u[0];
    var H = u[1];
    var I = u[2];
    var J = u[3];
    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;
    return out;
  }
  function lerp2(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  function random2(out, scale6) {
    scale6 = scale6 || 1;
    var v1, v2, v3, v4;
    var s1, s2;
    do {
      v1 = RANDOM() * 2 - 1;
      v2 = RANDOM() * 2 - 1;
      s1 = v1 * v1 + v2 * v2;
    } while (s1 >= 1);
    do {
      v3 = RANDOM() * 2 - 1;
      v4 = RANDOM() * 2 - 1;
      s2 = v3 * v3 + v4 * v4;
    } while (s2 >= 1);
    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale6 * v1;
    out[1] = scale6 * v2;
    out[2] = scale6 * v3 * d;
    out[3] = scale6 * v4 * d;
    return out;
  }
  function transformMat42(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  function transformQuat2(out, a, q) {
    var x = a[0], y = a[1], z = a[2];
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
  }
  function zero2(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
  }
  function str4(a) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  function exactEquals4(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  function equals4(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
  }
  var sub4 = subtract4;
  var mul4 = multiply4;
  var div2 = divide2;
  var dist2 = distance2;
  var sqrDist2 = squaredDistance2;
  var len2 = length2;
  var sqrLen2 = squaredLength2;
  var forEach2 = function() {
    var vec = create4();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/quat.js
  function create5() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }
  function identity3(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2;
    var s = Math.sin(rad / 2);
    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }
    return rad;
  }
  function getAngle(a, b) {
    var dotproduct = dot3(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
  function multiply5(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function rotateX3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  function rotateY3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  function rotateZ3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  function calculateW(out, a) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
    return out;
  }
  function exp(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }
  function ln(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
  }
  function pow(out, a, b) {
    ln(out, a);
    scale5(out, out, b);
    exp(out, out);
    return out;
  }
  function slerp(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function random3(out) {
    var u1 = RANDOM();
    var u2 = RANDOM();
    var u3 = RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
    return out;
  }
  function invert3(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var dot4 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot4 ? 1 / dot4 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  function fromMat3(out, m) {
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      var i = 0;
      if (m[4] > m[0])
        i = 1;
      if (m[8] > m[i * 3 + i])
        i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  function str5(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  var clone5 = clone4;
  var fromValues5 = fromValues4;
  var copy5 = copy4;
  var set5 = set4;
  var add5 = add4;
  var mul5 = multiply5;
  var scale5 = scale4;
  var dot3 = dot2;
  var lerp3 = lerp2;
  var length3 = length2;
  var len3 = length3;
  var squaredLength3 = squaredLength2;
  var sqrLen3 = squaredLength3;
  var normalize3 = normalize2;
  var exactEquals5 = exactEquals4;
  var equals5 = equals4;
  var rotationTo = function() {
    var tmpvec3 = create3();
    var xUnitVec3 = fromValues3(1, 0, 0);
    var yUnitVec3 = fromValues3(0, 1, 0);
    return function(out, a, b) {
      var dot4 = dot(a, b);
      if (dot4 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 1e-6)
          cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot4 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot4;
        return normalize3(out, out);
      }
    };
  }();
  var sqlerp = function() {
    var temp1 = create5();
    var temp2 = create5();
    return function(out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  var setAxes = function() {
    var matr = create();
    return function(out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize3(out, fromMat3(out, matr));
    };
  }();

  // src/neuroglancer/util/array.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  // src/neuroglancer/util/geom.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const identityMat4 = mat4_exports.create();
  const kAxes = [
    vec3_exports.fromValues(1, 0, 0),
    vec3_exports.fromValues(0, 1, 0),
    vec3_exports.fromValues(0, 0, 1)
  ];
  const kZeroVec = vec3_exports.fromValues(0, 0, 0);
  const kZeroVec4 = vec4_exports.fromValues(0, 0, 0, 0);
  const kOneVec = vec3_exports.fromValues(1, 1, 1);
  const kInfinityVec = vec3_exports.fromValues(Infinity, Infinity, Infinity);
  const kIdentityQuat = quat_exports.create();
  function prod3(x) {
    return x[0] * x[1] * x[2];
  }
  function vec3Key(x) {
    return `${x[0]},${x[1]},${x[2]}`;
  }
  function transformVectorByMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z;
    out[1] = m[1] * x + m[5] * y + m[9] * z;
    out[2] = m[2] * x + m[6] * y + m[10] * z;
    return out;
  }
  function transformVectorByMat4Transpose(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[1] * y + m[2] * z;
    out[1] = m[4] * x + m[5] * y + m[6] * z;
    out[2] = m[8] * x + m[9] * y + m[10] * z;
    return out;
  }
  function translationRotationScaleZReflectionToMat4(out, translation, rotation, scale6, zReflection) {
    const temp = out;
    out[0] = scale6[0];
    out[1] = scale6[1];
    out[2] = scale6[2] * zReflection;
    return mat4_exports.fromRotationTranslationScale(out, rotation, translation, temp);
  }
  function mat3FromMat4(out, m) {
    const m00 = m[0], m01 = m[1], m02 = m[2], m10 = m[4], m11 = m[5], m12 = m[6], m20 = m[8], m21 = m[9], m22 = m[10];
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function getFrustrumPlanes(out, m) {
    const m00 = m[0], m10 = m[1], m20 = m[2], m30 = m[3], m01 = m[4], m11 = m[5], m21 = m[6], m31 = m[7], m02 = m[8], m12 = m[9], m22 = m[10], m32 = m[11], m03 = m[12], m13 = m[13], m23 = m[14], m33 = m[15];
    out[0] = m30 + m00;
    out[1] = m31 + m01;
    out[2] = m32 + m02;
    out[3] = m33 + m03;
    out[4] = m30 - m00;
    out[5] = m31 - m01;
    out[6] = m32 - m02;
    out[7] = m33 - m03;
    out[8] = m30 + m10;
    out[9] = m31 + m11;
    out[10] = m32 + m12;
    out[11] = m33 + m13;
    out[12] = m30 - m10;
    out[13] = m31 - m11;
    out[14] = m32 - m12;
    out[15] = m33 - m13;
    const nearA = m30 + m20;
    const nearB = m31 + m21;
    const nearC = m32 + m22;
    const nearD = m33 + m23;
    const farA = m30 - m20;
    const farB = m31 - m21;
    const farC = m32 - m22;
    const farD = m33 - m23;
    const nearNorm = Math.sqrt(nearA ** 2 + nearB ** 2 + nearC ** 2);
    out[16] = nearA / nearNorm;
    out[17] = nearB / nearNorm;
    out[18] = nearC / nearNorm;
    out[19] = nearD / nearNorm;
    const farNorm = Math.sqrt(farA ** 2 + farB ** 2 + farC ** 2);
    out[20] = farA / farNorm;
    out[21] = farB / farNorm;
    out[22] = farC / farNorm;
    out[23] = farD / farNorm;
    return out;
  }
  function isAABBVisible(xLower, yLower, zLower, xUpper, yUpper, zUpper, clippingPlanes) {
    for (let i = 0; i < 6; ++i) {
      const a = clippingPlanes[i * 4], b = clippingPlanes[i * 4 + 1], c = clippingPlanes[i * 4 + 2], d = clippingPlanes[i * 4 + 3];
      const sum = Math.max(a * xLower, a * xUpper) + Math.max(b * yLower, b * yUpper) + Math.max(c * zLower, c * zUpper) + d;
      if (sum < 0) {
        return false;
      }
    }
    return true;
  }
  function isAABBIntersectingPlane(xLower, yLower, zLower, xUpper, yUpper, zUpper, clippingPlanes) {
    for (let i = 0; i < 4; ++i) {
      const a = clippingPlanes[i * 4], b = clippingPlanes[i * 4 + 1], c = clippingPlanes[i * 4 + 2], d = clippingPlanes[i * 4 + 3];
      const sum = Math.max(a * xLower, a * xUpper) + Math.max(b * yLower, b * yUpper) + Math.max(c * zLower, c * zUpper) + d;
      if (sum < 0) {
        return false;
      }
    }
    {
      const i = 5;
      const a = clippingPlanes[i * 4], b = clippingPlanes[i * 4 + 1], c = clippingPlanes[i * 4 + 2], d = clippingPlanes[i * 4 + 3];
      const maxSum = Math.max(a * xLower, a * xUpper) + Math.max(b * yLower, b * yUpper) + Math.max(c * zLower, c * zUpper);
      const minSum = Math.min(a * xLower, a * xUpper) + Math.min(b * yLower, b * yUpper) + Math.min(c * zLower, c * zUpper);
      const epsilon = Math.abs(d) * 1e-6;
      if (minSum > -d + epsilon || maxSum < -d - epsilon)
        return false;
    }
    return true;
  }
  function getViewFrustrumVolume(projectionMat) {
    if (projectionMat[15] === 1) {
      const depth = 2 / Math.abs(projectionMat[10]);
      const width = 2 / Math.abs(projectionMat[0]);
      const height = 2 / Math.abs(projectionMat[5]);
      return width * height * depth;
    }
    const a = projectionMat[10];
    const b = projectionMat[14];
    const near = 2 * b / (2 * a - 2);
    const far = (a - 1) * near / (a + 1);
    const baseArea = 4 / (projectionMat[0] * projectionMat[5]);
    return baseArea / 3 * (Math.abs(far) ** 3 - Math.abs(near) ** 3);
  }
  function getViewFrustrumDepthRange(projectionMat) {
    if (projectionMat[15] === 1) {
      const depth2 = 2 / Math.abs(projectionMat[10]);
      return depth2;
    }
    const a = projectionMat[10];
    const b = projectionMat[14];
    const near = 2 * b / (2 * a - 2);
    const far = (a - 1) * near / (a + 1);
    const depth = Math.abs(far - near);
    return depth;
  }

  // src/neuroglancer/util/json.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function verifyFloat(obj) {
    let t = typeof obj;
    if (t === "number" || t === "string") {
      let x = parseFloat("" + obj);
      if (!Number.isNaN(x)) {
        return x;
      }
    }
    throw new Error(`Expected floating-point number, but received: ${JSON.stringify(obj)}.`);
  }
  function verifyFiniteFloat(obj) {
    let x = verifyFloat(obj);
    if (Number.isFinite(x)) {
      return x;
    }
    throw new Error(`Expected finite floating-point number, but received: ${x}.`);
  }
  function verifyFiniteNonNegativeFloat(obj) {
    let x = verifyFloat(obj);
    if (Number.isFinite(x) && x >= 0) {
      return x;
    }
    throw new Error(`Expected finite non-negative floating-point number, but received: ${x}.`);
  }
  function verifyFinitePositiveFloat(obj) {
    let x = verifyFiniteFloat(obj);
    if (x > 0) {
      return x;
    }
    throw new Error(`Expected positive finite floating-point number, but received: ${x}.`);
  }
  function parseIntVec(out, obj) {
    let length4 = out.length;
    if (!Array.isArray(obj) || obj.length !== length4) {
      throw new Error("Incompatible sizes.");
    }
    for (let i = 0; i < length4; ++i) {
      let val = parseInt(obj[i], void 0);
      if (!Number.isInteger(val)) {
        throw new Error("Non-integer value.");
      }
    }
    for (let i = 0; i < length4; ++i) {
      out[i] = parseInt(obj[i], void 0);
    }
    return out;
  }
  function stableStringify(x) {
    if (typeof x === "object") {
      if (x === null) {
        return "null";
      }
      if (Array.isArray(x)) {
        let s2 = "[";
        let size2 = x.length;
        let i2 = 0;
        if (i2 < size2) {
          s2 += stableStringify(x[i2]);
          while (++i2 < size2) {
            s2 += ",";
            s2 += stableStringify(x[i2]);
          }
        }
        s2 += "]";
        return s2;
      }
      let s = "{";
      let keys = Object.keys(x).sort();
      let i = 0;
      let size = keys.length;
      if (i < size) {
        let key = keys[i];
        s += JSON.stringify(key);
        s += ":";
        s += stableStringify(x[key]);
        while (++i < size) {
          s += ",";
          key = keys[i];
          s += JSON.stringify(key);
          s += ":";
          s += stableStringify(x[key]);
        }
      }
      s += "}";
      return s;
    }
    return JSON.stringify(x);
  }
  const SINGLE_QUOTE_STRING_PATTERN = /('(?:[^'\\]|(?:\\.))*')/;
  const DOUBLE_QUOTE_STRING_PATTERN = /("(?:[^"\\]|(?:\\.))*")/;
  const SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN = new RegExp(`${SINGLE_QUOTE_STRING_PATTERN.source}|${DOUBLE_QUOTE_STRING_PATTERN.source}`);
  const DOUBLE_OR_SINGLE_QUOTE_STRING_PATTERN = new RegExp(`${DOUBLE_QUOTE_STRING_PATTERN.source}|${SINGLE_QUOTE_STRING_PATTERN.source}`);
  const DOUBLE_QUOTE_PATTERN = /^((?:[^"'\\]|(?:\\[^']))*)("|\\')/;
  function convertStringLiteral(x, quoteInitial, quoteReplace, quoteSearch) {
    if (x.length >= 2 && x.charAt(0) === quoteInitial && x.charAt(x.length - 1) === quoteInitial) {
      let inner = x.substr(1, x.length - 2);
      let s = quoteReplace;
      while (inner.length > 0) {
        let m = inner.match(quoteSearch);
        if (m === null) {
          s += inner;
          break;
        }
        s += m[1];
        if (m[2] === quoteReplace) {
          s += "\\";
          s += quoteReplace;
        } else {
          s += quoteInitial;
        }
        inner = inner.substr(m.index + m[0].length);
      }
      s += quoteReplace;
      return s;
    }
    return x;
  }
  function normalizeStringLiteral(x) {
    return convertStringLiteral(x, "'", '"', DOUBLE_QUOTE_PATTERN);
  }
  function pythonLiteralToJSON(x) {
    let s = "";
    while (x.length > 0) {
      let m = x.match(SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN);
      let before;
      let replacement;
      if (m === null) {
        before = x;
        x = "";
        replacement = "";
      } else {
        before = x.substr(0, m.index);
        x = x.substr(m.index + m[0].length);
        let singleQuoteString = m[1];
        if (singleQuoteString !== void 0) {
          replacement = normalizeStringLiteral(singleQuoteString);
        } else {
          replacement = m[2];
        }
      }
      s += before.replace(/\(/g, "[").replace(/\)/g, "]").replace("True", "true").replace("False", "false").replace(/,\s*([\}\]])/g, "$1");
      s += replacement;
    }
    return s;
  }
  function pythonLiteralParse(x) {
    return JSON.parse(pythonLiteralToJSON(x));
  }
  function expectArray(x, length4) {
    if (!Array.isArray(x)) {
      throw new Error(`Expected array, but received: ${JSON.stringify(x)}.`);
    }
    if (length4 !== void 0 && x.length !== length4) {
      throw new Error(`Expected array of length ${length4}, but received: ${JSON.stringify(x)}.`);
    }
    return x;
  }
  function parseArray(x, parseElement) {
    if (!Array.isArray(x)) {
      throw new Error(`Expected array, but received: ${JSON.stringify(x)}.`);
    }
    return x.map(parseElement);
  }
  function parseFixedLengthArray(out, obj, parseElement) {
    const length4 = out.length;
    if (!Array.isArray(obj) || obj.length !== length4) {
      throw new Error(`Expected length ${length4} array, but received: ${JSON.stringify(obj)}.`);
    }
    for (let i = 0; i < length4; ++i) {
      out[i] = parseElement(obj[i], i);
    }
    return out;
  }
  function verifyObject(obj) {
    if (typeof obj !== "object" || obj == null || Array.isArray(obj)) {
      throw new Error(`Expected JSON object, but received: ${JSON.stringify(obj)}.`);
    }
    return obj;
  }
  function verifyInt(obj) {
    let result = parseInt(obj, 10);
    if (!Number.isInteger(result)) {
      throw new Error(`Expected integer, but received: ${JSON.stringify(obj)}.`);
    }
    return result;
  }
  function verifyString(obj) {
    if (typeof obj !== "string") {
      throw new Error(`Expected string, but received: ${JSON.stringify(obj)}.`);
    }
    return obj;
  }
  function verifyOptionalString(obj) {
    if (obj === void 0) {
      return void 0;
    }
    return verifyString(obj);
  }
  function verifyObjectProperty(obj, propertyName, validator) {
    let value = Object.prototype.hasOwnProperty.call(obj, propertyName) ? obj[propertyName] : void 0;
    try {
      return validator(value);
    } catch (parseError) {
      throw new Error(`Error parsing ${JSON.stringify(propertyName)} property: ${parseError.message}`);
    }
  }
  function verifyFloat01(obj) {
    if (typeof obj !== "number" || !Number.isFinite(obj) || obj < 0 || obj > 1) {
      throw new Error(`Expected floating point number in [0,1], but received: ${JSON.stringify(obj)}.`);
    }
    return obj;
  }
  function verifyEnumString(obj, enumType) {
    if (typeof obj === "string" && obj.match(/^[a-zA-Z]/) !== null) {
      obj = obj.toUpperCase();
      if (enumType.hasOwnProperty(obj)) {
        return enumType[obj];
      }
    }
    throw new Error(`Invalid enum value: ${JSON.stringify(obj)}.`);
  }
  function verifyStringArray(a) {
    if (!Array.isArray(a)) {
      throw new Error(`Expected array, received: ${JSON.stringify(a)}.`);
    }
    for (let x of a) {
      if (typeof x !== "string") {
        throw new Error(`Expected string, received: ${JSON.stringify(x)}.`);
      }
    }
    return a;
  }
  function verifyIntegerArray(a) {
    if (!Array.isArray(a)) {
      throw new Error(`Expected array, received: ${JSON.stringify(a)}.`);
    }
    for (let x of a) {
      if (!Number.isInteger(x)) {
        throw new Error(`Expected integer, received: ${JSON.stringify(x)}.`);
      }
    }
    return a;
  }
  function verifyBoolean(x) {
    if (typeof x !== "boolean") {
      throw new Error(`Expected boolean, received: ${JSON.stringify(x)}`);
    }
    return x;
  }

  // src/neuroglancer/util/memoize.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Memoize {
    constructor() {
      this.map = new Map();
    }
    get(key, getter) {
      let {map} = this;
      let obj = map.get(key);
      if (obj === void 0) {
        obj = getter();
        obj.registerDisposer(() => {
          map.delete(key);
        });
        map.set(key, obj);
      } else {
        obj.addRef();
      }
      return obj;
    }
  }
  class StringMemoize extends Memoize {
    get(x, getter) {
      if (typeof x !== "string") {
        x = stableStringify(x);
      }
      return super.get(x, getter);
    }
    getUncounted(x, getter) {
      return this.get(x, () => new RefCountedValue(getter())).value;
    }
  }

  // src/neuroglancer/util/pairing_heap.0.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Implementation {
    constructor(compare) {
      this.compare = compare;
    }
    meld(a, b) {
      if (b === null) {
        return a;
      }
      if (a === null) {
        return b;
      }
      let {compare} = this;
      if (compare(b, a)) {
        let temp = a;
        a = b;
        b = temp;
      }
      var aChild = a.child0;
      b.next0 = aChild;
      b.prev0 = a;
      if (aChild !== null) {
        aChild.prev0 = b;
      }
      a.child0 = b;
      return a;
    }
    combineChildren(node) {
      var cur = node.child0;
      if (cur === null) {
        return null;
      }
      let head = null;
      while (true) {
        let curNext = cur.next0;
        let next, m;
        if (curNext === null) {
          next = null;
          m = cur;
        } else {
          next = curNext.next0;
          m = this.meld(cur, curNext);
        }
        m.next0 = head;
        head = m;
        if (next === null) {
          break;
        }
        cur = next;
      }
      var root = head;
      head = head.next0;
      while (true) {
        if (head === null) {
          break;
        }
        let next = head.next0;
        root = this.meld(root, head);
        head = next;
      }
      root.prev0 = null;
      root.next0 = null;
      return root;
    }
    removeMin(root) {
      var newRoot = this.combineChildren(root);
      root.next0 = null;
      root.prev0 = null;
      root.child0 = null;
      return newRoot;
    }
    remove(root, node) {
      if (root === node) {
        return this.removeMin(root);
      }
      var prev = node.prev0;
      var next = node.next0;
      if (prev.child0 === node) {
        prev.child0 = next;
      } else {
        prev.next0 = next;
      }
      if (next !== null) {
        next.prev0 = prev;
      }
      let newRoot = this.meld(root, this.combineChildren(node));
      node.next0 = null;
      node.prev0 = null;
      node.child0 = null;
      return newRoot;
    }
    *entries(root) {
      if (root !== null) {
        let child = root.child0;
        yield root;
        while (child !== null) {
          let next = child.next0;
          yield* this.entries(child);
          child = next;
        }
      }
    }
    *removedEntries(root) {
      if (root !== null) {
        let child = root.child0;
        root.child0 = null;
        root.next0 = null;
        root.prev0 = null;
        yield root;
        while (child !== null) {
          let next = child.next0;
          child.child0 = null;
          child.next0 = null;
          child.prev0 = null;
          yield* this.entries(child);
          child = next;
        }
      }
    }
  }

  // src/neuroglancer/util/pairing_heap.1.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Implementation2 {
    constructor(compare) {
      this.compare = compare;
    }
    meld(a, b) {
      if (b === null) {
        return a;
      }
      if (a === null) {
        return b;
      }
      let {compare} = this;
      if (compare(b, a)) {
        let temp = a;
        a = b;
        b = temp;
      }
      var aChild = a.child1;
      b.next1 = aChild;
      b.prev1 = a;
      if (aChild !== null) {
        aChild.prev1 = b;
      }
      a.child1 = b;
      return a;
    }
    combineChildren(node) {
      var cur = node.child1;
      if (cur === null) {
        return null;
      }
      let head = null;
      while (true) {
        let curNext = cur.next1;
        let next, m;
        if (curNext === null) {
          next = null;
          m = cur;
        } else {
          next = curNext.next1;
          m = this.meld(cur, curNext);
        }
        m.next1 = head;
        head = m;
        if (next === null) {
          break;
        }
        cur = next;
      }
      var root = head;
      head = head.next1;
      while (true) {
        if (head === null) {
          break;
        }
        let next = head.next1;
        root = this.meld(root, head);
        head = next;
      }
      root.prev1 = null;
      root.next1 = null;
      return root;
    }
    removeMin(root) {
      var newRoot = this.combineChildren(root);
      root.next1 = null;
      root.prev1 = null;
      root.child1 = null;
      return newRoot;
    }
    remove(root, node) {
      if (root === node) {
        return this.removeMin(root);
      }
      var prev = node.prev1;
      var next = node.next1;
      if (prev.child1 === node) {
        prev.child1 = next;
      } else {
        prev.next1 = next;
      }
      if (next !== null) {
        next.prev1 = prev;
      }
      let newRoot = this.meld(root, this.combineChildren(node));
      node.next1 = null;
      node.prev1 = null;
      node.child1 = null;
      return newRoot;
    }
    *entries(root) {
      if (root !== null) {
        let child = root.child1;
        yield root;
        while (child !== null) {
          let next = child.next1;
          yield* this.entries(child);
          child = next;
        }
      }
    }
    *removedEntries(root) {
      if (root !== null) {
        let child = root.child1;
        root.child1 = null;
        root.next1 = null;
        root.prev1 = null;
        yield root;
        while (child !== null) {
          let next = child.next1;
          child.child1 = null;
          child.next1 = null;
          child.prev1 = null;
          yield* this.entries(child);
          child = next;
        }
      }
    }
  }

  // src/neuroglancer/util/signal.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class Signal {
    constructor() {
      this.handlers = new Set();
      this.count = 0;
      const obj = this;
      this.dispatch = function() {
        ++obj.count;
        obj.handlers.forEach((handler) => {
          handler.apply(this, arguments);
        });
      };
    }
    add(handler) {
      this.handlers.add(handler);
      return () => {
        return this.remove(handler);
      };
    }
    remove(handler) {
      return this.handlers.delete(handler);
    }
    dispose() {
      this.handlers = void 0;
    }
  }
  class NullarySignal extends Signal {
  }

  // src/neuroglancer/chunk_manager/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG_CHUNK_UPDATES = false;
  let nextMarkGeneration = 0;
  function getNextMarkGeneration() {
    return ++nextMarkGeneration;
  }
  class Chunk {
    constructor() {
      this.child0 = null;
      this.next0 = null;
      this.prev0 = null;
      this.child1 = null;
      this.next1 = null;
      this.prev1 = null;
      this.source = null;
      this.key = null;
      this.state_ = ChunkState.NEW;
      this.error = null;
      this.markGeneration = -1;
      this.priority = 0;
      this.newPriority = 0;
      this.priorityTier = ChunkPriorityTier.RECENT;
      this.newPriorityTier = ChunkPriorityTier.RECENT;
      this.systemMemoryBytes_ = 0;
      this.gpuMemoryBytes_ = 0;
      this.downloadSlots_ = 1;
      this.backendOnly = false;
      this.isComputational = false;
      this.newlyRequestedToFrontend = false;
      this.requestedToFrontend = false;
      this.downloadCancellationToken = void 0;
    }
    initialize(key) {
      this.key = key;
      this.priority = Number.NEGATIVE_INFINITY;
      this.priorityTier = ChunkPriorityTier.RECENT;
      this.newPriority = Number.NEGATIVE_INFINITY;
      this.newPriorityTier = ChunkPriorityTier.RECENT;
      this.error = null;
      this.state = ChunkState.NEW;
      this.requestedToFrontend = false;
      this.newlyRequestedToFrontend = false;
    }
    updatePriorityProperties() {
      this.priorityTier = this.newPriorityTier;
      this.priority = this.newPriority;
      this.newPriorityTier = ChunkPriorityTier.RECENT;
      this.newPriority = Number.NEGATIVE_INFINITY;
      this.requestedToFrontend = this.newlyRequestedToFrontend;
    }
    dispose() {
      this.source = null;
      this.error = null;
    }
    get chunkManager() {
      return this.source.chunkManager;
    }
    get queueManager() {
      return this.source.chunkManager.queueManager;
    }
    downloadFailed(error) {
      this.error = error;
      this.queueManager.updateChunkState(this, ChunkState.FAILED);
    }
    downloadSucceeded() {
      this.queueManager.updateChunkState(this, ChunkState.SYSTEM_MEMORY_WORKER);
    }
    freeSystemMemory() {
    }
    serialize(msg, _transfers) {
      msg["id"] = this.key;
      msg["source"] = this.source.rpcId;
      msg["new"] = true;
    }
    toString() {
      return this.key;
    }
    set state(newState) {
      if (newState === this.state_) {
        return;
      }
      const oldState = this.state_;
      this.state_ = newState;
      this.source.chunkStateChanged(this, oldState);
    }
    get state() {
      return this.state_;
    }
    set systemMemoryBytes(bytes) {
      updateChunkStatistics(this, -1);
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false);
      this.systemMemoryBytes_ = bytes;
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true);
      updateChunkStatistics(this, 1);
      this.chunkManager.queueManager.scheduleUpdate();
    }
    get systemMemoryBytes() {
      return this.systemMemoryBytes_;
    }
    set gpuMemoryBytes(bytes) {
      updateChunkStatistics(this, -1);
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false);
      this.gpuMemoryBytes_ = bytes;
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true);
      updateChunkStatistics(this, 1);
      this.chunkManager.queueManager.scheduleUpdate();
    }
    get gpuMemoryBytes() {
      return this.gpuMemoryBytes_;
    }
    get downloadSlots() {
      return this.downloadSlots_;
    }
    set downloadSlots(count) {
      if (count === this.downloadSlots_)
        return;
      updateChunkStatistics(this, -1);
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, false);
      this.downloadSlots_ = count;
      this.chunkManager.queueManager.adjustCapacitiesForChunk(this, true);
      updateChunkStatistics(this, 1);
      this.chunkManager.queueManager.scheduleUpdate();
    }
    registerListener(listener) {
      if (!this.source) {
        return false;
      }
      return this.source.registerChunkListener(this.key, listener);
    }
    unregisterListener(listener) {
      if (!this.source) {
        return false;
      }
      return this.source.unregisterChunkListener(this.key, listener);
    }
    static priorityLess(a, b) {
      return a.priority < b.priority;
    }
    static priorityGreater(a, b) {
      return a.priority > b.priority;
    }
  }
  const numSourceQueueLevels = 2;
  class ChunkSourceBase extends SharedObject {
    constructor(chunkManager) {
      super();
      this.chunkManager = chunkManager;
      this.listeners_ = new Map();
      this.chunks = new Map();
      this.freeChunks = new Array();
      this.statistics = new Float64Array(numChunkStatistics);
      this.sourceQueueLevel = 0;
      chunkManager.queueManager.sources.add(this);
    }
    disposed() {
      this.chunkManager.queueManager.sources.delete(this);
      super.disposed();
    }
    getNewChunk_(chunkType) {
      let freeChunks = this.freeChunks;
      let freeChunksLength = freeChunks.length;
      if (freeChunksLength > 0) {
        let chunk2 = freeChunks[freeChunksLength - 1];
        freeChunks.length = freeChunksLength - 1;
        chunk2.source = this;
        return chunk2;
      }
      let chunk = new chunkType();
      chunk.source = this;
      return chunk;
    }
    addChunk(chunk) {
      let {chunks} = this;
      if (chunks.size === 0) {
        this.addRef();
      }
      chunks.set(chunk.key, chunk);
      updateChunkStatistics(chunk, 1);
    }
    removeChunk(chunk) {
      let {chunks, freeChunks} = this;
      chunks.delete(chunk.key);
      chunk.dispose();
      freeChunks[freeChunks.length] = chunk;
      if (chunks.size === 0) {
        this.dispose();
      }
    }
    registerChunkListener(key, listener) {
      if (!this.listeners_.has(key)) {
        this.listeners_.set(key, [listener]);
      } else {
        this.listeners_.get(key).push(listener);
      }
      return true;
    }
    unregisterChunkListener(key, listener) {
      if (!this.listeners_.has(key)) {
        return false;
      }
      const keyListeners = this.listeners_.get(key);
      const idx = keyListeners.indexOf(listener);
      if (idx < 0) {
        return false;
      }
      keyListeners.splice(idx, 1);
      if (keyListeners.length === 0) {
        this.listeners_.delete(key);
      }
      return true;
    }
    chunkStateChanged(chunk, oldState) {
      if (!chunk.key) {
        return;
      }
      if (!this.listeners_.has(chunk.key)) {
        return;
      }
      for (const listener of [...this.listeners_.get(chunk.key)]) {
        listener.stateChanged(chunk, oldState);
      }
    }
  }
  function updateChunkStatistics(chunk, sign) {
    const {statistics} = chunk.source;
    const {systemMemoryBytes, gpuMemoryBytes} = chunk;
    const index2 = getChunkStateStatisticIndex(chunk.state, chunk.priorityTier);
    statistics[index2 * numChunkMemoryStatistics + ChunkMemoryStatistics.numChunks] += sign;
    statistics[index2 * numChunkMemoryStatistics + ChunkMemoryStatistics.systemMemoryBytes] += sign * systemMemoryBytes;
    statistics[index2 * numChunkMemoryStatistics + ChunkMemoryStatistics.gpuMemoryBytes] += sign * gpuMemoryBytes;
  }
  class ChunkSource extends ChunkSourceBase {
    constructor(rpc2, options) {
      const chunkManager = rpc2.get(options["chunkManager"]);
      super(chunkManager);
      initializeSharedObjectCounterpart(this, rpc2, options);
    }
  }
  function startChunkDownload(chunk) {
    const downloadCancellationToken = chunk.downloadCancellationToken = new CancellationTokenSource();
    const startTime = Date.now();
    chunk.source.download(chunk, downloadCancellationToken).then(() => {
      if (chunk.downloadCancellationToken === downloadCancellationToken) {
        chunk.downloadCancellationToken = void 0;
        const endTime = Date.now();
        const {statistics} = chunk.source;
        statistics[getChunkDownloadStatisticIndex(ChunkDownloadStatistics.totalTime)] += endTime - startTime;
        ++statistics[getChunkDownloadStatisticIndex(ChunkDownloadStatistics.totalChunks)];
        chunk.downloadSucceeded();
      }
    }, (error) => {
      if (chunk.downloadCancellationToken === downloadCancellationToken) {
        chunk.downloadCancellationToken = void 0;
        chunk.downloadFailed(error);
        console.log(`Error retrieving chunk ${chunk}: ${error}`);
      }
    });
  }
  function cancelChunkDownload(chunk) {
    const token = chunk.downloadCancellationToken;
    chunk.downloadCancellationToken = void 0;
    token.cancel();
  }
  class ChunkPriorityQueue {
    constructor(heapOperations, linkedListOperations) {
      this.heapOperations = heapOperations;
      this.linkedListOperations = linkedListOperations;
      this.heapRoots = [null, null];
      this.recentHead = new Chunk();
      linkedListOperations.initializeHead(this.recentHead);
    }
    add(chunk) {
      let priorityTier = chunk.priorityTier;
      if (priorityTier === ChunkPriorityTier.RECENT) {
        this.linkedListOperations.insertAfter(this.recentHead, chunk);
      } else {
        let {heapRoots} = this;
        heapRoots[priorityTier] = this.heapOperations.meld(heapRoots[priorityTier], chunk);
      }
    }
    *candidates() {
      if (this.heapOperations.compare === Chunk.priorityLess) {
        let {linkedListOperations, recentHead} = this;
        while (true) {
          let chunk = linkedListOperations.back(recentHead);
          if (chunk == null) {
            break;
          } else {
            yield chunk;
          }
        }
        let {heapRoots} = this;
        for (let tier = ChunkPriorityTier.LAST_ORDERED_TIER; tier >= ChunkPriorityTier.FIRST_ORDERED_TIER; --tier) {
          while (true) {
            let root = heapRoots[tier];
            if (root == null) {
              break;
            } else {
              yield root;
            }
          }
        }
      } else {
        let heapRoots = this.heapRoots;
        for (let tier = ChunkPriorityTier.FIRST_ORDERED_TIER; tier <= ChunkPriorityTier.LAST_ORDERED_TIER; ++tier) {
          while (true) {
            let root = heapRoots[tier];
            if (root == null) {
              break;
            } else {
              yield root;
            }
          }
        }
        let {linkedListOperations, recentHead} = this;
        while (true) {
          let chunk = linkedListOperations.front(recentHead);
          if (chunk == null) {
            break;
          } else {
            yield chunk;
          }
        }
      }
    }
    delete(chunk) {
      let priorityTier = chunk.priorityTier;
      if (priorityTier === ChunkPriorityTier.RECENT) {
        this.linkedListOperations.pop(chunk);
      } else {
        let heapRoots = this.heapRoots;
        heapRoots[priorityTier] = this.heapOperations.remove(heapRoots[priorityTier], chunk);
      }
    }
  }
  function makeChunkPriorityQueue0(compare) {
    return new ChunkPriorityQueue(new Implementation(compare), linked_list_0_default);
  }
  function makeChunkPriorityQueue1(compare) {
    return new ChunkPriorityQueue(new Implementation2(compare), linked_list_1_default);
  }
  function tryToFreeCapacity(size, capacity, priorityTier, priority, evictionCandidates, evict) {
    while (capacity.availableItems < 1 || capacity.availableSize < size) {
      let evictionCandidate = evictionCandidates.next().value;
      if (evictionCandidate === void 0) {
        return false;
      } else {
        let evictionTier = evictionCandidate.priorityTier;
        if (evictionTier < priorityTier || evictionTier === priorityTier && evictionCandidate.priority >= priority) {
          return false;
        }
        evict(evictionCandidate);
      }
    }
    return true;
  }
  class AvailableCapacity extends RefCounted {
    constructor(itemLimit, sizeLimit) {
      super();
      this.itemLimit = itemLimit;
      this.sizeLimit = sizeLimit;
      this.currentSize = 0;
      this.currentItems = 0;
      this.capacityChanged = new NullarySignal();
      this.registerDisposer(itemLimit.changed.add(this.capacityChanged.dispatch));
      this.registerDisposer(sizeLimit.changed.add(this.capacityChanged.dispatch));
    }
    adjust(items, size) {
      this.currentItems -= items;
      this.currentSize -= size;
    }
    get availableSize() {
      return this.sizeLimit.value - this.currentSize;
    }
    get availableItems() {
      return this.itemLimit.value - this.currentItems;
    }
    toString() {
      return `bytes=${this.currentSize}/${this.sizeLimit.value},items=${this.currentItems}/${this.itemLimit.value}`;
    }
  }
  let ChunkQueueManager = class extends SharedObjectCounterpart {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.sources = new Set();
      this.queuedDownloadPromotionQueue = [
        makeChunkPriorityQueue1(Chunk.priorityGreater),
        makeChunkPriorityQueue1(Chunk.priorityGreater)
      ];
      this.queuedComputePromotionQueue = makeChunkPriorityQueue1(Chunk.priorityGreater);
      this.downloadEvictionQueue = [
        makeChunkPriorityQueue1(Chunk.priorityLess),
        makeChunkPriorityQueue1(Chunk.priorityLess)
      ];
      this.computeEvictionQueue = makeChunkPriorityQueue1(Chunk.priorityLess);
      this.systemMemoryEvictionQueue = makeChunkPriorityQueue0(Chunk.priorityLess);
      this.gpuMemoryPromotionQueue = makeChunkPriorityQueue1(Chunk.priorityGreater);
      this.gpuMemoryEvictionQueue = makeChunkPriorityQueue1(Chunk.priorityLess);
      this.updatePending = null;
      this.gpuMemoryChanged = new NullarySignal();
      this.numQueued = 0;
      this.numFailed = 0;
      this.gpuMemoryGeneration = 0;
      const getCapacity = (capacity) => {
        const result = this.registerDisposer(new AvailableCapacity(rpc2.get(capacity["itemLimit"]), rpc2.get(capacity["sizeLimit"])));
        result.capacityChanged.add(() => this.scheduleUpdate());
        return result;
      };
      this.gpuMemoryCapacity = getCapacity(options["gpuMemoryCapacity"]);
      this.systemMemoryCapacity = getCapacity(options["systemMemoryCapacity"]);
      this.enablePrefetch = rpc2.get(options["enablePrefetch"]);
      this.downloadCapacity = [
        getCapacity(options["downloadCapacity"]),
        getCapacity(options["downloadCapacity"])
      ];
      this.computeCapacity = getCapacity(options["computeCapacity"]);
    }
    scheduleUpdate() {
      if (this.updatePending === null) {
        this.updatePending = setTimeout(this.process.bind(this), 0);
      }
    }
    *chunkQueuesForChunk(chunk) {
      switch (chunk.state) {
        case ChunkState.QUEUED:
          if (chunk.isComputational) {
            yield this.queuedComputePromotionQueue;
          } else {
            yield this.queuedDownloadPromotionQueue[chunk.source.sourceQueueLevel];
          }
          break;
        case ChunkState.DOWNLOADING:
          if (chunk.isComputational) {
            yield this.computeEvictionQueue;
          } else {
            yield this.downloadEvictionQueue[chunk.source.sourceQueueLevel];
            yield this.systemMemoryEvictionQueue;
          }
          break;
        case ChunkState.SYSTEM_MEMORY_WORKER:
        case ChunkState.SYSTEM_MEMORY:
          yield this.systemMemoryEvictionQueue;
          if (chunk.priorityTier !== ChunkPriorityTier.RECENT && !chunk.backendOnly && chunk.requestedToFrontend) {
            yield this.gpuMemoryPromotionQueue;
          }
          break;
        case ChunkState.GPU_MEMORY:
          yield this.systemMemoryEvictionQueue;
          yield this.gpuMemoryEvictionQueue;
          break;
      }
    }
    adjustCapacitiesForChunk(chunk, add7) {
      let factor = add7 ? -1 : 1;
      switch (chunk.state) {
        case ChunkState.FAILED:
          this.numFailed -= factor;
          break;
        case ChunkState.QUEUED:
          this.numQueued -= factor;
          break;
        case ChunkState.DOWNLOADING:
          (chunk.isComputational ? this.computeCapacity : this.downloadCapacity[chunk.source.sourceQueueLevel]).adjust(factor * chunk.downloadSlots, factor * chunk.systemMemoryBytes);
          this.systemMemoryCapacity.adjust(factor, factor * chunk.systemMemoryBytes);
          break;
        case ChunkState.SYSTEM_MEMORY:
        case ChunkState.SYSTEM_MEMORY_WORKER:
          this.systemMemoryCapacity.adjust(factor, factor * chunk.systemMemoryBytes);
          break;
        case ChunkState.GPU_MEMORY:
          this.systemMemoryCapacity.adjust(factor, factor * chunk.systemMemoryBytes);
          this.gpuMemoryCapacity.adjust(factor, factor * chunk.gpuMemoryBytes);
          break;
      }
    }
    removeChunkFromQueues_(chunk) {
      updateChunkStatistics(chunk, -1);
      for (let queue of this.chunkQueuesForChunk(chunk)) {
        queue.delete(chunk);
      }
    }
    addChunkToQueues_(chunk) {
      if (chunk.state === ChunkState.QUEUED && chunk.priorityTier === ChunkPriorityTier.RECENT) {
        let {source} = chunk;
        source.removeChunk(chunk);
        this.adjustCapacitiesForChunk(chunk, false);
        return false;
      } else {
        updateChunkStatistics(chunk, 1);
        for (let queue of this.chunkQueuesForChunk(chunk)) {
          queue.add(chunk);
        }
        return true;
      }
    }
    performChunkPriorityUpdate(chunk) {
      if (chunk.priorityTier === chunk.newPriorityTier && chunk.priority === chunk.newPriority) {
        chunk.newPriorityTier = ChunkPriorityTier.RECENT;
        chunk.newPriority = Number.NEGATIVE_INFINITY;
        return;
      }
      if (DEBUG_CHUNK_UPDATES) {
        console.log(`${chunk}: changed priority ${chunk.priorityTier}:${chunk.priority} -> ${chunk.newPriorityTier}:${chunk.newPriority}`);
      }
      this.removeChunkFromQueues_(chunk);
      chunk.updatePriorityProperties();
      if (chunk.state === ChunkState.NEW) {
        chunk.state = ChunkState.QUEUED;
        this.adjustCapacitiesForChunk(chunk, true);
      }
      this.addChunkToQueues_(chunk);
    }
    updateChunkState(chunk, newState) {
      if (newState === chunk.state) {
        return;
      }
      if (DEBUG_CHUNK_UPDATES) {
        console.log(`${chunk}: changed state ${ChunkState[chunk.state]} -> ${ChunkState[newState]}`);
      }
      this.adjustCapacitiesForChunk(chunk, false);
      this.removeChunkFromQueues_(chunk);
      chunk.state = newState;
      this.adjustCapacitiesForChunk(chunk, true);
      this.addChunkToQueues_(chunk);
      this.scheduleUpdate();
    }
    processGPUPromotions_() {
      let queueManager = this;
      function evictFromGPUMemory(chunk) {
        queueManager.freeChunkGPUMemory(chunk);
        chunk.source.chunkManager.queueManager.updateChunkState(chunk, ChunkState.SYSTEM_MEMORY);
      }
      let promotionCandidates = this.gpuMemoryPromotionQueue.candidates();
      let evictionCandidates = this.gpuMemoryEvictionQueue.candidates();
      let capacity = this.gpuMemoryCapacity;
      while (true) {
        let promotionCandidate = promotionCandidates.next().value;
        if (promotionCandidate === void 0) {
          break;
        } else {
          let priorityTier = promotionCandidate.priorityTier;
          let priority = promotionCandidate.priority;
          if (!tryToFreeCapacity(promotionCandidate.gpuMemoryBytes, capacity, priorityTier, priority, evictionCandidates, evictFromGPUMemory)) {
            break;
          }
          this.copyChunkToGPU(promotionCandidate);
          this.updateChunkState(promotionCandidate, ChunkState.GPU_MEMORY);
        }
      }
    }
    freeChunkGPUMemory(chunk) {
      ++this.gpuMemoryGeneration;
      this.rpc.invoke("Chunk.update", {id: chunk.key, state: ChunkState.SYSTEM_MEMORY, source: chunk.source.rpcId});
    }
    freeChunkSystemMemory(chunk) {
      if (chunk.state === ChunkState.SYSTEM_MEMORY_WORKER) {
        chunk.freeSystemMemory();
      } else {
        this.rpc.invoke("Chunk.update", {id: chunk.key, state: ChunkState.EXPIRED, source: chunk.source.rpcId});
      }
    }
    retrieveChunkData(chunk) {
      return this.rpc.promiseInvoke("Chunk.retrieve", {key: chunk.key, source: chunk.source.rpcId});
    }
    copyChunkToGPU(chunk) {
      ++this.gpuMemoryGeneration;
      let rpc2 = this.rpc;
      if (chunk.state === ChunkState.SYSTEM_MEMORY) {
        rpc2.invoke("Chunk.update", {id: chunk.key, source: chunk.source.rpcId, state: ChunkState.GPU_MEMORY});
      } else {
        let msg = {};
        let transfers = [];
        chunk.serialize(msg, transfers);
        msg["state"] = ChunkState.GPU_MEMORY;
        rpc2.invoke("Chunk.update", msg, transfers);
      }
    }
    processQueuePromotions_() {
      let queueManager = this;
      const evict = (chunk) => {
        switch (chunk.state) {
          case ChunkState.DOWNLOADING:
            cancelChunkDownload(chunk);
            break;
          case ChunkState.GPU_MEMORY:
            queueManager.freeChunkGPUMemory(chunk);
          case ChunkState.SYSTEM_MEMORY_WORKER:
          case ChunkState.SYSTEM_MEMORY:
            queueManager.freeChunkSystemMemory(chunk);
            break;
        }
        this.updateChunkState(chunk, ChunkState.QUEUED);
      };
      const promotionLambda = (promotionCandidates, evictionCandidates, capacity) => {
        let systemMemoryEvictionCandidates = this.systemMemoryEvictionQueue.candidates();
        let systemMemoryCapacity = this.systemMemoryCapacity;
        while (true) {
          let promotionCandidateResult = promotionCandidates.next();
          if (promotionCandidateResult.done) {
            return;
          }
          let promotionCandidate = promotionCandidateResult.value;
          const size = 0;
          let priorityTier = promotionCandidate.priorityTier;
          let priority = promotionCandidate.priority;
          if (!tryToFreeCapacity(size, capacity, priorityTier, priority, evictionCandidates, evict)) {
            return;
          }
          if (!tryToFreeCapacity(size, systemMemoryCapacity, priorityTier, priority, systemMemoryEvictionCandidates, evict)) {
            return;
          }
          this.updateChunkState(promotionCandidate, ChunkState.DOWNLOADING);
          startChunkDownload(promotionCandidate);
        }
      };
      for (let sourceQueueLevel = 0; sourceQueueLevel < numSourceQueueLevels; ++sourceQueueLevel) {
        promotionLambda(this.queuedDownloadPromotionQueue[sourceQueueLevel].candidates(), this.downloadEvictionQueue[sourceQueueLevel].candidates(), this.downloadCapacity[sourceQueueLevel]);
      }
      promotionLambda(this.queuedComputePromotionQueue.candidates(), this.computeEvictionQueue.candidates(), this.computeCapacity);
    }
    process() {
      if (!this.updatePending) {
        return;
      }
      this.updatePending = null;
      const gpuMemoryGeneration = this.gpuMemoryGeneration;
      this.processGPUPromotions_();
      this.processQueuePromotions_();
      this.logStatistics();
      if (this.gpuMemoryGeneration !== gpuMemoryGeneration) {
        this.gpuMemoryChanged.dispatch();
      }
    }
    logStatistics() {
      if (DEBUG_CHUNK_UPDATES) {
        console.log(`[Chunk status] QUEUED: ${this.numQueued}, FAILED: ${this.numFailed}, DOWNLOAD: ${this.downloadCapacity}, MEM: ${this.systemMemoryCapacity}, GPU: ${this.gpuMemoryCapacity}`);
      }
    }
    invalidateSourceCache(source) {
      for (const chunk of source.chunks.values()) {
        switch (chunk.state) {
          case ChunkState.DOWNLOADING:
            cancelChunkDownload(chunk);
            break;
          case ChunkState.SYSTEM_MEMORY_WORKER:
            chunk.freeSystemMemory();
            break;
        }
        this.updateChunkState(chunk, ChunkState.QUEUED);
      }
      this.rpc.invoke("Chunk.update", {source: source.rpcId});
      this.scheduleUpdate();
    }
  };
  ChunkQueueManager = __decorate([
    registerSharedObject(CHUNK_QUEUE_MANAGER_RPC_ID)
  ], ChunkQueueManager);
  class ChunkRenderLayerBackend extends SharedObjectCounterpart {
    constructor() {
      super(...arguments);
      this.chunkManagerGeneration = -1;
      this.numVisibleChunksNeeded = 0;
      this.numVisibleChunksAvailable = 0;
      this.numPrefetchChunksNeeded = 0;
      this.numPrefetchChunksAvailable = 0;
    }
  }
  const LAYER_CHUNK_STATISTICS_INTERVAL = 200;
  let ChunkManager = class extends SharedObjectCounterpart {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.existingTierChunks = [];
      this.newTierChunks = [];
      this.updatePending = null;
      this.recomputeChunkPriorities = new NullarySignal();
      this.recomputeChunkPrioritiesLate = new NullarySignal();
      this.memoize = new StringMemoize();
      this.layers = [];
      this.sendLayerChunkStatistics = this.registerCancellable(throttle.default(() => {
        this.rpc.invoke(CHUNK_LAYER_STATISTICS_RPC_ID, {
          id: this.rpcId,
          layers: this.layers.map((layer) => ({
            id: layer.rpcId,
            numVisibleChunksAvailable: layer.numVisibleChunksAvailable,
            numVisibleChunksNeeded: layer.numVisibleChunksNeeded,
            numPrefetchChunksAvailable: layer.numPrefetchChunksAvailable,
            numPrefetchChunksNeeded: layer.numPrefetchChunksNeeded
          }))
        });
      }, LAYER_CHUNK_STATISTICS_INTERVAL));
      this.queueManager = rpc2.get(options["chunkQueueManager"]).addRef();
      this.registerDisposer(this.queueManager.gpuMemoryChanged.add(this.registerCancellable(throttle.default(() => this.scheduleUpdateChunkPriorities(), LAYER_CHUNK_STATISTICS_INTERVAL, {leading: false, trailing: true}))));
      for (let tier = ChunkPriorityTier.FIRST_TIER; tier <= ChunkPriorityTier.LAST_TIER; ++tier) {
        if (tier === ChunkPriorityTier.RECENT) {
          continue;
        }
        this.existingTierChunks[tier] = [];
      }
    }
    scheduleUpdateChunkPriorities() {
      if (this.updatePending === null) {
        this.updatePending = setTimeout(this.recomputeChunkPriorities_.bind(this), 0);
      }
    }
    registerLayer(layer) {
      const generation = this.recomputeChunkPriorities.count;
      if (layer.chunkManagerGeneration !== generation) {
        layer.chunkManagerGeneration = generation;
        this.layers.push(layer);
        layer.numVisibleChunksAvailable = 0;
        layer.numVisibleChunksNeeded = 0;
        layer.numPrefetchChunksAvailable = 0;
        layer.numPrefetchChunksNeeded = 0;
      }
    }
    recomputeChunkPriorities_() {
      this.updatePending = null;
      this.layers.length = 0;
      this.recomputeChunkPriorities.dispatch();
      this.recomputeChunkPrioritiesLate.dispatch();
      this.updateQueueState([ChunkPriorityTier.VISIBLE, ChunkPriorityTier.PREFETCH]);
      this.sendLayerChunkStatistics();
    }
    requestChunk(chunk, tier, priority, toFrontend = true) {
      if (!Number.isFinite(priority)) {
        debugger;
        return;
      }
      if (tier === ChunkPriorityTier.RECENT) {
        throw new Error("Not going to request a chunk with the RECENT tier");
      }
      chunk.newlyRequestedToFrontend = chunk.newlyRequestedToFrontend || toFrontend;
      if (chunk.newPriorityTier === ChunkPriorityTier.RECENT) {
        this.newTierChunks.push(chunk);
      }
      const newPriorityTier = chunk.newPriorityTier;
      if (tier < newPriorityTier || tier === newPriorityTier && priority > chunk.newPriority) {
        chunk.newPriorityTier = tier;
        chunk.newPriority = priority;
      }
    }
    updateQueueState(tiers) {
      let existingTierChunks = this.existingTierChunks;
      let queueManager = this.queueManager;
      for (let tier of tiers) {
        let chunks = existingTierChunks[tier];
        if (DEBUG_CHUNK_UPDATES) {
          console.log(`existingTierChunks[${ChunkPriorityTier[tier]}].length=${chunks.length}`);
        }
        for (let chunk of chunks) {
          if (chunk.newPriorityTier === ChunkPriorityTier.RECENT) {
            queueManager.performChunkPriorityUpdate(chunk);
          }
        }
        chunks.length = 0;
      }
      let newTierChunks = this.newTierChunks;
      for (let chunk of newTierChunks) {
        queueManager.performChunkPriorityUpdate(chunk);
        existingTierChunks[chunk.priorityTier].push(chunk);
      }
      if (DEBUG_CHUNK_UPDATES) {
        console.log(`updateQueueState: newTierChunks.length = ${newTierChunks.length}`);
      }
      newTierChunks.length = 0;
      this.queueManager.scheduleUpdate();
    }
  };
  ChunkManager = __decorate([
    registerSharedObject(CHUNK_MANAGER_RPC_ID)
  ], ChunkManager);
  function WithParameters(Base, parametersConstructor) {
    let C = class extends Base {
      constructor(...args) {
        super(...args);
        const options = args[1];
        this.parameters = options["parameters"];
      }
    };
    C = __decorate([
      registerSharedObjectOwner(parametersConstructor.RPC_ID)
    ], C);
    return C;
  }
  function withChunkManager(Base) {
    return class extends Base {
      constructor(...args) {
        super(...args);
        const rpc2 = args[0];
        const options = args[1];
        this.chunkManager = rpc2.get(options["chunkManager"]);
      }
    };
  }
  registerRPC(CHUNK_SOURCE_INVALIDATE_RPC_ID, function(x) {
    const source = this.get(x["id"]);
    source.chunkManager.queueManager.invalidateSourceCache(source);
  });
  registerPromiseRPC(REQUEST_CHUNK_STATISTICS_RPC_ID, function(x) {
    const queue = this.get(x.queue);
    const results = new Map();
    for (const source of queue.sources) {
      results.set(source.rpcId, source.statistics);
    }
    return Promise.resolve({value: results});
  });

  // src/neuroglancer/render_layer_common.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const RENDERED_VIEW_ADD_LAYER_RPC_ID = "rendered_view.addLayer";
  const RENDERED_VIEW_REMOVE_LAYER_RPC_ID = "rendered_view.removeLayer";
  const PROJECTION_PARAMETERS_RPC_ID = "SharedProjectionParameters";
  const PROJECTION_PARAMETERS_CHANGED_RPC_METHOD_ID = "SharedProjectionParameters.changed";

  // src/neuroglancer/render_layer_backend.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class RenderLayerBackendAttachment extends RefCounted {
    constructor(view) {
      super();
      this.view = view;
      this.state = void 0;
    }
  }
  class RenderLayerBackend extends ChunkRenderLayerBackend {
    constructor() {
      super(...arguments);
      this.attachments = new Map();
    }
    attach(attachment) {
      attachment;
    }
  }
  registerRPC(RENDERED_VIEW_ADD_LAYER_RPC_ID, function(x) {
    const view = this.get(x.view);
    const layer = this.get(x.layer);
    const attachment = new RenderLayerBackendAttachment(view);
    layer.attachments.set(view, attachment);
    layer.attach(attachment);
  });
  registerRPC(RENDERED_VIEW_REMOVE_LAYER_RPC_ID, function(x) {
    const view = this.get(x.view);
    const layer = this.get(x.layer);
    const attachment = layer.attachments.get(view);
    layer.attachments.delete(view);
    attachment.dispose();
  });
  let SharedProjectionParametersBackend = class extends SharedObjectCounterpart {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.changed = new Signal();
      this.value = options.value;
      this.oldValue = Object.assign({}, this.value);
    }
  };
  SharedProjectionParametersBackend = __decorate([
    registerSharedObject(PROJECTION_PARAMETERS_RPC_ID)
  ], SharedProjectionParametersBackend);
  registerRPC(PROJECTION_PARAMETERS_CHANGED_RPC_METHOD_ID, function(x) {
    const obj = this.get(x.id);
    const {value, oldValue} = obj;
    Object.assign(oldValue, value);
    Object.assign(value, x.value);
    obj.changed.dispatch(oldValue, value);
  });

  // src/neuroglancer/trackable_value.ts
  const debounce = __toModule(require_debounce());
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class WatchableValue {
    constructor(value_) {
      this.value_ = value_;
      this.changed = new NullarySignal();
    }
    get value() {
      return this.value_;
    }
    set value(newValue) {
      if (newValue !== this.value_) {
        this.value_ = newValue;
        this.changed.dispatch();
      }
    }
  }
  class TrackableValue extends WatchableValue {
    constructor(value, validator, defaultValue = value) {
      super(value);
      this.validator = validator;
      this.defaultValue = defaultValue;
    }
    toJSON() {
      let {value_} = this;
      if (value_ === this.defaultValue) {
        return void 0;
      }
      return this.value_;
    }
    reset() {
      this.value = this.defaultValue;
    }
    restoreState(x) {
      if (x !== void 0) {
        let {validator} = this;
        try {
          this.value = validator(x);
          return;
        } catch (ignoredError) {
        }
      }
      this.value = this.defaultValue;
    }
  }
  class DerivedWatchableValue extends RefCounted {
    constructor(f, ws) {
      super();
      this.changed = new NullarySignal();
      this.f = f;
      this.ws = ws;
      for (const w of ws) {
        this.registerDisposer(w.changed.add(this.changed.dispatch));
      }
    }
    get value() {
      return this.f(...this.ws.map((w) => w.value));
    }
  }
  class CachedLazyDerivedWatchableValue extends RefCounted {
    constructor(f, ws) {
      super();
      this.changed = new NullarySignal();
      this.valueGeneration = -1;
      this.f = f;
      this.ws = ws;
      for (const w of ws) {
        this.registerDisposer(w.changed.add(this.changed.dispatch));
      }
    }
    get value() {
      const generation = this.changed.count;
      if (generation !== this.valueGeneration) {
        this.value_ = this.f(...this.ws.map((w) => w.value));
        this.valueGeneration = generation;
      }
      return this.value_;
    }
  }
  class CachedWatchableValue extends RefCounted {
    constructor(base39, isEqual = (a, b) => a === b) {
      super();
      this.changed = new NullarySignal();
      this.value = base39.value;
      this.registerDisposer(base39.changed.add(() => {
        const newValue = base39.value;
        if (!isEqual(this.value, newValue)) {
          this.value = newValue;
          this.changed.dispatch();
        }
      }));
    }
  }
  class AggregateWatchableValue extends RefCounted {
    constructor(getWatchables) {
      super();
      this.changed = new NullarySignal();
      const watchables = getWatchables(this);
      const keys = Object.keys(watchables);
      const updateValue = () => {
        const obj = Array.isArray(watchables) ? [] : {};
        for (const k of keys) {
          obj[k] = watchables[k].value;
        }
        this.value = obj;
        this.changed.dispatch();
      };
      updateValue();
      for (const k of keys) {
        const watchable = watchables[k];
        this.registerDisposer(watchable.changed.add(() => updateValue()));
      }
    }
  }
  class ComputedWatchableValue extends RefCounted {
    constructor(f, ...signals) {
      super();
      this.f = f;
      this.changed = new NullarySignal();
      for (const signal10 of signals) {
        this.registerDisposer(signal10.add(this.changed.dispatch));
      }
    }
    get value() {
      return this.f();
    }
  }
  class WatchableRefCounted extends RefCounted {
    constructor() {
      super(...arguments);
      this.changed = new NullarySignal();
    }
    get value() {
      return this.value_;
    }
    set value(value) {
      const {value_} = this;
      this.value_ = value;
      if (value_ !== void 0) {
        value_.dispose();
        value_.unregisterDisposer(this.valueHandler);
        this.valueHandler = void 0;
      }
      if (value !== void 0) {
        const valueHandler = this.valueHandler = () => {
          if (this.value_ === value) {
            this.value_ = void 0;
            this.changed.dispatch();
          }
        };
        value.registerDisposer(valueHandler);
      }
      if (value !== value_) {
        this.changed.dispatch();
      }
    }
    reset() {
      this.value = void 0;
    }
    disposed() {
      if (this.value_ !== void 0) {
        this.value_.unregisterDisposer(this.valueHandler);
        this.value_.dispose();
      }
      this.value_ = void 0;
      super.disposed();
    }
  }
  class WatchableSet {
    constructor(values) {
      this.changed = new NullarySignal();
      if (values === void 0) {
        this.values = new Set();
      } else {
        this.values = new Set(values);
      }
    }
    add(x) {
      const {values} = this;
      if (!values.has(x)) {
        values.add(x);
        this.changed.dispatch();
      }
      return this;
    }
    delete(x) {
      const {values} = this;
      if (values.delete(x)) {
        this.changed.dispatch();
        return true;
      }
      return false;
    }
    has(x) {
      return this.values.has(x);
    }
    get size() {
      return this.values.size;
    }
    [Symbol.iterator]() {
      return this.values[Symbol.iterator]();
    }
    clear() {
      const {values} = this;
      if (values.size > 0) {
        values.clear();
        this.changed.dispatch();
      }
    }
  }
  function registerNested(f, ...watchables) {
    let values = watchables.map((w) => w.value);
    const count = watchables.length;
    let context2 = new RefCounted();
    let result = f(context2, ...values);
    const handleChange = debounce.default(() => {
      let changed = false;
      for (let i = 0; i < count; ++i) {
        const watchable = watchables[i];
        const value = watchable.value;
        if (values[i] !== value) {
          values[i] = value;
          changed = true;
        }
      }
      if (!changed)
        return;
      context2.dispose();
      context2 = new RefCounted();
      result = f(context2, ...values);
    }, 0);
    const signalDisposers = watchables.map((w) => w.changed.add(handleChange));
    return {
      flush() {
        handleChange.flush();
      },
      dispose() {
        handleChange.cancel();
        invokeDisposers(signalDisposers);
        context2.dispose();
      },
      get value() {
        handleChange.flush();
        return result;
      }
    };
  }

  // src/neuroglancer/util/animation_frame_debounce.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function animationFrameDebounce(callback) {
    let handle = -1;
    const cancel = () => {
      if (handle !== -1) {
        cancelAnimationFrame(handle);
        handle = -1;
      }
    };
    const flush = () => {
      if (handle !== -1) {
        handle = -1;
        callback();
      }
    };
    return Object.assign(() => {
      if (handle === -1) {
        handle = requestAnimationFrame(() => {
          handle = -1;
          callback();
        });
      }
    }, {flush, cancel});
  }

  // src/neuroglancer/webgl/context.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG_SHADERS = false;
  function initializeWebGL(canvas) {
    let options = {
      antialias: false,
      stencil: true
    };
    if (DEBUG_SHADERS) {
      console.log("DEBUGGING via preserveDrawingBuffer");
      options["preserveDrawingBuffer"] = true;
    }
    let gl = canvas.getContext("webgl2", options);
    if (gl == null) {
      throw new Error("WebGL not supported.");
    }
    gl.memoize = new Memoize();
    gl.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    gl.max3dTextureSize = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
    gl.maxTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    gl.tempTextureUnit = gl.maxTextureImageUnits - 1;
    for (const extension of ["EXT_color_buffer_float"]) {
      if (!gl.getExtension(extension)) {
        throw new Error(`${extension} extension not available`);
      }
    }
    for (const extension of [
      "EXT_float_blend"
    ]) {
      gl.getExtension(extension);
    }
    return gl;
  }

  // node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
  var MapShim = function() {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function(entry, index2) {
        if (entry[0] === key) {
          result = index2;
          return true;
        }
        return false;
      });
      return result;
    }
    return function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }();
  }();
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
  var global$1 = function() {
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    return Function("return this")();
  }();
  var requestAnimationFrame$1 = function() {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function(callback) {
      return setTimeout(function() {
        return callback(Date.now());
      }, 1e3 / 60);
    };
  }();
  var trailingTimeout = 2;
  function throttle3(callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle3(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }();
  var defineConfigurable = function(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  };
  var getWindowOf = function(target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  };
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function(size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = function() {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function(target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function(target) {
      return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
    };
  }();
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x,
      y,
      width,
      height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return {x, y, width, height};
  }
  var ResizeObservation = function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }();
  var ResizeObserverEntry = function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, {target, contentRect});
    }
    return ResizeObserverEntry2;
  }();
  var ResizeObserverSPI = function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }();
  var observers = typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  var ResizeObserver = function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }();
  [
    "observe",
    "unobserve",
    "disconnect"
  ].forEach(function(method) {
    ResizeObserver.prototype[method] = function() {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });
  var index = function() {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  }();
  var ResizeObserver_es_default = index;

  // src/neuroglancer/display_context.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class RenderViewport {
    constructor() {
      this.width = 0;
      this.height = 0;
      this.logicalWidth = 0;
      this.logicalHeight = 0;
      this.visibleLeftFraction = 0;
      this.visibleTopFraction = 0;
      this.visibleWidthFraction = 0;
      this.visibleHeightFraction = 0;
    }
  }
  class RenderedPanel extends RefCounted {
    constructor(context2, element, visibility) {
      super();
      this.context = context2;
      this.element = element;
      this.visibility = visibility;
      this.boundsGeneration = -1;
      this.canvasRelativeClippedLeft = 0;
      this.canvasRelativeClippedTop = 0;
      this.canvasRelativeLogicalLeft = 0;
      this.canvasRelativeLogicalTop = 0;
      this.renderViewport = new RenderViewport();
      this.boundsObserversRegistered = false;
      this.gl = context2.gl;
      context2.addPanel(this);
    }
    scheduleRedraw() {
      if (this.visible) {
        this.context.scheduleRedraw();
      }
    }
    ensureBoundsUpdated() {
      const {context: context2} = this;
      context2.ensureBoundsUpdated();
      const {boundsGeneration} = context2;
      if (boundsGeneration === this.boundsGeneration)
        return;
      this.boundsGeneration = boundsGeneration;
      const {element} = this;
      if (!this.boundsObserversRegistered && context2.monitorPanel(element)) {
        this.boundsObserversRegistered = true;
      }
      const clientRect = element.getBoundingClientRect();
      const root = context2.container;
      const canvasRect = context2.canvasRect;
      const {canvas} = context2;
      const {width: canvasPixelWidth, height: canvasPixelHeight} = canvas;
      const screenToCanvasPixelScaleX = canvasPixelWidth / canvasRect.width;
      const screenToCanvasPixelScaleY = canvasPixelHeight / canvasRect.height;
      const canvasLeft = canvasRect.left, canvasTop = canvasRect.top;
      let logicalLeft = this.canvasRelativeLogicalLeft = Math.round((clientRect.left - canvasLeft) * screenToCanvasPixelScaleX + element.clientLeft), logicalTop = this.canvasRelativeLogicalTop = Math.round((clientRect.top - canvasTop) * screenToCanvasPixelScaleY + element.clientTop), logicalWidth = element.clientWidth, logicalHeight = element.clientHeight, logicalRight = logicalLeft + logicalWidth, logicalBottom = logicalTop + logicalHeight;
      let clippedTop = logicalTop, clippedLeft = logicalLeft, clippedRight = logicalRight, clippedBottom = logicalBottom;
      for (let parent = element.parentElement; parent !== null && parent !== root; parent = parent.parentElement) {
        const rect = parent.getBoundingClientRect();
        if (rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0) {
          continue;
        }
        clippedLeft = Math.max(clippedLeft, (rect.left - canvasLeft) * screenToCanvasPixelScaleX);
        clippedTop = Math.max(clippedTop, (rect.top - canvasTop) * screenToCanvasPixelScaleY);
        clippedRight = Math.min(clippedRight, (rect.right - canvasLeft) * screenToCanvasPixelScaleX);
        clippedBottom = Math.min(clippedBottom, (rect.bottom - canvasTop) * screenToCanvasPixelScaleY);
      }
      clippedTop = this.canvasRelativeClippedTop = Math.round(Math.max(clippedTop, 0));
      clippedLeft = this.canvasRelativeClippedLeft = Math.round(Math.max(clippedLeft, 0));
      clippedRight = Math.round(Math.min(clippedRight, canvasPixelWidth));
      clippedBottom = Math.round(Math.min(clippedBottom, canvasPixelHeight));
      const viewport = this.renderViewport;
      const clippedWidth = viewport.width = Math.max(0, clippedRight - clippedLeft);
      const clippedHeight = viewport.height = Math.max(0, clippedBottom - clippedTop);
      viewport.logicalWidth = logicalWidth;
      viewport.logicalHeight = logicalHeight;
      viewport.visibleLeftFraction = (clippedLeft - logicalLeft) / logicalWidth;
      viewport.visibleTopFraction = (clippedTop - logicalTop) / logicalHeight;
      viewport.visibleWidthFraction = clippedWidth / logicalWidth;
      viewport.visibleHeightFraction = clippedHeight / logicalHeight;
    }
    setGLClippedViewport() {
      const {gl, canvasRelativeClippedTop, canvasRelativeClippedLeft, renderViewport: {width, height}} = this;
      const bottom = canvasRelativeClippedTop + height;
      gl.enable(WebGL2RenderingContext.SCISSOR_TEST);
      let glBottom = this.context.canvas.height - bottom;
      gl.viewport(canvasRelativeClippedLeft, glBottom, width, height);
      gl.scissor(canvasRelativeClippedLeft, glBottom, width, height);
    }
    setGLLogicalViewport() {
      const {gl, renderViewport: {width, height, logicalWidth, logicalHeight}} = this;
      const canvasHeight = this.context.canvas.height;
      gl.enable(WebGL2RenderingContext.SCISSOR_TEST);
      gl.viewport(this.canvasRelativeLogicalLeft, canvasHeight - (this.canvasRelativeLogicalTop + logicalHeight), logicalWidth, logicalHeight);
      gl.scissor(this.canvasRelativeClippedLeft, canvasHeight - (this.canvasRelativeClippedTop + height), width, height);
    }
    disposed() {
      if (this.boundsObserversRegistered) {
        this.context.unmonitorPanel(this.element);
      }
      this.context.removePanel(this);
      super.disposed();
    }
    get visible() {
      return this.visibility.visible;
    }
    getDepthArray() {
      return void 0;
    }
    get shouldDraw() {
      if (!this.visible)
        return false;
      const {element} = this;
      if (element.clientWidth === 0 || element.clientHeight === 0 || element.offsetWidth === 0 || element.offsetHeight === 0) {
        return false;
      }
      return true;
    }
    get drawOrder() {
      return 0;
    }
  }
  class TrackableWindowedViewport extends TrackableValue {
    constructor() {
      super(Float64Array.of(0, 0, 1, 1), (obj) => parseFixedLengthArray(new Float64Array(4), obj, verifyFloat01));
    }
    toJSON() {
      const {value} = this;
      const [left, top, width, height] = value;
      if (left === 0 && top == 0 && width === 1 && height === 1)
        return void 0;
      return Array.from(value);
    }
  }
  class DisplayContext extends RefCounted {
    constructor(container) {
      super();
      this.container = container;
      this.canvas = document.createElement("canvas");
      this.updateStarted = new NullarySignal();
      this.updateFinished = new NullarySignal();
      this.changed = this.updateFinished;
      this.panels = new Set();
      this.resizeGeneration = 0;
      this.boundsGeneration = -1;
      this.orderedPanels = [];
      this.frameNumber = 0;
      this.panelAncestors = new Map();
      this.resizeCallback = () => {
        ++this.resizeGeneration;
        this.scheduleRedraw();
      };
      this.resizeObserver = new ResizeObserver_es_default(this.resizeCallback);
      this.scheduleRedraw = this.registerCancellable(animationFrameDebounce(() => this.draw()));
      const {canvas, resizeObserver} = this;
      container.style.position = "relative";
      canvas.style.position = "absolute";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "0";
      resizeObserver.observe(canvas);
      container.appendChild(canvas);
      this.registerEventListener(canvas, "webglcontextlost", (event) => {
        console.log(`Lost WebGL context: ${event.statusMessage}`);
        event.preventDefault();
      });
      this.registerEventListener(canvas, "webglcontextrestored", () => {
        console.log("WebGL context restored");
        window.location.reload();
      });
      this.gl = initializeWebGL(canvas);
    }
    monitorPanel(element) {
      const {panelAncestors, container: root} = this;
      if (!root.contains(element))
        return false;
      while (element !== root) {
        let entry = panelAncestors.get(element);
        if (entry !== void 0) {
          ++entry.count;
          break;
        }
        const parent = element.parentElement;
        entry = {parent, count: 1};
        panelAncestors.set(element, entry);
        element.addEventListener("scroll", this.resizeCallback, {capture: true});
        this.resizeObserver.observe(element);
        element = parent;
      }
      return true;
    }
    unmonitorPanel(element) {
      const {panelAncestors, container: root} = this;
      while (element !== root) {
        const entry = panelAncestors.get(element);
        if (entry.count !== 1) {
          --entry.count;
          break;
        }
        element.removeEventListener("scroll", this.resizeCallback, {capture: true});
        this.resizeObserver.unobserve(element);
        panelAncestors.delete(element);
        element = entry.parent;
      }
    }
    applyWindowedViewportToElement(element, value) {
      const [left, top, width, height] = value;
      const totalWidth = 1 / width;
      const totalHeight = 1 / height;
      element.style.position = "absolute";
      element.style.top = `${-totalHeight * top * 100}%`;
      element.style.left = `${-totalWidth * left * 100}%`;
      element.style.width = `${totalWidth * 100}%`;
      element.style.height = `${totalHeight * 100}%`;
      ++this.resizeGeneration;
      this.scheduleRedraw();
    }
    isReady() {
      for (const panel of this.panels) {
        if (!panel.visible) {
          continue;
        }
        if (!panel.isReady()) {
          return false;
        }
      }
      return true;
    }
    makeCanvasOverlayElement() {
      const element = document.createElement("div");
      element.style.position = "absolute";
      element.style.top = "0px";
      element.style.left = "0px";
      element.style.width = "100%";
      element.style.height = "100%";
      element.style.zIndex = "2";
      this.container.appendChild(element);
      return element;
    }
    disposed() {
      this.orderedPanels.length = 0;
      this.resizeObserver.disconnect();
    }
    addPanel(panel) {
      this.panels.add(panel);
      this.orderedPanels.length = 0;
      ++this.resizeGeneration;
      this.scheduleRedraw();
    }
    removePanel(panel) {
      this.panels.delete(panel);
      this.orderedPanels.length = 0;
      ++this.resizeGeneration;
      this.scheduleRedraw();
    }
    ensureBoundsUpdated() {
      const {resizeGeneration} = this;
      if (this.boundsGeneration === resizeGeneration)
        return;
      const {canvas} = this;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.canvasRect = canvas.getBoundingClientRect();
      this.boundsGeneration = resizeGeneration;
    }
    draw() {
      ++this.frameNumber;
      this.updateStarted.dispatch();
      let gl = this.gl;
      this.ensureBoundsUpdated();
      this.gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const {orderedPanels, panels} = this;
      if (orderedPanels.length !== panels.size) {
        orderedPanels.push(...panels);
        orderedPanels.sort((a, b) => a.drawOrder - b.drawOrder);
      }
      for (const panel of orderedPanels) {
        if (!panel.shouldDraw)
          continue;
        panel.ensureBoundsUpdated();
        const {renderViewport} = panel;
        if (renderViewport.width === 0 || renderViewport.height === 0)
          continue;
        panel.draw();
      }
      gl.disable(gl.SCISSOR_TEST);
      this.gl.clearColor(1, 1, 1, 1);
      this.gl.colorMask(false, false, false, true);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.gl.colorMask(true, true, true, true);
      this.updateFinished.dispatch();
    }
    getDepthArray() {
      const {width, height} = this.canvas;
      const depthArray = new Float32Array(width * height);
      for (const panel of this.panels) {
        if (!panel.shouldDraw)
          continue;
        const panelDepthArray = panel.getDepthArray();
        if (panelDepthArray === void 0)
          continue;
        const {canvasRelativeClippedTop, canvasRelativeClippedLeft, renderViewport: {width: width2, height: height2}} = panel;
        for (let y = 0; y < height2; ++y) {
          const panelDepthArrayOffset = (height2 - 1 - y) * width2;
          depthArray.set(panelDepthArray.subarray(panelDepthArrayOffset, panelDepthArrayOffset + width2), (canvasRelativeClippedTop + y) * width2 + canvasRelativeClippedLeft);
        }
      }
      return depthArray;
    }
  }

  // src/neuroglancer/util/vector.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function add6(out, a, b) {
    const rank = out.length;
    for (let i = 0; i < rank; ++i) {
      out[i] = a[i] + b[i];
    }
    return out;
  }
  function multiply6(out, a, b) {
    const rank = out.length;
    for (let i = 0; i < rank; ++i) {
      out[i] = a[i] * b[i];
    }
    return out;
  }
  function prod(array7) {
    let result = 1;
    for (let i = 0, length4 = array7.length; i < length4; ++i) {
      result *= array7[i];
    }
    return result;
  }
  function min3(out, a, b) {
    const rank = out.length;
    for (let i = 0; i < rank; ++i) {
      out[i] = Math.min(a[i], b[i]);
    }
    return out;
  }
  function max3(out, a, b) {
    const rank = out.length;
    for (let i = 0; i < rank; ++i) {
      out[i] = Math.max(a[i], b[i]);
    }
    return out;
  }
  const kEmptyFloat32Vec = new Float32Array(0);
  const kEmptyFloat64Vec = new Float64Array(0);
  const kFloat64Vec3Of1 = Float64Array.of(1, 1, 1);

  // src/neuroglancer/projection_parameters.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ProjectionParameters extends RenderViewport {
    constructor() {
      super(...arguments);
      this.globalPosition = kEmptyFloat32Vec;
      this.projectionMat = mat4_exports.create();
      this.viewMatrix = mat4_exports.create();
      this.invViewMatrix = mat4_exports.create();
      this.viewProjectionMat = mat4_exports.create();
      this.invViewProjectionMat = mat4_exports.create();
    }
  }

  // src/neuroglancer/util/matrix.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function identity4(a, lda, n) {
    for (let i = 0; i < n; ++i) {
      const start = lda * i;
      a.fill(0, start, start + n);
      a[start + i] = 1;
    }
    return a;
  }
  function createIdentity(c, rows, cols = rows) {
    return identity4(new c(rows * cols), rows, Math.min(rows, cols));
  }
  function copy6(b, ldb, a, lda, m, n) {
    for (let col = 0; col < n; ++col) {
      const aOff = col * lda;
      const bOff = col * ldb;
      for (let row = 0; row < m; ++row) {
        b[bOff + row] = a[aOff + row];
      }
    }
    return b;
  }
  let pivots;
  function inverseInplace(a, lda, n) {
    let determinant3 = 1;
    if (pivots === void 0 || pivots.length < n) {
      pivots = new Uint32Array(n);
    }
    for (let i = 0; i < n; ++i) {
      pivots[i] = i;
    }
    for (let k = 0; k < n; ++k) {
      const kColOff = lda * k;
      let pivotRow = k;
      {
        let bestPivot = Math.abs(a[kColOff + k]);
        for (let row = k + 1; row < n; ++row) {
          const mag = Math.abs(a[kColOff + row]);
          if (mag > bestPivot) {
            bestPivot = mag;
            pivotRow = row;
          }
        }
      }
      if (k !== pivotRow) {
        determinant3 *= -1;
        for (let col = 0; col < n; ++col) {
          const off = lda * col;
          const temp = a[off + k];
          a[off + k] = a[off + pivotRow];
          a[off + pivotRow] = temp;
        }
        {
          const tempPivot = pivots[k];
          pivots[k] = pivots[pivotRow];
          pivots[pivotRow] = tempPivot;
        }
      }
      const pivotValue = a[kColOff + k];
      const pivotInv = 1 / pivotValue;
      determinant3 *= pivotValue;
      for (let j = 0; j < n; ++j) {
        a[lda * j + k] *= pivotInv;
      }
      a[kColOff + k] = pivotInv;
      for (let row = 0; row < n; ++row) {
        if (row === k)
          continue;
        const factor = -a[lda * k + row];
        for (let j = 0; j < n; ++j) {
          const jColOff = lda * j;
          a[jColOff + row] += factor * a[jColOff + k];
        }
        a[lda * k + row] = factor * pivotInv;
      }
    }
    for (let col = 0; col < n; ++col) {
      let targetCol = pivots[col];
      while (targetCol !== col) {
        const colOff = lda * col;
        const targetColOff = lda * targetCol;
        for (let i = 0; i < n; ++i) {
          const off1 = colOff + i;
          const off2 = targetColOff + i;
          const temp2 = a[off1];
          a[off1] = a[off2];
          a[off2] = temp2;
        }
        const temp = pivots[col] = pivots[targetCol];
        pivots[targetCol] = targetCol;
        targetCol = temp;
      }
    }
    return determinant3;
  }
  function inverse3(b, ldb, a, lda, n) {
    copy6(b, ldb, a, lda, n, n);
    return inverseInplace(b, ldb, n);
  }

  // src/neuroglancer/util/si_units.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const siPrefixes = [
    {prefix: "Y", exponent: 24},
    {prefix: "Z", exponent: 21},
    {prefix: "E", exponent: 18},
    {prefix: "P", exponent: 15},
    {prefix: "T", exponent: 12},
    {prefix: "G", exponent: 9},
    {prefix: "M", exponent: 6},
    {prefix: "k", exponent: 3},
    {prefix: "", exponent: 0},
    {prefix: "c", exponent: -2},
    {prefix: "m", exponent: -3},
    {prefix: "\xB5", exponent: -6},
    {prefix: "n", exponent: -9},
    {prefix: "p", exponent: -12},
    {prefix: "f", exponent: -15},
    {prefix: "a", exponent: -18},
    {prefix: "z", exponent: -21},
    {prefix: "y", exponent: -24}
  ];
  const siPrefixesWithAlternatives = [
    {prefix: "u", exponent: -6},
    ...siPrefixes
  ];
  const supportedUnits = new Map();
  supportedUnits.set("", {unit: "", exponent: 0});
  const exponentToPrefix = new Map();
  for (const {prefix, exponent} of siPrefixesWithAlternatives) {
    exponentToPrefix.set(exponent, prefix);
    for (const unit of ["m", "s", "Hz", "rad/s"]) {
      supportedUnits.set(`${prefix}${unit}`, {unit, exponent});
    }
  }
  function scaleByExp10(scale6, exponent) {
    if (exponent >= 0)
      return scale6 * 10 ** exponent;
    return scale6 / 10 ** -exponent;
  }

  // src/neuroglancer/coordinate_transform.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function normalizeCoordinateArray(coordinates, labels) {
    const map = new Map();
    for (let i = 0, length4 = coordinates.length; i < length4; ++i) {
      map.set(coordinates[i], labels[i]);
    }
    coordinates = Array.from(map.keys());
    coordinates.sort((a, b) => a - b);
    labels = Array.from(coordinates, (x) => map.get(x));
    return {coordinates, labels};
  }
  function makeCoordinateSpace(space) {
    const {names, units, scales} = space;
    const {
      valid = true,
      rank = names.length,
      timestamps = names.map(() => Number.NEGATIVE_INFINITY),
      ids = names.map((_, i) => -i),
      boundingBoxes = []
    } = space;
    const {coordinateArrays = new Array(rank)} = space;
    const {bounds = computeCombinedBounds(boundingBoxes, rank)} = space;
    return {
      valid,
      rank,
      names,
      timestamps,
      ids,
      units,
      scales,
      boundingBoxes,
      bounds,
      coordinateArrays
    };
  }
  const emptyInvalidCoordinateSpace = makeCoordinateSpace({
    valid: false,
    names: [],
    units: [],
    scales: kEmptyFloat64Vec,
    boundingBoxes: []
  });
  const emptyValidCoordinateSpace = makeCoordinateSpace({
    valid: true,
    names: [],
    units: [],
    scales: kEmptyFloat64Vec,
    boundingBoxes: []
  });
  function unitAndScaleFromJson(obj) {
    const [scaleObj, unitObj] = expectArray(obj, 2);
    const scale6 = verifyFinitePositiveFloat(scaleObj);
    const unitString = verifyString(unitObj);
    const result = supportedUnits.get(unitString);
    if (result === void 0)
      throw new Error(`Invalid unit: ${JSON.stringify(unitString)}`);
    return {unit: result.unit, scale: scaleByExp10(scale6, result.exponent)};
  }
  function coordinateSpaceFromJson(obj, allowNumericalDimensions = false) {
    if (obj === void 0)
      return emptyInvalidCoordinateSpace;
    verifyObject(obj);
    const names = dimensionNamesFromJson(Object.keys(obj), allowNumericalDimensions);
    const rank = names.length;
    const units = new Array(rank);
    const scales = new Float64Array(rank);
    const coordinateArrays = new Array(rank);
    for (let i = 0; i < rank; ++i) {
      verifyObjectProperty(obj, names[i], (mem) => {
        if (Array.isArray(mem)) {
          const {unit, scale: scale6} = unitAndScaleFromJson(mem);
          units[i] = unit;
          scales[i] = scale6;
        } else {
          verifyObject(mem);
          let coordinates = verifyObjectProperty(mem, "coordinates", verifyIntegerArray);
          let labels = verifyObjectProperty(mem, "labels", verifyStringArray);
          let length4 = coordinates.length;
          if (length4 !== labels.length) {
            throw new Error(`Length of coordinates array (${length4}) does not match length of labels array (${labels.length})`);
          }
          units[i] = "";
          scales[i] = 1;
          coordinateArrays[i] = {explicit: true, ...normalizeCoordinateArray(coordinates, labels)};
        }
      });
    }
    return makeCoordinateSpace({valid: false, names, units, scales, coordinateArrays});
  }
  function coordinateSpaceToJson(coordinateSpace) {
    const {rank} = coordinateSpace;
    if (rank === 0)
      return void 0;
    const {names, units, scales, coordinateArrays} = coordinateSpace;
    const json13 = {};
    for (let i = 0; i < rank; ++i) {
      const name = names[i];
      const coordinateArray = coordinateArrays[i];
      if (coordinateArray == null ? void 0 : coordinateArray.explicit) {
        json13[name] = {
          coordinates: Array.from(coordinateArray.coordinates),
          labels: coordinateArray.labels
        };
      } else {
        json13[name] = [scales[i], units[i]];
      }
    }
    return json13;
  }
  class TrackableCoordinateSpace extends WatchableValue {
    constructor() {
      super(emptyInvalidCoordinateSpace);
    }
    toJSON() {
      return coordinateSpaceToJson(this.value);
    }
    reset() {
      this.value = emptyInvalidCoordinateSpace;
    }
    restoreState(obj) {
      this.value = coordinateSpaceFromJson(obj);
    }
  }
  function computeCombinedLowerUpperBound(boundingBox, outputDimension, outputRank) {
    const {
      box: {lowerBounds: baseLowerBounds, upperBounds: baseUpperBounds},
      transform
    } = boundingBox;
    const inputRank = baseLowerBounds.length;
    const stride = outputRank;
    const offset = transform[stride * inputRank + outputDimension];
    let targetLower = offset, targetUpper = offset;
    let hasCoefficient = false;
    for (let inputDim = 0; inputDim < inputRank; ++inputDim) {
      let c = transform[stride * inputDim + outputDimension];
      if (c === 0)
        continue;
      const lower = c * baseLowerBounds[inputDim];
      const upper = c * baseUpperBounds[inputDim];
      targetLower += Math.min(lower, upper);
      targetUpper += Math.max(lower, upper);
      hasCoefficient = true;
    }
    if (!hasCoefficient)
      return void 0;
    return {lower: targetLower, upper: targetUpper};
  }
  function computeCombinedBounds(boundingBoxes, outputRank) {
    const lowerBounds = new Float64Array(outputRank);
    const upperBounds = new Float64Array(outputRank);
    lowerBounds.fill(Number.NEGATIVE_INFINITY);
    upperBounds.fill(Number.POSITIVE_INFINITY);
    for (const boundingBox of boundingBoxes) {
      for (let outputDim = 0; outputDim < outputRank; ++outputDim) {
        const result = computeCombinedLowerUpperBound(boundingBox, outputDim, outputRank);
        if (result === void 0)
          continue;
        const {lower: targetLower, upper: targetUpper} = result;
        lowerBounds[outputDim] = lowerBounds[outputDim] === Number.NEGATIVE_INFINITY ? targetLower : Math.min(lowerBounds[outputDim], targetLower);
        upperBounds[outputDim] = upperBounds[outputDim] === Number.POSITIVE_INFINITY ? targetUpper : Math.max(upperBounds[outputDim], targetUpper);
      }
    }
    return {lowerBounds, upperBounds};
  }
  function isValidDimensionName(name, allowNumericalNames = false) {
    if (allowNumericalNames) {
      const n = Number(name);
      if (Number.isInteger(n) && n >= 0)
        return true;
    }
    return name.match(/^[a-zA-Z][a-zA-Z_0-9]*['^]?$/) !== null;
  }
  function validateDimensionNames(names, allowNumericalNames = false) {
    const seenNames = new Set();
    for (const name of names) {
      if (!isValidDimensionName(name, allowNumericalNames))
        return false;
      if (seenNames.has(name))
        return false;
      seenNames.add(name);
    }
    return true;
  }
  function expectDimensionName(obj, allowNumericalNames = false) {
    const name = verifyString(obj);
    if (!isValidDimensionName(name, allowNumericalNames)) {
      throw new Error(`Invalid dimension name: ${JSON.stringify(name)}`);
    }
    return name;
  }
  function dimensionNamesFromJson(obj, allowNumericalNames = false) {
    const dimensions = parseArray(obj, (x) => expectDimensionName(x, allowNumericalNames));
    if (!validateDimensionNames(dimensions, allowNumericalNames)) {
      throw new Error(`Invalid dimensions: ${JSON.stringify(dimensions)}`);
    }
    return dimensions;
  }

  // src/neuroglancer/render_coordinate_transform.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const zeroRankChannelSpace = {
    channelCoordinateSpace: emptyValidCoordinateSpace,
    shape: new Uint32Array(0),
    numChannels: 1,
    coordinates: new Uint32Array(0)
  };
  function getChunkPositionFromCombinedGlobalLocalPositions(chunkPosition, globalPosition, localPosition, layerRank, combinedGlobalLocalToChunkTransform) {
    const globalRank = globalPosition.length;
    const localRank = localPosition.length;
    const rank = chunkPosition.length;
    let valid = true;
    for (let chunkDim = 0; chunkDim < layerRank; ++chunkDim) {
      let off = chunkDim;
      let sum = 0;
      for (let globalDim = 0; globalDim < globalRank; ++globalDim) {
        sum += combinedGlobalLocalToChunkTransform[off + globalDim * layerRank] * globalPosition[globalDim];
      }
      off += globalRank * layerRank;
      for (let localDim = 0; localDim < localRank; ++localDim) {
        sum += combinedGlobalLocalToChunkTransform[off + localDim * layerRank] * localPosition[localDim];
      }
      sum += combinedGlobalLocalToChunkTransform[off + localRank * layerRank];
      if (chunkDim < rank) {
        chunkPosition[chunkDim] = sum;
      } else {
        if (sum < 0 || sum >= 1) {
          valid = false;
        }
      }
    }
    return valid;
  }
  function get3dModelToDisplaySpaceMatrix(out, displayDimensionRenderInfo, transform) {
    out.fill(0);
    out[15] = 1;
    let fullRank = true;
    const {displayDimensionIndices} = displayDimensionRenderInfo;
    const {globalToRenderLayerDimensions, modelToRenderLayerTransform} = transform;
    const layerRank = transform.rank;
    for (let displayDim = 0; displayDim < 3; ++displayDim) {
      const globalDim = displayDimensionIndices[displayDim];
      if (globalDim === -1) {
        fullRank = false;
        continue;
      }
      const layerDim = globalToRenderLayerDimensions[globalDim];
      if (layerDim === -1) {
        fullRank = false;
        continue;
      }
      out[displayDim + 12] = modelToRenderLayerTransform[layerDim + layerRank * (layerRank + 1)];
      for (let modelDim = 0; modelDim < 3; ++modelDim) {
        out[displayDim + 4 * modelDim] = modelToRenderLayerTransform[layerDim + (layerRank + 1) * modelDim];
      }
    }
    if (!fullRank) {
      const {globalDimensionNames} = displayDimensionRenderInfo;
      const displayDimDesc = Array.from(displayDimensionIndices.filter((i) => i !== -1), (i) => globalDimensionNames[i]).join(",\xA0");
      throw new Error(`Transform from model dimensions (${transform.modelDimensionNames.join(",\xA0")}) to display dimensions (${displayDimDesc}) does not have full rank`);
    }
  }

  // src/neuroglancer/sliceview/chunk_layout.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ChunkLayout {
    constructor(size, transform, finiteRank) {
      this.size = vec3_exports.clone(size);
      this.transform = mat4_exports.clone(transform);
      this.finiteRank = finiteRank;
      const invTransform = mat4_exports.create();
      const det = inverse3(invTransform, 4, transform, 4, 4);
      if (det === 0) {
        throw new Error("Transform is singular");
      }
      this.invTransform = invTransform;
      this.detTransform = det;
    }
    toObject() {
      return {size: this.size, transform: this.transform, finiteRank: this.finiteRank};
    }
    static fromObject(msg) {
      return new ChunkLayout(msg.size, msg.transform, msg.finiteRank);
    }
    globalToLocalSpatial(out, globalSpatial) {
      return vec3_exports.transformMat4(out, globalSpatial, this.invTransform);
    }
    localSpatialVectorToGlobal(out, localVector) {
      return transformVectorByMat4(out, localVector, this.transform);
    }
    globalToLocalNormal(globalNormal, localNormal) {
      return transformVectorByMat4Transpose(globalNormal, localNormal, this.transform);
    }
  }

  // src/neuroglancer/util/data_type.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var DataType;
  (function(DataType3) {
    DataType3[DataType3["UINT8"] = 0] = "UINT8";
    DataType3[DataType3["INT8"] = 1] = "INT8";
    DataType3[DataType3["UINT16"] = 2] = "UINT16";
    DataType3[DataType3["INT16"] = 3] = "INT16";
    DataType3[DataType3["UINT32"] = 4] = "UINT32";
    DataType3[DataType3["INT32"] = 5] = "INT32";
    DataType3[DataType3["UINT64"] = 6] = "UINT64";
    DataType3[DataType3["FLOAT32"] = 7] = "FLOAT32";
  })(DataType || (DataType = {}));
  const DATA_TYPE_SIGNED = {
    [0]: false,
    [1]: true,
    [2]: false,
    [3]: true,
    [4]: false,
    [5]: true,
    [6]: false,
    [7]: void 0
  };
  const DATA_TYPE_BYTES = {
    [0]: 1,
    [1]: 1,
    [2]: 2,
    [3]: 2,
    [4]: 4,
    [5]: 4,
    [6]: 8,
    [7]: 4
  };
  const DATA_TYPE_ARRAY_CONSTRUCTOR = {
    [0]: Uint8Array,
    [1]: Int8Array,
    [2]: Uint16Array,
    [3]: Int16Array,
    [4]: Uint32Array,
    [5]: Int32Array,
    [6]: Uint32Array,
    [7]: Float32Array
  };
  const DATA_TYPE_JAVASCRIPT_ELEMENTS_PER_ARRAY_ELEMENT = {
    [0]: 1,
    [1]: 1,
    [2]: 1,
    [3]: 1,
    [4]: 1,
    [5]: 1,
    [6]: 2,
    [7]: 1
  };
  function makeDataTypeArrayView(dataType, buffer, byteOffset = 0, byteLength = buffer.byteLength) {
    const bytesPerElement = DATA_TYPE_BYTES[dataType];
    const javascriptElementsPerArrayElement = DATA_TYPE_JAVASCRIPT_ELEMENTS_PER_ARRAY_ELEMENT[dataType];
    return new DATA_TYPE_ARRAY_CONSTRUCTOR[dataType](buffer, byteOffset, byteLength / bytesPerElement * javascriptElementsPerArrayElement);
  }

  // src/neuroglancer/sliceview/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG_VISIBLE_SOURCES = false;
  const DEBUG_CHUNK_VISIBILITY = false;
  const tempMat4 = mat4_exports.create();
  function estimateSliceAreaPerChunk(chunkLayout, viewMatrix) {
    let viewZProjection = 0;
    let chunkVolume = chunkLayout.detTransform;
    const {transform, size} = chunkLayout;
    for (let i = 0; i < 3; ++i) {
      let sum = 0;
      for (let j = 0; j < 3; ++j) {
        sum += viewMatrix[j * 4 + 2] * transform[4 * i + j];
      }
      const s = size[i];
      viewZProjection += Math.abs(sum) * s;
      chunkVolume *= s;
    }
    return chunkVolume / viewZProjection;
  }
  function updateFixedCurPositionInChunks(tsource, globalPosition, localPosition) {
    const {curPositionInChunks, fixedPositionWithinChunk} = tsource;
    const {nonDisplayLowerClipBound, nonDisplayUpperClipBound} = tsource;
    const {rank, chunkDataSize} = tsource.source.spec;
    if (!getChunkPositionFromCombinedGlobalLocalPositions(curPositionInChunks, globalPosition, localPosition, tsource.layerRank, tsource.fixedLayerToChunkTransform)) {
      return false;
    }
    for (let chunkDim = 0; chunkDim < rank; ++chunkDim) {
      const x = curPositionInChunks[chunkDim];
      if (x < nonDisplayLowerClipBound[chunkDim] || x >= nonDisplayUpperClipBound[chunkDim]) {
        if (DEBUG_VISIBLE_SOURCES) {
          console.log("excluding source", tsource, `because of chunkDim=${chunkDim}, sum=${x}`, nonDisplayLowerClipBound, nonDisplayUpperClipBound, tsource.fixedLayerToChunkTransform);
        }
        return false;
      }
      const chunkSize = chunkDataSize[chunkDim];
      const chunk = curPositionInChunks[chunkDim] = Math.floor(x / chunkSize);
      fixedPositionWithinChunk[chunkDim] = x - chunk * chunkSize;
    }
    return true;
  }
  function pickBestAlternativeSource(viewMatrix, alternatives) {
    let numAlternatives = alternatives.length;
    let bestAlternativeIndex = 0;
    if (DEBUG_VISIBLE_SOURCES) {
      console.log(alternatives);
    }
    if (numAlternatives > 1) {
      let bestSliceArea = 0;
      for (let alternativeIndex = 0; alternativeIndex < numAlternatives; ++alternativeIndex) {
        let alternative = alternatives[alternativeIndex];
        const {chunkLayout} = alternative;
        let sliceArea = estimateSliceAreaPerChunk(chunkLayout, viewMatrix);
        if (DEBUG_VISIBLE_SOURCES) {
          console.log(`chunksize = ${chunkLayout.size}, sliceArea = ${sliceArea}`);
        }
        if (sliceArea > bestSliceArea) {
          bestSliceArea = sliceArea;
          bestAlternativeIndex = alternativeIndex;
        }
      }
    }
    return bestAlternativeIndex;
  }
  const tempChunkLayout = new ChunkLayout(vec3_exports.create(), mat4_exports.create(), 0);
  class SliceViewProjectionParameters extends ProjectionParameters {
    constructor() {
      super(...arguments);
      this.viewportNormalInGlobalCoordinates = vec3_exports.create();
      this.viewportNormalInCanonicalCoordinates = vec3_exports.create();
      this.centerDataPosition = vec3_exports.create();
      this.pixelSize = 0;
    }
  }
  function visibleSourcesInvalidated(oldValue, newValue) {
    if (oldValue.displayDimensionRenderInfo !== newValue.displayDimensionRenderInfo)
      return true;
    if (oldValue.pixelSize !== newValue.pixelSize)
      return true;
    const {viewMatrix: oldViewMatrix} = oldValue;
    const {viewMatrix: newViewMatrix} = newValue;
    for (let i = 0; i < 12; ++i) {
      if (oldViewMatrix[i] !== newViewMatrix[i])
        return true;
    }
    return false;
  }
  class SliceViewBase extends SharedObject {
    constructor(projectionParameters) {
      super();
      this.projectionParameters = projectionParameters;
      this.visibleLayers = new Map();
      this.visibleSourcesStale = true;
      this.registerDisposer(projectionParameters.changed.add((oldValue, newValue) => {
        if (visibleSourcesInvalidated(oldValue, newValue)) {
          this.invalidateVisibleSources();
        }
        this.invalidateVisibleChunks();
      }));
    }
    invalidateVisibleSources() {
      this.visibleSourcesStale = true;
    }
    invalidateVisibleChunks() {
    }
    updateVisibleSources() {
      if (!this.visibleSourcesStale) {
        return;
      }
      this.visibleSourcesStale = false;
      const curDisplayDimensionRenderInfo = this.projectionParameters.value.displayDimensionRenderInfo;
      const {visibleLayers} = this;
      for (const [renderLayer, {allSources, visibleSources, displayDimensionRenderInfo}] of visibleLayers) {
        visibleSources.length = 0;
        if (displayDimensionRenderInfo !== curDisplayDimensionRenderInfo || allSources.length === 0) {
          continue;
        }
        const preferredOrientationIndex = pickBestAlternativeSource(this.projectionParameters.value.viewMatrix, allSources.map((x) => x[0]));
        const sources = allSources[preferredOrientationIndex];
        for (const source of renderLayer.filterVisibleSources(this, sources)) {
          visibleSources.push(source);
        }
        visibleSources.reverse();
        if (DEBUG_VISIBLE_SOURCES) {
          console.log("visible sources chosen", visibleSources);
        }
      }
    }
  }
  var ChunkLayoutPreference;
  (function(ChunkLayoutPreference2) {
    ChunkLayoutPreference2[ChunkLayoutPreference2["ISOTROPIC"] = 0] = "ISOTROPIC";
    ChunkLayoutPreference2[ChunkLayoutPreference2["FLAT"] = 1] = "FLAT";
  })(ChunkLayoutPreference || (ChunkLayoutPreference = {}));
  function* filterVisibleSources(sliceView, renderLayer, sources) {
    const pixelSize = sliceView.projectionParameters.value.pixelSize * 1.1;
    const smallestVoxelSize = sources[0].effectiveVoxelSize;
    const renderScaleTarget = renderLayer.renderScaleTarget.value;
    const canImproveOnVoxelSize = (voxelSize) => {
      const targetSize = pixelSize * renderScaleTarget;
      for (let i = 0; i < 3; ++i) {
        const size = voxelSize[i];
        if (size > targetSize && size > 1.01 * smallestVoxelSize[i]) {
          return true;
        }
      }
      return false;
    };
    const improvesOnPrevVoxelSize = (voxelSize, prevVoxelSize2) => {
      const targetSize = pixelSize * renderScaleTarget;
      for (let i = 0; i < 3; ++i) {
        const size = voxelSize[i];
        const prevSize = prevVoxelSize2[i];
        if (Math.abs(targetSize - size) < Math.abs(targetSize - prevSize) && size < 1.01 * prevSize) {
          return true;
        }
      }
      return false;
    };
    let scaleIndex = sources.length - 1;
    let prevVoxelSize;
    while (true) {
      const transformedSource = sources[scaleIndex];
      if (prevVoxelSize !== void 0 && !improvesOnPrevVoxelSize(transformedSource.effectiveVoxelSize, prevVoxelSize)) {
        break;
      }
      yield transformedSource;
      if (scaleIndex === 0 || !canImproveOnVoxelSize(transformedSource.effectiveVoxelSize)) {
        break;
      }
      prevVoxelSize = transformedSource.effectiveVoxelSize;
      --scaleIndex;
    }
  }
  const SLICEVIEW_RPC_ID = "SliceView";
  const SLICEVIEW_RENDERLAYER_RPC_ID = "sliceview/RenderLayer";
  const SLICEVIEW_ADD_VISIBLE_LAYER_RPC_ID = "SliceView.addVisibleLayer";
  const SLICEVIEW_REMOVE_VISIBLE_LAYER_RPC_ID = "SliceView.removeVisibleLayer";
  const tempVisibleVolumetricChunkLower = new Float32Array(3);
  const tempVisibleVolumetricChunkUpper = new Float32Array(3);
  const tempVisibleVolumetricModelViewProjection = mat4_exports.create();
  const tempVisibleVolumetricClippingPlanes = new Float32Array(24);
  function forEachVolumetricChunkWithinFrustrum(clippingPlanes, transformedSource, callback, predicate) {
    const lower = tempVisibleVolumetricChunkLower;
    const upper = tempVisibleVolumetricChunkUpper;
    const {lowerChunkDisplayBound, upperChunkDisplayBound} = transformedSource;
    for (let i = 0; i < 3; ++i) {
      lower[i] = Math.max(lower[i], lowerChunkDisplayBound[i]);
      upper[i] = Math.min(upper[i], upperChunkDisplayBound[i]);
    }
    const {curPositionInChunks, chunkDisplayDimensionIndices} = transformedSource;
    function recurse() {
      if (!predicate(lower[0], lower[1], lower[2], upper[0], upper[1], upper[2], clippingPlanes)) {
        return;
      }
      let splitDim = 0;
      let splitSize = Math.max(0, upper[0] - lower[0]);
      let volume = splitSize;
      for (let i = 1; i < 3; ++i) {
        const size = Math.max(0, upper[i] - lower[i]);
        volume *= size;
        if (size > splitSize) {
          splitSize = size;
          splitDim = i;
        }
      }
      if (volume === 0)
        return;
      if (volume === 1) {
        curPositionInChunks[chunkDisplayDimensionIndices[0]] = lower[0];
        curPositionInChunks[chunkDisplayDimensionIndices[1]] = lower[1];
        curPositionInChunks[chunkDisplayDimensionIndices[2]] = lower[2];
        callback(lower, clippingPlanes);
        return;
      }
      const prevLower = lower[splitDim];
      const prevUpper = upper[splitDim];
      const splitPoint = Math.floor(0.5 * (prevLower + prevUpper));
      upper[splitDim] = splitPoint;
      recurse();
      upper[splitDim] = prevUpper;
      lower[splitDim] = splitPoint;
      recurse();
      lower[splitDim] = prevLower;
    }
    recurse();
  }
  function forEachVisibleVolumetricChunk(projectionParameters, localPosition, transformedSource, callback) {
    if (!updateFixedCurPositionInChunks(transformedSource, projectionParameters.globalPosition, localPosition)) {
      return;
    }
    const {size: chunkSize} = transformedSource.chunkLayout;
    const modelViewProjection = mat4_exports.multiply(tempVisibleVolumetricModelViewProjection, projectionParameters.viewProjectionMat, transformedSource.chunkLayout.transform);
    for (let i = 0; i < 3; ++i) {
      const s = chunkSize[i];
      for (let j = 0; j < 4; ++j) {
        modelViewProjection[4 * i + j] *= s;
      }
    }
    const clippingPlanes = tempVisibleVolumetricClippingPlanes;
    getFrustrumPlanes(clippingPlanes, modelViewProjection);
    const lower = tempVisibleVolumetricChunkLower;
    const upper = tempVisibleVolumetricChunkUpper;
    lower.fill(Number.NEGATIVE_INFINITY);
    upper.fill(Number.POSITIVE_INFINITY);
    forEachVolumetricChunkWithinFrustrum(clippingPlanes, transformedSource, callback, isAABBVisible);
  }
  function forEachPlaneIntersectingVolumetricChunk(projectionParameters, localPosition, transformedSource, chunkLayout, callback) {
    if (!updateFixedCurPositionInChunks(transformedSource, projectionParameters.globalPosition, localPosition)) {
      return;
    }
    const {size: chunkSize} = chunkLayout;
    const modelViewProjection = mat4_exports.multiply(tempVisibleVolumetricModelViewProjection, projectionParameters.viewProjectionMat, chunkLayout.transform);
    for (let i = 0; i < 3; ++i) {
      const s = chunkSize[i];
      for (let j = 0; j < 4; ++j) {
        modelViewProjection[4 * i + j] *= s;
      }
    }
    const invModelViewProjection = tempMat4;
    mat4_exports.invert(invModelViewProjection, modelViewProjection);
    const lower = tempVisibleVolumetricChunkLower;
    const upper = tempVisibleVolumetricChunkUpper;
    const epsilon = 1e-3;
    for (let i = 0; i < 3; ++i) {
      const c = invModelViewProjection[12 + i] + epsilon / chunkSize[i];
      const xCoeff = Math.abs(invModelViewProjection[i]);
      const yCoeff = Math.abs(invModelViewProjection[4 + i]);
      lower[i] = Math.floor(c - xCoeff - yCoeff);
      upper[i] = Math.floor(c + xCoeff + yCoeff + 1);
    }
    const clippingPlanes = tempVisibleVolumetricClippingPlanes;
    for (let i = 0; i < 3; ++i) {
      const xCoeff = modelViewProjection[4 * i];
      const yCoeff = modelViewProjection[4 * i + 1];
      const zCoeff = modelViewProjection[4 * i + 2];
      clippingPlanes[i] = xCoeff;
      clippingPlanes[4 + i] = -xCoeff;
      clippingPlanes[8 + i] = +yCoeff;
      clippingPlanes[12 + i] = -yCoeff;
      clippingPlanes[16 + i] = +zCoeff;
      clippingPlanes[20 + i] = -zCoeff;
    }
    {
      const i = 3;
      const xCoeff = modelViewProjection[4 * i];
      const yCoeff = modelViewProjection[4 * i + 1];
      const zCoeff = modelViewProjection[4 * i + 2];
      clippingPlanes[i] = 1 + xCoeff;
      clippingPlanes[4 + i] = 1 - xCoeff;
      clippingPlanes[8 + i] = 1 + yCoeff;
      clippingPlanes[12 + i] = 1 - yCoeff;
      clippingPlanes[16 + i] = zCoeff;
      clippingPlanes[20 + i] = -zCoeff;
    }
    if (DEBUG_CHUNK_VISIBILITY) {
      console.log("clippingPlanes", clippingPlanes);
      console.log("modelViewProjection", modelViewProjection.join(","));
      console.log(`lower=${lower.join(",")}, upper=${upper.join(",")}`);
    }
    forEachVolumetricChunkWithinFrustrum(clippingPlanes, transformedSource, callback, isAABBIntersectingPlane);
  }
  function getNormalizedChunkLayout(projectionParameters, chunkLayout) {
    const {finiteRank} = chunkLayout;
    if (finiteRank === 3)
      return chunkLayout;
    tempChunkLayout.finiteRank = finiteRank;
    vec3_exports.copy(tempChunkLayout.size, chunkLayout.size);
    const transform = mat4_exports.copy(tempChunkLayout.transform, chunkLayout.transform);
    const invTransform = mat4_exports.copy(tempChunkLayout.invTransform, chunkLayout.invTransform);
    tempChunkLayout.detTransform = chunkLayout.detTransform;
    const {invViewMatrix, width, height} = projectionParameters;
    const depth = getViewFrustrumDepthRange(projectionParameters.projectionMat);
    for (let chunkRenderDim = finiteRank; chunkRenderDim < 3; ++chunkRenderDim) {
      const offset = invViewMatrix[12 + chunkRenderDim];
      let lower = offset, upper = offset;
      const xc = Math.abs(invViewMatrix[chunkRenderDim] * width);
      lower -= xc;
      upper += xc;
      const yc = Math.abs(invViewMatrix[chunkRenderDim + 4] * height);
      lower -= yc;
      upper += yc;
      const zc = Math.abs(invViewMatrix[chunkRenderDim + 8] * depth);
      lower -= zc;
      upper += zc;
      const scaleFactor = Math.max(1, upper - lower);
      transform[12 + chunkRenderDim] = lower;
      transform[5 * chunkRenderDim] = scaleFactor;
    }
    mat4_exports.invert(invTransform, transform);
    return tempChunkLayout;
  }

  // src/neuroglancer/util/erf.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function erf(x) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const t = 1 / (1 + p * Math.abs(x));
    const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return Math.sign(x) * y;
  }

  // src/neuroglancer/util/velocity_estimation.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const VELOCITY_HALF_LIFE_MS = 50;
  const MODEL_HALF_LIFE_MS = 1e3;
  class VelocityEstimator {
    constructor(velocityHalfLifeMilliseconds = VELOCITY_HALF_LIFE_MS, modelHalfLifeMilliseconds = MODEL_HALF_LIFE_MS) {
      this.velocityHalfLifeMilliseconds = velocityHalfLifeMilliseconds;
      this.modelHalfLifeMilliseconds = modelHalfLifeMilliseconds;
      this.lastTime = Number.NEGATIVE_INFINITY;
      this.rank = 0;
      this.numSamples = 0;
      this.prevPosition = new Float32Array();
      this.velocity = new Float32Array();
      this.mean = new Float32Array();
      this.variance = new Float32Array();
    }
    reset(rank) {
      this.lastTime = Number.NEGATIVE_INFINITY;
      this.rank = rank;
      this.numSamples = 0;
      this.velocity = new Float32Array(rank);
      this.prevPosition = new Float32Array(rank);
      this.mean = new Float32Array(rank);
      this.variance = new Float32Array(rank);
    }
    addSample(position, time = Date.now()) {
      const rank = position.length;
      if (rank !== this.rank) {
        this.reset(rank);
      }
      const numSamples = this.numSamples;
      ++this.numSamples;
      if (this.numSamples === 0) {
        this.prevPosition.set(position);
        this.lastTime = time;
        return;
      }
      const deltaT = time - this.lastTime;
      this.lastTime = time;
      const velocityAlpha = 1 - Math.pow(2, -(deltaT / this.velocityHalfLifeMilliseconds));
      const modelAlpha = 1 - Math.pow(2, -(deltaT / this.modelHalfLifeMilliseconds));
      const {velocity, prevPosition, mean, variance} = this;
      for (let i = 0; i < rank; ++i) {
        const curVelocitySample = (position[i] - prevPosition[i]) / Math.max(deltaT, 1);
        prevPosition[i] = position[i];
        const prevVelocity = velocity[i];
        const newVelocity = velocity[i] = prevVelocity + velocityAlpha * (curVelocitySample - prevVelocity);
        if (numSamples === 1) {
          mean[i] = newVelocity;
        } else {
          const meanPrev = mean[i];
          const varPrev = variance[i];
          const delta = newVelocity - meanPrev;
          mean[i] = meanPrev + modelAlpha * delta;
          variance[i] = (1 - modelAlpha) * (varPrev + modelAlpha * delta * delta);
        }
      }
    }
  }

  // src/neuroglancer/shared_watchable_value.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const CHANGED_RPC_METHOD_ID = "SharedWatchableValue.changed";
  let SharedWatchableValue = class extends SharedObjectCounterpart {
    constructor(rpc2, options = {}) {
      super(rpc2, options);
      this.updatingValue_ = false;
      if (rpc2 !== void 0) {
        this.base = new WatchableValue(options["value"]);
        this.setupChangedHandler();
      }
    }
    initializeCounterpart(rpc2, options = {}) {
      options["value"] = this.value;
      super.initializeCounterpart(rpc2, options);
    }
    setupChangedHandler() {
      this.registerDisposer(this.base.changed.add(() => {
        if (this.updatingValue_) {
          this.updatingValue_ = false;
        } else {
          const {rpc: rpc2} = this;
          if (rpc2 !== null) {
            rpc2.invoke(CHANGED_RPC_METHOD_ID, {id: this.rpcId, value: this.value});
          }
        }
      }));
    }
    static makeFromExisting(rpc2, base39) {
      let obj = new SharedWatchableValue();
      obj.base = base39;
      obj.setupChangedHandler();
      obj.initializeCounterpart(rpc2);
      return obj;
    }
    static make(rpc2, value) {
      return SharedWatchableValue.makeFromExisting(rpc2, new WatchableValue(value));
    }
    get value() {
      return this.base.value;
    }
    set value(value) {
      this.base.value = value;
    }
    get changed() {
      return this.base.changed;
    }
  };
  SharedWatchableValue = __decorate([
    registerSharedObject("SharedWatchableValue")
  ], SharedWatchableValue);
  registerRPC(CHANGED_RPC_METHOD_ID, function(x) {
    const obj = this.get(x["id"]);
    obj.updatingValue_ = true;
    obj.base.value = x["value"];
    obj.updatingValue_ = false;
  });

  // src/neuroglancer/visibility_priority/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function withSharedVisibility(Base) {
    return class extends Base {
      constructor(...args) {
        super(...args);
        const rpc2 = args[0];
        const options = args[1];
        this.visibility = rpc2.get(options["visibility"]);
        this.registerDisposer(this.visibility.changed.add(() => this.chunkManager.scheduleUpdateChunkPriorities()));
      }
    };
  }
  function getPriorityTier(visibility) {
    return visibility === Number.POSITIVE_INFINITY ? ChunkPriorityTier.VISIBLE : ChunkPriorityTier.PREFETCH;
  }
  function getBasePriority(visibility) {
    return visibility === Number.POSITIVE_INFINITY ? 0 : visibility * PREFETCH_PRIORITY_MULTIPLIER;
  }

  // src/neuroglancer/sliceview/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const BASE_PRIORITY = -1e12;
  const SCALE_PRIORITY_MULTIPLIER = 1e9;
  const tempChunkPosition = vec3_exports.create();
  const tempCenter = vec3_exports.create();
  const tempChunkSize = vec3_exports.create();
  class SliceViewCounterpartBase extends SliceViewBase {
    constructor(rpc2, options) {
      super(rpc2.get(options.projectionParameters));
      this.initializeSharedObject(rpc2, options["id"]);
    }
  }
  function disposeTransformedSources(allSources) {
    for (const scales of allSources) {
      for (const tsource of scales) {
        tsource.source.dispose();
      }
    }
  }
  const SliceViewIntermediateBase = withSharedVisibility(withChunkManager(SliceViewCounterpartBase));
  let SliceViewBackend = class extends SliceViewIntermediateBase {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.velocityEstimator = new VelocityEstimator();
      this.handleLayerChanged = () => {
        this.chunkManager.scheduleUpdateChunkPriorities();
      };
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
        this.updateVisibleChunks();
      }));
      this.registerDisposer(this.projectionParameters.changed.add(() => {
        this.velocityEstimator.addSample(this.projectionParameters.value.globalPosition);
      }));
    }
    invalidateVisibleChunks() {
      super.invalidateVisibleChunks();
      this.chunkManager.scheduleUpdateChunkPriorities();
    }
    updateVisibleChunks() {
      const projectionParameters = this.projectionParameters.value;
      let chunkManager = this.chunkManager;
      const visibility = this.visibility.value;
      if (visibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      this.updateVisibleSources();
      const {centerDataPosition} = projectionParameters;
      const priorityTier = getPriorityTier(visibility);
      let basePriority = getBasePriority(visibility);
      basePriority += BASE_PRIORITY;
      const localCenter = tempCenter;
      const chunkSize = tempChunkSize;
      const curVisibleChunks = [];
      this.velocityEstimator.addSample(this.projectionParameters.value.globalPosition);
      for (const [layer, visibleLayerSources] of this.visibleLayers) {
        chunkManager.registerLayer(layer);
        const {visibleSources} = visibleLayerSources;
        for (let i = 0, numVisibleSources = visibleSources.length; i < numVisibleSources; ++i) {
          const tsource = visibleSources[i];
          const prefetchOffsets = chunkManager.queueManager.enablePrefetch.value ? getPrefetchChunkOffsets(this.velocityEstimator, tsource) : [];
          const {chunkLayout} = tsource;
          chunkLayout.globalToLocalSpatial(localCenter, centerDataPosition);
          const {size, finiteRank} = chunkLayout;
          vec3_exports.copy(chunkSize, size);
          for (let i2 = finiteRank; i2 < 3; ++i2) {
            chunkSize[i2] = 0;
            localCenter[i2] = 0;
          }
          const priorityIndex = i;
          const sourceBasePriority = basePriority + SCALE_PRIORITY_MULTIPLIER * priorityIndex;
          curVisibleChunks.length = 0;
          const curMarkGeneration = getNextMarkGeneration();
          forEachPlaneIntersectingVolumetricChunk(projectionParameters, tsource.renderLayer.localPosition.value, tsource, getNormalizedChunkLayout(projectionParameters, tsource.chunkLayout), (positionInChunks) => {
            vec3_exports.multiply(tempChunkPosition, positionInChunks, chunkSize);
            let priority = -vec3_exports.distance(localCenter, tempChunkPosition);
            const {curPositionInChunks} = tsource;
            let chunk = tsource.source.getChunk(curPositionInChunks);
            chunkManager.requestChunk(chunk, priorityTier, sourceBasePriority + priority);
            ++layer.numVisibleChunksNeeded;
            if (chunk.state === ChunkState.GPU_MEMORY) {
              ++layer.numVisibleChunksAvailable;
            }
            curVisibleChunks.push(chunk);
            chunk.markGeneration = curMarkGeneration;
          });
          if (prefetchOffsets.length !== 0) {
            const {curPositionInChunks} = tsource;
            for (const visibleChunk of curVisibleChunks) {
              curPositionInChunks.set(visibleChunk.chunkGridPosition);
              for (let j = 0, length4 = prefetchOffsets.length; j < length4; ) {
                const chunkDim = prefetchOffsets[j];
                const minChunk = prefetchOffsets[j + 2];
                const maxChunk = prefetchOffsets[j + 3];
                const newPriority = prefetchOffsets[j + 4];
                const jumpOffset = prefetchOffsets[j + 5];
                const oldIndex = curPositionInChunks[chunkDim];
                const newIndex = oldIndex + prefetchOffsets[j + 1];
                if (newIndex < minChunk || newIndex > maxChunk) {
                  j = jumpOffset;
                  continue;
                }
                curPositionInChunks[chunkDim] = newIndex;
                const chunk = tsource.source.getChunk(curPositionInChunks);
                curPositionInChunks[chunkDim] = oldIndex;
                if (chunk.markGeneration === curMarkGeneration) {
                  j = jumpOffset;
                  continue;
                }
                if (!Number.isFinite(newPriority)) {
                  debugger;
                }
                chunkManager.requestChunk(chunk, ChunkPriorityTier.PREFETCH, sourceBasePriority + newPriority);
                ++layer.numPrefetchChunksNeeded;
                if (chunk.state === ChunkState.GPU_MEMORY) {
                  ++layer.numPrefetchChunksAvailable;
                }
                j += PREFETCH_ENTRY_SIZE;
              }
            }
          }
        }
      }
    }
    removeVisibleLayer(layer) {
      const {visibleLayers} = this;
      const layerInfo = visibleLayers.get(layer);
      visibleLayers.delete(layer);
      disposeTransformedSources(layerInfo.allSources);
      layer.renderScaleTarget.changed.remove(this.invalidateVisibleSources);
      layer.localPosition.changed.remove(this.handleLayerChanged);
      this.invalidateVisibleSources();
    }
    addVisibleLayer(layer, allSources) {
      const {displayDimensionRenderInfo} = this.projectionParameters.value;
      let layerInfo = this.visibleLayers.get(layer);
      if (layerInfo === void 0) {
        layerInfo = {
          allSources,
          visibleSources: [],
          displayDimensionRenderInfo
        };
        this.visibleLayers.set(layer, layerInfo);
        layer.renderScaleTarget.changed.add(() => this.invalidateVisibleSources());
        layer.localPosition.changed.add(this.handleLayerChanged);
      } else {
        disposeTransformedSources(layerInfo.allSources);
        layerInfo.allSources = allSources;
        layerInfo.visibleSources.length = 0;
        layerInfo.displayDimensionRenderInfo = displayDimensionRenderInfo;
      }
      this.invalidateVisibleSources();
    }
    disposed() {
      for (let layer of this.visibleLayers.keys()) {
        this.removeVisibleLayer(layer);
      }
      super.disposed();
    }
    invalidateVisibleSources() {
      super.invalidateVisibleSources();
      this.chunkManager.scheduleUpdateChunkPriorities();
    }
  };
  SliceViewBackend = __decorate([
    registerSharedObject(SLICEVIEW_RPC_ID)
  ], SliceViewBackend);
  function deserializeTransformedSources(rpc2, serializedSources, layer) {
    const sources = serializedSources.map((scales) => scales.map((serializedSource) => {
      const source = rpc2.getRef(serializedSource.source);
      const chunkLayout = serializedSource.chunkLayout;
      const {rank} = source.spec;
      const tsource = {
        renderLayer: layer,
        source,
        chunkLayout: ChunkLayout.fromObject(chunkLayout),
        layerRank: serializedSource.layerRank,
        nonDisplayLowerClipBound: serializedSource.nonDisplayLowerClipBound,
        nonDisplayUpperClipBound: serializedSource.nonDisplayUpperClipBound,
        lowerClipBound: serializedSource.lowerClipBound,
        upperClipBound: serializedSource.upperClipBound,
        lowerClipDisplayBound: serializedSource.lowerClipDisplayBound,
        upperClipDisplayBound: serializedSource.upperClipDisplayBound,
        lowerChunkDisplayBound: serializedSource.lowerChunkDisplayBound,
        upperChunkDisplayBound: serializedSource.upperChunkDisplayBound,
        effectiveVoxelSize: serializedSource.effectiveVoxelSize,
        chunkDisplayDimensionIndices: serializedSource.chunkDisplayDimensionIndices,
        fixedLayerToChunkTransform: serializedSource.fixedLayerToChunkTransform,
        combinedGlobalLocalToChunkTransform: serializedSource.combinedGlobalLocalToChunkTransform,
        curPositionInChunks: new Float32Array(rank),
        fixedPositionWithinChunk: new Uint32Array(rank)
      };
      return tsource;
    }));
    return sources;
  }
  registerRPC(SLICEVIEW_ADD_VISIBLE_LAYER_RPC_ID, function(x) {
    const obj = this.get(x["id"]);
    const layer = this.get(x["layerId"]);
    const sources = deserializeTransformedSources(this, x.sources, layer);
    obj.addVisibleLayer(layer, sources);
  });
  registerRPC(SLICEVIEW_REMOVE_VISIBLE_LAYER_RPC_ID, function(x) {
    let obj = this.get(x["id"]);
    let layer = this.get(x["layerId"]);
    obj.removeVisibleLayer(layer);
  });
  class SliceViewChunk extends Chunk {
    constructor() {
      super();
      this.source = null;
    }
    initializeVolumeChunk(key, chunkGridPosition) {
      super.initialize(key);
      this.chunkGridPosition = Float32Array.from(chunkGridPosition);
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      msg["chunkGridPosition"] = this.chunkGridPosition;
    }
    downloadSucceeded() {
      super.downloadSucceeded();
    }
    freeSystemMemory() {
    }
    toString() {
      return this.source.toString() + ":" + vec3Key(this.chunkGridPosition);
    }
  }
  class SliceViewChunkSourceBackend extends ChunkSource {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.spec = options.spec;
    }
    getChunk(chunkGridPosition) {
      const key = chunkGridPosition.join();
      let chunk = this.chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(this.chunkConstructor);
        chunk.initializeVolumeChunk(key, chunkGridPosition);
        this.addChunk(chunk);
      }
      return chunk;
    }
  }
  let SliceViewRenderLayerBackend = class extends SharedObjectCounterpart {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.renderScaleTarget = rpc2.get(options.renderScaleTarget);
      this.localPosition = rpc2.get(options.localPosition);
      this.numVisibleChunksNeeded = 0;
      this.numVisibleChunksAvailable = 0;
      this.numPrefetchChunksAvailable = 0;
      this.numPrefetchChunksNeeded = 0;
      this.chunkManagerGeneration = -1;
    }
    filterVisibleSources(sliceView, sources) {
      return filterVisibleSources(sliceView, this, sources);
    }
  };
  SliceViewRenderLayerBackend = __decorate([
    registerSharedObject(SLICEVIEW_RENDERLAYER_RPC_ID)
  ], SliceViewRenderLayerBackend);
  const PREFETCH_MS = 2e3;
  const MAX_PREFETCH_VELOCITY = 0.1;
  const MAX_SINGLE_DIRECTION_PREFETCH_CHUNKS = 32;
  const PREFETCH_PROBABILITY_CUTOFF = 0.05;
  const PREFETCH_ENTRY_SIZE = 6;
  function getPrefetchChunkOffsets(velocityEstimator, tsource) {
    const offsets = [];
    const globalRank = velocityEstimator.rank;
    const {combinedGlobalLocalToChunkTransform, layerRank} = tsource;
    const {rank: chunkRank, chunkDataSize} = tsource.source.spec;
    const {mean: meanVec, variance: varianceVec} = velocityEstimator;
    for (let chunkDim = 0; chunkDim < chunkRank; ++chunkDim) {
      const isDisplayDimension = tsource.chunkDisplayDimensionIndices.includes(chunkDim);
      let mean = 0;
      let variance = 0;
      for (let globalDim = 0; globalDim < globalRank; ++globalDim) {
        const meanValue = meanVec[globalDim];
        const varianceValue = varianceVec[globalDim];
        const coeff = combinedGlobalLocalToChunkTransform[globalDim * layerRank + chunkDim];
        mean += coeff * meanValue;
        variance += coeff * coeff * varianceValue;
      }
      if (mean > MAX_PREFETCH_VELOCITY) {
        continue;
      }
      const chunkSize = chunkDataSize[chunkDim];
      const initialFraction = isDisplayDimension ? 0 : tsource.fixedPositionWithinChunk[chunkDim] / chunkSize;
      const adjustedMean = mean / chunkSize * PREFETCH_MS;
      let adjustedStddevTimesSqrt2 = Math.sqrt(2 * variance) / chunkSize * PREFETCH_MS;
      if (Math.abs(adjustedMean) < 1e-3 && adjustedStddevTimesSqrt2 < 1e-3) {
        continue;
      }
      adjustedStddevTimesSqrt2 = Math.max(1e-6, adjustedStddevTimesSqrt2);
      const cdf = (x) => 0.5 * (1 + erf((x - adjustedMean) / adjustedStddevTimesSqrt2));
      const curChunk = tsource.curPositionInChunks[chunkDim];
      const minChunk = Math.floor(tsource.lowerClipBound[chunkDim] / chunkSize);
      const maxChunk = Math.ceil(tsource.upperClipBound[chunkDim] / chunkSize) - 1;
      let groupStart = offsets.length;
      for (let i = 1; i <= MAX_SINGLE_DIRECTION_PREFETCH_CHUNKS; ++i) {
        if (!isDisplayDimension && curChunk + i > maxChunk)
          break;
        const probability = 1 - cdf(i - initialFraction);
        if (probability < PREFETCH_PROBABILITY_CUTOFF)
          break;
        offsets.push(chunkDim, i, minChunk, maxChunk, probability, 0);
      }
      let newGroupStart = offsets.length;
      for (let i = groupStart, end = offsets.length; i < end; i += PREFETCH_ENTRY_SIZE) {
        offsets[i + PREFETCH_ENTRY_SIZE - 1] = newGroupStart;
      }
      groupStart = newGroupStart;
      for (let i = 1; i <= MAX_SINGLE_DIRECTION_PREFETCH_CHUNKS; ++i) {
        if (!isDisplayDimension && curChunk - i < minChunk)
          break;
        const probability = cdf(-i + 1 - initialFraction);
        if (probability < PREFETCH_PROBABILITY_CUTOFF)
          break;
        offsets.push(chunkDim, -i, minChunk, maxChunk, probability, 0);
      }
      newGroupStart = offsets.length;
      for (let i = groupStart, end = offsets.length; i < end; i += PREFETCH_ENTRY_SIZE) {
        offsets[i + PREFETCH_ENTRY_SIZE - 1] = newGroupStart;
      }
    }
    return offsets;
  }

  // src/neuroglancer/perspective_view/base.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const PERSPECTIVE_VIEW_RPC_ID = "perspective_view/PerspectiveView";

  // src/neuroglancer/perspective_view/backend.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let PerspectiveViewBackend = class extends SharedObjectCounterpart {
    constructor(...args) {
      super(...args);
      const rpc2 = args[0];
      const options = args[1];
      this.visibility = rpc2.get(options.visibility);
      this.projectionParameters = rpc2.get(options.projectionParameters);
    }
  };
  PerspectiveViewBackend = __decorate([
    registerSharedObject(PERSPECTIVE_VIEW_RPC_ID)
  ], PerspectiveViewBackend);
  class PerspectiveViewRenderLayerBackend extends RenderLayerBackend {
  }

  // src/neuroglancer/volume_rendering/base.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const VOLUME_RENDERING_RENDER_LAYER_RPC_ID = "volume_rendering/VolumeRenderingRenderLayer";
  const VOLUME_RENDERING_RENDER_LAYER_UPDATE_SOURCES_RPC_ID = "volume_rendering/VolumeRenderingRenderLayer/update";
  const volumeRenderingDepthSamples = 64;
  const tempMat3 = mat3_exports.create();
  function forEachVisibleVolumeRenderingChunk(projectionParameters, localPosition, renderScaleTarget, transformedSources, beginScale, callback) {
    renderScaleTarget;
    if (transformedSources.length === 0)
      return;
    const {viewMatrix, projectionMat, displayDimensionRenderInfo} = projectionParameters;
    const {voxelPhysicalScales} = displayDimensionRenderInfo;
    const canonicalToPhysicalScale = prod3(voxelPhysicalScales);
    const targetViewSpacing = getViewFrustrumDepthRange(projectionMat) / volumeRenderingDepthSamples;
    const targetViewVolume = targetViewSpacing ** 3;
    const viewDet = mat3_exports.determinant(mat3FromMat4(tempMat3, viewMatrix));
    const getViewVolume = (scaleIndex) => {
      const tsource2 = transformedSources[scaleIndex];
      return tsource2.chunkLayout.detTransform * viewDet;
    };
    let bestScaleIndex = transformedSources.length - 1;
    let bestViewVolume = getViewVolume(bestScaleIndex);
    for (let scaleIndex = bestScaleIndex - 1; scaleIndex >= 0; --scaleIndex) {
      const viewVolume = getViewVolume(scaleIndex);
      if (Math.abs(viewVolume - targetViewVolume) < Math.abs(bestViewVolume - targetViewVolume)) {
        bestViewVolume = viewVolume;
        bestScaleIndex = scaleIndex;
      } else {
        break;
      }
    }
    const physicalSpacing = Math.pow(bestViewVolume * canonicalToPhysicalScale / viewDet, 1 / 3);
    const pixelSpacing = Math.pow(bestViewVolume, 1 / 3) * projectionParameters.width / (2 * projectionMat[0]);
    let firstChunk = true;
    const tsource = transformedSources[bestScaleIndex];
    forEachVisibleVolumetricChunk(projectionParameters, localPosition, tsource, (positionInChunks, clippingPlanes) => {
      if (firstChunk) {
        beginScale(tsource, bestScaleIndex, physicalSpacing, pixelSpacing, clippingPlanes);
        firstChunk = false;
      }
      callback(tsource, bestScaleIndex, positionInChunks);
    });
  }

  // src/neuroglancer/volume_rendering/backend.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const tempChunkPosition2 = vec3_exports.create();
  const tempCenter2 = vec3_exports.create();
  const tempChunkSize2 = vec3_exports.create();
  const tempCenterDataPosition = vec3_exports.create();
  let VolumeRenderingRenderLayerBackend = class extends withChunkManager(RenderLayerBackend) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.renderScaleTarget = rpc2.get(options.renderScaleTarget);
      this.localPosition = rpc2.get(options.localPosition);
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      this.registerDisposer(this.localPosition.changed.add(scheduleUpdateChunkPriorities));
      this.registerDisposer(this.renderScaleTarget.changed.add(scheduleUpdateChunkPriorities));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
    }
    attach(attachment) {
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      const {view} = attachment;
      attachment.registerDisposer(scheduleUpdateChunkPriorities);
      attachment.registerDisposer(view.projectionParameters.changed.add(scheduleUpdateChunkPriorities));
      attachment.registerDisposer(view.visibility.changed.add(scheduleUpdateChunkPriorities));
      attachment.state = {
        displayDimensionRenderInfo: view.projectionParameters.value.displayDimensionRenderInfo,
        transformedSources: []
      };
    }
    recomputeChunkPriorities() {
      for (const attachment of this.attachments.values()) {
        const {view} = attachment;
        const visibility = view.visibility.value;
        if (visibility === Number.NEGATIVE_INFINITY) {
          continue;
        }
        const {transformedSources, displayDimensionRenderInfo} = attachment.state;
        if (transformedSources.length === 0 || displayDimensionRenderInfo !== view.projectionParameters.value.displayDimensionRenderInfo) {
          continue;
        }
        const projectionParameters = view.projectionParameters.value;
        const priorityTier = getPriorityTier(visibility);
        let basePriority = getBasePriority(visibility);
        basePriority += BASE_PRIORITY;
        const localCenter = tempCenter2;
        const chunkSize = tempChunkSize2;
        const centerDataPosition = tempCenterDataPosition;
        const {globalPosition, displayDimensionRenderInfo: {displayDimensionIndices}} = projectionParameters;
        for (let displayDim = 0; displayDim < 3; ++displayDim) {
          const globalDim = displayDimensionIndices[displayDim];
          centerDataPosition[displayDim] = globalDim === -1 ? 0 : globalPosition[globalDim];
        }
        let sourceBasePriority;
        const {chunkManager} = this;
        chunkManager.registerLayer(this);
        forEachVisibleVolumeRenderingChunk(projectionParameters, this.localPosition.value, this.renderScaleTarget.value, transformedSources[0], (tsource, scaleIndex) => {
          const {chunkLayout} = tsource;
          for (let i = 0; i < 3; ++i) {
          }
          chunkLayout.globalToLocalSpatial(localCenter, centerDataPosition);
          const {size, finiteRank} = chunkLayout;
          vec3_exports.copy(chunkSize, size);
          for (let i = finiteRank; i < 3; ++i) {
            chunkSize[i] = 0;
            localCenter[i] = 0;
          }
          const priorityIndex = transformedSources[0].length - 1 - scaleIndex;
          sourceBasePriority = basePriority + SCALE_PRIORITY_MULTIPLIER * priorityIndex;
        }, (tsource, _, positionInChunks) => {
          vec3_exports.multiply(tempChunkPosition2, positionInChunks, chunkSize);
          const priority = -vec3_exports.distance(localCenter, tempChunkPosition2);
          const chunk = tsource.source.getChunk(tsource.curPositionInChunks);
          ++this.numVisibleChunksNeeded;
          chunkManager.requestChunk(chunk, priorityTier, sourceBasePriority + priority);
          if (chunk.state === ChunkState.GPU_MEMORY) {
            ++this.numVisibleChunksAvailable;
          }
        });
      }
    }
  };
  VolumeRenderingRenderLayerBackend = __decorate([
    registerSharedObject(VOLUME_RENDERING_RENDER_LAYER_RPC_ID)
  ], VolumeRenderingRenderLayerBackend);
  registerRPC(VOLUME_RENDERING_RENDER_LAYER_UPDATE_SOURCES_RPC_ID, function(x) {
    const view = this.get(x.view);
    const layer = this.get(x.layer);
    const attachment = layer.attachments.get(view);
    attachment.state.transformedSources = deserializeTransformedSources(this, x.sources, layer);
    attachment.state.displayDimensionRenderInfo = attachment.view.projectionParameters.value.displayDimensionRenderInfo;
    layer.chunkManager.scheduleUpdateChunkPriorities();
  });

  // src/neuroglancer/util/float32_to_string.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const tempArray = new Float32Array(1);
  function float32ToString(x) {
    tempArray[0] = x;
    x = tempArray[0];
    for (let digits = 1; digits < 21; ++digits) {
      let result = x.toPrecision(digits);
      tempArray[0] = parseFloat(result);
      if (tempArray[0] === x) {
        return result;
      }
    }
    return x.toString();
  }

  // src/neuroglancer/util/hex.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function hexEncodeByte(x) {
    return ("0" + x.toString(16)).slice(-2);
  }

  // src/neuroglancer/util/color.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function parseColorSerialization(x) {
    const rgbaPattern = /^rgba\(([0-9]+), ([0-9]+), ([0-9]+), (0(?:\.[0-9]+)?)\)$/;
    {
      const m = x.match(rgbaPattern);
      if (m !== null) {
        return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), parseFloat(m[4])];
      }
    }
    const hexPattern = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/;
    {
      const m = x.match(hexPattern);
      if (m !== null) {
        return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16), 1];
      }
    }
    throw new Error(`Invalid serialized color: ${JSON.stringify(x)}.`);
  }
  function parseRGBAColorSpecification(x) {
    try {
      if (typeof x !== "string") {
        throw new Error(`Expected string, but received ${JSON.stringify(x)}.`);
      }
      const context2 = document.createElement("canvas").getContext("2d");
      context2.fillStyle = x;
      const result = parseColorSerialization(context2.fillStyle);
      return vec4_exports.fromValues(result[0] / 255, result[1] / 255, result[2] / 255, result[3]);
    } catch (parseError) {
      throw new Error(`Failed to parse color specification: ${parseError.message}`);
    }
  }
  function parseRGBColorSpecification(x) {
    const result = parseRGBAColorSpecification(x);
    return result.subarray(0, 3);
  }
  function packColor(x) {
    const size = x[3] === void 0 ? 3 : 4;
    let result = 0;
    for (let i = 0; i < size; i++) {
      result = (result << 8 >>> 0) + Math.min(255, Math.max(0, Math.round(x[size - 1 - i] * 255)));
    }
    return result;
  }
  function unpackRGB(value) {
    return vec3_exports.fromValues((value >>> 0 & 255) / 255, (value >>> 8 & 255) / 255, (value >>> 16 & 255) / 255);
  }
  function unpackRGBA(value) {
    return vec4_exports.fromValues((value >>> 0 & 255) / 255, (value >>> 8 & 255) / 255, (value >>> 16 & 255) / 255, (value >>> 24 & 255) / 255);
  }
  function serializeColor(x) {
    if (x[3] === void 0 || x[3] === 1) {
      let result = "#";
      for (let i = 0; i < 3; ++i) {
        result += hexEncodeByte(Math.min(255, Math.max(0, Math.round(x[i] * 255))));
      }
      return result;
    } else {
      let result = "rgba(";
      for (let i = 0; i < 3; ++i) {
        if (i !== 0) {
          result += ", ";
        }
        result += Math.min(255, Math.max(0, Math.round(x[i] * 255)));
      }
      result += `, ${float32ToString(x[3])})`;
      return result;
    }
  }
  class TrackableRGB extends WatchableValue {
    constructor(defaultValue) {
      super(vec3_exports.clone(defaultValue));
      this.defaultValue = defaultValue;
    }
    toString() {
      return serializeColor(this.value);
    }
    toJSON() {
      if (vec3_exports.equals(this.value, this.defaultValue)) {
        return void 0;
      } else {
        return serializeColor(this.value);
      }
    }
    reset() {
      this.value = vec3_exports.clone(this.defaultValue);
    }
    restoreState(x) {
      if (x === void 0) {
        this.reset();
        return;
      }
      const {value} = this;
      const newValue = parseRGBColorSpecification(x);
      if (!vec3_exports.equals(value, newValue)) {
        this.value = newValue;
      }
    }
  }

  // src/neuroglancer/util/endian.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var Endianness;
  (function(Endianness4) {
    Endianness4[Endianness4["LITTLE"] = 0] = "LITTLE";
    Endianness4[Endianness4["BIG"] = 1] = "BIG";
  })(Endianness || (Endianness = {}));
  function determineEndianness() {
    const a = Uint16Array.of(4386);
    const b = new Uint8Array(a.buffer);
    return b[0] === 17 ? 1 : 0;
  }
  const ENDIANNESS = determineEndianness();
  function swapEndian16(array7) {
    let view = new Uint8Array(array7.buffer, array7.byteOffset, array7.byteLength);
    for (let i = 0, length4 = view.length; i < length4; i += 2) {
      let temp = view[i];
      view[i] = view[i + 1];
      view[i + 1] = temp;
    }
  }
  function swapEndian32(array7) {
    let view = new Uint8Array(array7.buffer, array7.byteOffset, array7.byteLength);
    for (let i = 0, length4 = view.length; i < length4; i += 4) {
      let temp = view[i];
      view[i] = view[i + 3];
      view[i + 3] = temp;
      temp = view[i + 1];
      view[i + 1] = view[i + 2];
      view[i + 2] = temp;
    }
  }
  function swapEndian64(array7) {
    let view = new Uint8Array(array7.buffer, array7.byteOffset, array7.byteLength);
    for (let i = 0, length4 = view.length; i < length4; i += 8) {
      let temp = view[i];
      view[i] = view[i + 7];
      view[i + 7] = temp;
      temp = view[i + 1];
      view[i + 1] = view[i + 6];
      view[i + 6] = temp;
      temp = view[i + 2];
      view[i + 2] = view[i + 5];
      view[i + 5] = temp;
      temp = view[i + 3];
      view[i + 3] = view[i + 4];
      view[i + 4] = temp;
    }
  }
  function convertEndian16(array7, source, target = ENDIANNESS) {
    if (source !== target) {
      swapEndian16(array7);
    }
  }
  function convertEndian32(array7, source, target = ENDIANNESS) {
    if (source !== target) {
      swapEndian32(array7);
    }
  }
  function convertEndian(array7, source, elementBytes, target = ENDIANNESS) {
    if (source === target || elementBytes === 1)
      return;
    switch (elementBytes) {
      case 2:
        swapEndian16(array7);
        break;
      case 4:
        swapEndian32(array7);
        break;
      case 8:
        swapEndian64(array7);
        break;
    }
  }

  // src/neuroglancer/util/random.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function getRandomHexString(numBits = 128) {
    const numValues = Math.ceil(numBits / 32);
    const data = new Uint32Array(numValues);
    crypto.getRandomValues(data);
    let s = "";
    for (let i = 0; i < numValues; ++i) {
      s += ("00000000" + data[i].toString(16)).slice(-8);
    }
    return s;
  }
  function getRandomValues(array7) {
    let byteArray = new Uint8Array(array7.buffer, array7.byteOffset, array7.byteLength);
    const blockSize = 65536;
    for (let i = 0, length4 = byteArray.length; i < length4; i += blockSize) {
      crypto.getRandomValues(byteArray.subarray(i, Math.min(length4, i + blockSize)));
    }
    return array7;
  }

  // src/neuroglancer/util/uint64.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const randomTempBuffer = new Uint32Array(2);
  const trueBase = 4294967296;
  let stringConversionData = [];
  for (let base39 = 2; base39 <= 36; ++base39) {
    let lowDigits = Math.floor(32 / Math.log2(base39));
    let lowBase = Math.pow(base39, lowDigits);
    let patternString = `^[0-${String.fromCharCode("0".charCodeAt(0) + Math.min(9, base39 - 1))}`;
    if (base39 > 10) {
      patternString += `a-${String.fromCharCode("a".charCodeAt(0) + base39 - 11)}`;
      patternString += `A-${String.fromCharCode("A".charCodeAt(0) + base39 - 11)}`;
    }
    let maxDigits = Math.ceil(64 / Math.log2(base39));
    patternString += `]{1,${maxDigits}}$`;
    let pattern = new RegExp(patternString);
    stringConversionData[base39] = {lowDigits, lowBase, pattern};
  }
  function uint32MultiplyHigh(a, b) {
    a >>>= 0;
    b >>>= 0;
    const a00 = a & 65535, a16 = a >>> 16;
    const b00 = b & 65535, b16 = b >>> 16;
    let c00 = a00 * b00;
    let c16 = (c00 >>> 16) + a16 * b00;
    let c32 = c16 >>> 16;
    c16 = (c16 & 65535) + a00 * b16;
    c32 += c16 >>> 16;
    let c48 = c32 >>> 16;
    c32 = (c32 & 65535) + a16 * b16;
    c48 += c32 >>> 16;
    return ((c48 & 65535) << 16 | c32 & 65535) >>> 0;
  }
  class Uint64 {
    constructor(low = 0, high = 0) {
      this.low = low;
      this.high = high;
    }
    clone() {
      return new Uint64(this.low, this.high);
    }
    assign(x) {
      this.low = x.low;
      this.high = x.high;
    }
    toString(base39 = 10) {
      let vLow = this.low, vHigh = this.high;
      if (vHigh === 0) {
        return vLow.toString(base39);
      }
      vHigh *= trueBase;
      let {lowBase, lowDigits} = stringConversionData[base39];
      let vHighExtra = vHigh % lowBase;
      vHigh = Math.floor(vHigh / lowBase);
      vLow += vHighExtra;
      vHigh += Math.floor(vLow / lowBase);
      vLow = vLow % lowBase;
      let vLowStr = vLow.toString(base39);
      return vHigh.toString(base39) + "0".repeat(lowDigits - vLowStr.length) + vLowStr;
    }
    static less(a, b) {
      return a.high < b.high || a.high === b.high && a.low < b.low;
    }
    static compare(a, b) {
      return a.high - b.high || a.low - b.low;
    }
    static equal(a, b) {
      return a.low === b.low && a.high === b.high;
    }
    static min(a, b) {
      return Uint64.less(a, b) ? a : b;
    }
    static max(a, b) {
      return Uint64.less(a, b) ? b : a;
    }
    static random() {
      crypto.getRandomValues(randomTempBuffer);
      return new Uint64(randomTempBuffer[0], randomTempBuffer[1]);
    }
    tryParseString(s, base39 = 10) {
      const {lowDigits, lowBase, pattern} = stringConversionData[base39];
      if (!pattern.test(s)) {
        return false;
      }
      if (s.length <= lowDigits) {
        this.low = parseInt(s, base39);
        this.high = 0;
        return true;
      }
      const splitPoint = s.length - lowDigits;
      const lowPrime = parseInt(s.substr(splitPoint), base39);
      const highPrime = parseInt(s.substr(0, splitPoint), base39);
      let high, low;
      if (lowBase === trueBase) {
        high = highPrime;
        low = lowPrime;
      } else {
        const highRemainder = Math.imul(highPrime, lowBase) >>> 0;
        high = uint32MultiplyHigh(highPrime, lowBase) + (Math.imul(Math.floor(highPrime / trueBase), lowBase) >>> 0);
        low = lowPrime + highRemainder;
        if (low >= trueBase) {
          ++high;
          low -= trueBase;
        }
      }
      if (low >>> 0 !== low || high >>> 0 !== high) {
        return false;
      }
      this.low = low;
      this.high = high;
      return true;
    }
    parseString(s, base39 = 10) {
      if (!this.tryParseString(s, base39)) {
        throw new Error(`Failed to parse string as uint64 value: ${JSON.stringify(s)}.`);
      }
      return this;
    }
    static parseString(s, base39 = 10) {
      let x = new Uint64();
      return x.parseString(s, base39);
    }
    valid() {
      let {low, high} = this;
      return low >>> 0 === low && high >>> 0 === high;
    }
    toJSON() {
      return this.toString();
    }
    static lshift(out, input, bits) {
      const {low, high} = input;
      if (bits === 0) {
        out.low = low;
        out.high = high;
      } else if (bits < 32) {
        out.low = low << bits;
        out.high = high << bits | low >>> 32 - bits;
      } else {
        out.low = 0;
        out.high = low << bits - 32;
      }
      return out;
    }
    static rshift(out, input, bits) {
      const {low, high} = input;
      if (bits === 0) {
        out.low = low;
        out.high = high;
      } else if (bits < 32) {
        out.low = low >>> bits | high << 32 - bits;
        out.high = high >>> bits;
      } else {
        out.low = high >>> bits - 32;
        out.high = 0;
      }
      return out;
    }
    static or(out, a, b) {
      out.low = a.low | b.low;
      out.high = a.high | b.high;
      return out;
    }
    static xor(out, a, b) {
      out.low = a.low ^ b.low;
      out.high = a.high ^ b.high;
      return out;
    }
    static and(out, a, b) {
      out.low = a.low & b.low;
      out.high = a.high & b.high;
      return out;
    }
    static add(out, a, b) {
      let lowSum = a.low + b.low;
      let highSum = a.high + b.high;
      const low = lowSum >>> 0;
      if (low !== lowSum)
        highSum += 1;
      out.low = low;
      out.high = highSum >>> 0;
      return out;
    }
    static addUint32(out, a, b) {
      let lowSum = a.low + b;
      let highSum = a.high;
      const low = lowSum >>> 0;
      if (low !== lowSum)
        highSum += 1;
      out.low = low;
      out.high = highSum >>> 0;
      return out;
    }
    static decrement(out, input) {
      let {low, high} = input;
      if (low === 0) {
        high -= 1;
      }
      out.low = low - 1 >>> 0;
      out.high = high >>> 0;
      return out;
    }
    static increment(out, input) {
      let {low, high} = input;
      if (low === 4294967295)
        high += 1;
      out.low = low + 1 >>> 0;
      out.high = high >>> 0;
      return out;
    }
    static subtract(out, a, b) {
      let lowSum = a.low - b.low;
      let highSum = a.high - b.high;
      const low = lowSum >>> 0;
      if (low !== lowSum)
        highSum -= 1;
      out.low = low;
      out.high = highSum >>> 0;
      return out;
    }
    static absDifference(out, a, b) {
      return Uint64.less(a, b) ? Uint64.subtract(out, b, a) : Uint64.subtract(out, a, b);
    }
    static multiplyUint32(out, a, b) {
      const {low, high} = a;
      out.low = Math.imul(low, b) >>> 0;
      out.high = Math.imul(high, b) + uint32MultiplyHigh(low, b) >>> 0;
      return out;
    }
    static lowMask(out, bits) {
      if (bits === 0) {
        out.high = out.low = 0;
      } else if (bits <= 32) {
        out.high = 0;
        out.low = 4294967295 >>> 32 - bits;
      } else {
        out.high = 4294967295 >>> bits - 32;
        out.low = 4294967295;
      }
      return out;
    }
    toNumber() {
      return this.low + this.high * 4294967296;
    }
    setFromNumber(value) {
      value = Math.round(value);
      if (value < 0) {
        this.low = this.high = 0;
      } else if (value >= 18446744073709552e3) {
        this.low = this.high = 4294967295;
      } else {
        this.low = value % 4294967296;
        this.high = Math.floor(value / 4294967296);
      }
    }
  }
  Uint64.ZERO = new Uint64(0, 0);
  Uint64.ONE = new Uint64(1, 0);

  // src/neuroglancer/annotation/index.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG2 = false;
  class AnnotationReference extends RefCounted {
    constructor(id) {
      super();
      this.id = id;
      this.changed = new NullarySignal();
    }
    addRef() {
      if (DEBUG2) {
        console.log("INC ref", this);
      }
      return super.addRef();
    }
    dispose() {
      if (DEBUG2) {
        console.log("DEC ref", this);
        if (this.refCount === 1) {
          console.log("Deleting", this);
        }
      }
      super.dispose();
    }
  }
  var AnnotationType;
  (function(AnnotationType2) {
    AnnotationType2[AnnotationType2["POINT"] = 0] = "POINT";
    AnnotationType2[AnnotationType2["LINE"] = 1] = "LINE";
    AnnotationType2[AnnotationType2["AXIS_ALIGNED_BOUNDING_BOX"] = 2] = "AXIS_ALIGNED_BOUNDING_BOX";
    AnnotationType2[AnnotationType2["ELLIPSOID"] = 3] = "ELLIPSOID";
  })(AnnotationType || (AnnotationType = {}));
  const annotationTypes = [
    0,
    1,
    2,
    3
  ];
  const annotationPropertyTypeHandlers = {
    rgb: {
      serializedBytes() {
        return 3;
      },
      alignment() {
        return 1;
      },
      serializeCode(property, offset) {
        return `dv.setUint16(${offset}, ${property}, true);dv.setUint8(${offset} + 2, ${property} >>> 16);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getUint16(${offset}, true) | (dv.getUint8(${offset} + 2) << 16);`;
      },
      deserializeJson(obj) {
        return packColor(parseRGBColorSpecification(obj));
      },
      serializeJson(value) {
        return serializeColor(unpackRGB(value));
      }
    },
    rgba: {
      serializedBytes() {
        return 4;
      },
      alignment() {
        return 1;
      },
      serializeCode(property, offset) {
        return `dv.setUint32(${offset}, ${property}, true);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getUint32(${offset}, true);`;
      },
      deserializeJson(obj) {
        return packColor(parseRGBAColorSpecification(obj));
      },
      serializeJson(value) {
        return serializeColor(unpackRGBA(value));
      }
    },
    float32: {
      serializedBytes() {
        return 4;
      },
      alignment() {
        return 4;
      },
      serializeCode(property, offset) {
        return `dv.setFloat32(${offset}, ${property}, isLittleEndian);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getFloat32(${offset}, isLittleEndian);`;
      },
      deserializeJson(obj) {
        return verifyFloat(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    uint32: {
      serializedBytes() {
        return 4;
      },
      alignment() {
        return 4;
      },
      serializeCode(property, offset) {
        return `dv.setUint32(${offset}, ${property}, isLittleEndian);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getUint32(${offset}, isLittleEndian);`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    int32: {
      serializedBytes() {
        return 4;
      },
      alignment() {
        return 4;
      },
      serializeCode(property, offset) {
        return `dv.setInt32(${offset}, ${property}, isLittleEndian);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getInt32(${offset}, isLittleEndian);`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    uint16: {
      serializedBytes() {
        return 2;
      },
      alignment() {
        return 2;
      },
      serializeCode(property, offset) {
        return `dv.setUint16(${offset}, ${property}, isLittleEndian);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getUint16(${offset}, isLittleEndian);`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    int16: {
      serializedBytes() {
        return 2;
      },
      alignment() {
        return 2;
      },
      serializeCode(property, offset) {
        return `dv.setInt16(${offset}, ${property}, isLittleEndian);`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getInt16(${offset}, isLittleEndian);`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    uint8: {
      serializedBytes() {
        return 1;
      },
      alignment() {
        return 1;
      },
      serializeCode(property, offset) {
        return `dv.setUint8(${offset}, ${property});`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getUint8(${offset});`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    },
    int8: {
      serializedBytes() {
        return 2;
      },
      alignment() {
        return 1;
      },
      serializeCode(property, offset) {
        return `dv.setInt8(${offset}, ${property});`;
      },
      deserializeCode(property, offset) {
        return `${property} = dv.getInt8(${offset});`;
      },
      deserializeJson(obj) {
        return verifyInt(obj);
      },
      serializeJson(value) {
        return value;
      }
    }
  };
  function getPropertyOffsets(rank, propertySpecs) {
    let serializedBytes = 0;
    const numProperties = propertySpecs.length;
    const permutation = new Array(numProperties);
    for (let i = 0; i < numProperties; ++i) {
      permutation[i] = i;
    }
    const getAlignment = (i) => annotationPropertyTypeHandlers[propertySpecs[i].type].alignment(rank);
    permutation.sort((i, j) => getAlignment(j) - getAlignment(i));
    const offsets = new Array(numProperties);
    for (let outputIndex = 0; outputIndex < numProperties; ++outputIndex) {
      const propertyIndex = permutation[outputIndex];
      const spec = propertySpecs[propertyIndex];
      const handler = annotationPropertyTypeHandlers[spec.type];
      const numBytes = handler.serializedBytes(rank);
      const alignment = handler.alignment(rank);
      serializedBytes += (alignment - serializedBytes % alignment) % alignment;
      offsets[propertyIndex] = serializedBytes;
      serializedBytes += numBytes;
    }
    serializedBytes += (4 - serializedBytes % 4) % 4;
    return {serializedBytes, offsets};
  }
  class AnnotationPropertySerializer {
    constructor(rank, propertySpecs) {
      this.rank = rank;
      this.propertySpecs = propertySpecs;
      if (propertySpecs.length === 0) {
        this.serializedBytes = 0;
        this.serialize = this.deserialize = () => {
        };
        return;
      }
      let serializeCode = "";
      let deserializeCode = "";
      const {serializedBytes, offsets} = getPropertyOffsets(rank, propertySpecs);
      const numProperties = propertySpecs.length;
      for (let propertyIndex = 0; propertyIndex < numProperties; ++propertyIndex) {
        const spec = propertySpecs[propertyIndex];
        const handler = annotationPropertyTypeHandlers[spec.type];
        const propId = `properties[${propertyIndex}]`;
        const offsetExpr = `offset + ${offsets[propertyIndex]}`;
        serializeCode += handler.serializeCode(propId, offsetExpr, rank);
        deserializeCode += handler.deserializeCode(propId, offsetExpr, rank);
      }
      this.serializedBytes = serializedBytes;
      this.serialize = new Function("dv", "offset", "isLittleEndian", "properties", serializeCode);
      this.deserialize = new Function("dv", "offset", "isLittleEndian", "properties", deserializeCode);
    }
  }
  function serializeFloatVector(buffer, offset, isLittleEndian, rank, vec) {
    for (let i = 0; i < rank; ++i) {
      buffer.setFloat32(offset, vec[i], isLittleEndian);
      offset += 4;
    }
    return offset;
  }
  function serializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, vecA, vecB) {
    offset = serializeFloatVector(buffer, offset, isLittleEndian, rank, vecA);
    offset = serializeFloatVector(buffer, offset, isLittleEndian, rank, vecB);
    return offset;
  }
  function deserializeFloatVector(buffer, offset, isLittleEndian, rank, vec) {
    for (let i = 0; i < rank; ++i) {
      vec[i] = buffer.getFloat32(offset, isLittleEndian);
      offset += 4;
    }
    return offset;
  }
  function deserializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, vecA, vecB) {
    offset = deserializeFloatVector(buffer, offset, isLittleEndian, rank, vecA);
    offset = deserializeFloatVector(buffer, offset, isLittleEndian, rank, vecB);
    return offset;
  }
  const annotationTypeHandlers = {
    [1]: {
      icon: "\uA579",
      description: "Line",
      toJSON(annotation9) {
        return {
          pointA: Array.from(annotation9.pointA),
          pointB: Array.from(annotation9.pointB)
        };
      },
      restoreState(annotation9, obj, rank) {
        annotation9.pointA = verifyObjectProperty(obj, "pointA", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
        annotation9.pointB = verifyObjectProperty(obj, "pointB", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
      },
      serializedBytes(rank) {
        return 2 * 4 * rank;
      },
      serialize(buffer, offset, isLittleEndian, rank, annotation9) {
        serializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, annotation9.pointA, annotation9.pointB);
      },
      deserialize: (buffer, offset, isLittleEndian, rank, id) => {
        const pointA = new Float32Array(rank);
        const pointB = new Float32Array(rank);
        deserializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, pointA, pointB);
        return {type: 1, pointA, pointB, id, properties: []};
      },
      visitGeometry(annotation9, callback) {
        callback(annotation9.pointA, false);
        callback(annotation9.pointB, false);
      }
    },
    [0]: {
      icon: "\u26AC",
      description: "Point",
      toJSON: (annotation9) => {
        return {
          point: Array.from(annotation9.point)
        };
      },
      restoreState: (annotation9, obj, rank) => {
        annotation9.point = verifyObjectProperty(obj, "point", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
      },
      serializedBytes: (rank) => rank * 4,
      serialize: (buffer, offset, isLittleEndian, rank, annotation9) => {
        serializeFloatVector(buffer, offset, isLittleEndian, rank, annotation9.point);
      },
      deserialize: (buffer, offset, isLittleEndian, rank, id) => {
        const point = new Float32Array(rank);
        deserializeFloatVector(buffer, offset, isLittleEndian, rank, point);
        return {type: 0, point, id, properties: []};
      },
      visitGeometry(annotation9, callback) {
        callback(annotation9.point, false);
      }
    },
    [2]: {
      icon: "\u2751",
      description: "Bounding Box",
      toJSON: (annotation9) => {
        return {
          pointA: Array.from(annotation9.pointA),
          pointB: Array.from(annotation9.pointB)
        };
      },
      restoreState: (annotation9, obj, rank) => {
        annotation9.pointA = verifyObjectProperty(obj, "pointA", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
        annotation9.pointB = verifyObjectProperty(obj, "pointB", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
      },
      serializedBytes: (rank) => 2 * 4 * rank,
      serialize(buffer, offset, isLittleEndian, rank, annotation9) {
        serializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, annotation9.pointA, annotation9.pointB);
      },
      deserialize: (buffer, offset, isLittleEndian, rank, id) => {
        const pointA = new Float32Array(rank);
        const pointB = new Float32Array(rank);
        deserializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, pointA, pointB);
        return {type: 2, pointA, pointB, id, properties: []};
      },
      visitGeometry(annotation9, callback) {
        callback(annotation9.pointA, false);
        callback(annotation9.pointB, false);
      }
    },
    [3]: {
      icon: "\u25CE",
      description: "Ellipsoid",
      toJSON: (annotation9) => {
        return {
          center: Array.from(annotation9.center),
          radii: Array.from(annotation9.radii)
        };
      },
      restoreState: (annotation9, obj, rank) => {
        annotation9.center = verifyObjectProperty(obj, "center", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteFloat));
        annotation9.radii = verifyObjectProperty(obj, "radii", (x) => parseFixedLengthArray(new Float32Array(rank), x, verifyFiniteNonNegativeFloat));
      },
      serializedBytes: (rank) => 2 * 4 * rank,
      serialize(buffer, offset, isLittleEndian, rank, annotation9) {
        serializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, annotation9.center, annotation9.radii);
      },
      deserialize: (buffer, offset, isLittleEndian, rank, id) => {
        const center = new Float32Array(rank);
        const radii = new Float32Array(rank);
        deserializeTwoFloatVectors(buffer, offset, isLittleEndian, rank, center, radii);
        return {type: 3, center, radii, id, properties: []};
      },
      visitGeometry(annotation9, callback) {
        callback(annotation9.center, false);
        callback(annotation9.radii, true);
      }
    }
  };
  function annotationToJson(annotation9, schema) {
    const result = annotationTypeHandlers[annotation9.type].toJSON(annotation9, schema.rank);
    result.type = AnnotationType[annotation9.type].toLowerCase();
    result.id = annotation9.id;
    result.description = annotation9.description || void 0;
    const {relatedSegments} = annotation9;
    if (relatedSegments !== void 0 && relatedSegments.some((x) => x.length !== 0)) {
      result.segments = relatedSegments.map((segments) => segments.map((x) => x.toString()));
    }
    if (schema.properties.length !== 0) {
      const propertySpecs = schema.properties;
      result.props = annotation9.properties.map((prop, i) => annotationPropertyTypeHandlers[propertySpecs[i].type].serializeJson(prop));
    }
    return result;
  }
  function restoreAnnotation(obj, schema, allowMissingId = false) {
    verifyObject(obj);
    const type = verifyObjectProperty(obj, "type", (x) => verifyEnumString(x, AnnotationType));
    const id = verifyObjectProperty(obj, "id", allowMissingId ? verifyOptionalString : verifyString) || makeAnnotationId();
    const relatedSegments = verifyObjectProperty(obj, "segments", (relObj) => {
      if (relObj === void 0) {
        return schema.relationships.map(() => []);
      }
      const a = expectArray(relObj);
      if (a.length === 0) {
        return schema.relationships.map(() => []);
      }
      if (schema.relationships.length === 1 && !Array.isArray(a[0])) {
        return [parseArray(a, (x) => Uint64.parseString(x))];
      }
      return parseArray(expectArray(relObj, schema.relationships.length), (segments) => parseArray(segments, (y) => Uint64.parseString(y)));
    });
    const properties = verifyObjectProperty(obj, "props", (propsObj) => {
      const propSpecs = schema.properties;
      if (propsObj === void 0)
        return propSpecs.map((x) => x.default);
      return parseArray(expectArray(propsObj, schema.properties.length), (x, i) => annotationPropertyTypeHandlers[propSpecs[i].type].deserializeJson(x));
    });
    const result = {
      id,
      description: verifyObjectProperty(obj, "description", verifyOptionalString),
      relatedSegments,
      properties,
      type
    };
    annotationTypeHandlers[type].restoreState(result, obj, schema.rank);
    return result;
  }
  class AnnotationSource extends RefCounted {
    constructor(rank, relationships = [], properties = []) {
      super();
      this.relationships = relationships;
      this.properties = properties;
      this.annotationMap = new Map();
      this.changed = new NullarySignal();
      this.readonly = false;
      this.childAdded = new Signal();
      this.childUpdated = new Signal();
      this.childDeleted = new Signal();
      this.pending = new Set();
      this.references = new Map();
      this.rank_ = rank;
      this.annotationPropertySerializer = new AnnotationPropertySerializer(rank, properties);
    }
    get rank() {
      return this.rank_;
    }
    add(annotation9, commit = true) {
      this.ensureUpdated();
      if (!annotation9.id) {
        annotation9.id = makeAnnotationId();
      } else if (this.annotationMap.has(annotation9.id)) {
        throw new Error(`Annotation id already exists: ${JSON.stringify(annotation9.id)}.`);
      }
      this.annotationMap.set(annotation9.id, annotation9);
      this.changed.dispatch();
      this.childAdded.dispatch(annotation9);
      if (!commit) {
        this.pending.add(annotation9.id);
      }
      return this.getReference(annotation9.id);
    }
    commit(reference) {
      this.ensureUpdated();
      const id = reference.id;
      this.pending.delete(id);
      this.changed.dispatch();
    }
    update(reference, annotation9) {
      this.ensureUpdated();
      if (reference.value === null) {
        throw new Error(`Annotation already deleted.`);
      }
      reference.value = annotation9;
      this.annotationMap.set(annotation9.id, annotation9);
      reference.changed.dispatch();
      this.changed.dispatch();
      this.childUpdated.dispatch(annotation9);
    }
    [Symbol.iterator]() {
      this.ensureUpdated();
      return this.annotationMap.values();
    }
    get(id) {
      this.ensureUpdated();
      return this.annotationMap.get(id);
    }
    delete(reference) {
      if (reference.value === null) {
        return;
      }
      reference.value = null;
      this.annotationMap.delete(reference.id);
      this.pending.delete(reference.id);
      reference.changed.dispatch();
      this.changed.dispatch();
      this.childDeleted.dispatch(reference.id);
    }
    getReference(id) {
      let existing = this.references.get(id);
      if (existing !== void 0) {
        return existing.addRef();
      }
      existing = new AnnotationReference(id);
      existing.value = this.annotationMap.get(id) || null;
      this.references.set(id, existing);
      existing.registerDisposer(() => {
        this.references.delete(id);
      });
      return existing;
    }
    ensureUpdated() {
    }
    toJSON() {
      this.ensureUpdated();
      const result = [];
      const {pending} = this;
      for (const annotation9 of this) {
        if (pending.has(annotation9.id)) {
          continue;
        }
        result.push(annotationToJson(annotation9, this));
      }
      return result;
    }
    clear() {
      this.annotationMap.clear();
      this.pending.clear();
      this.changed.dispatch();
    }
    restoreState(obj) {
      this.ensureUpdated();
      const {annotationMap} = this;
      annotationMap.clear();
      this.pending.clear();
      if (obj !== void 0) {
        parseArray(obj, (x) => {
          const annotation9 = restoreAnnotation(x, this);
          annotationMap.set(annotation9.id, annotation9);
        });
      }
      for (const reference of this.references.values()) {
        const {id} = reference;
        const value = annotationMap.get(id);
        reference.value = value || null;
        reference.changed.dispatch();
      }
      this.changed.dispatch();
    }
    reset() {
      this.clear();
    }
  }
  function makeAnnotationId() {
    return getRandomHexString(160);
  }
  function serializeAnnotations(allAnnotations, propertySerializer) {
    const {rank} = propertySerializer;
    let totalBytes = 0;
    const typeToOffset = [];
    const serializedPropertiesBytes = propertySerializer.serializedBytes;
    for (const annotationType of annotationTypes) {
      typeToOffset[annotationType] = totalBytes;
      const annotations = allAnnotations[annotationType];
      const count = annotations.length;
      const handler = annotationTypeHandlers[annotationType];
      totalBytes += (handler.serializedBytes(rank) + serializedPropertiesBytes) * count;
      totalBytes += (4 - totalBytes % 4) % 4;
    }
    const serializeProperties = propertySerializer.serialize;
    const typeToIds = [];
    const typeToIdMaps = [];
    const data = new ArrayBuffer(totalBytes);
    const dataView = new DataView(data);
    const isLittleEndian = ENDIANNESS === Endianness.LITTLE;
    for (const annotationType of annotationTypes) {
      const annotations = allAnnotations[annotationType];
      typeToIds[annotationType] = annotations.map((x) => x.id);
      typeToIdMaps[annotationType] = new Map(annotations.map((x, i) => [x.id, i]));
      const handler = annotationTypeHandlers[annotationType];
      const serialize = handler.serialize;
      const geometryBytes = handler.serializedBytes(rank);
      let offset = typeToOffset[annotationType];
      for (const annotation9 of annotations) {
        serialize(dataView, offset, isLittleEndian, rank, annotation9);
        offset += geometryBytes;
        serializeProperties(dataView, offset, isLittleEndian, annotation9.properties);
        offset += serializedPropertiesBytes;
      }
    }
    return {data: new Uint8Array(data), typeToIds, typeToOffset, typeToIdMaps};
  }
  class AnnotationSerializer {
    constructor(propertySerializer) {
      this.propertySerializer = propertySerializer;
      this.annotations = [[], [], [], []];
    }
    add(annotation9) {
      this.annotations[annotation9.type].push(annotation9);
    }
    serialize() {
      return serializeAnnotations(this.annotations, this.propertySerializer);
    }
  }
  function fixAnnotationAfterStructuredCloning(obj) {
    if (obj == null) {
      return obj;
    }
    const {relatedSegments} = obj;
    if (relatedSegments !== void 0) {
      for (let i = 0, numRelationships = relatedSegments.length; i < numRelationships; ++i) {
        const segments = relatedSegments[i];
        if (segments === void 0)
          continue;
        relatedSegments[i] = segments.map((x) => new Uint64(x.low, x.high));
      }
    }
    return obj;
  }

  // src/neuroglancer/annotation/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const ANNOTATION_METADATA_CHUNK_SOURCE_RPC_ID = "annotation.MetadataChunkSource";
  const ANNOTATION_SUBSET_GEOMETRY_CHUNK_SOURCE_RPC_ID = "annotation.SubsetGeometryChunkSource";
  const ANNOTATION_REFERENCE_ADD_RPC_ID = "annotation.reference.add";
  const ANNOTATION_REFERENCE_DELETE_RPC_ID = "annotation.reference.delete";
  const ANNOTATION_COMMIT_UPDATE_RPC_ID = "annotation.commit";
  const ANNOTATION_COMMIT_UPDATE_RESULT_RPC_ID = "annotation.commit";
  const ANNOTATION_SPATIALLY_INDEXED_RENDER_LAYER_RPC_ID = "annotation/SpatiallyIndexedRenderLayer";
  const ANNOTATION_PERSPECTIVE_RENDER_LAYER_UPDATE_SOURCES_RPC_ID = "annotation/PerspectiveRenderLayer:updateSources";
  const ANNOTATION_RENDER_LAYER_RPC_ID = "annotation/RenderLayer";
  const ANNOTATION_RENDER_LAYER_UPDATE_SEGMENTATION_RPC_ID = "annotation/RenderLayer.updateSegmentation";
  const tempMat32 = mat3_exports.create();
  function forEachVisibleAnnotationChunk(projectionParameters, localPosition, renderScaleTarget, transformedSources, beginScale, callback) {
    const {displayDimensionRenderInfo, viewMatrix, projectionMat, width, height} = projectionParameters;
    const {voxelPhysicalScales} = displayDimensionRenderInfo;
    const viewDet = mat3_exports.determinant(mat3FromMat4(tempMat32, viewMatrix));
    const canonicalToPhysicalScale = prod3(voxelPhysicalScales);
    const viewFrustrumVolume = getViewFrustrumVolume(projectionMat) / viewDet * canonicalToPhysicalScale;
    if (transformedSources.length === 0)
      return;
    const baseSource = transformedSources[0];
    let sourceVolume = baseSource.chunkLayout.detTransform * canonicalToPhysicalScale;
    const {lowerClipDisplayBound, upperClipDisplayBound} = baseSource;
    for (let i = 0; i < 3; ++i) {
      sourceVolume *= upperClipDisplayBound[i] - lowerClipDisplayBound[i];
    }
    const effectiveVolume = Math.min(sourceVolume, viewFrustrumVolume);
    const viewportArea = width * height;
    const targetNumAnnotations = viewportArea / renderScaleTarget ** 2;
    const physicalDensityTarget = targetNumAnnotations / effectiveVolume;
    let totalPhysicalDensity = 0;
    for (let scaleIndex = transformedSources.length - 1; scaleIndex >= 0 && totalPhysicalDensity < physicalDensityTarget; --scaleIndex) {
      const transformedSource = transformedSources[scaleIndex];
      const spec = transformedSource.source.spec;
      const {chunkLayout} = transformedSource;
      const physicalVolume = prod3(chunkLayout.size) * chunkLayout.detTransform * canonicalToPhysicalScale;
      const {limit, rank} = spec;
      const {nonDisplayLowerClipBound, nonDisplayUpperClipBound} = transformedSource;
      let sliceFraction = 1;
      for (let i = 0; i < rank; ++i) {
        const b = nonDisplayUpperClipBound[i] - nonDisplayLowerClipBound[i];
        if (Number.isFinite(b))
          sliceFraction /= b;
      }
      const physicalDensity = limit * sliceFraction / physicalVolume;
      let firstChunk = true;
      const newTotalPhysicalDensity = totalPhysicalDensity + physicalDensity;
      const totalPhysicalSpacing = Math.pow(1 / newTotalPhysicalDensity, 1 / 3);
      const totalPixelSpacing = Math.sqrt(viewportArea / (newTotalPhysicalDensity * effectiveVolume));
      const desiredCount = (physicalDensityTarget - totalPhysicalDensity) * physicalVolume / sliceFraction;
      const drawFraction = Math.min(1, desiredCount / spec.limit);
      forEachVisibleVolumetricChunk(projectionParameters, localPosition, transformedSource, () => {
        if (firstChunk) {
          beginScale(transformedSource, scaleIndex);
          firstChunk = false;
        }
        callback(transformedSource, scaleIndex, drawFraction, totalPhysicalSpacing, totalPixelSpacing);
      });
      totalPhysicalDensity = newTotalPhysicalDensity;
    }
  }

  // src/neuroglancer/util/disjoint_sets.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const rankSymbol = Symbol("disjoint_sets:rank");
  const parentSymbol = Symbol("disjoint_sets:parent");
  const nextSymbol = Symbol("disjoint_sets:next");
  const prevSymbol = Symbol("disjoint_sets:prev");
  function findRepresentative(v) {
    let old = v;
    let ancestor = v[parentSymbol];
    while (ancestor !== v) {
      v = ancestor;
      ancestor = v[parentSymbol];
    }
    v = old[parentSymbol];
    while (ancestor !== v) {
      old[parentSymbol] = ancestor;
      old = v;
      v = old[parentSymbol];
    }
    return ancestor;
  }
  function linkUnequalSetRepresentatives(i, j) {
    let iRank = i[rankSymbol];
    let jRank = j[rankSymbol];
    if (iRank > jRank) {
      j[parentSymbol] = i;
      return i;
    }
    i[parentSymbol] = j;
    if (iRank === jRank) {
      j[rankSymbol] = jRank + 1;
    }
    return j;
  }
  function spliceCircularLists(i, j) {
    let iPrev = i[prevSymbol];
    let jPrev = j[prevSymbol];
    j[prevSymbol] = iPrev;
    iPrev[nextSymbol] = j;
    i[prevSymbol] = jPrev;
    jPrev[nextSymbol] = i;
  }
  function* setElementIterator(i) {
    let j = i;
    do {
      yield j;
      j = j[nextSymbol];
    } while (j !== i);
  }
  function initializeElement(v) {
    v[parentSymbol] = v;
    v[rankSymbol] = 0;
    v[nextSymbol] = v[prevSymbol] = v;
  }
  const minSymbol = Symbol("disjoint_sets:min");
  function isRootElement(v) {
    return v[parentSymbol] === v;
  }
  class DisjointUint64Sets {
    constructor() {
      this.map = new Map();
      this.generation = 0;
    }
    get(x) {
      let key = x.toString();
      let element = this.map.get(key);
      if (element === void 0) {
        return x;
      }
      return findRepresentative(element)[minSymbol];
    }
    isMinElement(x) {
      let y = this.get(x);
      return y === x || Uint64.equal(y, x);
    }
    makeSet(x) {
      let key = x.toString();
      let {map} = this;
      let element = map.get(key);
      if (element === void 0) {
        element = x.clone();
        initializeElement(element);
        element[minSymbol] = element;
        map.set(key, element);
        return element;
      }
      return findRepresentative(element);
    }
    link(a, b) {
      a = this.makeSet(a);
      b = this.makeSet(b);
      if (a === b) {
        return false;
      }
      this.generation++;
      let newNode = linkUnequalSetRepresentatives(a, b);
      spliceCircularLists(a, b);
      let aMin = a[minSymbol];
      let bMin = b[minSymbol];
      newNode[minSymbol] = Uint64.less(aMin, bMin) ? aMin : bMin;
      return true;
    }
    *setElements(a) {
      let key = a.toString();
      let element = this.map.get(key);
      if (element === void 0) {
        yield a;
      } else {
        yield* setElementIterator(element);
      }
    }
    clear() {
      let {map} = this;
      if (map.size === 0) {
        return false;
      }
      ++this.generation;
      map.clear();
      return true;
    }
    get size() {
      return this.map.size;
    }
    *mappings(temp = new Array(2)) {
      for (let element of this.map.values()) {
        temp[0] = element;
        temp[1] = findRepresentative(element)[minSymbol];
        yield temp;
      }
    }
    [Symbol.iterator]() {
      return this.mappings();
    }
    toJSON() {
      let sets = new Array();
      for (let element of this.map.values()) {
        if (isRootElement(element)) {
          let members = new Array();
          for (let member of setElementIterator(element)) {
            members.push(member);
          }
          members.sort(Uint64.compare);
          sets.push(members);
        }
      }
      sets.sort((a, b) => Uint64.compare(a[0], b[0]));
      return sets.map((set6) => set6.map((element) => element.toString()));
    }
  }

  // src/neuroglancer/shared_disjoint_sets.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const RPC_TYPE_ID = "DisjointUint64Sets";
  const ADD_METHOD_ID = "DisjointUint64Sets.add";
  const CLEAR_METHOD_ID = "DisjointUint64Sets.clear";
  let SharedDisjointUint64Sets = class extends SharedObjectCounterpart {
    constructor() {
      super(...arguments);
      this.disjointSets = new DisjointUint64Sets();
      this.changed = new NullarySignal();
    }
    get value() {
      return this;
    }
    static makeWithCounterpart(rpc2) {
      let obj = new this();
      obj.initializeCounterpart(rpc2);
      return obj;
    }
    disposed() {
      this.disjointSets = void 0;
      this.changed = void 0;
      super.disposed();
    }
    link(a, b) {
      if (this.disjointSets.link(a, b)) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke(ADD_METHOD_ID, {id: this.rpcId, al: a.low, ah: a.high, bl: b.low, bh: b.high});
        }
        this.changed.dispatch();
      }
    }
    get(x) {
      return this.disjointSets.get(x);
    }
    clear() {
      if (this.disjointSets.clear()) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke(CLEAR_METHOD_ID, {id: this.rpcId});
        }
        this.changed.dispatch();
      }
    }
    setElements(a) {
      return this.disjointSets.setElements(a);
    }
    get size() {
      return this.disjointSets.size;
    }
    toJSON() {
      return this.disjointSets.toJSON();
    }
    restoreState(obj) {
      if (obj !== void 0) {
        let ids = [new Uint64(), new Uint64()];
        parseArray(obj, (z) => {
          parseArray(z, (s, index2) => {
            ids[index2 % 2].parseString(String(s), 10);
            if (index2 !== 0) {
              this.link(ids[0], ids[1]);
            }
          });
        });
      }
    }
    assignFrom(other) {
      this.clear();
      this.restoreState(other.toJSON());
    }
  };
  SharedDisjointUint64Sets = __decorate([
    registerSharedObject(RPC_TYPE_ID)
  ], SharedDisjointUint64Sets);
  const tempA = new Uint64();
  const tempB = new Uint64();
  registerRPC(ADD_METHOD_ID, function(x) {
    let obj = this.get(x["id"]);
    tempA.low = x["al"];
    tempA.high = x["ah"];
    tempB.low = x["bl"];
    tempB.high = x["bh"];
    if (obj.disjointSets.link(tempA, tempB)) {
      obj.changed.dispatch();
    }
  });
  registerRPC(CLEAR_METHOD_ID, function(x) {
    let obj = this.get(x["id"]);
    if (obj.disjointSets.clear()) {
      obj.changed.dispatch();
    }
  });

  // src/neuroglancer/gpu_hash/hash_function.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const k1 = 3432918353;
  const k2 = 461845907;
  function hashCombine(state, value) {
    value >>>= 0;
    state >>>= 0;
    value = Math.imul(value, k1) >>> 0;
    value = (value << 15 | value >>> 17) >>> 0;
    value = Math.imul(value, k2) >>> 0;
    state = (state ^ value) >>> 0;
    state = (state << 13 | state >>> 19) >>> 0;
    state = state * 5 + 3864292196 >>> 0;
    return state;
  }

  // src/neuroglancer/gpu_hash/hash_table.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const NUM_ALTERNATIVES = 3;
  const DEFAULT_LOAD_FACTOR = 0.9;
  const DEBUG3 = false;
  let pendingLow = 0;
  let pendingHigh = 0;
  let backupPendingLow = 0;
  let backupPendingHigh = 0;
  class HashTableBase {
    constructor(hashSeeds = HashTableBase.generateHashSeeds(NUM_ALTERNATIVES)) {
      this.hashSeeds = hashSeeds;
      this.loadFactor = DEFAULT_LOAD_FACTOR;
      this.size = 0;
      this.emptyLow = 4294967295;
      this.emptyHigh = 4294967295;
      this.maxRehashAttempts = 5;
      this.maxAttempts = 5;
      this.generation = 0;
      this.mungedEmptyKey = -1;
      let initialSize = 8;
      while (initialSize < 2 * hashSeeds.length) {
        initialSize *= 2;
      }
      this.allocate(initialSize);
    }
    updateHashFunctions(numHashes) {
      this.hashSeeds = HashTableBase.generateHashSeeds(numHashes);
      this.mungedEmptyKey = -1;
    }
    tableWithMungedEmptyKey(callback) {
      const numHashes = this.hashSeeds.length;
      const emptySlots = new Array(numHashes);
      for (let i = 0; i < numHashes; ++i) {
        emptySlots[i] = this.getHash(i, this.emptyLow, this.emptyHigh);
      }
      let {mungedEmptyKey} = this;
      if (mungedEmptyKey === -1) {
        chooseMungedEmptyKey:
          while (true) {
            mungedEmptyKey = Math.random() * 16777216 >>> 0;
            for (let i = 0; i < numHashes; ++i) {
              let h = this.getHash(i, mungedEmptyKey, mungedEmptyKey);
              for (let j = 0; j < numHashes; ++j) {
                if (emptySlots[j] === h) {
                  continue chooseMungedEmptyKey;
                }
              }
            }
            this.mungedEmptyKey = mungedEmptyKey;
            break;
          }
      }
      let {table, emptyLow, emptyHigh} = this;
      for (let i = 0; i < numHashes; ++i) {
        let h = emptySlots[i];
        if (table[h] === emptyLow && table[h + 1] === emptyHigh) {
          table[h] = mungedEmptyKey;
          table[h + 1] = mungedEmptyKey;
        }
      }
      try {
        callback(table);
      } finally {
        for (let i = 0; i < numHashes; ++i) {
          let h = emptySlots[i];
          if (table[h] === mungedEmptyKey && table[h + 1] === mungedEmptyKey) {
            table[h] = emptyLow;
            table[h + 1] = emptyHigh;
          }
        }
      }
    }
    static generateHashSeeds(numAlternatives = NUM_ALTERNATIVES) {
      return getRandomValues(new Uint32Array(numAlternatives));
    }
    getHash(hashIndex, low, high) {
      let hash2 = this.hashSeeds[hashIndex];
      hash2 = hashCombine(hash2, low);
      hash2 = hashCombine(hash2, high);
      return this.entryStride * (hash2 & this.tableSize - 1);
    }
    *keys(temp = new Uint64()) {
      let {emptyLow, emptyHigh, entryStride} = this;
      let {table} = this;
      for (let i = 0, length4 = table.length; i < length4; i += entryStride) {
        let low = table[i], high = table[i + 1];
        if (low !== emptyLow || high !== emptyHigh) {
          temp.low = low;
          temp.high = high;
          yield temp;
        }
      }
    }
    indexOfPair(low, high) {
      let {table, emptyLow, emptyHigh} = this;
      if (low === emptyLow && high === emptyHigh) {
        return -1;
      }
      for (let i = 0, numHashes = this.hashSeeds.length; i < numHashes; ++i) {
        let h = this.getHash(i, low, high);
        if (table[h] === low && table[h + 1] === high) {
          return h;
        }
      }
      return -1;
    }
    indexOf(x) {
      return this.indexOfPair(x.low, x.high);
    }
    chooseAnotherEmptyKey() {
      let {emptyLow, emptyHigh, table, entryStride} = this;
      let newLow, newHigh;
      while (true) {
        newLow = Math.random() * 4294967296 >>> 0;
        newHigh = Math.random() * 4294967296 >>> 0;
        if (newLow === emptyLow && newHigh === emptyHigh) {
          continue;
        }
        if (this.hasPair(newLow, newHigh)) {
          continue;
        }
        break;
      }
      this.emptyLow = newLow;
      this.emptyHigh = newHigh;
      for (let h = 0, length4 = table.length; h < length4; h += entryStride) {
        if (table[h] === emptyLow && table[h + 1] === emptyHigh) {
          table[h] = newLow;
          table[h + 1] = newHigh;
        }
      }
    }
    has(x) {
      return this.indexOf(x) !== -1;
    }
    hasPair(low, high) {
      return this.indexOfPair(low, high) !== -1;
    }
    delete(x) {
      let index2 = this.indexOf(x);
      if (index2 !== -1) {
        let {table} = this;
        table[index2] = this.emptyLow;
        table[index2 + 1] = this.emptyHigh;
        ++this.generation;
        this.size--;
        return true;
      }
      return false;
    }
    clearTable() {
      let {table, entryStride, emptyLow, emptyHigh} = this;
      let length4 = table.length;
      for (let h = 0; h < length4; h += entryStride) {
        table[h] = emptyLow;
        table[h + 1] = emptyHigh;
      }
    }
    clear() {
      if (this.size === 0) {
        return false;
      }
      this.size = 0;
      ++this.generation;
      this.clearTable();
      return true;
    }
    swapPending(table, offset) {
      let tempLow = pendingLow, tempHigh = pendingHigh;
      this.storePending(table, offset);
      table[offset] = tempLow;
      table[offset + 1] = tempHigh;
    }
    storePending(table, offset) {
      pendingLow = table[offset];
      pendingHigh = table[offset + 1];
    }
    backupPending() {
      backupPendingLow = pendingLow;
      backupPendingHigh = pendingHigh;
    }
    restorePending() {
      pendingLow = backupPendingLow;
      pendingHigh = backupPendingHigh;
    }
    tryToInsert() {
      if (DEBUG3) {
        console.log(`tryToInsert: ${pendingLow}, ${pendingHigh}`);
      }
      let attempt = 0;
      let {emptyLow, emptyHigh, maxAttempts, table} = this;
      let numHashes = this.hashSeeds.length;
      let tableIndex = Math.floor(Math.random() * numHashes);
      while (true) {
        let h = this.getHash(tableIndex, pendingLow, pendingHigh);
        this.swapPending(table, h);
        if (pendingLow === emptyLow && pendingHigh === emptyHigh) {
          return true;
        }
        if (++attempt === maxAttempts) {
          break;
        }
        tableIndex = (tableIndex + Math.floor(Math.random() * (numHashes - 1)) + 1) % numHashes;
      }
      return false;
    }
    allocate(tableSize) {
      this.tableSize = tableSize;
      let {entryStride} = this;
      this.table = new Uint32Array(tableSize * entryStride);
      this.maxAttempts = tableSize;
      this.clearTable();
      this.capacity = tableSize * this.loadFactor;
      this.mungedEmptyKey = -1;
    }
    rehash(oldTable, tableSize) {
      if (DEBUG3) {
        console.log("rehash begin");
      }
      this.allocate(tableSize);
      this.updateHashFunctions(this.hashSeeds.length);
      let {emptyLow, emptyHigh, entryStride} = this;
      for (let h = 0, length4 = oldTable.length; h < length4; h += entryStride) {
        let low = oldTable[h], high = oldTable[h + 1];
        if (low !== emptyLow || high !== emptyHigh) {
          this.storePending(oldTable, h);
          if (!this.tryToInsert()) {
            if (DEBUG3) {
              console.log("rehash failed");
            }
            return false;
          }
        }
      }
      if (DEBUG3) {
        console.log("rehash end");
      }
      return true;
    }
    grow(desiredTableSize) {
      if (DEBUG3) {
        console.log(`grow: ${desiredTableSize}`);
      }
      let oldTable = this.table;
      let {tableSize} = this;
      while (tableSize < desiredTableSize) {
        tableSize *= 2;
      }
      while (true) {
        for (let rehashAttempt = 0; rehashAttempt < this.maxRehashAttempts; ++rehashAttempt) {
          if (this.rehash(oldTable, tableSize)) {
            if (DEBUG3) {
              console.log(`grow end`);
            }
            return;
          }
        }
        tableSize *= 2;
      }
    }
    insertInternal() {
      ++this.generation;
      if (pendingLow === this.emptyLow && pendingHigh === this.emptyHigh) {
        this.chooseAnotherEmptyKey();
      }
      if (++this.size > this.capacity) {
        this.backupPending();
        this.grow(this.tableSize * 2);
        this.restorePending();
      }
      while (!this.tryToInsert()) {
        this.backupPending();
        this.grow(this.tableSize);
        this.restorePending();
      }
    }
  }
  class HashSetUint64 extends HashTableBase {
    add(x) {
      let {low, high} = x;
      if (this.hasPair(low, high)) {
        return false;
      }
      if (DEBUG3) {
        console.log(`add: ${low},${high}`);
      }
      pendingLow = low;
      pendingHigh = high;
      this.insertInternal();
      return true;
    }
    [Symbol.iterator]() {
      return this.keys();
    }
  }
  HashSetUint64.prototype.entryStride = 2;
  let pendingValueLow = 0;
  let pendingValueHigh = 0;
  let backupPendingValueLow = 0;
  let backupPendingValueHigh = 0;
  class HashMapUint64 extends HashTableBase {
    set(key, value) {
      let {low, high} = key;
      if (this.hasPair(low, high)) {
        return false;
      }
      if (DEBUG3) {
        console.log(`add: ${low},${high} -> ${value.low},${value.high}`);
      }
      pendingLow = low;
      pendingHigh = high;
      pendingValueLow = value.low;
      pendingValueHigh = value.high;
      this.insertInternal();
      return true;
    }
    get(key, value) {
      let h = this.indexOf(key);
      if (h === -1) {
        return false;
      }
      let {table} = this;
      value.low = table[h + 2];
      value.high = table[h + 3];
      return true;
    }
    swapPending(table, offset) {
      let tempLow = pendingValueLow, tempHigh = pendingValueHigh;
      super.swapPending(table, offset);
      table[offset + 2] = tempLow;
      table[offset + 3] = tempHigh;
    }
    storePending(table, offset) {
      super.storePending(table, offset);
      pendingValueLow = table[offset + 2];
      pendingValueHigh = table[offset + 3];
    }
    backupPending() {
      super.backupPending();
      backupPendingValueLow = pendingValueLow;
      backupPendingValueHigh = pendingValueHigh;
    }
    restorePending() {
      super.restorePending();
      pendingValueLow = backupPendingValueLow;
      pendingValueHigh = backupPendingValueHigh;
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    *entries(temp = [new Uint64(), new Uint64()]) {
      let {emptyLow, emptyHigh, entryStride} = this;
      let {table} = this;
      let [key, value] = temp;
      for (let i = 0, length4 = table.length; i < length4; i += entryStride) {
        let low = table[i], high = table[i + 1];
        if (low !== emptyLow || high !== emptyHigh) {
          key.low = low;
          key.high = high;
          value.low = table[i + 2];
          value.high = table[i + 3];
          yield temp;
        }
      }
    }
  }
  HashMapUint64.prototype.entryStride = 4;

  // src/neuroglancer/uint64_set.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let Uint64Set = class extends SharedObjectCounterpart {
    constructor() {
      super(...arguments);
      this.hashTable = new HashSetUint64();
      this.changed = new Signal();
    }
    get value() {
      return this;
    }
    static makeWithCounterpart(rpc2) {
      let obj = new Uint64Set();
      obj.initializeCounterpart(rpc2);
      return obj;
    }
    set(x, value) {
      if (!value) {
        this.delete(x);
      } else {
        this.add(x);
      }
    }
    add_(x) {
      return this.hashTable.add(x);
    }
    add(x) {
      if (this.add_(x)) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Set.add", {id: this.rpcId, value: x});
        }
        this.changed.dispatch(x, true);
      }
    }
    has(x) {
      return this.hashTable.has(x);
    }
    [Symbol.iterator]() {
      return this.hashTable.keys();
    }
    delete_(x) {
      return this.hashTable.delete(x);
    }
    delete(x) {
      if (this.delete_(x)) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Set.delete", {id: this.rpcId, value: x});
        }
        this.changed.dispatch(x, false);
      }
    }
    get size() {
      return this.hashTable.size;
    }
    clear() {
      if (this.hashTable.clear()) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Set.clear", {id: this.rpcId});
        }
        this.changed.dispatch(null, false);
      }
    }
    toJSON() {
      let result = new Array();
      for (let id of this) {
        result.push(id.toString());
      }
      result.sort();
      return result;
    }
    assignFrom(other) {
      this.clear();
      for (const key of other) {
        this.add(key);
      }
    }
  };
  Uint64Set = __decorate([
    registerSharedObject("Uint64Set")
  ], Uint64Set);
  registerRPC("Uint64Set.add", function(x) {
    let obj = this.get(x["id"]);
    if (obj.add_(x["value"])) {
      obj.changed.dispatch();
    }
  });
  registerRPC("Uint64Set.delete", function(x) {
    let obj = this.get(x["id"]);
    if (obj.delete_(x["value"])) {
      obj.changed.dispatch();
    }
  });
  registerRPC("Uint64Set.clear", function(x) {
    let obj = this.get(x["id"]);
    if (obj.hashTable.clear()) {
      obj.changed.dispatch();
    }
  });

  // src/neuroglancer/uint64_map.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let Uint64Map = class extends SharedObjectCounterpart {
    constructor() {
      super(...arguments);
      this.hashTable = new HashMapUint64();
      this.changed = new Signal();
    }
    get value() {
      return this;
    }
    static makeWithCounterpart(rpc2) {
      let obj = new Uint64Map();
      obj.initializeCounterpart(rpc2);
      return obj;
    }
    set_(key, value) {
      return this.hashTable.set(key, value);
    }
    set(key, value) {
      if (this.set_(key, value)) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Map.set", {id: this.rpcId, key, value});
        }
        this.changed.dispatch(key, true);
      }
    }
    has(key) {
      return this.hashTable.has(key);
    }
    get(key, value) {
      return this.hashTable.get(key, value);
    }
    [Symbol.iterator]() {
      return this.hashTable.entries();
    }
    delete_(key) {
      return this.hashTable.delete(key);
    }
    delete(key) {
      if (this.delete_(key)) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Map.delete", {id: this.rpcId, key});
        }
        this.changed.dispatch(key, false);
      }
    }
    get size() {
      return this.hashTable.size;
    }
    assignFrom(other) {
      this.clear();
      for (const [key, value] of other) {
        this.set(key, value);
      }
    }
    clear() {
      if (this.hashTable.clear()) {
        let {rpc: rpc2} = this;
        if (rpc2) {
          rpc2.invoke("Uint64Map.clear", {id: this.rpcId});
        }
        this.changed.dispatch(null, false);
      }
    }
    toJSON() {
      let result = {};
      for (let [key, value] of this.hashTable.entries()) {
        result[key.toString()] = value.toString();
      }
      return result;
    }
  };
  Uint64Map = __decorate([
    registerSharedObject("Uint64Map")
  ], Uint64Map);
  registerRPC("Uint64Map.set", function(x) {
    let obj = this.get(x["id"]);
    if (obj.set_(x["key"], x["value"])) {
      obj.changed.dispatch();
    }
  });
  registerRPC("Uint64Map.delete", function(x) {
    let obj = this.get(x["id"]);
    if (obj.delete_(x["key"])) {
      obj.changed.dispatch();
    }
  });
  registerRPC("Uint64Map.clear", function(x) {
    let obj = this.get(x["id"]);
    if (obj.hashTable.clear()) {
      obj.changed.dispatch();
    }
  });

  // src/neuroglancer/segmentation_display_state/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const VISIBLE_SEGMENTS_STATE_PROPERTIES = [
    "visibleSegments",
    "segmentEquivalences"
  ];
  function onVisibleSegmentsStateChanged(context2, state, callback) {
    context2.registerDisposer(state.visibleSegments.changed.add(callback));
    context2.registerDisposer(state.segmentEquivalences.changed.add(callback));
  }
  function getObjectKey(objectId) {
    return `${objectId.low},${objectId.high}`;
  }
  function getVisibleSegments(state) {
    return state.visibleSegments;
  }
  function getSegmentEquivalences(state) {
    return state.segmentEquivalences;
  }
  function forEachVisibleSegment(state, callback) {
    const visibleSegments = getVisibleSegments(state);
    const segmentEquivalences = getSegmentEquivalences(state);
    for (let rootObjectId of visibleSegments) {
      if (segmentEquivalences.disjointSets === void 0 || !segmentEquivalences.disjointSets.isMinElement(rootObjectId)) {
        continue;
      }
      for (let objectId of segmentEquivalences.setElements(rootObjectId)) {
        callback(objectId, rootObjectId);
      }
    }
  }

  // src/neuroglancer/segmentation_display_state/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function receiveVisibleSegmentsState(rpc2, options, target = {}) {
    for (const property of VISIBLE_SEGMENTS_STATE_PROPERTIES) {
      target[property] = rpc2.get(options[property]);
    }
    return target;
  }
  const withSegmentationLayerBackendState = (Base) => class SegmentationLayerState extends Base {
    constructor(...args) {
      const [rpc2, options] = args;
      super(rpc2, options);
      receiveVisibleSegmentsState(rpc2, options, this);
      this.transform = rpc2.get(options["transform"]);
      this.renderScaleTarget = rpc2.get(options["renderScaleTarget"]);
      const scheduleUpdateChunkPriorities = () => {
        this.chunkManager.scheduleUpdateChunkPriorities();
      };
      onVisibleSegmentsStateChanged(this, this, scheduleUpdateChunkPriorities);
      this.registerDisposer(this.transform.changed.add(scheduleUpdateChunkPriorities));
      this.registerDisposer(this.renderScaleTarget.changed.add(scheduleUpdateChunkPriorities));
    }
  };
  class IndexedSegmentPropertySourceBackend extends ChunkSource {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.properties = options.properties;
    }
  }

  // src/neuroglancer/annotation/backend.ts
  /**
   * @license
   * Copyright 2018 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const ANNOTATION_METADATA_CHUNK_PRIORITY = 200;
  const ANNOTATION_SEGMENT_FILTERED_CHUNK_PRIORITY = 60;
  class AnnotationMetadataChunk extends Chunk {
    freeSystemMemory() {
      this.annotation = void 0;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      msg.annotation = this.annotation;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = this.gpuMemoryBytes = 0;
      super.downloadSucceeded();
    }
  }
  class AnnotationGeometryData {
    serialize(msg, transfers) {
      msg.data = this.data;
      msg.typeToOffset = this.typeToOffset;
      msg.typeToIds = this.typeToIds;
      msg.typeToIdMaps = this.typeToIdMaps;
      transfers.push(this.data.buffer);
    }
    get numBytes() {
      return this.data.byteLength;
    }
  }
  function GeometryChunkMixin(Base) {
    class C extends Base {
      serialize(msg, transfers) {
        super.serialize(msg, transfers);
        const {data} = this;
        if (data !== void 0) {
          data.serialize(msg, transfers);
          this.data = void 0;
        }
      }
      downloadSucceeded() {
        const {data} = this;
        this.systemMemoryBytes = this.gpuMemoryBytes = data === void 0 ? 0 : data.numBytes;
        super.downloadSucceeded();
      }
      freeSystemMemory() {
        this.data = void 0;
      }
    }
    return C;
  }
  class AnnotationGeometryChunk extends GeometryChunkMixin(SliceViewChunk) {
  }
  class AnnotationSubsetGeometryChunk extends GeometryChunkMixin(Chunk) {
  }
  let AnnotationMetadataChunkSource = class extends ChunkSource {
    constructor() {
      super(...arguments);
      this.parent = void 0;
    }
    getChunk(id) {
      const {chunks} = this;
      let chunk = chunks.get(id);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(AnnotationMetadataChunk);
        chunk.initialize(id);
        this.addChunk(chunk);
      }
      return chunk;
    }
    download(chunk, cancellationToken) {
      return this.parent.downloadMetadata(chunk, cancellationToken);
    }
  };
  AnnotationMetadataChunkSource = __decorate([
    registerSharedObject(ANNOTATION_METADATA_CHUNK_SOURCE_RPC_ID)
  ], AnnotationMetadataChunkSource);
  class AnnotationGeometryChunkSourceBackend extends SliceViewChunkSourceBackend {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.parent = rpc2.get(options.parent);
    }
  }
  AnnotationGeometryChunkSourceBackend.prototype.chunkConstructor = AnnotationGeometryChunk;
  let AnnotationSubsetGeometryChunkSource = class extends ChunkSource {
    constructor() {
      super(...arguments);
      this.parent = void 0;
    }
    getChunk(objectId) {
      const key = getObjectKey(objectId);
      const {chunks} = this;
      let chunk = chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(AnnotationSubsetGeometryChunk);
        chunk.initialize(key);
        chunk.objectId = objectId.clone();
        this.addChunk(chunk);
      }
      return chunk;
    }
    download(chunk, cancellationToken) {
      return this.parent.downloadSegmentFilteredGeometry(chunk, this.relationshipIndex, cancellationToken);
    }
  };
  AnnotationSubsetGeometryChunkSource = __decorate([
    registerSharedObject(ANNOTATION_SUBSET_GEOMETRY_CHUNK_SOURCE_RPC_ID)
  ], AnnotationSubsetGeometryChunkSource);
  class AnnotationSource2 extends SharedObjectCounterpart {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.references = new Set();
      const chunkManager = this.chunkManager = rpc2.get(options.chunkManager);
      const metadataChunkSource = this.metadataChunkSource = this.registerDisposer(rpc2.getRef(options.metadataChunkSource));
      this.segmentFilteredSources = options.segmentFilteredSource.map((x, i) => {
        const source = this.registerDisposer(rpc2.getRef(x));
        source.parent = this;
        source.relationshipIndex = i;
        return source;
      });
      metadataChunkSource.parent = this;
      this.registerDisposer(chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
    }
    recomputeChunkPriorities() {
      const {chunkManager, metadataChunkSource} = this;
      for (const id of this.references) {
        chunkManager.requestChunk(metadataChunkSource.getChunk(id), ChunkPriorityTier.VISIBLE, ANNOTATION_METADATA_CHUNK_PRIORITY);
      }
    }
    add(annotation9) {
      annotation9;
      throw new Error("Not implemented");
    }
    delete(id) {
      id;
      throw new Error("Not implemented");
    }
    update(id, newAnnotation) {
      id;
      newAnnotation;
      throw new Error("Not implemented");
    }
  }
  registerRPC(ANNOTATION_REFERENCE_ADD_RPC_ID, function(x) {
    const obj = this.get(x.id);
    obj.references.add(x.annotation);
    obj.chunkManager.scheduleUpdateChunkPriorities();
  });
  registerRPC(ANNOTATION_REFERENCE_DELETE_RPC_ID, function(x) {
    const obj = this.get(x.id);
    obj.references.delete(x.annotation);
    obj.chunkManager.scheduleUpdateChunkPriorities();
  });
  registerRPC(ANNOTATION_COMMIT_UPDATE_RPC_ID, function(x) {
    const obj = this.get(x.id);
    const annotationId = x.annotationId;
    const newAnnotation = fixAnnotationAfterStructuredCloning(x.newAnnotation);
    let promise;
    if (annotationId === void 0) {
      promise = obj.add(newAnnotation).then((id) => ({...newAnnotation, id}));
    } else if (newAnnotation === null) {
      promise = obj.delete(annotationId).then(() => null);
    } else {
      promise = obj.update(annotationId, newAnnotation).then(() => newAnnotation);
    }
    promise.then((result) => {
      if (!obj.wasDisposed) {
        this.invoke(ANNOTATION_COMMIT_UPDATE_RESULT_RPC_ID, {
          id: obj.rpcId,
          annotationId: annotationId || newAnnotation.id,
          newAnnotation: result
        });
      }
    }, (error) => {
      if (!obj.wasDisposed) {
        this.invoke(ANNOTATION_COMMIT_UPDATE_RESULT_RPC_ID, {
          id: obj.rpcId,
          annotationId: annotationId || newAnnotation && newAnnotation.id,
          error: error.message
        });
      }
    });
  });
  let AnnotationSpatiallyIndexedRenderLayerBackend = class extends withChunkManager(RenderLayerBackend) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.renderScaleTarget = rpc2.get(options.renderScaleTarget);
      this.localPosition = rpc2.get(options.localPosition);
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      this.registerDisposer(this.localPosition.changed.add(scheduleUpdateChunkPriorities));
      this.registerDisposer(this.renderScaleTarget.changed.add(scheduleUpdateChunkPriorities));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
    }
    attach(attachment) {
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      const {view} = attachment;
      attachment.registerDisposer(scheduleUpdateChunkPriorities);
      attachment.registerDisposer(view.projectionParameters.changed.add(scheduleUpdateChunkPriorities));
      attachment.registerDisposer(view.visibility.changed.add(scheduleUpdateChunkPriorities));
      attachment.state = {
        displayDimensionRenderInfo: view.projectionParameters.value.displayDimensionRenderInfo,
        transformedSources: []
      };
    }
    recomputeChunkPriorities() {
      this.chunkManager.registerLayer(this);
      for (const attachment of this.attachments.values()) {
        const {view} = attachment;
        const visibility = view.visibility.value;
        if (visibility === Number.NEGATIVE_INFINITY) {
          continue;
        }
        const {transformedSources, displayDimensionRenderInfo} = attachment.state;
        if (transformedSources.length === 0 || displayDimensionRenderInfo !== view.projectionParameters.value.displayDimensionRenderInfo) {
          continue;
        }
        const priorityTier = getPriorityTier(visibility);
        const basePriority = getBasePriority(visibility);
        const projectionParameters = view.projectionParameters.value;
        const {chunkManager} = this;
        forEachVisibleAnnotationChunk(projectionParameters, this.localPosition.value, this.renderScaleTarget.value, transformedSources[0], () => {
        }, (tsource, scaleIndex) => {
          const chunk = tsource.source.getChunk(tsource.curPositionInChunks);
          ++this.numVisibleChunksNeeded;
          if (chunk.state === ChunkState.GPU_MEMORY) {
            ++this.numVisibleChunksAvailable;
          }
          let priority = 0;
          chunkManager.requestChunk(chunk, priorityTier, basePriority + priority + SCALE_PRIORITY_MULTIPLIER * scaleIndex);
        });
      }
    }
  };
  AnnotationSpatiallyIndexedRenderLayerBackend = __decorate([
    registerSharedObject(ANNOTATION_SPATIALLY_INDEXED_RENDER_LAYER_RPC_ID)
  ], AnnotationSpatiallyIndexedRenderLayerBackend);
  registerRPC(ANNOTATION_PERSPECTIVE_RENDER_LAYER_UPDATE_SOURCES_RPC_ID, function(x) {
    const view = this.get(x.view);
    const layer = this.get(x.layer);
    const attachment = layer.attachments.get(view);
    attachment.state.transformedSources = deserializeTransformedSources(this, x.sources, layer);
    attachment.state.displayDimensionRenderInfo = attachment.view.projectionParameters.value.displayDimensionRenderInfo;
    layer.chunkManager.scheduleUpdateChunkPriorities();
  });
  let AnnotationLayerSharedObjectCounterpart = class extends withSharedVisibility(withChunkManager(ChunkRenderLayerBackend)) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.source = rpc2.get(options.source);
      this.segmentationStates = new WatchableValue(this.getSegmentationState(options.segmentationStates));
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      this.registerDisposer(registerNested((context2, states) => {
        if (states === void 0)
          return;
        for (const state of states) {
          if (state == null)
            continue;
          onVisibleSegmentsStateChanged(context2, state, scheduleUpdateChunkPriorities);
        }
        scheduleUpdateChunkPriorities();
      }, this.segmentationStates));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => this.recomputeChunkPriorities()));
    }
    recomputeChunkPriorities() {
      const visibility = this.visibility.value;
      if (visibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      const {segmentationStates: {value: states}, source: {segmentFilteredSources}} = this;
      if (states === void 0)
        return;
      const {chunkManager} = this;
      chunkManager.registerLayer(this);
      const numRelationships = states.length;
      for (let i = 0; i < numRelationships; ++i) {
        const state = states[i];
        if (state == null) {
          continue;
        }
        const priorityTier = getPriorityTier(visibility);
        const basePriority = getBasePriority(visibility);
        const source = segmentFilteredSources[i];
        forEachVisibleSegment(state, (objectId) => {
          const chunk = source.getChunk(objectId);
          ++this.numVisibleChunksNeeded;
          if (chunk.state === ChunkState.GPU_MEMORY) {
            ++this.numVisibleChunksAvailable;
          }
          chunkManager.requestChunk(chunk, priorityTier, basePriority + ANNOTATION_SEGMENT_FILTERED_CHUNK_PRIORITY);
        });
      }
    }
    getSegmentationState(msg) {
      if (msg === void 0)
        return void 0;
      return msg.map((x) => {
        if (x == null) {
          return x;
        }
        return receiveVisibleSegmentsState(this.rpc, x);
      });
    }
  };
  AnnotationLayerSharedObjectCounterpart = __decorate([
    registerSharedObject(ANNOTATION_RENDER_LAYER_RPC_ID)
  ], AnnotationLayerSharedObjectCounterpart);
  registerRPC(ANNOTATION_RENDER_LAYER_UPDATE_SEGMENTATION_RPC_ID, function(x) {
    const obj = this.get(x.id);
    obj.segmentationStates.value = obj.getSegmentationState(x.segmentationStates);
  });

  // src/neuroglancer/credentials_provider/index.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class CredentialsProvider extends RefCounted {
  }
  function makeCachedCredentialsGetter(getUncached) {
    let cachedCredentials;
    let pendingCredentials;
    let pendingCancellationToken;
    return (invalidCredentials, cancellationToken) => {
      if (pendingCredentials !== void 0 && (cachedCredentials === void 0 || invalidCredentials === void 0 || cachedCredentials.generation !== invalidCredentials.generation)) {
        if (cachedCredentials === void 0) {
          pendingCancellationToken.addConsumer(cancellationToken);
        }
        return pendingCredentials;
      }
      cachedCredentials = void 0;
      pendingCancellationToken = new MultipleConsumerCancellationTokenSource();
      pendingCredentials = getUncached(invalidCredentials, pendingCancellationToken).then((credentials) => {
        cachedCredentials = credentials;
        pendingCancellationToken = void 0;
        return credentials;
      }, (reason) => {
        if (pendingCancellationToken.isCanceled) {
          pendingCancellationToken = void 0;
          pendingCredentials = void 0;
        }
        throw reason;
      });
      return pendingCredentials;
    };
  }
  function makeCredentialsGetter(getWithoutGeneration) {
    let generation = 0;
    return makeCachedCredentialsGetter((_invalidCredentials, cancellationToken) => getWithoutGeneration(cancellationToken).then((credentials) => ({generation: ++generation, credentials})));
  }
  class CachingCredentialsManager extends RefCounted {
    constructor(base39) {
      super();
      this.base = base39;
      this.memoize = new StringMemoize();
    }
    getCredentialsProvider(key, parameters) {
      return this.memoize.get({key, parameters}, () => this.registerDisposer(this.base.getCredentialsProvider(key, parameters).addRef()));
    }
  }

  // src/neuroglancer/credentials_provider/shared_common.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const CREDENTIALS_PROVIDER_RPC_ID = "CredentialsProvider";
  const CREDENTIALS_PROVIDER_GET_RPC_ID = "CredentialsProvider.get";

  // src/neuroglancer/credentials_provider/shared_counterpart.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let SharedCredentialsProviderCounterpart = class extends SharedObjectCounterpart {
    constructor() {
      super(...arguments);
      this.get = makeCachedCredentialsGetter((invalidCredentials, cancellationToken) => this.rpc.promiseInvoke(CREDENTIALS_PROVIDER_GET_RPC_ID, {providerId: this.rpcId, invalidCredentials}, cancellationToken));
    }
  };
  SharedCredentialsProviderCounterpart = __decorate([
    registerSharedObject(CREDENTIALS_PROVIDER_RPC_ID)
  ], SharedCredentialsProviderCounterpart);
  function WithSharedCredentialsProviderCounterpart() {
    return function(Base) {
      return class extends Base {
        constructor(...args) {
          super(...args);
          const options = args[1];
          this.credentialsProvider = this.rpc.getOptionalRef(options["credentialsProvider"]);
        }
      };
    };
  }

  // src/neuroglancer/util/http_request.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class HttpError extends Error {
    constructor(url, status3, statusText) {
      let message = `Fetching ${JSON.stringify(url)} resulted in HTTP error ${status3}`;
      if (statusText) {
        message += `: ${statusText}`;
      }
      message += ".";
      super(message);
      this.name = "HttpError";
      this.message = message;
      this.url = url;
      this.status = status3;
      this.statusText = statusText;
    }
    static fromResponse(response) {
      return new HttpError(response.url, response.status, response.statusText);
    }
    static fromRequestError(input, error) {
      if (error instanceof TypeError) {
        let url;
        if (typeof input === "string") {
          url = input;
        } else {
          url = input.url;
        }
        return new HttpError(url, 0, "Network or CORS error");
      }
      return error;
    }
  }
  async function fetchOk(input, init) {
    let response;
    try {
      response = await fetch(input, init);
    } catch (error) {
      throw HttpError.fromRequestError(input, error);
    }
    if (!response.ok)
      throw HttpError.fromResponse(response);
    return response;
  }
  function responseArrayBuffer(response) {
    return response.arrayBuffer();
  }
  function responseJson(response) {
    return response.json();
  }
  async function cancellableFetchOk(input, init, transformResponse, cancellationToken = uncancelableToken) {
    if (cancellationToken === uncancelableToken) {
      const response = await fetchOk(input, init);
      return await transformResponse(response);
    }
    const abortController = new AbortController();
    const unregisterCancellation = cancellationToken.add(() => abortController.abort());
    try {
      const response = await fetchOk(input, {...init, signal: abortController.signal});
      return await transformResponse(response);
    } finally {
      unregisterCancellation();
    }
  }
  const tempUint64 = new Uint64();
  function getByteRangeHeader(startOffset, endOffset) {
    let endOffsetStr;
    if (typeof endOffset === "number") {
      endOffsetStr = `${endOffset - 1}`;
    } else {
      Uint64.decrement(tempUint64, endOffset);
      endOffsetStr = tempUint64.toString();
    }
    return {Range: `bytes=${startOffset}-${endOffsetStr}`};
  }
  function parseUrl(url) {
    const urlProtocolPattern = /^([^:\/]+):\/\/([^\/]+)((?:\/.*)?)$/;
    let match = url.match(urlProtocolPattern);
    if (match === null) {
      throw new Error(`Invalid URL: ${JSON.stringify(url)}`);
    }
    return {protocol: match[1], host: match[2], path: match[3]};
  }
  function isNotFoundError(e) {
    if (!(e instanceof HttpError))
      return false;
    return e.status === 403 || e.status === 404;
  }

  // src/neuroglancer/credentials_provider/http_request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function fetchWithCredentials(credentialsProvider, input, init, transformResponse, applyCredentials2, errorHandler, cancellationToken = uncancelableToken) {
    let credentials;
    credentialsLoop:
      while (true) {
        credentials = await credentialsProvider.get(credentials, cancellationToken);
        requestLoop:
          while (true) {
            try {
              return await cancellableFetchOk(input, applyCredentials2(credentials.credentials, init), transformResponse, cancellationToken);
            } catch (error) {
              if (error instanceof HttpError) {
                if (errorHandler(error, credentials.credentials) === "refresh")
                  continue credentialsLoop;
                continue requestLoop;
              }
              throw error;
            }
          }
      }
  }

  // src/neuroglancer/credentials_provider/oauth2.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function fetchWithOAuth2Credentials(credentialsProvider, input, init, transformResponse, cancellationToken = uncancelableToken) {
    if (credentialsProvider === void 0) {
      return cancellableFetchOk(input, init, transformResponse, cancellationToken);
    }
    return fetchWithCredentials(credentialsProvider, input, init, transformResponse, (credentials, init2) => {
      if (!credentials.accessToken)
        return init2;
      const headers = new Headers(init2.headers);
      headers.set("Authorization", `${credentials.tokenType} ${credentials.accessToken}`);
      return {...init2, headers};
    }, (error, credentials) => {
      const {status: status3} = error;
      if (status3 === 401) {
        return "refresh";
      } else if (status3 === 504 || status3 === 503) {
        return "retry";
      } else if (status3 === 403 && !credentials.accessToken) {
        return "refresh";
      }
      throw error;
    }, cancellationToken);
  }

  // src/neuroglancer/datasource/brainmaps/api.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function makeRequest(instance, credentialsProvider, httpCall, cancellationToken = uncancelableToken) {
    return fetchWithOAuth2Credentials(credentialsProvider, `${instance.serverUrl}${httpCall.path}`, {method: httpCall.method, body: httpCall.payload}, httpCall.responseType === "json" ? responseJson : responseArrayBuffer, cancellationToken);
  }

  // src/neuroglancer/datasource/brainmaps/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VolumeChunkEncoding;
  (function(VolumeChunkEncoding5) {
    VolumeChunkEncoding5[VolumeChunkEncoding5["RAW"] = 0] = "RAW";
    VolumeChunkEncoding5[VolumeChunkEncoding5["JPEG"] = 1] = "JPEG";
    VolumeChunkEncoding5[VolumeChunkEncoding5["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
  })(VolumeChunkEncoding || (VolumeChunkEncoding = {}));
  class VolumeSourceParameters {
  }
  VolumeSourceParameters.RPC_ID = "brainmaps/VolumeChunkSource";
  class MultiscaleMeshSourceParameters {
  }
  MultiscaleMeshSourceParameters.RPC_ID = "brainmaps/MultiscaleMeshSource";
  class MeshSourceParameters {
  }
  MeshSourceParameters.RPC_ID = "brainmaps/MeshSource";
  class SkeletonSourceParameters {
  }
  SkeletonSourceParameters.RPC_ID = "brainmaps/SkeletonSource";
  class AnnotationSourceParameters {
  }
  AnnotationSourceParameters.RPC_ID = "brainmaps/Annotation";
  class AnnotationSpatialIndexSourceParameters {
  }
  AnnotationSpatialIndexSourceParameters.RPC_ID = "brainmaps/AnnotationSpatialIndex";

  // src/neuroglancer/mesh/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const MESH_LAYER_RPC_ID = "mesh/MeshLayer";
  const MULTISCALE_MESH_LAYER_RPC_ID = "mesh/MultiscaleMeshLayer";
  const FRAGMENT_SOURCE_RPC_ID = "mesh/FragmentSource";
  const MULTISCALE_FRAGMENT_SOURCE_RPC_ID = "mesh/MultiscaleFragmentSource";
  var VertexPositionFormat;
  (function(VertexPositionFormat2) {
    VertexPositionFormat2[VertexPositionFormat2["float32"] = 0] = "float32";
    VertexPositionFormat2[VertexPositionFormat2["uint10"] = 1] = "uint10";
    VertexPositionFormat2[VertexPositionFormat2["uint16"] = 2] = "uint16";
  })(VertexPositionFormat || (VertexPositionFormat = {}));

  // src/neuroglancer/util/zorder.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function getOctreeChildIndex(x, y, z) {
    return x & 1 | y << 1 & 2 | z << 2 & 4;
  }
  function decodeZIndexCompressed(zindex, xBits, yBits, zBits) {
    const maxCoordBits = Math.max(xBits, yBits, zBits);
    let inputBit = 0;
    let inputValue = zindex.low;
    let x = 0, y = 0, z = 0;
    for (let coordBit = 0; coordBit < maxCoordBits; ++coordBit) {
      if (coordBit < xBits) {
        const bit = inputValue >>> inputBit & 1;
        x |= bit << coordBit;
        if (inputBit === 31) {
          inputBit = 0;
          inputValue = zindex.high;
        } else {
          ++inputBit;
        }
      }
      if (coordBit < yBits) {
        const bit = inputValue >>> inputBit & 1;
        y |= bit << coordBit;
        if (inputBit === 31) {
          inputBit = 0;
          inputValue = zindex.high;
        } else {
          ++inputBit;
        }
      }
      if (coordBit < zBits) {
        const bit = inputValue >>> inputBit & 1;
        z |= bit << coordBit;
        if (inputBit === 31) {
          inputBit = 0;
          inputValue = zindex.high;
        } else {
          ++inputBit;
        }
      }
    }
    return Uint32Array.of(x, y, z);
  }
  function encodeZIndexCompressed(zindex, xBits, yBits, zBits, x, y, z) {
    const maxBits = Math.max(xBits, yBits, zBits);
    let outputBit = 0;
    let outputNum = 0;
    let isHigh = false;
    function writeBit(b) {
      outputNum |= (b & 1) << outputBit;
      if (++outputBit === 32) {
        zindex.low = outputNum;
        outputNum = 0;
        outputBit = 0;
        isHigh = true;
      }
    }
    for (let bit = 0; bit < maxBits; ++bit) {
      if (bit < xBits) {
        writeBit(x >> bit & 1);
      }
      if (bit < yBits) {
        writeBit(y >> bit & 1);
      }
      if (bit < zBits) {
        writeBit(z >> bit & 1);
      }
    }
    if (isHigh) {
      zindex.high = outputNum;
    } else {
      zindex.high = 0;
      zindex.low = outputNum;
    }
    return zindex;
  }
  function lessMsb(a, b) {
    return a < b && a < (a ^ b);
  }
  function zorder3LessThan(x0, y0, z0, x1, y1, z1) {
    let mostSignificant0 = z0, mostSignificant1 = z1;
    if (lessMsb(mostSignificant0 ^ mostSignificant1, y0 ^ y1)) {
      mostSignificant0 = y0;
      mostSignificant1 = y1;
    }
    if (lessMsb(mostSignificant0 ^ mostSignificant1, x0 ^ x1)) {
      mostSignificant0 = x0;
      mostSignificant1 = x1;
    }
    return mostSignificant0 < mostSignificant1;
  }

  // src/neuroglancer/mesh/multiscale.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function getDesiredMultiscaleMeshChunks(manifest, modelViewProjection, clippingPlanes, detailCutoff, viewportWidth, viewportHeight, callback) {
    const {octree, lodScales, chunkGridSpatialOrigin, chunkShape} = manifest;
    const maxLod = lodScales.length - 1;
    const m00 = modelViewProjection[0], m01 = modelViewProjection[4], m02 = modelViewProjection[8], m10 = modelViewProjection[1], m11 = modelViewProjection[5], m12 = modelViewProjection[9], m30 = modelViewProjection[3], m31 = modelViewProjection[7], m32 = modelViewProjection[11], m33 = modelViewProjection[15];
    const minWXcoeff = m30 > 0 ? 0 : 1;
    const minWYcoeff = m31 > 0 ? 0 : 1;
    const minWZcoeff = m32 > 0 ? 0 : 1;
    const nearA = clippingPlanes[4 * 4], nearB = clippingPlanes[4 * 4 + 1], nearC = clippingPlanes[4 * 4 + 2], nearD = clippingPlanes[4 * 4 + 3];
    function getPointW(x, y, z) {
      return m30 * x + m31 * y + m32 * z + m33;
    }
    function getBoxW(xLower, yLower, zLower, xUpper, yUpper, zUpper) {
      return getPointW(xLower + minWXcoeff * (xUpper - xLower), yLower + minWYcoeff * (yUpper - yLower), zLower + minWZcoeff * (zUpper - zLower));
    }
    const minWClip = getPointW(-nearD * nearA, -nearD * nearB, -nearD * nearC);
    const objectXLower = manifest.clipLowerBound[0], objectYLower = manifest.clipLowerBound[1], objectZLower = manifest.clipLowerBound[2];
    const objectXUpper = manifest.clipUpperBound[0], objectYUpper = manifest.clipUpperBound[1], objectZUpper = manifest.clipUpperBound[2];
    const xScale = Math.sqrt((m00 * viewportWidth) ** 2 + (m10 * viewportHeight) ** 2);
    const yScale = Math.sqrt((m01 * viewportWidth) ** 2 + (m11 * viewportHeight) ** 2);
    const zScale = Math.sqrt((m02 * viewportWidth) ** 2 + (m12 * viewportHeight) ** 2);
    const scaleFactor = Math.max(xScale, yScale, zScale);
    function handleChunk(lod, row, priorLodScale) {
      const size = 1 << lod;
      const rowOffset = row * 5;
      const gridX = octree[rowOffset], gridY = octree[rowOffset + 1], gridZ = octree[rowOffset + 2], childBegin = octree[rowOffset + 3], childEndAndEmpty = octree[rowOffset + 4];
      let xLower = gridX * size * chunkShape[0] + chunkGridSpatialOrigin[0], yLower = gridY * size * chunkShape[1] + chunkGridSpatialOrigin[1], zLower = gridZ * size * chunkShape[2] + chunkGridSpatialOrigin[2];
      let xUpper = xLower + size * chunkShape[0], yUpper = yLower + size * chunkShape[1], zUpper = zLower + size * chunkShape[2];
      xLower = Math.max(xLower, objectXLower);
      yLower = Math.max(yLower, objectYLower);
      zLower = Math.max(zLower, objectZLower);
      xUpper = Math.min(xUpper, objectXUpper);
      yUpper = Math.min(yUpper, objectYUpper);
      zUpper = Math.min(zUpper, objectZUpper);
      if (isAABBVisible(xLower, yLower, zLower, xUpper, yUpper, zUpper, clippingPlanes)) {
        const minW = Math.max(minWClip, getBoxW(xLower, yLower, zLower, xUpper, yUpper, zUpper));
        const pixelSize = minW / scaleFactor;
        if (priorLodScale === 0 || pixelSize * detailCutoff < priorLodScale) {
          const lodScale = lodScales[lod];
          if (lodScale !== 0) {
            callback(lod, row, lodScale / pixelSize, childEndAndEmpty >>> 31);
          }
          if (lod > 0 && (lodScale === 0 || pixelSize * detailCutoff < lodScale)) {
            const nextPriorLodScale = lodScale === 0 ? priorLodScale : lodScale;
            const childEnd = (childEndAndEmpty & 2147483647) >>> 0;
            for (let childRow = childBegin; childRow < childEnd; ++childRow) {
              handleChunk(lod - 1, childRow, nextPriorLodScale);
            }
          }
        }
      }
    }
    handleChunk(maxLod, octree.length / 5 - 1, 0);
  }

  // src/neuroglancer/mesh/triangle_strips.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const DEBUG_TIMING = false;
  function normalizeTriangleVertexOrder(indices) {
    let maxVertex = 0;
    for (let i = 0, length4 = indices.length; i < length4; i += 3) {
      let a = indices[i], b = indices[i + 1], c = indices[i + 2];
      let t;
      if (a > b) {
        t = a;
        a = b;
        b = t;
      }
      if (b > c) {
        t = b;
        b = c;
        c = t;
      }
      if (a > b) {
        t = a;
        a = b;
        b = t;
      }
      indices[i] = a;
      indices[i + 1] = b;
      indices[i + 2] = c;
      if (c > maxVertex)
        maxVertex = c;
    }
    return maxVertex;
  }
  let collisions = 0;
  function hashTableInsert(table, numBuckets, value, emptyValue, hashCode, equals6) {
    const mask = numBuckets - 1 >>> 0;
    let bucket = (hashCode & mask) >>> 0;
    for (let probe = 0; true; ++probe) {
      const x = table[bucket];
      if (x === emptyValue) {
        table[bucket] = value;
        return value;
      }
      if (equals6(x)) {
        return x;
      }
      ++collisions;
      bucket = (bucket + probe + 1 & mask) >>> 0;
    }
  }
  function hashEdge(a, b) {
    return hashCombine(hashCombine(0, a), b);
  }
  const nextEdgeTable = 1053042;
  function getNextEdge(edgeIndexAndFlipped) {
    return nextEdgeTable >>> edgeIndexAndFlipped * 3 & 7;
  }
  function getBaseIndex(entry) {
    return (entry >>> 2) * 3;
  }
  function getEdgeIndex(entry) {
    return entry & 3;
  }
  function vertexAIndex(edgeIndex) {
    return edgeIndex >>> 1;
  }
  function vertexBIndex(edgeIndex) {
    return 1 + (edgeIndex + 1 >>> 1);
  }
  function vertexCIndex(edgeIndex) {
    return 2 - edgeIndex;
  }
  function getEdgeMapSize(numIndices) {
    const numEdges = numIndices;
    const edgeMapSize = 2 ** Math.ceil(Math.log2(numEdges));
    return edgeMapSize * 4;
  }
  function computeTriangleAdjacencies(triangleAdjacencies, indices, edgeMap) {
    const numTriangles = indices.length / 3;
    const edgeMapSize = edgeMap.length;
    const emptyEntry = 4294967295;
    triangleAdjacencies.fill(emptyEntry);
    edgeMap.fill(emptyEntry);
    for (let triangle = 0; triangle < numTriangles; ++triangle) {
      const baseIndex = triangle * 3;
      for (let edgeIndex = 0; edgeIndex < 3; ++edgeIndex) {
        const vertexA0 = indices[baseIndex + vertexAIndex(edgeIndex)];
        const vertexB0 = indices[baseIndex + vertexBIndex(edgeIndex)];
        const newEntry = triangle << 2 | edgeIndex;
        const existingEntry = hashTableInsert(edgeMap, edgeMapSize, newEntry, emptyEntry, hashEdge(vertexA0, vertexB0), (x) => {
          const otherBaseIndex = getBaseIndex(x);
          const otherEdgeIndex = getEdgeIndex(x);
          const vertexA1 = indices[otherBaseIndex + vertexAIndex(otherEdgeIndex)];
          const vertexB1 = indices[otherBaseIndex + vertexBIndex(otherEdgeIndex)];
          return vertexA0 === vertexA1 && vertexB0 === vertexB1;
        });
        if (existingEntry !== newEntry) {
          const otherBaseIndex = getBaseIndex(existingEntry);
          const otherEdgeIndex = getEdgeIndex(existingEntry);
          triangleAdjacencies[otherBaseIndex + otherEdgeIndex] = newEntry;
          triangleAdjacencies[baseIndex + edgeIndex] = existingEntry;
        }
      }
    }
    return triangleAdjacencies;
  }
  function emitTriangleStrips(indices, triangleAdjacencies, output, outputIndex) {
    const invalidVertex = ~0 >>> 32 - 8 * output.BYTES_PER_ELEMENT;
    const numIndices = indices.length;
    const numTriangles = numIndices / 3;
    const emptyEntry = 4294967295;
    startNewStrip:
      for (let triangle = 0; triangle < numTriangles; ++triangle) {
        let baseIndex = triangle * 3;
        if (indices[baseIndex] === invalidVertex) {
          continue;
        }
        for (let edgeIndex = 0; edgeIndex < 3; ++edgeIndex) {
          let entry = triangleAdjacencies[baseIndex + edgeIndex];
          if (entry === emptyEntry)
            continue;
          let otherBaseIndex = getBaseIndex(entry);
          if (indices[otherBaseIndex] === invalidVertex)
            continue;
          let otherEdgeIndex = getEdgeIndex(entry);
          output[outputIndex++] = indices[baseIndex + vertexCIndex(edgeIndex)];
          output[outputIndex++] = indices[baseIndex + vertexAIndex(edgeIndex)];
          output[outputIndex++] = indices[baseIndex + vertexBIndex(edgeIndex)];
          let edgeIndexAndFlipped = otherEdgeIndex;
          while (true) {
            indices[baseIndex] = invalidVertex;
            baseIndex = otherBaseIndex;
            output[outputIndex++] = indices[baseIndex + vertexCIndex(edgeIndexAndFlipped & 3)];
            edgeIndexAndFlipped = getNextEdge(edgeIndexAndFlipped);
            entry = triangleAdjacencies[baseIndex + (edgeIndexAndFlipped & 3)];
            if (entry === emptyEntry || indices[otherBaseIndex = getBaseIndex(entry)] === invalidVertex) {
              output[outputIndex++] = invalidVertex;
              indices[baseIndex] = invalidVertex;
              continue startNewStrip;
            }
            edgeIndexAndFlipped = getEdgeIndex(entry) | edgeIndexAndFlipped & 4;
          }
        }
        output[outputIndex++] = indices[baseIndex];
        output[outputIndex++] = indices[baseIndex + 1];
        output[outputIndex++] = indices[baseIndex + 2];
        indices[baseIndex] = invalidVertex;
        output[outputIndex++] = invalidVertex;
      }
    return outputIndex;
  }
  function computeTriangleStrips(indices, subChunkOffsets) {
    if (indices.length === 0)
      return indices;
    collisions = 0;
    if (subChunkOffsets === void 0) {
      subChunkOffsets = Uint32Array.of(0, indices.length);
    }
    let adjacenciesElapsed = 0;
    let emitElapsed = 0;
    let startTime = 0, midTime = 0, endTime = 0;
    const maxVertexIndex = normalizeTriangleVertexOrder(indices);
    const outputBufferSize = indices.length / 3 * 4;
    const output = maxVertexIndex >= 65535 ? new Uint32Array(outputBufferSize) : new Uint16Array(outputBufferSize);
    let outputIndex = 0;
    let maxSubChunkIndices = 0;
    const numSubChunks = subChunkOffsets.length - 1;
    for (let subChunk = 0; subChunk < numSubChunks; ++subChunk) {
      maxSubChunkIndices = Math.max(maxSubChunkIndices, subChunkOffsets[subChunk + 1] - subChunkOffsets[subChunk]);
    }
    const triangleAdjacencies = new Uint32Array(maxSubChunkIndices);
    const edgeMap = new Uint32Array(getEdgeMapSize(maxSubChunkIndices));
    let subChunkOffset = subChunkOffsets[0];
    for (let subChunk = 0; subChunk < numSubChunks; ++subChunk) {
      subChunkOffsets[subChunk] = outputIndex;
      const subChunkEnd = subChunkOffsets[subChunk + 1];
      const subIndices = indices.subarray(subChunkOffset, subChunkEnd);
      if (DEBUG_TIMING)
        startTime = Date.now();
      computeTriangleAdjacencies(triangleAdjacencies, subIndices, edgeMap);
      if (DEBUG_TIMING)
        midTime = Date.now();
      outputIndex = emitTriangleStrips(subIndices, triangleAdjacencies, output, outputIndex);
      if (DEBUG_TIMING) {
        endTime = Date.now();
        adjacenciesElapsed += midTime - startTime;
        emitElapsed += endTime - midTime;
      }
      subChunkOffset = subChunkEnd;
    }
    --outputIndex;
    subChunkOffsets[numSubChunks] = outputIndex;
    const shrunkOutput = new output.constructor(outputIndex);
    shrunkOutput.set(output.subarray(0, outputIndex));
    if (DEBUG_TIMING) {
      console.log(`reduced from ${indices.byteLength}(${indices.BYTES_PER_ELEMENT}) -> ${shrunkOutput.byteLength}(${shrunkOutput.BYTES_PER_ELEMENT}): adj=${adjacenciesElapsed}, emit=${emitElapsed}, ${collisions}/${indices.length} collisions`);
    }
    return shrunkOutput;
  }

  // src/neuroglancer/mesh/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const MESH_OBJECT_MANIFEST_CHUNK_PRIORITY = 100;
  const MESH_OBJECT_FRAGMENT_CHUNK_PRIORITY = 50;
  const CONVERT_TO_TRIANGLE_STRIPS = false;
  class ManifestChunk extends Chunk {
    constructor() {
      super();
      this.objectId = new Uint64();
    }
    initializeManifestChunk(key, objectId) {
      super.initialize(key);
      this.objectId.assign(objectId);
    }
    freeSystemMemory() {
      this.fragmentIds = null;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      msg.fragmentIds = this.fragmentIds;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = 100;
      this.gpuMemoryBytes = 0;
      super.downloadSucceeded();
      if (this.priorityTier < ChunkPriorityTier.RECENT) {
        this.source.chunkManager.scheduleUpdateChunkPriorities();
      }
    }
    toString() {
      return this.objectId.toString();
    }
  }
  function serializeMeshData(data, msg, transfers) {
    const {vertexPositions, indices, vertexNormals, strips} = data;
    msg["vertexPositions"] = vertexPositions;
    msg["indices"] = indices;
    msg["strips"] = strips;
    msg["vertexNormals"] = vertexNormals;
    let vertexPositionsBuffer = vertexPositions.buffer;
    transfers.push(vertexPositionsBuffer);
    let indicesBuffer = indices.buffer;
    if (indicesBuffer !== vertexPositionsBuffer) {
      transfers.push(indicesBuffer);
    }
    transfers.push(vertexNormals.buffer);
  }
  function getMeshDataSize(data) {
    let {vertexPositions, indices, vertexNormals} = data;
    return vertexPositions.byteLength + indices.byteLength + vertexNormals.byteLength;
  }
  class FragmentChunk extends Chunk {
    constructor() {
      super();
      this.manifestChunk = null;
      this.fragmentId = null;
      this.meshData = null;
    }
    initializeFragmentChunk(key, manifestChunk, fragmentId) {
      super.initialize(key);
      this.manifestChunk = manifestChunk;
      this.fragmentId = fragmentId;
    }
    freeSystemMemory() {
      this.manifestChunk = null;
      this.meshData = null;
      this.fragmentId = null;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      serializeMeshData(this.meshData, msg, transfers);
      this.meshData = null;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = this.gpuMemoryBytes = getMeshDataSize(this.meshData);
      super.downloadSucceeded();
    }
  }
  function decodeJsonManifestChunk(chunk, response, keysPropertyName) {
    verifyObject(response);
    chunk.fragmentIds = verifyObjectProperty(response, keysPropertyName, verifyStringArray);
  }
  function computeVertexNormals(positions, indices) {
    const faceNormal = vec3_exports.create();
    const v1v0 = vec3_exports.create();
    const v2v1 = vec3_exports.create();
    let vertexNormals = new Float32Array(positions.length);
    let numIndices = indices.length;
    for (let i = 0; i < numIndices; i += 3) {
      let i0 = indices[i] * 3, i1 = indices[i + 1] * 3, i2 = indices[i + 2] * 3;
      for (let j = 0; j < 3; ++j) {
        v1v0[j] = positions[i1 + j] - positions[i0 + j];
        v2v1[j] = positions[i2 + j] - positions[i1 + j];
      }
      vec3_exports.cross(faceNormal, v1v0, v2v1);
      vec3_exports.normalize(faceNormal, faceNormal);
      for (let k = 0; k < 3; ++k) {
        let index2 = indices[i + k];
        let offset = index2 * 3;
        for (let j = 0; j < 3; ++j) {
          vertexNormals[offset + j] += faceNormal[j];
        }
      }
    }
    let numVertices = vertexNormals.length;
    for (let i = 0; i < numVertices; i += 3) {
      let vec = vertexNormals.subarray(i, i + 3);
      vec3_exports.normalize(vec, vec);
    }
    return vertexNormals;
  }
  function snorm8(x) {
    return Math.min(Math.max(-127, x * 127 + 0.5), 127) >>> 0;
  }
  function signNotZero(x) {
    return x < 0 ? -1 : 1;
  }
  function encodeNormals32fx3ToOctahedron8x2(out, normals) {
    const length4 = normals.length;
    let outIndex = 0;
    for (let i = 0; i < length4; i += 3) {
      const x = normals[i], y = normals[i + 1], z = normals[i + 2];
      const invL1Norm = 1 / (Math.abs(x) + Math.abs(y) + Math.abs(z));
      if (z < 0) {
        out[outIndex] = snorm8((1 - Math.abs(y * invL1Norm)) * signNotZero(x));
        out[outIndex + 1] = snorm8((1 - Math.abs(x * invL1Norm)) * signNotZero(y));
      } else {
        out[outIndex] = snorm8(x * invL1Norm);
        out[outIndex + 1] = snorm8(y * invL1Norm);
      }
      outIndex += 2;
    }
  }
  function decodeVertexPositionsAndIndices(verticesPerPrimitive, data, endianness, vertexByteOffset, numVertices, indexByteOffset, numPrimitives) {
    let vertexPositions = new Float32Array(data, vertexByteOffset, numVertices * 3);
    convertEndian32(vertexPositions, endianness);
    if (indexByteOffset === void 0) {
      indexByteOffset = vertexByteOffset + 12 * numVertices;
    }
    let numIndices;
    if (numPrimitives !== void 0) {
      numIndices = numPrimitives * verticesPerPrimitive;
    }
    let indices = numIndices === void 0 ? new Uint32Array(data, indexByteOffset) : new Uint32Array(data, indexByteOffset, numIndices);
    if (indices.length % verticesPerPrimitive !== 0) {
      throw new Error(`Number of indices is not a multiple of ${verticesPerPrimitive}: ${indices.length}.`);
    }
    convertEndian32(indices, endianness);
    return {vertexPositions, indices};
  }
  function decodeTriangleVertexPositionsAndIndices(data, endianness, vertexByteOffset, numVertices, indexByteOffset, numTriangles) {
    return decodeVertexPositionsAndIndices(3, data, endianness, vertexByteOffset, numVertices, indexByteOffset, numTriangles);
  }
  class MeshSource extends ChunkSource {
    constructor(rpc2, options) {
      super(rpc2, options);
      let fragmentSource = this.fragmentSource = this.registerDisposer(rpc2.getRef(options["fragmentSource"]));
      fragmentSource.meshSource = this;
    }
    getChunk(objectId) {
      const key = getObjectKey(objectId);
      let chunk = this.chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(ManifestChunk);
        chunk.initializeManifestChunk(key, objectId);
        this.addChunk(chunk);
      }
      return chunk;
    }
    getFragmentChunk(manifestChunk, fragmentId) {
      let key = `${manifestChunk.key}/${fragmentId}`;
      let fragmentSource = this.fragmentSource;
      let chunk = fragmentSource.chunks.get(key);
      if (chunk === void 0) {
        chunk = fragmentSource.getNewChunk_(FragmentChunk);
        chunk.initializeFragmentChunk(key, manifestChunk, fragmentId);
        fragmentSource.addChunk(chunk);
      }
      return chunk;
    }
  }
  let FragmentSource = class extends ChunkSource {
    constructor() {
      super(...arguments);
      this.meshSource = null;
    }
    download(chunk, cancellationToken) {
      return this.meshSource.downloadFragment(chunk, cancellationToken);
    }
  };
  FragmentSource = __decorate([
    registerSharedObject(FRAGMENT_SOURCE_RPC_ID)
  ], FragmentSource);
  let MeshLayer = class extends withSegmentationLayerBackendState(withSharedVisibility(withChunkManager(PerspectiveViewRenderLayerBackend))) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.source = this.registerDisposer(rpc2.getRef(options["source"]));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
        this.updateChunkPriorities();
      }));
    }
    attach(attachment) {
      const scheduleUpdateChunkPriorities = () => {
        this.chunkManager.scheduleUpdateChunkPriorities();
      };
      const {view} = attachment;
      attachment.registerDisposer(view.visibility.changed.add(scheduleUpdateChunkPriorities));
      attachment.registerDisposer(scheduleUpdateChunkPriorities);
      scheduleUpdateChunkPriorities();
    }
    updateChunkPriorities() {
      const visibility = this.visibility.value;
      if (visibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      this.chunkManager.registerLayer(this);
      const priorityTier = getPriorityTier(visibility);
      const basePriority = getBasePriority(visibility);
      const {source, chunkManager} = this;
      forEachVisibleSegment(this, (objectId) => {
        let manifestChunk = source.getChunk(objectId);
        ++this.numVisibleChunksNeeded;
        chunkManager.requestChunk(manifestChunk, priorityTier, basePriority + MESH_OBJECT_MANIFEST_CHUNK_PRIORITY);
        const state = manifestChunk.state;
        if (state === ChunkState.SYSTEM_MEMORY_WORKER || state === ChunkState.SYSTEM_MEMORY || state === ChunkState.GPU_MEMORY) {
          ++this.numVisibleChunksAvailable;
          for (let fragmentId of manifestChunk.fragmentIds) {
            let fragmentChunk = source.getFragmentChunk(manifestChunk, fragmentId);
            ++this.numVisibleChunksNeeded;
            chunkManager.requestChunk(fragmentChunk, priorityTier, basePriority + MESH_OBJECT_FRAGMENT_CHUNK_PRIORITY);
            if (fragmentChunk.state === ChunkState.GPU_MEMORY) {
              ++this.numVisibleChunksAvailable;
            }
          }
        }
      });
    }
  };
  MeshLayer = __decorate([
    registerSharedObject(MESH_LAYER_RPC_ID)
  ], MeshLayer);
  class MultiscaleManifestChunk extends Chunk {
    constructor() {
      super();
      this.objectId = new Uint64();
    }
    initializeManifestChunk(key, objectId) {
      super.initialize(key);
      this.objectId.assign(objectId);
    }
    freeSystemMemory() {
      this.manifest = void 0;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      msg.manifest = this.manifest;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = this.manifest.octree.byteLength;
      this.gpuMemoryBytes = 0;
      super.downloadSucceeded();
      if (this.priorityTier < ChunkPriorityTier.RECENT) {
        this.source.chunkManager.scheduleUpdateChunkPriorities();
      }
    }
    toString() {
      return this.objectId.toString();
    }
  }
  class MultiscaleFragmentChunk extends Chunk {
    constructor() {
      super();
      this.subChunkOffsets = null;
      this.meshData = null;
      this.lod = 0;
      this.chunkIndex = 0;
      this.manifestChunk = null;
    }
    freeSystemMemory() {
      this.meshData = this.subChunkOffsets = null;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      serializeMeshData(this.meshData, msg, transfers);
      const {subChunkOffsets} = this;
      msg["subChunkOffsets"] = subChunkOffsets;
      transfers.push(subChunkOffsets.buffer);
      this.meshData = this.subChunkOffsets = null;
    }
    downloadSucceeded() {
      const {subChunkOffsets} = this;
      this.systemMemoryBytes = this.gpuMemoryBytes = getMeshDataSize(this.meshData);
      this.systemMemoryBytes += subChunkOffsets.byteLength;
      super.downloadSucceeded();
    }
  }
  class MultiscaleMeshSource extends ChunkSource {
    constructor(rpc2, options) {
      super(rpc2, options);
      let fragmentSource = this.fragmentSource = this.registerDisposer(rpc2.getRef(options["fragmentSource"]));
      this.format = options["format"];
      fragmentSource.meshSource = this;
    }
    getChunk(objectId) {
      const key = getObjectKey(objectId);
      let chunk = this.chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(MultiscaleManifestChunk);
        chunk.initializeManifestChunk(key, objectId);
        this.addChunk(chunk);
      }
      return chunk;
    }
    getFragmentChunk(manifestChunk, lod, chunkIndex) {
      let key = `${manifestChunk.key}/${lod}:${chunkIndex}`;
      let fragmentSource = this.fragmentSource;
      let chunk = fragmentSource.chunks.get(key);
      if (chunk === void 0) {
        chunk = fragmentSource.getNewChunk_(MultiscaleFragmentChunk);
        chunk.initialize(key);
        chunk.lod = lod;
        chunk.chunkIndex = chunkIndex;
        chunk.manifestChunk = manifestChunk;
        fragmentSource.addChunk(chunk);
      }
      return chunk;
    }
  }
  let MultiscaleFragmentSource = class extends ChunkSource {
    constructor() {
      super(...arguments);
      this.meshSource = null;
    }
    download(chunk, cancellationToken) {
      return this.meshSource.downloadFragment(chunk, cancellationToken);
    }
  };
  MultiscaleFragmentSource = __decorate([
    registerSharedObject(MULTISCALE_FRAGMENT_SOURCE_RPC_ID)
  ], MultiscaleFragmentSource);
  const tempModelMatrix = mat4_exports.create();
  let MultiscaleMeshLayer = class extends withSegmentationLayerBackendState(withSharedVisibility(withChunkManager(PerspectiveViewRenderLayerBackend))) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.source = this.registerDisposer(rpc2.getRef(options["source"]));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
        this.updateChunkPriorities();
      }));
    }
    attach(attachment) {
      const scheduleUpdateChunkPriorities = () => this.chunkManager.scheduleUpdateChunkPriorities();
      const {view} = attachment;
      attachment.registerDisposer(view.projectionParameters.changed.add(scheduleUpdateChunkPriorities));
      attachment.registerDisposer(view.visibility.changed.add(scheduleUpdateChunkPriorities));
      attachment.registerDisposer(scheduleUpdateChunkPriorities);
      scheduleUpdateChunkPriorities();
    }
    updateChunkPriorities() {
      const maxVisibility = this.visibility.value;
      if (maxVisibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      const {transform: {value: transform}} = this;
      if (transform.error !== void 0)
        return;
      const manifestChunks = new Array();
      this.chunkManager.registerLayer(this);
      {
        const priorityTier = getPriorityTier(maxVisibility);
        const basePriority = getBasePriority(maxVisibility);
        const {source: source2, chunkManager: chunkManager2} = this;
        forEachVisibleSegment(this, (objectId) => {
          const manifestChunk = source2.getChunk(objectId);
          ++this.numVisibleChunksNeeded;
          chunkManager2.requestChunk(manifestChunk, priorityTier, basePriority + MESH_OBJECT_MANIFEST_CHUNK_PRIORITY);
          const state = manifestChunk.state;
          if (state === ChunkState.SYSTEM_MEMORY_WORKER || state === ChunkState.SYSTEM_MEMORY || state === ChunkState.GPU_MEMORY) {
            manifestChunks.push(manifestChunk);
            ++this.numVisibleChunksAvailable;
          }
        });
      }
      if (manifestChunks.length === 0)
        return;
      const {source, chunkManager} = this;
      for (const {view} of this.attachments.values()) {
        const visibility = view.visibility.value;
        if (visibility === Number.NEGATIVE_INFINITY) {
          continue;
        }
        const priorityTier = getPriorityTier(visibility);
        const basePriority = getBasePriority(visibility);
        const projectionParameters = view.projectionParameters.value;
        const modelViewProjectionMatrix = tempModelMatrix;
        try {
          get3dModelToDisplaySpaceMatrix(modelViewProjectionMatrix, projectionParameters.displayDimensionRenderInfo, transform);
        } catch {
          continue;
        }
        mat4_exports.multiply(modelViewProjectionMatrix, projectionParameters.viewProjectionMat, modelViewProjectionMatrix);
        const clippingPlanes = getFrustrumPlanes(new Float32Array(24), modelViewProjectionMatrix);
        const detailCutoff = this.renderScaleTarget.value;
        for (const manifestChunk of manifestChunks) {
          const maxLod = manifestChunk.manifest.lodScales.length - 1;
          getDesiredMultiscaleMeshChunks(manifestChunk.manifest, modelViewProjectionMatrix, clippingPlanes, detailCutoff, projectionParameters.width, projectionParameters.height, (lod, chunkIndex, _renderScale, empty) => {
            if (empty)
              return;
            let fragmentChunk = source.getFragmentChunk(manifestChunk, lod, chunkIndex);
            ++this.numVisibleChunksNeeded;
            chunkManager.requestChunk(fragmentChunk, priorityTier, basePriority + MESH_OBJECT_FRAGMENT_CHUNK_PRIORITY - maxLod + lod);
            if (fragmentChunk.state === ChunkState.GPU_MEMORY) {
              ++this.numVisibleChunksAvailable;
            }
          });
        }
      }
    }
  };
  MultiscaleMeshLayer = __decorate([
    registerSharedObject(MULTISCALE_MESH_LAYER_RPC_ID)
  ], MultiscaleMeshLayer);
  function convertMeshData(data, vertexPositionFormat) {
    const normals = computeVertexNormals(data.vertexPositions, data.indices);
    const encodedNormals = new Uint8Array(normals.length / 3 * 2);
    encodeNormals32fx3ToOctahedron8x2(encodedNormals, normals);
    let encodedIndices;
    let strips;
    if (CONVERT_TO_TRIANGLE_STRIPS) {
      encodedIndices = computeTriangleStrips(data.indices, data.subChunkOffsets);
      strips = true;
    } else {
      if (data.indices.BYTES_PER_ELEMENT === 4 && data.vertexPositions.length / 3 < 65535) {
        encodedIndices = new Uint16Array(data.indices.length);
        encodedIndices.set(data.indices);
      } else {
        encodedIndices = data.indices;
      }
      strips = false;
    }
    let encodedVertexPositions;
    if (vertexPositionFormat === VertexPositionFormat.uint10) {
      const vertexPositions = data.vertexPositions;
      const numVertices = vertexPositions.length / 3;
      encodedVertexPositions = new Uint32Array(numVertices);
      for (let inputIndex = 0, outputIndex = 0; outputIndex < numVertices; inputIndex += 3, ++outputIndex) {
        encodedVertexPositions[outputIndex] = vertexPositions[inputIndex] & 1023 | (vertexPositions[inputIndex + 1] & 1023) << 10 | (vertexPositions[inputIndex + 2] & 1023) << 20;
      }
    } else if (vertexPositionFormat === VertexPositionFormat.uint16) {
      const vertexPositions = data.vertexPositions;
      if (vertexPositions.BYTES_PER_ELEMENT === 2) {
        encodedVertexPositions = vertexPositions;
      } else {
        encodedVertexPositions = new Uint16Array(vertexPositions.length);
        encodedVertexPositions.set(vertexPositions);
      }
    } else {
      encodedVertexPositions = data.vertexPositions;
    }
    return {
      vertexPositions: encodedVertexPositions,
      vertexNormals: encodedNormals,
      indices: encodedIndices,
      strips
    };
  }
  function assignMeshFragmentData(chunk, data, vertexPositionFormat = VertexPositionFormat.float32) {
    chunk.meshData = convertMeshData(data, vertexPositionFormat);
  }
  function assignMultiscaleMeshFragmentData(chunk, data, vertexPositionFormat) {
    chunk.meshData = convertMeshData(data, vertexPositionFormat);
    chunk.subChunkOffsets = data.subChunkOffsets;
  }
  function generateHigherOctreeLevel(octree, priorStart, priorEnd) {
    let curEnd = priorEnd;
    for (let i = 0; i < 3; ++i) {
      octree[curEnd * 5 + i] = octree[priorStart * 5 + i] >>> 1;
    }
    octree[curEnd * 5 + 3] = priorStart;
    for (let i = priorStart + 1; i < priorEnd; ++i) {
      const x = octree[i * 5] >>> 1, y = octree[i * 5 + 1] >>> 1, z = octree[i * 5 + 2] >>> 1;
      if (x !== octree[curEnd * 5] || y !== octree[curEnd * 5 + 1] || z !== octree[curEnd * 5 + 2]) {
        octree[curEnd * 5 + 4] = i;
        ++curEnd;
        octree[curEnd * 5] = x;
        octree[curEnd * 5 + 1] = y;
        octree[curEnd * 5 + 2] = z;
        octree[curEnd * 5 + 3] = i;
      }
    }
    octree[curEnd * 5 + 4] = priorEnd;
    ++curEnd;
    return curEnd;
  }
  function computeOctreeChildOffsets(octree, childStart, childEnd, parentEnd) {
    let childNode = childStart;
    for (let parentNode = childEnd; parentNode < parentEnd; ++parentNode) {
      const parentX = octree[parentNode * 5], parentY = octree[parentNode * 5 + 1], parentZ = octree[parentNode * 5 + 2];
      while (childNode < childEnd) {
        const childX = octree[childNode * 5] >>> 1, childY = octree[childNode * 5 + 1] >>> 1, childZ = octree[childNode * 5 + 2] >>> 1;
        if (!zorder3LessThan(childX, childY, childZ, parentX, parentY, parentZ)) {
          break;
        }
        ++childNode;
      }
      octree[parentNode * 5 + 3] = childNode;
      while (childNode < childEnd) {
        const childX = octree[childNode * 5] >>> 1, childY = octree[childNode * 5 + 1] >>> 1, childZ = octree[childNode * 5 + 2] >>> 1;
        if (childX != parentX || childY != parentY || childZ != parentZ) {
          break;
        }
        ++childNode;
      }
      octree[parentNode * 5 + 4] += childNode;
    }
  }

  // src/neuroglancer/skeleton/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const SKELETON_LAYER_RPC_ID = "skeleton/SkeletonLayer";

  // src/neuroglancer/skeleton/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const SKELETON_CHUNK_PRIORITY = 60;
  class SkeletonChunk extends Chunk {
    constructor() {
      super();
      this.objectId = new Uint64();
      this.vertexPositions = null;
      this.vertexAttributes = null;
      this.indices = null;
    }
    initializeSkeletonChunk(key, objectId) {
      super.initialize(key);
      this.objectId.assign(objectId);
    }
    freeSystemMemory() {
      this.vertexPositions = this.indices = null;
    }
    getVertexAttributeBytes() {
      let total = this.vertexPositions.byteLength;
      const {vertexAttributes} = this;
      if (vertexAttributes != null) {
        vertexAttributes.forEach((a) => {
          total += a.byteLength;
        });
      }
      return total;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      const vertexPositions = this.vertexPositions;
      const indices = this.indices;
      msg["numVertices"] = vertexPositions.length / 3;
      msg["indices"] = indices;
      transfers.push(indices.buffer);
      const {vertexAttributes} = this;
      if (vertexAttributes != null && vertexAttributes.length > 0) {
        const vertexData = new Uint8Array(this.getVertexAttributeBytes());
        vertexData.set(new Uint8Array(vertexPositions.buffer, vertexPositions.byteOffset, vertexPositions.byteLength));
        let vertexAttributeOffsets = msg["vertexAttributeOffsets"] = new Uint32Array(vertexAttributes.length + 1);
        vertexAttributeOffsets[0] = 0;
        let offset = vertexPositions.byteLength;
        vertexAttributes.forEach((a, i) => {
          vertexAttributeOffsets[i + 1] = offset;
          vertexData.set(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), offset);
          offset += a.byteLength;
        });
        transfers.push(vertexData.buffer);
        msg["vertexAttributes"] = vertexData;
      } else {
        msg["vertexAttributes"] = new Uint8Array(vertexPositions.buffer, vertexPositions.byteOffset, vertexPositions.byteLength);
        msg["vertexAttributeOffsets"] = Uint32Array.of(0);
        if (vertexPositions.buffer !== transfers[0]) {
          transfers.push(vertexPositions.buffer);
        }
      }
      this.vertexPositions = this.indices = this.vertexAttributes = null;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = this.gpuMemoryBytes = this.indices.byteLength + this.getVertexAttributeBytes();
      super.downloadSucceeded();
    }
  }
  class SkeletonSource extends ChunkSource {
    getChunk(objectId) {
      const key = getObjectKey(objectId);
      let chunk = this.chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(SkeletonChunk);
        chunk.initializeSkeletonChunk(key, objectId);
        this.addChunk(chunk);
      }
      return chunk;
    }
  }
  let SkeletonLayer = class extends withSegmentationLayerBackendState(withSharedVisibility(withChunkManager(ChunkRenderLayerBackend))) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.source = this.registerDisposer(rpc2.getRef(options["source"]));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
        this.updateChunkPriorities();
      }));
    }
    updateChunkPriorities() {
      const visibility = this.visibility.value;
      if (visibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      this.chunkManager.registerLayer(this);
      const priorityTier = getPriorityTier(visibility);
      const basePriority = getBasePriority(visibility);
      const {source, chunkManager} = this;
      forEachVisibleSegment(this, (objectId) => {
        const chunk = source.getChunk(objectId);
        ++this.numVisibleChunksNeeded;
        if (chunk.state === ChunkState.GPU_MEMORY) {
          ++this.numVisibleChunksAvailable;
        }
        chunkManager.requestChunk(chunk, priorityTier, basePriority + SKELETON_CHUNK_PRIORITY);
      });
    }
  };
  SkeletonLayer = __decorate([
    registerSharedObject(SKELETON_LAYER_RPC_ID)
  ], SkeletonLayer);
  function decodeSkeletonVertexPositionsAndIndices(chunk, data, endianness, vertexByteOffset, numVertices, indexByteOffset, numEdges) {
    const meshData = decodeVertexPositionsAndIndices(2, data, endianness, vertexByteOffset, numVertices, indexByteOffset, numEdges);
    chunk.vertexPositions = meshData.vertexPositions;
    chunk.indices = meshData.indices;
  }

  // src/neuroglancer/sliceview/backend_chunk_decoders/compressed_segmentation.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeCompressedSegmentationChunk(chunk, cancellationToken, response) {
    cancellationToken;
    chunk.data = new Uint32Array(response);
  }

  // src/neuroglancer/async_computation/index.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function asyncComputation(id) {
    return {id};
  }

  // src/neuroglancer/async_computation/encode_compressed_segmentation_request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const encodeCompressedSegmentationUint32 = asyncComputation("encodeCompressedSegmentationUint32");
  const encodeCompressedSegmentationUint64 = asyncComputation("encodeCompressedSegmentationUint64");

  // src/neuroglancer/async_computation/request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const freeWorkers = [];
  const pendingTasks = new Map();
  const tasks = new Map();
  const maxWorkers = Math.min(12, navigator.hardwareConcurrency);
  let nextTaskId = 0;
  function returnWorker(worker) {
    for (const [id, task] of pendingTasks) {
      pendingTasks.delete(id);
      worker.postMessage(task.msg, task.transfer);
      return;
    }
    freeWorkers.push(worker);
  }
  function getNewWorker() {
    const worker = new Worker("async_computation.bundle.js");
    worker.onmessage = (msg) => {
      const {id, value, error} = msg.data;
      returnWorker(worker);
      const callbacks = tasks.get(id);
      tasks.delete(id);
      if (callbacks === void 0)
        return;
      callbacks.cleanup();
      if (error !== void 0) {
        callbacks.reject(new Error(error));
      } else {
        callbacks.resolve(value);
      }
    };
    return worker;
  }
  function requestAsyncComputation(request11, cancellationToken, transfer, ...args) {
    if (cancellationToken.isCanceled)
      return Promise.reject(CANCELED);
    const id = nextTaskId++;
    const msg = {t: request11.id, id, args};
    const cleanup = cancellationToken.add(() => {
      pendingTasks.delete(id);
      tasks.delete(id);
    });
    const promise = new Promise((resolve, reject) => {
      tasks.set(id, {resolve, reject, cleanup});
    });
    if (freeWorkers.length !== 0) {
      freeWorkers.pop().postMessage(msg, transfer);
    } else if (tasks.size < maxWorkers) {
      getNewWorker().postMessage(msg, transfer);
    } else {
      pendingTasks.set(id, {msg, transfer});
    }
    return promise;
  }

  // src/neuroglancer/sliceview/backend_chunk_decoders/postprocess.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function postProcessRawData(chunk, cancellationToken, data) {
    cancellationToken;
    const {spec} = chunk.source;
    if (spec.compressedSegmentationBlockSize !== void 0) {
      const {dataType} = spec;
      const chunkDataSize = chunk.chunkDataSize;
      const shape = [chunkDataSize[0], chunkDataSize[1], chunkDataSize[2], chunkDataSize[3] || 1];
      switch (dataType) {
        case DataType.UINT32:
          chunk.data = await requestAsyncComputation(encodeCompressedSegmentationUint32, cancellationToken, [data.buffer], data, shape, spec.compressedSegmentationBlockSize);
          break;
        case DataType.UINT64:
          chunk.data = await requestAsyncComputation(encodeCompressedSegmentationUint64, cancellationToken, [data.buffer], data, shape, spec.compressedSegmentationBlockSize);
          break;
        default:
          throw new Error(`Unsupported data type for compressed segmentation: ${DataType[dataType]}`);
      }
    } else {
      chunk.data = data;
    }
  }

  // src/neuroglancer/async_computation/decode_jpeg_request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const decodeJpeg = asyncComputation("decodeJpeg");

  // src/neuroglancer/sliceview/backend_chunk_decoders/jpeg.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeJpegChunk(chunk, cancellationToken, response) {
    const chunkDataSize = chunk.chunkDataSize;
    const decoded = await requestAsyncComputation(decodeJpeg, cancellationToken, [response], new Uint8Array(response), chunkDataSize[0], chunkDataSize[1] * chunkDataSize[2], chunkDataSize[3] || 1, false);
    await postProcessRawData(chunk, cancellationToken, decoded);
  }

  // src/neuroglancer/sliceview/backend_chunk_decoders/raw.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeRawChunk(chunk, cancellationToken, response, endianness = ENDIANNESS, byteOffset = 0, byteLength = response.byteLength) {
    cancellationToken;
    let {spec} = chunk.source;
    let {dataType} = spec;
    let numElements = prod(chunk.chunkDataSize);
    let bytesPerElement = DATA_TYPE_BYTES[dataType];
    let expectedBytes = numElements * bytesPerElement;
    if (expectedBytes !== byteLength) {
      throw new Error(`Raw-format chunk is ${byteLength} bytes, but ${numElements} * ${bytesPerElement} = ${expectedBytes} bytes are expected.`);
    }
    const data = makeDataTypeArrayView(dataType, response, byteOffset, byteLength);
    convertEndian(data, endianness, bytesPerElement);
    await postProcessRawData(chunk, cancellationToken, data);
  }

  // src/neuroglancer/sliceview/volume/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class VolumeChunk extends SliceViewChunk {
    constructor() {
      super();
      this.source = null;
    }
    initializeVolumeChunk(key, chunkGridPosition) {
      super.initializeVolumeChunk(key, chunkGridPosition);
      this.chunkDataSize = null;
      this.data = null;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      let chunkDataSize = this.chunkDataSize;
      if (chunkDataSize !== this.source.spec.chunkDataSize) {
        msg["chunkDataSize"] = chunkDataSize;
      }
      let data = msg["data"] = this.data;
      transfers.push(data.buffer);
      this.data = null;
    }
    downloadSucceeded() {
      this.systemMemoryBytes = this.gpuMemoryBytes = this.data.byteLength;
      super.downloadSucceeded();
    }
    freeSystemMemory() {
      this.data = null;
    }
  }
  class VolumeChunkSource extends SliceViewChunkSourceBackend {
    constructor(rpc2, options) {
      super(rpc2, options);
      const rank = this.spec.rank;
      this.tempChunkDataSize = new Uint32Array(rank);
      this.tempChunkPosition = new Float32Array(rank);
    }
    computeChunkBounds(chunk) {
      const {spec} = this;
      const {upperVoxelBound, rank} = spec;
      let origChunkDataSize = spec.chunkDataSize;
      let newChunkDataSize = this.tempChunkDataSize;
      const chunkPosition = multiply6(this.tempChunkPosition, chunk.chunkGridPosition, origChunkDataSize);
      let partial = false;
      for (let i = 0; i < rank; ++i) {
        let upper = Math.min(upperVoxelBound[i], chunkPosition[i] + origChunkDataSize[i]);
        let size = newChunkDataSize[i] = upper - chunkPosition[i];
        if (size !== origChunkDataSize[i]) {
          partial = true;
        }
      }
      add6(chunkPosition, chunkPosition, this.spec.baseVoxelOffset);
      if (partial) {
        chunk.chunkDataSize = Uint32Array.from(newChunkDataSize);
      } else {
        chunk.chunkDataSize = origChunkDataSize;
      }
      return chunkPosition;
    }
  }
  VolumeChunkSource.prototype.chunkConstructor = VolumeChunk;

  // src/neuroglancer/util/string.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function defaultStringCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  // src/neuroglancer/datasource/brainmaps/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const CHUNK_DECODERS = new Map([
    [
      VolumeChunkEncoding.RAW,
      decodeRawChunk
    ],
    [VolumeChunkEncoding.JPEG, decodeJpegChunk],
    [
      VolumeChunkEncoding.COMPRESSED_SEGMENTATION,
      decodeCompressedSegmentationChunk
    ]
  ]);
  function applyChangeStack(changeStack, payload) {
    if (!changeStack) {
      return;
    }
    payload.change_spec = {
      change_stack_id: changeStack.changeStackId
    };
    if (changeStack.timeStamp) {
      payload.change_spec.time_stamp = changeStack.timeStamp;
    }
    if (changeStack.skipEquivalences) {
      payload.change_spec.skip_equivalences = changeStack.skipEquivalences;
    }
  }
  function BrainmapsSource(Base, parametersConstructor) {
    return WithParameters(WithSharedCredentialsProviderCounterpart()(Base), parametersConstructor);
  }
  const tempUint642 = new Uint64();
  let BrainmapsVolumeChunkSource = class extends BrainmapsSource(VolumeChunkSource, VolumeSourceParameters) {
    constructor() {
      super(...arguments);
      this.chunkDecoder = CHUNK_DECODERS.get(this.parameters.encoding);
    }
    applyEncodingParams(payload) {
      let {encoding} = this.parameters;
      switch (encoding) {
        case VolumeChunkEncoding.RAW:
          payload.subvolume_format = "RAW";
          break;
        case VolumeChunkEncoding.JPEG:
          payload.subvolume_format = "SINGLE_IMAGE";
          payload.image_format_options = {
            image_format: "JPEG",
            jpeg_quality: 70
          };
          return;
        case VolumeChunkEncoding.COMPRESSED_SEGMENTATION:
          payload.subvolume_format = "RAW";
          payload.image_format_options = {
            compressed_segmentation_block_size: vec3Key(this.spec.compressedSegmentationBlockSize)
          };
          break;
        default:
          throw new Error(`Invalid encoding: ${encoding}`);
      }
    }
    async download(chunk, cancellationToken) {
      let {parameters} = this;
      let path;
      let chunkPosition = this.computeChunkBounds(chunk);
      let chunkDataSize = chunk.chunkDataSize;
      path = `/v1/volumes/${parameters["volumeId"]}/subvolume:binary`;
      let payload = {
        geometry: {
          corner: vec3Key(chunkPosition),
          size: vec3Key(chunkDataSize),
          scale: parameters.scaleIndex
        }
      };
      this.applyEncodingParams(payload);
      applyChangeStack(parameters.changeSpec, payload);
      const response = await makeRequest(parameters["instance"], this.credentialsProvider, {
        method: "POST",
        payload: JSON.stringify(payload),
        path,
        responseType: "arraybuffer"
      }, cancellationToken);
      await this.chunkDecoder(chunk, cancellationToken, response);
    }
  };
  BrainmapsVolumeChunkSource = __decorate([
    registerSharedObject()
  ], BrainmapsVolumeChunkSource);
  function getFragmentCorner(fragmentId, xBits, yBits, zBits) {
    const id = new Uint64();
    if (!id.tryParseString(fragmentId, 16)) {
      throw new Error(`Couldn't parse fragmentId ${fragmentId} as hex-encoded Uint64`);
    }
    return decodeZIndexCompressed(id, xBits, yBits, zBits);
  }
  function decodeMultiscaleManifestChunk(chunk, response) {
    verifyObject(response);
    const source = chunk.source;
    const fragmentKeys = verifyObjectProperty(response, "fragmentKey", verifyStringArray);
    const supervoxelIds = verifyObjectProperty(response, "supervoxelId", verifyStringArray);
    const length4 = fragmentKeys.length;
    if (length4 !== supervoxelIds.length) {
      throw new Error("Expected fragmentKey and supervoxelId arrays to have the same length.");
    }
    const fragmentSupervoxelIds = new Map();
    fragmentKeys.forEach((fragmentId, i) => {
      let ids = fragmentSupervoxelIds.get(fragmentId);
      if (ids === void 0) {
        ids = [];
        fragmentSupervoxelIds.set(fragmentId, ids);
      }
      ids.push(supervoxelIds[i]);
    });
    const {chunkShape} = source.parameters.info;
    const gridShape = source.parameters.info.lods[0].gridShape;
    const xBits = Math.ceil(Math.log2(gridShape[0])), yBits = Math.ceil(Math.log2(gridShape[1])), zBits = Math.ceil(Math.log2(gridShape[2]));
    const fragmentIdAndCorners = Array.from(fragmentSupervoxelIds.entries()).map(([id, supervoxelIds2]) => ({
      fragmentId: id,
      corner: getFragmentCorner(id, xBits, yBits, zBits),
      supervoxelIds: supervoxelIds2
    }));
    fragmentIdAndCorners.sort((a, b) => {
      return zorder3LessThan(a.corner[0], a.corner[1], a.corner[2], b.corner[0], b.corner[1], b.corner[2]) ? -1 : 1;
    });
    let clipLowerBound, clipUpperBound;
    let minNumLods = 0;
    let octree;
    if (length4 === 0) {
      clipLowerBound = clipUpperBound = kZeroVec;
      octree = Uint32Array.of(0, 0, 0, 0, 2147483648);
    } else {
      const minCoord = vec3_exports.clone(kInfinityVec);
      const maxCoord = vec3_exports.clone(kZeroVec);
      fragmentIdAndCorners.forEach((x) => {
        const {corner} = x;
        for (let i = 0; i < 3; ++i) {
          minCoord[i] = Math.min(minCoord[i], corner[i]);
          maxCoord[i] = Math.max(maxCoord[i], corner[i]);
        }
      });
      minNumLods = 1;
      while (maxCoord[0] >>> minNumLods - 1 != minCoord[0] >>> minNumLods - 1 || maxCoord[1] >>> minNumLods - 1 != minCoord[1] >>> minNumLods - 1 || maxCoord[2] >>> minNumLods - 1 != minCoord[2] >>> minNumLods - 1) {
        ++minNumLods;
      }
      clipLowerBound = vec3_exports.multiply(minCoord, minCoord, chunkShape);
      clipUpperBound = vec3_exports.add(maxCoord, vec3_exports.multiply(maxCoord, maxCoord, chunkShape), chunkShape);
    }
    const {lods} = source.parameters.info;
    const lodScales = new Float32Array(Math.max(lods.length, minNumLods));
    for (let lodIndex = 0; lodIndex < lods.length; ++lodIndex) {
      lodScales[lodIndex] = lods[lodIndex].scale;
    }
    if (length4 !== 0) {
      const octreeTemp = new Uint32Array(fragmentIdAndCorners.length * lodScales.length * 5);
      fragmentIdAndCorners.forEach((x, i) => {
        octreeTemp.set(x.corner, i * 5);
        octreeTemp[i * 5] = x.corner[0];
      });
      let priorStart = 0;
      let priorEnd = fragmentIdAndCorners.length;
      for (let lod = 1; lod < lodScales.length; ++lod) {
        const curEnd = generateHigherOctreeLevel(octreeTemp, priorStart, priorEnd);
        priorStart = priorEnd;
        priorEnd = curEnd;
      }
      octree = octreeTemp.slice(0, priorEnd * 5);
    }
    const manifest = {
      chunkShape,
      chunkGridSpatialOrigin: kZeroVec,
      clipLowerBound,
      clipUpperBound,
      octree,
      lodScales,
      vertexOffsets: new Float32Array(lodScales.length * 3)
    };
    chunk.manifest = manifest;
    chunk.fragmentSupervoxelIds = fragmentIdAndCorners;
  }
  const maxMeshBatchSize = 255;
  function decodeBatchMeshResponse(response, callback) {
    let length4 = response.byteLength;
    let index2 = 0;
    const dataView = new DataView(response);
    const headerSize = 8 + 8 + 8 + 8;
    while (index2 < length4) {
      if (index2 + headerSize > length4) {
        throw new Error(`Invalid batch mesh fragment response.`);
      }
      const objectIdLow = dataView.getUint32(index2, true);
      const objectIdHigh = dataView.getUint32(index2 + 4, true);
      const objectIdString = new Uint64(objectIdLow, objectIdHigh).toString();
      const prefix = objectIdString + "\0";
      index2 += 8;
      const fragmentKeyLength = dataView.getUint32(index2, true);
      const fragmentKeyLengthHigh = dataView.getUint32(index2 + 4, true);
      index2 += 8;
      if (fragmentKeyLengthHigh !== 0) {
        throw new Error(`Invalid batch mesh fragment response.`);
      }
      if (index2 + fragmentKeyLength + 8 + 8 > length4) {
        throw new Error(`Invalid batch mesh fragment response.`);
      }
      const fragmentKey = new TextDecoder().decode(new Uint8Array(response, index2, fragmentKeyLength));
      const fullKey = prefix + fragmentKey;
      index2 += fragmentKeyLength;
      const numVertices = dataView.getUint32(index2, true);
      const numVerticesHigh = dataView.getUint32(index2 + 4, true);
      index2 += 8;
      const numTriangles = dataView.getUint32(index2, true);
      const numTrianglesHigh = dataView.getUint32(index2 + 4, true);
      index2 += 8;
      if (numVerticesHigh !== 0 || numTrianglesHigh !== 0) {
        throw new Error(`Invalid batch mesh fragment response.`);
      }
      const endOffset = index2 + numTriangles * 12 + numVertices * 12;
      if (endOffset > length4) {
        throw new Error(`Invalid batch mesh fragment response.`);
      }
      callback({
        fullKey,
        buffer: response,
        verticesOffset: index2,
        numVertices,
        indicesOffset: index2 + 12 * numVertices,
        numIndices: numTriangles * 3
      });
      index2 = endOffset;
    }
  }
  function combineBatchMeshFragments(fragments) {
    let totalVertices = 0, totalIndices = 0;
    for (let fragment of fragments) {
      totalVertices += fragment.numVertices;
      totalIndices += fragment.numIndices;
    }
    const vertexBuffer = new Float32Array(totalVertices * 3);
    const indexBuffer = new Uint32Array(totalIndices);
    let vertexOffset = 0;
    let indexOffset = 0;
    for (const fragment of fragments) {
      vertexBuffer.set(new Float32Array(fragment.buffer, fragment.verticesOffset, fragment.numVertices * 3), vertexOffset * 3);
      const {numIndices} = fragment;
      const sourceIndices = new Uint32Array(fragment.buffer, fragment.indicesOffset, numIndices);
      convertEndian32(sourceIndices, Endianness.LITTLE);
      for (let i = 0; i < numIndices; ++i) {
        indexBuffer[indexOffset++] = sourceIndices[i] + vertexOffset;
      }
      vertexOffset += fragment.numVertices;
    }
    convertEndian32(vertexBuffer, Endianness.LITTLE);
    return {vertexPositions: vertexBuffer, indices: indexBuffer};
  }
  async function makeBatchMeshRequest(credentialsProvider, parameters, ids, cancellationToken) {
    const path = `/v1/objects/meshes:batch`;
    const batches = [];
    let prevObjectId;
    let batchSize = 0;
    const pendingIds = new Map();
    for (const [id, idData] of ids) {
      pendingIds.set(id, idData);
      ids.delete(id);
      const splitIndex = id.indexOf("\0");
      const objectId = id.substring(0, splitIndex);
      const fragmentId = id.substring(splitIndex + 1);
      if (objectId !== prevObjectId) {
        batches.push({object_id: objectId, fragment_keys: []});
      }
      batches[batches.length - 1].fragment_keys.push(fragmentId);
      if (++batchSize === maxMeshBatchSize)
        break;
    }
    const payload = {
      volume_id: parameters.volumeId,
      mesh_name: parameters.meshName,
      batches
    };
    try {
      return await makeRequest(parameters["instance"], credentialsProvider, {
        method: "POST",
        path,
        payload: JSON.stringify(payload),
        responseType: "arraybuffer"
      }, cancellationToken);
    } finally {
      for (const [id, idData] of pendingIds) {
        ids.set(id, idData);
      }
    }
  }
  let BrainmapsMultiscaleMeshSource = class extends BrainmapsSource(MultiscaleMeshSource, MultiscaleMeshSourceParameters) {
    constructor() {
      super(...arguments);
      this.listFragmentsParams = (() => {
        const {parameters} = this;
        const {changeSpec} = parameters;
        if (changeSpec !== void 0) {
          return `&header.changeStackId=${changeSpec.changeStackId}`;
        }
        return "";
      })();
    }
    download(chunk, cancellationToken) {
      let {parameters} = this;
      const path = `/v1/objects/${parameters["volumeId"]}/meshes/${parameters.info.lods[0].info.name}:listfragments?object_id=${chunk.objectId}&return_supervoxel_ids=true` + this.listFragmentsParams;
      return makeRequest(parameters["instance"], this.credentialsProvider, {
        method: "GET",
        path,
        responseType: "json"
      }, cancellationToken).then((response) => decodeMultiscaleManifestChunk(chunk, response));
    }
    async downloadFragment(chunk, cancellationToken) {
      const {parameters} = this;
      const manifestChunk = chunk.manifestChunk;
      const {fragmentSupervoxelIds} = manifestChunk;
      const manifest = manifestChunk.manifest;
      const {lod} = chunk;
      const {octree} = manifest;
      const numBaseChunks = fragmentSupervoxelIds.length;
      const row = chunk.chunkIndex;
      let startChunkIndex = row;
      while (startChunkIndex >= numBaseChunks) {
        startChunkIndex = octree[startChunkIndex * 5 + 3];
      }
      let endChunkIndex = row + 1;
      while (endChunkIndex > numBaseChunks) {
        endChunkIndex = octree[endChunkIndex * 5 - 1] & 2147483647;
      }
      const {relativeBlockShape, gridShape} = parameters.info.lods[lod];
      const xBits = Math.ceil(Math.log2(gridShape[0])), yBits = Math.ceil(Math.log2(gridShape[1])), zBits = Math.ceil(Math.log2(gridShape[2]));
      let ids = new Map();
      for (let chunkIndex = startChunkIndex; chunkIndex < endChunkIndex; ++chunkIndex) {
        const gridX = Math.floor(octree[chunkIndex * 5] / relativeBlockShape[0]), gridY = Math.floor(octree[chunkIndex * 5 + 1] / relativeBlockShape[1]), gridZ = Math.floor(octree[chunkIndex * 5 + 2] / relativeBlockShape[2]);
        const fragmentKey = encodeZIndexCompressed(tempUint642, xBits, yBits, zBits, gridX, gridY, gridZ).toString(16).padStart(16, "0");
        const entry = fragmentSupervoxelIds[chunkIndex];
        for (const supervoxelId of entry.supervoxelIds) {
          ids.set(supervoxelId + "\0" + fragmentKey, chunkIndex);
        }
      }
      let prevLod = Math.max(0, lod - 1);
      let fragments = [];
      const idArray = Array.from(ids);
      idArray.sort((a, b) => defaultStringCompare(a[0], b[0]));
      ids = new Map(idArray);
      const meshName = parameters.info.lods[lod].info.name;
      const parallelRequests = true;
      await new Promise((resolve, reject) => {
        let requestsInProgress = 0;
        let error = false;
        const maybeIssueMoreRequests = () => {
          if (error)
            return;
          while (ids.size !== 0) {
            ++requestsInProgress;
            makeBatchMeshRequest(this.credentialsProvider, {instance: parameters.instance, volumeId: parameters.volumeId, meshName}, ids, cancellationToken).then((response) => {
              --requestsInProgress;
              decodeBatchMeshResponse(response, (fragment) => {
                const chunkIndex = ids.get(fragment.fullKey);
                if (!ids.delete(fragment.fullKey)) {
                  throw new Error(`Received unexpected fragment key: ${JSON.stringify(fragment.fullKey)}.`);
                }
                fragment.chunkIndex = chunkIndex;
                fragments.push(fragment);
              });
              maybeIssueMoreRequests();
            }).catch((e) => {
              error = true;
              reject(e);
            });
            if (!parallelRequests)
              break;
          }
          chunk.downloadSlots = Math.max(1, requestsInProgress);
          if (requestsInProgress === 0) {
            resolve();
            return;
          }
        };
        maybeIssueMoreRequests();
      });
      fragments.sort((a, b) => a.chunkIndex - b.chunkIndex);
      let indexOffset = 0;
      const numSubChunks = 1 << 3 * (lod - prevLod);
      const subChunkOffsets = new Uint32Array(numSubChunks + 1);
      let prevSubChunkIndex = 0;
      for (const fragment of fragments) {
        const row2 = fragment.chunkIndex;
        const subChunkIndex = getOctreeChildIndex(octree[row2 * 5] >>> prevLod, octree[row2 * 5 + 1] >>> prevLod, octree[row2 * 5 + 2] >>> prevLod) & numSubChunks - 1;
        subChunkOffsets.fill(indexOffset, prevSubChunkIndex + 1, subChunkIndex + 1);
        prevSubChunkIndex = subChunkIndex;
        indexOffset += fragment.numIndices;
      }
      subChunkOffsets.fill(indexOffset, prevSubChunkIndex + 1, numSubChunks + 1);
      assignMultiscaleMeshFragmentData(chunk, {...combineBatchMeshFragments(fragments), subChunkOffsets}, VertexPositionFormat.float32);
    }
  };
  BrainmapsMultiscaleMeshSource = __decorate([
    registerSharedObject()
  ], BrainmapsMultiscaleMeshSource);
  function groupFragmentsIntoBatches(ids) {
    const batches = [];
    let index2 = 0;
    const length4 = ids.length;
    while (index2 < length4) {
      batches.push(JSON.stringify(ids.slice(index2, index2 + maxMeshBatchSize)));
      index2 += maxMeshBatchSize;
    }
    return batches;
  }
  function decodeManifestChunkWithSupervoxelIds(chunk, response) {
    verifyObject(response);
    const fragmentKeys = verifyObjectProperty(response, "fragmentKey", verifyStringArray);
    const supervoxelIds = verifyObjectProperty(response, "supervoxelId", verifyStringArray);
    const length4 = fragmentKeys.length;
    if (length4 !== supervoxelIds.length) {
      throw new Error("Expected fragmentKey and supervoxelId arrays to have the same length.");
    }
    let fragmentIds = supervoxelIds.map((supervoxelId, index2) => supervoxelId + "\0" + fragmentKeys[index2]);
    chunk.fragmentIds = groupFragmentsIntoBatches(fragmentIds);
  }
  let BrainmapsMeshSource = class extends BrainmapsSource(MeshSource, MeshSourceParameters) {
    constructor() {
      super(...arguments);
      this.listFragmentsParams = (() => {
        const {parameters} = this;
        const {changeSpec} = parameters;
        if (changeSpec !== void 0) {
          return `&header.changeStackId=${changeSpec.changeStackId}`;
        }
        return "";
      })();
    }
    download(chunk, cancellationToken) {
      let {parameters} = this;
      const path = `/v1/objects/${parameters["volumeId"]}/meshes/${parameters["meshName"]}:listfragments?object_id=${chunk.objectId}&return_supervoxel_ids=true` + this.listFragmentsParams;
      return makeRequest(parameters["instance"], this.credentialsProvider, {
        method: "GET",
        path,
        responseType: "json"
      }, cancellationToken).then((response) => decodeManifestChunkWithSupervoxelIds(chunk, response));
    }
    async downloadFragment(chunk, cancellationToken) {
      let {parameters} = this;
      const ids = new Map();
      for (const id of JSON.parse(chunk.fragmentId)) {
        ids.set(id, null);
      }
      let fragments = [];
      const {credentialsProvider} = this;
      while (ids.size !== 0) {
        const response = await makeBatchMeshRequest(credentialsProvider, parameters, ids, cancellationToken);
        decodeBatchMeshResponse(response, (fragment) => {
          if (!ids.delete(fragment.fullKey)) {
            throw new Error(`Received unexpected fragment key: ${JSON.stringify(fragment.fullKey)}.`);
          }
          fragments.push(fragment);
        });
      }
      assignMeshFragmentData(chunk, combineBatchMeshFragments(fragments));
    }
  };
  BrainmapsMeshSource = __decorate([
    registerSharedObject()
  ], BrainmapsMeshSource);
  function decodeSkeletonChunk(chunk, response) {
    let dv = new DataView(response);
    let numVertices = dv.getUint32(0, true);
    let numVerticesHigh = dv.getUint32(4, true);
    if (numVerticesHigh !== 0) {
      throw new Error(`The number of vertices should not exceed 2^32-1.`);
    }
    let numEdges = dv.getUint32(8, true);
    let numEdgesHigh = dv.getUint32(12, true);
    if (numEdgesHigh !== 0) {
      throw new Error(`The number of edges should not exceed 2^32-1.`);
    }
    decodeSkeletonVertexPositionsAndIndices(chunk, response, Endianness.LITTLE, 16, numVertices, void 0, numEdges);
  }
  let BrainmapsSkeletonSource = class extends BrainmapsSource(SkeletonSource, SkeletonSourceParameters) {
    download(chunk, cancellationToken) {
      const {parameters} = this;
      let payload = {
        object_id: `${chunk.objectId}`
      };
      const path = `/v1/objects/${parameters["volumeId"]}/meshes/${parameters.meshName}/skeleton:binary`;
      applyChangeStack(parameters.changeSpec, payload);
      return makeRequest(parameters["instance"], this.credentialsProvider, {
        method: "POST",
        path,
        payload: JSON.stringify(payload),
        responseType: "arraybuffer"
      }, cancellationToken).then((response) => decodeSkeletonChunk(chunk, response));
    }
  };
  BrainmapsSkeletonSource = __decorate([
    registerSharedObject()
  ], BrainmapsSkeletonSource);
  const spatialAnnotationTypes = ["LOCATION", "LINE", "VOLUME"];
  function parseCommaSeparatedPoint(x) {
    const pattern = /(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/;
    const cornerParts = x.match(pattern);
    if (cornerParts === null) {
      throw new Error(`Error parsing number triplet: ${JSON.stringify(x)}.`);
    }
    return vec3_exports.fromValues(parseFloat(cornerParts[1]), parseFloat(cornerParts[2]), parseFloat(cornerParts[3]));
  }
  function getIdPrefix(parameters) {
    return parameters.volumeId + ":" + parameters.changestack + ":";
  }
  function parseBrainmapsAnnotationId(idPrefix, fullId) {
    if (!fullId.startsWith(idPrefix)) {
      throw new Error(`Received annotation id ${JSON.stringify(fullId)} does not have expected prefix of ${JSON.stringify(idPrefix)}.`);
    }
    const id = fullId.substring(idPrefix.length);
    return id;
  }
  function parseObjectLabels(obj) {
    if (obj == null) {
      return void 0;
    }
    return [parseArray(obj, (x) => Uint64.parseString("" + x, 10))];
  }
  function parseAnnotation(entry, idPrefix, expectedId) {
    const corner = verifyObjectProperty(entry, "corner", (x) => parseCommaSeparatedPoint(verifyString(x)));
    const size = verifyObjectProperty(entry, "size", (x) => parseCommaSeparatedPoint(verifyString(x)));
    const description = verifyObjectProperty(entry, "payload", verifyOptionalString);
    const spatialAnnotationType = verifyObjectProperty(entry, "type", verifyString);
    const fullId = verifyObjectProperty(entry, "id", verifyString);
    const id = parseBrainmapsAnnotationId(idPrefix, fullId);
    const segments = verifyObjectProperty(entry, "objectLabels", parseObjectLabels);
    if (expectedId !== void 0 && id !== expectedId) {
      throw new Error(`Received annotation has unexpected id ${JSON.stringify(fullId)}.`);
    }
    switch (spatialAnnotationType) {
      case "LOCATION":
        if (vec3_exports.equals(size, kZeroVec)) {
          return {
            type: AnnotationType.POINT,
            id,
            point: corner,
            description,
            relatedSegments: segments,
            properties: []
          };
        } else {
          const radii = vec3_exports.scale(vec3_exports.create(), size, 0.5);
          const center = vec3_exports.add(vec3_exports.create(), corner, radii);
          return {
            type: AnnotationType.ELLIPSOID,
            id,
            center,
            radii,
            description,
            relatedSegments: segments,
            properties: []
          };
        }
      case "LINE":
        return {
          type: AnnotationType.LINE,
          id,
          pointA: corner,
          pointB: vec3_exports.add(vec3_exports.create(), corner, size),
          description,
          relatedSegments: segments,
          properties: []
        };
      case "VOLUME":
        return {
          type: AnnotationType.AXIS_ALIGNED_BOUNDING_BOX,
          id,
          pointA: corner,
          pointB: vec3_exports.add(vec3_exports.create(), corner, size),
          description,
          relatedSegments: segments,
          properties: []
        };
      default:
        throw new Error(`Unknown spatial annotation type: ${JSON.stringify(spatialAnnotationType)}.`);
    }
  }
  function parseAnnotationResponse(response, idPrefix, expectedId) {
    verifyObject(response);
    const entry = verifyObjectProperty(response, "annotations", (x) => parseFixedLengthArray([void 0], x, verifyObject))[0];
    return parseAnnotation(entry, idPrefix, expectedId);
  }
  const annotationPropertySerializer = new AnnotationPropertySerializer(3, []);
  function parseAnnotations(chunk, responses) {
    const serializer = new AnnotationSerializer(annotationPropertySerializer);
    const source = chunk.source.parent;
    const idPrefix = getIdPrefix(source.parameters);
    responses.forEach((response, responseIndex) => {
      try {
        verifyObject(response);
        const annotationsArray = verifyObjectProperty(response, "annotations", (x) => x === void 0 ? [] : x);
        if (!Array.isArray(annotationsArray)) {
          throw new Error(`Expected array, but received ${JSON.stringify(typeof annotationsArray)}.`);
        }
        for (const entry of annotationsArray) {
          try {
            serializer.add(parseAnnotation(entry, idPrefix));
          } catch (e) {
            throw new Error(`Error parsing annotation: ${e.message}`);
          }
        }
      } catch (parseError) {
        throw new Error(`Error parsing ${spatialAnnotationTypes[responseIndex]} annotations: ${parseError.message}`);
      }
    });
    chunk.data = Object.assign(new AnnotationGeometryData(), serializer.serialize());
  }
  function getSpatialAnnotationTypeFromId(id) {
    const index2 = id.indexOf(".");
    return id.substring(0, index2);
  }
  function toCommaSeparated(v) {
    return `${Math.round(v[0])},${Math.round(v[1])},${Math.round(v[2])}`;
  }
  function getFullSpatialAnnotationId(parameters, id) {
    return `${parameters.volumeId}:${parameters.changestack}:${id}`;
  }
  function annotationToBrainmaps(annotation9) {
    const payload = annotation9.description || "";
    const objectLabels = annotation9.relatedSegments === void 0 ? void 0 : annotation9.relatedSegments[0].map((x) => x.toString());
    switch (annotation9.type) {
      case AnnotationType.LINE: {
        const {pointA, pointB} = annotation9;
        const size = vec3_exports.subtract(vec3_exports.create(), pointB, pointA);
        return {
          type: "LINE",
          corner: toCommaSeparated(pointA),
          size: toCommaSeparated(size),
          object_labels: objectLabels,
          payload
        };
      }
      case AnnotationType.AXIS_ALIGNED_BOUNDING_BOX: {
        const {pointA, pointB} = annotation9;
        const minPoint = min3(vec3_exports.create(), pointA, pointB);
        const maxPoint = max3(vec3_exports.create(), pointA, pointB);
        const size = vec3_exports.subtract(maxPoint, maxPoint, minPoint);
        return {
          type: "VOLUME",
          corner: toCommaSeparated(minPoint),
          size: toCommaSeparated(size),
          object_labels: objectLabels,
          payload
        };
      }
      case AnnotationType.POINT: {
        return {
          type: "LOCATION",
          corner: toCommaSeparated(annotation9.point),
          size: "0,0,0",
          object_labels: objectLabels,
          payload
        };
      }
      case AnnotationType.ELLIPSOID: {
        const corner = vec3_exports.subtract(vec3_exports.create(), annotation9.center, annotation9.radii);
        const size = vec3_exports.scale(vec3_exports.create(), annotation9.radii, 2);
        return {
          type: "LOCATION",
          corner: toCommaSeparated(corner),
          size: toCommaSeparated(size),
          object_labels: objectLabels,
          payload
        };
      }
    }
  }
  let BrainmapsAnnotationGeometryChunkSource = class extends BrainmapsSource(AnnotationGeometryChunkSourceBackend, AnnotationSpatialIndexSourceParameters) {
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      return Promise.all(spatialAnnotationTypes.map((spatialAnnotationType) => makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:get`,
        payload: JSON.stringify({
          type: spatialAnnotationType,
          ignore_payload: true
        }),
        responseType: "json"
      }, cancellationToken))).then((values) => {
        parseAnnotations(chunk, values);
      });
    }
  };
  BrainmapsAnnotationGeometryChunkSource = __decorate([
    registerSharedObject()
  ], BrainmapsAnnotationGeometryChunkSource);
  let BrainmapsAnnotationSource = class extends BrainmapsSource(AnnotationSource2, AnnotationSourceParameters) {
    downloadSegmentFilteredGeometry(chunk, _relationshipIndex, cancellationToken) {
      const {parameters} = this;
      return Promise.all(spatialAnnotationTypes.map((spatialAnnotationType) => makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:get`,
        payload: JSON.stringify({
          type: spatialAnnotationType,
          object_labels: [chunk.objectId.toString()],
          ignore_payload: true
        }),
        responseType: "json"
      }, cancellationToken))).then((values) => {
        parseAnnotations(chunk, values);
      });
    }
    downloadMetadata(chunk, cancellationToken) {
      const {parameters} = this;
      const id = chunk.key;
      return makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:get`,
        payload: JSON.stringify({
          type: getSpatialAnnotationTypeFromId(id),
          id: getFullSpatialAnnotationId(parameters, id)
        }),
        responseType: "json"
      }, cancellationToken).then((response) => {
        chunk.annotation = parseAnnotationResponse(response, getIdPrefix(parameters), id);
      }, () => {
        chunk.annotation = null;
      });
    }
    add(annotation9) {
      const {parameters} = this;
      const brainmapsAnnotation = annotationToBrainmaps(annotation9);
      return makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:push`,
        payload: JSON.stringify({annotations: [brainmapsAnnotation]}),
        responseType: "json"
      }).then((response) => {
        verifyObject(response);
        const ids = verifyObjectProperty(response, "ids", verifyStringArray);
        if (ids.length !== 1) {
          throw new Error(`Expected list of 1 id, but received ${JSON.stringify(ids)}.`);
        }
        const idPrefix = getIdPrefix(this.parameters);
        return parseBrainmapsAnnotationId(idPrefix, ids[0]);
      });
    }
    update(id, annotation9) {
      const {parameters} = this;
      const brainmapsAnnotation = annotationToBrainmaps(annotation9);
      brainmapsAnnotation.id = getFullSpatialAnnotationId(parameters, id);
      return makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:push`,
        payload: JSON.stringify({annotations: [brainmapsAnnotation]}),
        responseType: "json"
      });
    }
    delete(id) {
      const {parameters} = this;
      return makeRequest(parameters.instance, this.credentialsProvider, {
        method: "POST",
        path: `/v1/changes/${parameters.volumeId}/${parameters.changestack}/spatials:delete`,
        payload: JSON.stringify({
          type: getSpatialAnnotationTypeFromId(id),
          ids: [getFullSpatialAnnotationId(parameters, id)]
        }),
        responseType: "json"
      });
    }
  };
  BrainmapsAnnotationSource = __decorate([
    registerSharedObject()
  ], BrainmapsAnnotationSource);

  // src/neuroglancer/datasource/boss/api.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function fetchWithBossCredentials(credentialsProvider, input, init, transformResponse, cancellationToken = uncancelableToken) {
    return fetchWithCredentials(credentialsProvider, input, init, transformResponse, (credentials) => {
      const headers = new Headers(init.headers);
      headers.set("Authorization", `Bearer ${credentials}`);
      return {...init, headers};
    }, (error) => {
      const {status: status3} = error;
      if (status3 === 403 || status3 === 401) {
        return "refresh";
      }
      if (status3 === 504) {
        return "retry";
      }
      throw error;
    }, cancellationToken);
  }

  // src/neuroglancer/datasource/boss/base.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class BossSourceParameters {
  }
  class VolumeChunkSourceParameters extends BossSourceParameters {
    static stringify(parameters) {
      return `boss:volume:${parameters.baseUrl}/${parameters.collection}/${parameters.experiment}/${parameters.channel}/${parameters.resolution}/${parameters.encoding}`;
    }
  }
  VolumeChunkSourceParameters.RPC_ID = "boss/VolumeChunkSource";
  class MeshSourceParameters2 {
    static stringify(parameters) {
      return `boss:mesh:${parameters.baseUrl}`;
    }
  }
  MeshSourceParameters2.RPC_ID = "boss/MeshChunkSource";

  // src/neuroglancer/async_computation/decode_gzip_request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const decodeGzip = asyncComputation("decodeGzip");

  // src/neuroglancer/util/numpy_dtype.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const supportedDataTypes = new Map();
  supportedDataTypes.set("|u1", {
    endianness: Endianness.LITTLE,
    dataType: DataType.UINT8
  });
  supportedDataTypes.set("|i1", {
    endianness: Endianness.LITTLE,
    dataType: DataType.INT8
  });
  for (let [endiannessChar, endianness] of [
    ["<", Endianness.LITTLE],
    [">", Endianness.BIG]
  ]) {
    for (let typeChar of ["u", "i"]) {
      supportedDataTypes.set(`${endiannessChar}${typeChar}8`, {
        endianness,
        dataType: DataType.UINT64
      });
    }
    supportedDataTypes.set(`${endiannessChar}u2`, {
      endianness,
      dataType: DataType.UINT16
    });
    supportedDataTypes.set(`${endiannessChar}i2`, {
      endianness,
      dataType: DataType.INT16
    });
    supportedDataTypes.set(`${endiannessChar}u4`, {
      endianness,
      dataType: DataType.UINT32
    });
    supportedDataTypes.set(`${endiannessChar}i4`, {
      endianness,
      dataType: DataType.INT32
    });
    supportedDataTypes.set(`${endiannessChar}f4`, {
      endianness,
      dataType: DataType.FLOAT32
    });
  }
  function parseNumpyDtype(typestr) {
    const dtype = supportedDataTypes.get(typestr);
    if (dtype === void 0) {
      throw new Error(`Unsupported numpy data type: ${JSON.stringify(typestr)}`);
    }
    return dtype;
  }

  // src/neuroglancer/util/npy.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class NumpyArray {
    constructor(data, shape, dataType, fortranOrder) {
      this.data = data;
      this.shape = shape;
      this.dataType = dataType;
      this.fortranOrder = fortranOrder;
    }
  }
  function parseNpy(x) {
    if (x[0] !== 147 || x[1] !== 78 || x[2] !== 85 || x[3] !== 77 || x[4] !== 80 || x[5] !== 89) {
      throw new Error("Data does not match npy format.");
    }
    const majorVersion = x[6], minorVersion = x[7];
    if (majorVersion !== 1 || minorVersion !== 0) {
      throw new Error(`Unsupported npy version ${majorVersion}.${minorVersion}`);
    }
    const dv = new DataView(x.buffer, x.byteOffset, x.byteLength);
    const headerLength = dv.getUint16(8, true);
    const header = new TextDecoder("utf-8").decode(x.subarray(10, headerLength + 10));
    let headerObject;
    const dataOffset = headerLength + 10;
    try {
      headerObject = pythonLiteralParse(header);
    } catch (e) {
      throw new Error(`Failed to parse npy header: ${e}`);
    }
    const dtype = headerObject["descr"];
    let shape = headerObject["shape"];
    let numElements = 1;
    if (!Array.isArray(shape)) {
      throw new Error("Invalid shape ${JSON.stringify(shape)}");
    }
    for (let dim of shape) {
      if (typeof dim !== "number") {
        throw new Error("Invalid shape ${JSON.stringify(shape)}");
      }
      numElements *= dim;
    }
    const {dataType, endianness} = parseNumpyDtype(dtype);
    const bytesPerElement = DATA_TYPE_BYTES[dataType];
    const javascriptElementsPerArrayElement = DATA_TYPE_JAVASCRIPT_ELEMENTS_PER_ARRAY_ELEMENT[dataType];
    const arrayConstructor = DATA_TYPE_ARRAY_CONSTRUCTOR[dataType];
    const javascriptElements = javascriptElementsPerArrayElement * numElements;
    if (bytesPerElement * numElements + dataOffset !== x.byteLength) {
      throw new Error("Expected length does not match length of data");
    }
    const data = new arrayConstructor(x.buffer, x.byteOffset + dataOffset, javascriptElements);
    convertEndian(data, endianness, bytesPerElement);
    return new NumpyArray(data, shape, dataType, headerObject["fortran_order"] === true);
  }

  // src/neuroglancer/sliceview/backend_chunk_decoders/bossNpz.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeBossNpzChunk(chunk, cancellationToken, response) {
    let parseResult = parseNpy(await requestAsyncComputation(decodeGzip, cancellationToken, [response], new Uint8Array(response)));
    let chunkDataSize = chunk.chunkDataSize;
    let source = chunk.source;
    let {shape} = parseResult;
    if (shape.length !== 3 || shape[0] !== chunkDataSize[2] || shape[1] !== chunkDataSize[1] || shape[2] !== chunkDataSize[0]) {
      throw new Error(`Shape ${JSON.stringify(shape)} does not match chunkDataSize ${vec3Key(chunkDataSize)}`);
    }
    let parsedDataType = parseResult.dataType;
    let {spec} = source;
    if (parsedDataType !== spec.dataType) {
      throw new Error(`Data type ${DataType[parsedDataType]} does not match expected data type ${DataType[spec.dataType]}`);
    }
    await postProcessRawData(chunk, cancellationToken, parseResult.data);
  }

  // src/neuroglancer/datasource/boss/backend.ts
  /**
   * @license
   * Copyright 2017 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let chunkDecoders = new Map();
  chunkDecoders.set("npz", decodeBossNpzChunk);
  chunkDecoders.set("jpeg", decodeJpegChunk);
  let acceptHeaders = new Map();
  acceptHeaders.set("npz", "application/npygz");
  acceptHeaders.set("jpeg", "image/jpeg");
  function BossSource(Base, parametersConstructor) {
    return WithParameters(WithSharedCredentialsProviderCounterpart()(Base), parametersConstructor);
  }
  let BossVolumeChunkSource = class extends BossSource(VolumeChunkSource, VolumeChunkSourceParameters) {
    constructor() {
      super(...arguments);
      this.chunkDecoder = chunkDecoders.get(this.parameters.encoding);
    }
    async download(chunk, cancellationToken) {
      let {parameters} = this;
      let url = `${parameters.baseUrl}/latest/cutout/${parameters.collection}/${parameters.experiment}/${parameters.channel}/${parameters.resolution}`;
      {
        let chunkPosition = this.computeChunkBounds(chunk);
        let chunkDataSize = chunk.chunkDataSize;
        for (let i = 0; i < 3; ++i) {
          url += `/${chunkPosition[i]}:${chunkPosition[i] + chunkDataSize[i]}`;
        }
      }
      url += "/";
      if (parameters.window !== void 0) {
        url += `?window=${parameters.window[0]},${parameters.window[1]}`;
      }
      const response = await fetchWithBossCredentials(this.credentialsProvider, url, {headers: {Accept: acceptHeaders.get(parameters.encoding)}}, responseArrayBuffer, cancellationToken);
      await this.chunkDecoder(chunk, cancellationToken, response);
    }
  };
  BossVolumeChunkSource = __decorate([
    registerSharedObject()
  ], BossVolumeChunkSource);
  function decodeManifestChunk(chunk, response) {
    return decodeJsonManifestChunk(chunk, response, "fragments");
  }
  function decodeFragmentChunk(chunk, response) {
    let dv = new DataView(response);
    let numVertices = dv.getUint32(0, true);
    assignMeshFragmentData(chunk, decodeTriangleVertexPositionsAndIndices(response, Endianness.LITTLE, 4, numVertices));
  }
  let BossMeshSource = class extends BossSource(MeshSource, MeshSourceParameters2) {
    download(chunk, cancellationToken) {
      const {parameters} = this;
      return cancellableFetchOk(`${parameters.baseUrl}${chunk.objectId}`, {}, responseArrayBuffer, cancellationToken).then((response) => decodeManifestChunk(chunk, response));
    }
    downloadFragment(chunk, cancellationToken) {
      const {parameters} = this;
      return cancellableFetchOk(`${parameters.baseUrl}${chunk.fragmentId}`, {}, responseArrayBuffer, cancellationToken).then((response) => decodeFragmentChunk(chunk, response));
    }
  };
  BossMeshSource = __decorate([
    registerSharedObject()
  ], BossMeshSource);

  // src/neuroglancer/datasource/dvid/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VolumeChunkEncoding2;
  (function(VolumeChunkEncoding5) {
    VolumeChunkEncoding5[VolumeChunkEncoding5["JPEG"] = 0] = "JPEG";
    VolumeChunkEncoding5[VolumeChunkEncoding5["RAW"] = 1] = "RAW";
    VolumeChunkEncoding5[VolumeChunkEncoding5["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
    VolumeChunkEncoding5[VolumeChunkEncoding5["COMPRESSED_SEGMENTATIONARRAY"] = 3] = "COMPRESSED_SEGMENTATIONARRAY";
  })(VolumeChunkEncoding2 || (VolumeChunkEncoding2 = {}));
  class DVIDSourceParameters {
  }
  class VolumeChunkSourceParameters2 extends DVIDSourceParameters {
  }
  VolumeChunkSourceParameters2.RPC_ID = "dvid/VolumeChunkSource";
  class SkeletonSourceParameters2 extends DVIDSourceParameters {
  }
  SkeletonSourceParameters2.RPC_ID = "dvid/SkeletonSource";
  class MeshSourceParameters3 extends DVIDSourceParameters {
  }
  MeshSourceParameters3.RPC_ID = "dvid/MeshSource";

  // src/neuroglancer/skeleton/decode_swc_skeleton.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2020 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function decodeSwcSkeletonChunk(chunk, swcStr) {
    let swcObjects = parseSwc(swcStr);
    if (swcObjects.length < 1) {
      throw new Error(`ERROR parsing swc data`);
    }
    let indexMap = new Uint32Array(swcObjects.length);
    let nodeCount = 0;
    let edgeCount = 0;
    swcObjects.forEach((swcObj, i) => {
      if (swcObj) {
        indexMap[i] = nodeCount++;
        if (swcObj.parent >= 0) {
          ++edgeCount;
        }
      }
    });
    let glVertices = new Float32Array(3 * nodeCount);
    let glIndices = new Uint32Array(2 * edgeCount);
    let nodeIndex = 0;
    let edgetIndex = 0;
    swcObjects.forEach(function(swcObj) {
      if (swcObj) {
        glVertices[3 * nodeIndex] = swcObj.x;
        glVertices[3 * nodeIndex + 1] = swcObj.y;
        glVertices[3 * nodeIndex + 2] = swcObj.z;
        if (swcObj.parent >= 0) {
          glIndices[2 * edgetIndex] = nodeIndex;
          glIndices[2 * edgetIndex + 1] = indexMap[swcObj.parent];
          ++edgetIndex;
        }
        ++nodeIndex;
      }
    });
    chunk.indices = glIndices;
    chunk.vertexPositions = glVertices;
  }
  function parseSwc(swcStr) {
    let swcInputAr = swcStr.split("\n");
    let swcObjectsAr = new Array();
    let float = "-?\\d*(?:\\.\\d+)?";
    let pattern = new RegExp("^[ \\t]*(" + [
      "\\d+",
      "\\d+",
      float,
      float,
      float,
      float,
      "-1|\\d+"
    ].join(")[ \\t]+(") + ")[ \\t]*$");
    swcInputAr.forEach(function(e) {
      let match = e.match(pattern);
      if (match) {
        let point = swcObjectsAr[parseInt(match[1], 10)] = new PointObj();
        point.type = parseInt(match[2], 10);
        point.x = parseFloat(match[3]);
        point.y = parseFloat(match[4]);
        point.z = parseFloat(match[5]);
        point.radius = parseFloat(match[6]);
        point.parent = parseInt(match[7], 10);
      }
    });
    return swcObjectsAr;
  }
  class PointObj {
  }

  // src/neuroglancer/datasource/dvid/api.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class DVIDInstance {
    constructor(baseUrl, nodeKey) {
      this.baseUrl = baseUrl;
      this.nodeKey = nodeKey;
    }
    getNodeApiUrl(path = "") {
      return `${this.baseUrl}/api/node/${this.nodeKey}${path}`;
    }
    getRepoInfoUrl() {
      return `${this.baseUrl}/api/repos/info`;
    }
    getKeyValueUrl(dataName, key) {
      return `${this.getNodeApiUrl()}/${dataName}/key/${key}`;
    }
    getKeyValueRangeUrl(dataName, startKey, endKey) {
      return `${this.getNodeApiUrl()}/${dataName}/keyrange/${startKey}/${endKey}`;
    }
    getKeyValuesUrl(dataName) {
      return `${this.getNodeApiUrl()}/${dataName}/keyvalues?jsontar=false`;
    }
  }
  function appendQueryStringForDvid(url, user) {
    if (url.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
    url += "app=Neuroglancer";
    if (user) {
      url += `&u=${user}`;
    }
    return url;
  }
  function responseText(response) {
    return response.text();
  }
  function makeRequestWithCredentials(credentialsProvider, httpCall, cancellationToken = uncancelableToken) {
    return fetchWithDVIDCredentials(credentialsProvider, httpCall.url, {method: httpCall.method, body: httpCall.payload}, httpCall.responseType === "" ? responseText : httpCall.responseType === "json" ? responseJson : responseArrayBuffer, cancellationToken);
  }
  function fetchWithDVIDCredentials(credentialsProvider, input, init, transformResponse, cancellationToken = uncancelableToken) {
    return fetchWithCredentials(credentialsProvider, input, init, transformResponse, (credentials, init2) => {
      let newInit = {...init2};
      if (credentials.token) {
        newInit.headers = {...newInit.headers, Authorization: `Bearer ${credentials}`};
      }
      return newInit;
    }, (error) => {
      const {status: status3} = error;
      if (status3 === 403 || status3 === 401) {
      }
      if (status3 === 504) {
        return "retry";
      }
      throw error;
    }, cancellationToken);
  }

  // src/neuroglancer/datasource/dvid/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function DVIDSource(Base, parametersConstructor) {
    return WithParameters(WithSharedCredentialsProviderCounterpart()(Base), parametersConstructor);
  }
  let DVIDSkeletonSource = class extends DVIDSource(SkeletonSource, SkeletonSourceParameters2) {
    download(chunk, cancellationToken) {
      const {parameters} = this;
      let bodyid = `${chunk.objectId}`;
      const url = `${parameters.baseUrl}/api/node/${parameters["nodeKey"]}/${parameters["dataInstanceKey"]}/key/` + bodyid + "_swc";
      return makeRequestWithCredentials(this.credentialsProvider, {
        method: "GET",
        url: appendQueryStringForDvid(url, parameters.user),
        responseType: "arraybuffer"
      }, cancellationToken).then((response) => {
        let enc = new TextDecoder("utf-8");
        decodeSwcSkeletonChunk(chunk, enc.decode(response));
      });
    }
  };
  DVIDSkeletonSource = __decorate([
    registerSharedObject()
  ], DVIDSkeletonSource);
  function decodeFragmentChunk2(chunk, response) {
    let dv = new DataView(response);
    let numVertices = dv.getUint32(0, true);
    assignMeshFragmentData(chunk, decodeTriangleVertexPositionsAndIndices(response, Endianness.LITTLE, 4, numVertices));
  }
  let DVIDMeshSource = class extends DVIDSource(MeshSource, MeshSourceParameters3) {
    download(chunk) {
      chunk.fragmentIds = [`${chunk.objectId}`];
      return Promise.resolve(void 0);
    }
    downloadFragment(chunk, cancellationToken) {
      const {parameters} = this;
      const dvidInstance = new DVIDInstance(parameters.baseUrl, parameters.nodeKey);
      const meshUrl = dvidInstance.getKeyValueUrl(parameters.dataInstanceKey, `${chunk.fragmentId}.ngmesh`);
      return makeRequestWithCredentials(this.credentialsProvider, {
        method: "GET",
        url: appendQueryStringForDvid(meshUrl, parameters.user),
        responseType: "arraybuffer"
      }, cancellationToken).then((response) => decodeFragmentChunk2(chunk, response));
    }
  };
  DVIDMeshSource = __decorate([
    registerSharedObject()
  ], DVIDMeshSource);
  let DVIDVolumeChunkSource = class extends DVIDSource(VolumeChunkSource, VolumeChunkSourceParameters2) {
    async download(chunk, cancellationToken) {
      let params = this.parameters;
      let path;
      {
        let chunkPosition = this.computeChunkBounds(chunk);
        let chunkDataSize = chunk.chunkDataSize;
        path = this.getPath(chunkPosition, chunkDataSize);
      }
      const decoder = this.getDecoder(params);
      const response = await makeRequestWithCredentials(this.credentialsProvider, {
        method: "GET",
        url: appendQueryStringForDvid(`${params.baseUrl}${path}`, params.user),
        responseType: "arraybuffer"
      }, cancellationToken);
      await decoder(chunk, cancellationToken, params.encoding === VolumeChunkEncoding2.JPEG ? response.slice(16) : response);
    }
    getPath(chunkPosition, chunkDataSize) {
      let params = this.parameters;
      if (params.encoding === VolumeChunkEncoding2.JPEG) {
        return `/api/node/${params["nodeKey"]}/${params["dataInstanceKey"]}/subvolblocks/${chunkDataSize[0]}_${chunkDataSize[1]}_${chunkDataSize[2]}/${chunkPosition[0]}_${chunkPosition[1]}_${chunkPosition[2]}`;
      } else if (params.encoding === VolumeChunkEncoding2.RAW) {
        return `/api/node/${params["nodeKey"]}/${params["dataInstanceKey"]}/raw/0_1_2/${chunkDataSize[0]}_${chunkDataSize[1]}_${chunkDataSize[2]}/${chunkPosition[0]}_${chunkPosition[1]}_${chunkPosition[2]}/jpeg`;
      } else if (params.encoding === VolumeChunkEncoding2.COMPRESSED_SEGMENTATIONARRAY) {
        return `/api/node/${params["nodeKey"]}/${params["dataInstanceKey"]}/raw/0_1_2/${chunkDataSize[0]}_${chunkDataSize[1]}_${chunkDataSize[2]}/${chunkPosition[0]}_${chunkPosition[1]}_${chunkPosition[2]}?compression=googlegzip&scale=${params["dataScale"]}`;
      } else {
        return `/api/node/${params["nodeKey"]}/${params["dataInstanceKey"]}/raw/0_1_2/${chunkDataSize[0]}_${chunkDataSize[1]}_${chunkDataSize[2]}/${chunkPosition[0]}_${chunkPosition[1]}_${chunkPosition[2]}?compression=googlegzip`;
      }
    }
    getDecoder(params) {
      if (params.encoding === VolumeChunkEncoding2.JPEG || params.encoding === VolumeChunkEncoding2.RAW) {
        return decodeJpegChunk;
      } else {
        return decodeCompressedSegmentationChunk;
      }
    }
  };
  DVIDVolumeChunkSource = __decorate([
    registerSharedObject()
  ], DVIDVolumeChunkSource);

  // src/neuroglancer/datasource/clio/base.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const annotationChunkDataSize = vec3_exports.fromValues(64, 64, 64);
  class ClioSourceParameters {
  }
  class AnnotationSourceParametersBase extends ClioSourceParameters {
    constructor() {
      super(...arguments);
      this.chunkDataSize = annotationChunkDataSize;
    }
  }
  class AnnotationSourceParameters2 extends AnnotationSourceParametersBase {
  }
  AnnotationSourceParameters2.RPC_ID = "clio/Annotation";
  class AnnotationChunkSourceParameters extends AnnotationSourceParametersBase {
  }
  AnnotationChunkSourceParameters.RPC_ID = "clio/AnnotationChunkSource";

  // src/neuroglancer/status.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  let statusContainer = null;
  var DEFAULT_STATUS_DELAY = 200;
  class StatusMessage {
    constructor(delay = false) {
      if (statusContainer === null) {
        statusContainer = document.createElement("ul");
        statusContainer.id = "statusContainer";
        const el = document.getElementById("neuroglancer-container");
        if (el) {
          el.appendChild(statusContainer);
        } else {
          document.body.appendChild(statusContainer);
        }
      }
      let element = document.createElement("li");
      this.element = element;
      if (delay === true) {
        delay = DEFAULT_STATUS_DELAY;
      }
      if (delay !== false) {
        this.setVisible(false);
        this.timer = window.setTimeout(this.setVisible.bind(this, true), delay);
      } else {
        this.timer = null;
      }
      statusContainer.appendChild(element);
    }
    dispose() {
      statusContainer.removeChild(this.element);
      this.element = void 0;
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
    }
    setText(text, makeVisible) {
      this.element.textContent = text;
      if (makeVisible) {
        this.setVisible(true);
      }
    }
    setHTML(text, makeVisible) {
      this.element.innerHTML = text;
      if (makeVisible) {
        this.setVisible(true);
      }
    }
    setVisible(value) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.element.style.display = value ? "block" : "none";
    }
    static forPromise(promise, options) {
      let status3 = new StatusMessage(options.delay);
      status3.setText(options.initialMessage);
      let dispose = status3.dispose.bind(status3);
      promise.then(dispose, (reason) => {
        let msg;
        if (reason instanceof Error) {
          msg = reason.message;
        } else {
          msg = "" + reason;
        }
        let {errorPrefix = ""} = options;
        status3.setErrorMessage(errorPrefix + msg);
        status3.setVisible(true);
      });
      return promise;
    }
    setErrorMessage(message) {
      this.element.textContent = message + " ";
      let button = document.createElement("button");
      button.textContent = "Dismiss";
      button.addEventListener("click", () => {
        this.dispose();
      });
      this.element.appendChild(button);
    }
    static showMessage(message) {
      const msg = new StatusMessage();
      msg.element.textContent = message;
      msg.setVisible(true);
      return msg;
    }
    static showTemporaryMessage(message, closeAfter = 2e3) {
      const msg = this.showMessage(message);
      window.setTimeout(() => msg.dispose(), closeAfter);
      return msg;
    }
  }

  // src/neuroglancer/datasource/flyem/api.ts
  function responseText2(response) {
    return response.text();
  }
  function makeRequestWithCredentials2(credentialsProvider, httpCall, cancellationToken = uncancelableToken) {
    return fetchWithFlyEMCredentials(credentialsProvider, httpCall.url, {method: httpCall.method, body: httpCall.payload}, httpCall.responseType === "" ? responseText2 : httpCall.responseType === "json" ? responseJson : responseArrayBuffer, cancellationToken);
  }
  function applyCredentials(input) {
    return (credentials, init) => {
      let newInit = {...init};
      if (credentials) {
        newInit.headers = {...newInit.headers, Authorization: `Bearer ${credentials}`};
      } else if (input.startsWith("https:")) {
        newInit.credentials = "include";
      }
      return newInit;
    };
  }
  function fetchWithFlyEMCredentials(credentialsProvider, input, init, transformResponse, cancellationToken = uncancelableToken) {
    return fetchWithCredentials(credentialsProvider, input, init, transformResponse, applyCredentials(input), (error) => {
      const {status: status3} = error;
      if (status3 === 403 || status3 === 401) {
        if (credentialsProvider.refreshable) {
          return "refresh";
        }
      }
      if (status3 === 504) {
        return "retry";
      }
      throw error;
    }, cancellationToken);
  }
  const DEBUG_NEUROHUB_CREDENTIALS = false;
  const mockWindow = {
    neurohub: {
      clio: {
        auth: {
          getAuthResponse: () => {
            return {id_token: "<test-token>"};
          }
        }
      }
    }
  };
  function getNeurohubToken(w) {
    if ("neurohub" in w) {
      return Promise.resolve(w.neurohub.clio.auth.getAuthResponse().id_token);
    } else {
      return Promise.resolve("");
    }
  }
  class FlyEMCredentialsProvider extends CredentialsProvider {
    constructor(authServer, retry) {
      super();
      this.authServer = authServer;
      this.retry = retry;
      this.refreshable = false;
      this.get = makeCredentialsGetter((cancellationToken) => {
        const status3 = new StatusMessage(true);
        let cancellationSource;
        return new Promise((resolve, reject) => {
          const dispose = () => {
            cancellationSource = void 0;
            status3.dispose();
          };
          cancellationToken.add(() => {
            if (cancellationSource !== void 0) {
              cancellationSource.cancel();
              cancellationSource = void 0;
              status3.dispose();
              reject(CANCELED);
            }
          });
          const writeLoginStatus = (msg = "Authorization required.", linkMessage = "Request authorization.") => {
            status3.setText(msg + " ");
            if (this.retry) {
              let button = document.createElement("button");
              button.textContent = linkMessage;
              status3.element.appendChild(button);
              button.addEventListener("click", this.retry);
            }
            status3.setVisible(true);
          };
          let authServer = this.authServer;
          const login = () => {
            if (cancellationSource !== void 0) {
              cancellationSource.cancel();
            }
            cancellationSource = new CancellationTokenSource();
            writeLoginStatus("Waiting for authorization...", "Retry");
            this.getAuthToken(authServer, cancellationSource).then((token) => {
              if (cancellationSource !== void 0) {
                dispose();
                resolve(token);
              }
            }, (reason) => {
              if (cancellationSource !== void 0) {
                cancellationSource = void 0;
                writeLoginStatus(`Authorization failed: ${reason}.`, "Retry");
              }
            });
          };
          login();
        });
      });
    }
    getAuthToken(authServer, cancellationToken = uncancelableToken) {
      this.refreshable = false;
      if (!authServer) {
        return Promise.resolve("");
      } else if (authServer.startsWith("token:")) {
        return Promise.resolve(authServer.substring(6));
      } else if (authServer == "neurohub") {
        return getNeurohubToken(DEBUG_NEUROHUB_CREDENTIALS ? mockWindow : window);
      } else {
        this.refreshable = true;
        const headers = new Headers();
        return cancellableFetchOk(authServer, {method: "GET", credentials: "include", headers}, responseText2, cancellationToken).catch(() => {
          return cancellableFetchOk(authServer, {method: "GET"}, responseText2, cancellationToken);
        });
      }
    }
  }

  // src/neuroglancer/datasource/clio/api.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const urlPattern = /^([^\/]+:\/\/[^\/]+)\/([^\/]+)\/([^\/\?]+)(\?.*)?$/;
  function parseDVIDSourceUrl(url) {
    let match = url.match(urlPattern);
    if (match === null) {
      throw new Error(`Invalid DVID URL: ${JSON.stringify(url)}.`);
    }
    return {
      baseUrl: match[1],
      nodeKey: match[2],
      dataInstanceKey: match[3]
    };
  }
  function getGrayscaleInfoUrl(u) {
    if (u.protocol === "gs") {
      return `https://storage.googleapis.com/${u.host}${u.path}/info`;
    } else if (u.protocol === "dvid") {
      const sourceParameters = parseDVIDSourceUrl(u.host + u.path);
      return `${sourceParameters.baseUrl}/api/node/${sourceParameters.nodeKey}/${sourceParameters.dataInstanceKey}/info`;
    }
    throw Error("Unrecognized volume information");
  }
  class ClioInstance {
    constructor(parameters) {
      this.parameters = parameters;
    }
    getTopLevelUrl() {
      const {baseUrl, api: api6} = this.parameters;
      return `${baseUrl}/${api6 || "clio_toplevel"}`;
    }
    getDatasetsUrl() {
      return `${this.getTopLevelUrl()}/datasets`;
    }
    getGrayscaleInfoUrl() {
      const u = parseUrl(this.parameters.grayscale);
      return getGrayscaleInfoUrl(u);
    }
    getAnnotationEndpoint() {
      return this.parameters.kind === "Atlas" ? "atlas" : "annotations";
    }
    getAnnotationEntryUrl() {
      return `${this.getTopLevelUrl()}/${this.getAnnotationEndpoint()}/${this.parameters.dataset}`;
    }
    getAllAnnotationsUrl() {
      return this.getAnnotationEntryUrl() + (this.parameters.groups ? `?groups=${this.parameters.groups}` : "");
    }
    hasPointQueryApi() {
      return this.parameters.api === "clio_toplevel" || this.parameters.kind === "Atlas";
    }
    getPostAnnotationUrl(position) {
      if (this.hasPointQueryApi()) {
        return `${this.getAnnotationEntryUrl()}?x=${position[0]}&y=${position[1]}&z=${position[2]}`;
      }
      return this.getAnnotationEntryUrl();
    }
    getDeleteAnnotationUrl(id) {
      if (this.hasPointQueryApi()) {
        const tokens = id.match(/(-?\d+)_(-?\d+)_(-?\d+)/);
        if (tokens) {
          return this.getAnnotationUrl(tokens == null ? void 0 : tokens.slice(1, 4));
        }
      }
      return `${this.getAnnotationEntryUrl()}/${id}`;
    }
    getAnnotationUrl(position) {
      return `${this.getAnnotationEntryUrl()}?x=${position[0]}&y=${position[1]}&z=${position[2]}`;
    }
  }

  // src/neuroglancer/datasource/flyem/annotation.ts
  const ANNOTAIION_COMMIT_ADD_SIGNAL_RPC_ID = "annotation.add.signal";
  registerRPC(ANNOTAIION_COMMIT_ADD_SIGNAL_RPC_ID, function(x) {
    const source = this.get(x.id);
    const newAnnotation = fixAnnotationAfterStructuredCloning(x.newAnnotation);
    if (newAnnotation) {
      source.parent.updateReference(newAnnotation);
      source.parent.childAdded.dispatch(newAnnotation);
    }
  });
  function WithFlyEMProp(Base) {
    class C extends Base {
      constructor(...args) {
        super(...args);
      }
    }
    return C;
  }
  class TAnnotationBase {
  }
  class TPoint extends TAnnotationBase {
  }
  class TLine extends TAnnotationBase {
  }
  class PointAnnotation extends WithFlyEMProp(TPoint) {
  }
  class LineAnnotation extends WithFlyEMProp(TLine) {
  }
  class AnnotationFacade {
    constructor(annotation9) {
      this.annotation = annotation9;
    }
    get renderingAttribute() {
      if (this.kind === "Atlas") {
        if (!this.title) {
          return -1;
        } else if (this.checked) {
          return 1;
        }
      }
      return 0;
    }
    updateProperties() {
      this.annotation.properties = [this.renderingAttribute];
    }
    get ext() {
      if (this.annotation.ext === void 0) {
        this.annotation.ext = {};
      }
      return this.annotation.ext;
    }
    get prop() {
      return this.annotation.prop;
    }
    set prop(value) {
      this.annotation.prop = value;
    }
    get type() {
      return this.annotation.type;
    }
    get kind() {
      return this.annotation.kind;
    }
    set kind(value) {
      this.annotation.kind = value;
    }
    roundPos() {
      if (this.annotation.type === AnnotationType.POINT) {
        this.annotation.point = this.annotation.point.map((x) => Math.round(x));
      } else if (this.annotation.type === AnnotationType.LINE) {
        this.annotation.pointA = this.annotation.pointA.map((x) => Math.round(x));
        this.annotation.pointB = this.annotation.pointB.map((x) => Math.round(x));
      }
    }
    setProp(prop) {
      this.prop = {...this.prop, ...prop};
    }
    get user() {
      return this.prop && this.prop.user;
    }
    set user(value) {
      this.setProp({user: value});
    }
    get comment() {
      return this.prop && this.prop.comment;
    }
    get description() {
      return this.comment;
    }
    updatePresentation() {
      if (this.title) {
        this.annotation.description = this.title + ": ";
      } else {
        this.annotation.description = "";
      }
      if (this.description) {
        this.annotation.description += this.description;
      }
    }
    update() {
      this.updatePresentation();
      this.updateProperties();
    }
    set comment(s) {
      this.setProp({comment: s});
      this.updatePresentation();
    }
    updateComment() {
      this.comment = this.annotation.description || "";
      this.annotation.description = void 0;
    }
    get title() {
      return this.prop && this.prop.title;
    }
    set title(s) {
      this.setProp({title: s});
      this.updatePresentation();
    }
    get timestamp() {
      return this.prop && this.prop.timestamp ? Number(this.prop.timestamp) : 0;
    }
    addTimeStamp() {
      this.setProp({timestamp: String(Date.now())});
    }
    get checked() {
      return this.ext && this.ext.verified || this.prop && this.prop.checked || false;
    }
    set checked(c) {
      this.setProp({checked: c});
    }
    get presentation() {
      this.updatePresentation();
      return this.annotation.description || "";
    }
    set presentation(value) {
      this.annotation.description = value;
    }
  }
  function typeOfAnnotationId(id) {
    if (id.match(/^-?\d+_-?\d+_-?\d+[\[]?/) || id.match(/^Pt-?\d+_-?\d+_-?\d+/)) {
      return AnnotationType.POINT;
    } else if (id.match(/^-?\d+_-?\d+_-?\d+--?\d+_-?\d+_-?\d+-Line$/) || id.match(/^Ln-?\d+_-?\d+_-?\d+_?\d+_-?\d+_-?\d+/)) {
      return AnnotationType.LINE;
    } else {
      console.log(`Invalid annotation ID for DVID: ${id}`);
      return null;
    }
  }
  function getAnnotationUser(annotation9) {
    return annotation9.ext && annotation9.ext.user || annotation9.prop && annotation9.prop.user;
  }
  function getAnnotationKey(annotation9, keyHandle) {
    let key = keyHandle || annotation9.key;
    if (!key) {
      switch (annotation9.type) {
        case AnnotationType.POINT:
          key = `Pt${annotation9.point[0]}_${annotation9.point[1]}_${annotation9.point[2]}`;
          break;
        case AnnotationType.LINE:
          key = `Ln${annotation9.pointA[0]}_${annotation9.pointA[1]}_${annotation9.pointA[2]}_${annotation9.pointB[0]}_${annotation9.pointB[1]}_${annotation9.pointB[2]}`;
          break;
      }
    }
    return key;
  }
  function getAnnotationId(annotation9, keyHandle) {
    return `${getAnnotationKey(annotation9, keyHandle)}[user:${getAnnotationUser(annotation9)}]`;
  }
  function parseAnnotationId(id) {
    const matched = id.match(/(.*)\[user:(.*)\]/);
    return matched && {key: matched[1], user: matched[2]};
  }
  function isAnnotationIdValid(id) {
    return typeOfAnnotationId(id) !== null;
  }

  // src/neuroglancer/datasource/clio/utils.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class ClioAnnotationFacade extends AnnotationFacade {
    get title() {
      return this.annotation.ext && this.annotation.ext.title;
    }
    set title(title) {
      this.ext.title = title;
    }
    get description() {
      return this.annotation.ext && this.annotation.ext.description;
    }
    set description(value) {
      this.ext.description = value;
    }
    get user() {
      return this.annotation.ext && this.annotation.ext.user;
    }
    set user(value) {
      this.ext.user = value;
    }
    get checked() {
      return this.ext && this.ext.verified;
    }
    set checked(c) {
      this.ext.verified = c;
    }
  }
  class AnnotationRequestHelper {
    constructor(sendingToServer) {
      this.sendingToServer = sendingToServer;
    }
    uploadable(_) {
      return this.sendingToServer;
    }
  }
  function decodeAnnotationPropV2(entry, out) {
    const annotationRef = new ClioAnnotationFacade(out);
    if ("prop" in entry) {
      annotationRef.prop = verifyObjectProperty(entry, "prop", verifyObject);
    }
    if (entry.description) {
      annotationRef.description = verifyObjectProperty(entry, "description", verifyString);
    }
    if (entry.title) {
      annotationRef.title = verifyObjectProperty(entry, "title", verifyString);
    }
    if (entry.user) {
      annotationRef.user = verifyObjectProperty(entry, "user", verifyString);
    }
    if ("verified" in entry) {
      annotationRef.checked = verifyObjectProperty(entry, "verified", verifyBoolean);
    }
    annotationRef.update();
    out.id = getAnnotationId(out);
  }
  class V1PointAnnotationRequestHelper extends AnnotationRequestHelper {
    getPositionFromKey(key) {
      if (key) {
        let pos = key.split("_").map((x) => +x);
        if (pos.length === 3) {
          return vec3_exports.fromValues(pos[0], pos[1], pos[2]);
        }
      }
      return null;
    }
    encode(annotation9) {
      let obj = {
        Kind: annotation9.kind
      };
      let annotationRef = new ClioAnnotationFacade(annotation9);
      if (annotationRef.presentation !== void 0) {
        obj.description = annotationRef.presentation;
      } else if (annotation9.kind === "Atlas") {
        obj.description = "";
      }
      if (annotationRef.title !== void 0) {
        obj.title = annotationRef.title;
      }
      obj.user = annotationRef.user;
      if (annotation9.prop) {
        let prop = {...annotation9.prop};
        delete prop.comment;
        delete prop.user;
        delete prop.title;
        if (prop) {
          obj.Prop = prop;
        }
      }
      return obj;
    }
    decode(key, entry) {
      try {
        const kind = verifyObjectProperty(entry, "Kind", verifyString);
        let prop = {};
        let corner = this.getPositionFromKey(key);
        if (!corner) {
          const posKey = "location" in entry ? "location" : "Pos";
          corner = verifyObjectProperty(entry, posKey, (x) => parseIntVec(vec3_exports.create(), x));
        }
        if ("Prop" in entry) {
          prop = verifyObjectProperty(entry, "Prop", verifyObject);
        }
        let description = "";
        if ("description" in entry) {
          description = verifyObjectProperty(entry, "description", verifyString);
        }
        let title = "";
        if ("title" in entry) {
          title = verifyObjectProperty(entry, "title", verifyString);
        }
        let user = "";
        if ("user" in entry) {
          user = verifyObjectProperty(entry, "user", verifyString);
        }
        let annotation9 = {
          point: corner,
          type: AnnotationType.POINT,
          properties: [],
          kind,
          id: `${corner[0]}_${corner[1]}_${corner[2]}`,
          prop: {}
        };
        let annotationRef = new ClioAnnotationFacade(annotation9);
        annotationRef.prop = prop;
        if (description) {
          annotationRef.presentation = description;
        }
        if (title) {
          annotationRef.title = title;
        }
        if (user) {
          annotationRef.user = user;
        }
        annotationRef.update();
        return annotation9;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
  function encodeAnnotationV2(annotation9) {
    const annotationRef = new ClioAnnotationFacade(annotation9);
    if (!annotationRef.user) {
      return null;
    }
    let obj = {
      tags: []
    };
    obj.description = annotationRef.description;
    obj.user = annotationRef.user;
    if (annotationRef.checked !== void 0) {
      obj.verified = annotationRef.checked;
    }
    if (annotationRef.title !== void 0) {
      obj.title = annotationRef.title;
    }
    obj.prop = {...annotation9.prop};
    return obj;
  }
  class V2PointAnnotationRequestHelper extends AnnotationRequestHelper {
    constructor() {
      super(...arguments);
      this.defaultKind = "Normal";
    }
    encode(annotation9) {
      const obj = encodeAnnotationV2(annotation9);
      if (obj === null) {
        return null;
      }
      obj.kind = "point";
      obj.pos = [annotation9.point[0], annotation9.point[1], annotation9.point[2]];
      return obj;
    }
    decode(key, entry) {
      try {
        if (verifyObjectProperty(entry, "kind", verifyString) !== "point") {
          throw new Error("Invalid kind for point annotation data.");
        }
        const point = verifyObjectProperty(entry, "pos", (x) => parseIntVec(new Float32Array(3), x));
        const annotation9 = {
          id: "",
          key,
          type: AnnotationType.POINT,
          kind: this.defaultKind,
          point,
          properties: []
        };
        decodeAnnotationPropV2(entry, annotation9);
        return annotation9;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
  class V2LineAnnotationRequestHelper extends AnnotationRequestHelper {
    encode(annotation9) {
      const obj = encodeAnnotationV2(annotation9);
      if (obj === null) {
        return null;
      }
      obj.kind = "lineseg";
      obj.pos = [annotation9.pointA[0], annotation9.pointA[1], annotation9.pointA[2], annotation9.pointB[0], annotation9.pointB[1], annotation9.pointB[2]];
      return obj;
    }
    decode(key, entry) {
      try {
        if (verifyObjectProperty(entry, "kind", verifyString) !== "lineseg") {
          throw new Error("Invalid kind for line annotation data.");
        }
        const pos = verifyObjectProperty(entry, "pos", (x) => parseIntVec(new Float32Array(6), x));
        const annotation9 = {
          id: "",
          key,
          type: AnnotationType.LINE,
          pointA: pos.slice(0, 3),
          pointB: pos.slice(3, 6),
          properties: []
        };
        decodeAnnotationPropV2(entry, annotation9);
        return annotation9;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
  class V2AtlasAnnotationRequestHelper extends V2PointAnnotationRequestHelper {
    constructor() {
      super(...arguments);
      this.defaultKind = "Atlas";
    }
    uploadable(annotation9) {
      if (super.uploadable(annotation9)) {
        if (typeof annotation9 !== "string") {
          const annotationRef = new ClioAnnotationFacade(annotation9);
          if (typeof annotationRef.title === "string" && annotationRef.title.length > 0) {
            return true;
          }
        }
      }
      return false;
    }
  }
  function makeAnnotationRequestHelpers(init) {
    const helpers = {...init};
    if (init[AnnotationType.POINT]) {
      helpers.point = init[AnnotationType.POINT];
    }
    if (init[AnnotationType.LINE]) {
      helpers.lineseg = init[AnnotationType.LINE];
    }
    return helpers;
  }
  function makeEncoders(api6, kind) {
    if (api6 === "v2" || api6 === "v3" || api6 === "test") {
      if (kind === "Atlas") {
        return makeAnnotationRequestHelpers({
          [AnnotationType.POINT]: new V2AtlasAnnotationRequestHelper(true)
        });
      } else {
        return makeAnnotationRequestHelpers({
          [AnnotationType.POINT]: new V2PointAnnotationRequestHelper(true),
          [AnnotationType.LINE]: new V2LineAnnotationRequestHelper(true)
        });
      }
    }
    return makeAnnotationRequestHelpers({
      [AnnotationType.POINT]: new V1PointAnnotationRequestHelper(true)
    });
  }

  // src/neuroglancer/datasource/clio/backend.ts
  /**
   * @license
   * This work is a derivative of the Google Neuroglancer project,
   * Copyright 2016 Google Inc.
   * The Derivative Work is covered by
   * Copyright 2019 Howard Hughes Medical Institute
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class AnnotationStore {
    constructor() {
      this.store = new Map();
    }
    add(id, value) {
      if (id) {
        this.store.set(id, value);
      }
    }
    remove(id) {
      this.store.delete(id);
    }
    update(id, value) {
      this.add(id, value);
    }
    getValue(id) {
      return this.store.get(id);
    }
  }
  let annotationStore = new AnnotationStore();
  function ClioSource(Base, parametersConstructor) {
    return WithParameters(WithSharedCredentialsProviderCounterpart()(Base), parametersConstructor);
  }
  function parseAnnotations2(source, chunk, responses, propSpec, emittingAddSignal) {
    const annotationPropertySerializer2 = new AnnotationPropertySerializer(3, propSpec);
    const serializer = new AnnotationSerializer(annotationPropertySerializer2);
    if (responses) {
      let parseSingleAnnotation2 = (key, response, index2, lastIndex) => {
        if (response) {
          try {
            let annotation9 = source.decodeAnnotation(key, response);
            if (annotation9) {
              if (index2 === lastIndex) {
                annotation9.source = `downloaded:last`;
              } else {
                annotation9.source = `downloaded:${index2}/${lastIndex}`;
              }
              annotationStore.add(getAnnotationId(annotation9), response);
              serializer.add(annotation9);
              if (emittingAddSignal) {
                source.rpc.invoke(ANNOTAIION_COMMIT_ADD_SIGNAL_RPC_ID, {
                  id: source.rpcId,
                  newAnnotation: annotation9
                });
              }
            }
          } catch (e) {
            console.log(`Error parsing annotation: ${e.message}`);
          }
        }
      };
      const {parameters} = source;
      const annotationCount = Object.keys(responses).length;
      Object.keys(responses).forEach((key, index2) => {
        let response = responses[key];
        if (response) {
          if (!("Kind" in response)) {
            response["Kind"] = parameters.kind;
          }
        }
        parseSingleAnnotation2(response.key || key, response, index2, annotationCount - 1);
      });
    }
    chunk.data = Object.assign(new AnnotationGeometryData(), serializer.serialize());
  }
  let ClioAnnotationGeometryChunkSource = class extends ClioSource(AnnotationGeometryChunkSourceBackend, AnnotationChunkSourceParameters) {
    constructor() {
      super(...arguments);
      this.encoder = makeEncoders(this.parameters.api, this.parameters.kind);
    }
    decodeAnnotation(key, entry) {
      const type = typeOfAnnotationId(key);
      if (type !== null) {
        return this.encoder[type].decode(key, entry);
      }
      return null;
    }
    async download(chunk, cancellationToken) {
      try {
        const clioInstance = new ClioInstance(this.parameters);
        let pointAnnotationValues = await makeRequestWithCredentials2(this.credentialsProvider, {
          method: "GET",
          url: clioInstance.getAllAnnotationsUrl(),
          payload: void 0,
          responseType: "json"
        }, cancellationToken);
        return parseAnnotations2(this, chunk, pointAnnotationValues, this.parameters.properties, true);
      } catch (e) {
        console.log(e);
      }
    }
  };
  ClioAnnotationGeometryChunkSource = __decorate([
    registerSharedObject()
  ], ClioAnnotationGeometryChunkSource);
  let ClioAnnotationSource = class extends ClioSource(AnnotationSource2, AnnotationSourceParameters2) {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.encoders = makeEncoders(this.parameters.api, this.parameters.kind);
    }
    requestLineMetaData(id, _) {
      return Promise.resolve(annotationStore.getValue(id));
    }
    requestPointMetaData(id, _) {
      return Promise.resolve(annotationStore.getValue(id));
    }
    requestMetadata(chunk, cancellationToken) {
      const id = chunk.key;
      switch (typeOfAnnotationId(id)) {
        case AnnotationType.POINT:
          return this.requestPointMetaData(id, cancellationToken);
        case AnnotationType.LINE:
          return this.requestLineMetaData(id, cancellationToken);
        default:
          throw new Error(`Invalid annotation ID for DVID: ${id}`);
      }
    }
    downloadMetadata(chunk, cancellationToken) {
      return this.requestMetadata(chunk, cancellationToken).then((response) => {
        if (response) {
          chunk.annotation = this.decodeAnnotation(chunk.key, response);
        } else {
          chunk.annotation = null;
        }
      });
    }
    uploadable(annotation9) {
      const encoder = this.getEncoder(annotation9);
      if (encoder) {
        return encoder.uploadable(typeof annotation9 === "string" ? encoder.decode(annotation9, annotationStore.getValue(annotation9)) : annotation9);
      }
      return false;
    }
    decodeAnnotation(key, entry) {
      const type = typeOfAnnotationId(key);
      if (type) {
        return this.encoders[type].decode(key, entry);
      }
      return null;
    }
    getEncoder(annotation9) {
      let type = null;
      if (typeof annotation9 === "string") {
        type = typeOfAnnotationId(annotation9);
      } else {
        type = annotation9.type;
      }
      if (type !== null) {
        return this.encoders[type];
      }
      return void 0;
    }
    encodeAnnotation(annotation9) {
      const encoder = this.getEncoder(annotation9);
      if (encoder) {
        return encoder.encode(annotation9);
      }
      return null;
    }
    updateAnnotation(annotation9, overwrite) {
      try {
        const {parameters} = this;
        if (!parameters.user) {
          throw Error("Cannot upload an annotation without a user");
        }
        new ClioAnnotationFacade(annotation9).user = parameters.user;
        const encoded = this.encodeAnnotation(annotation9);
        if (encoded === null) {
          throw new Error("Unable to encode the annotation");
        }
        if (!overwrite && annotationStore.getValue(getAnnotationId(annotation9))) {
          throw new Error("Cannot overwrite existing annotation");
        }
        let value = JSON.stringify(encoded);
        annotationStore.update(getAnnotationId(annotation9), encoded);
        if (this.uploadable(annotation9)) {
          const clioInstance = new ClioInstance(parameters);
          return makeRequestWithCredentials2(this.credentialsProvider, {
            method: "POST",
            url: clioInstance.getPostAnnotationUrl(annotation9.point),
            payload: value,
            responseType: "json"
          });
        } else {
          return Promise.resolve(getAnnotationKey(annotation9));
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }
    addAnnotation(annotation9) {
      return this.updateAnnotation(annotation9, false).then((response) => {
        let key = void 0;
        if (typeof response === "string" && response.length > 0) {
          key = response;
        } else {
          key = response.key;
        }
        return getAnnotationId(annotation9, key);
      }).catch((e) => {
        throw new Error(e);
      });
    }
    add(annotation9) {
      return this.addAnnotation(annotation9);
    }
    update(id, annotation9) {
      if (getAnnotationId(annotation9) !== id) {
        delete annotation9.key;
      }
      return this.updateAnnotation(annotation9, true);
    }
    deleteAnnotation(id) {
      const clioInstance = new ClioInstance(this.parameters);
      if (this.uploadable(id)) {
        const cachedAnnotation = annotationStore.getValue(id);
        if (cachedAnnotation) {
          const {user} = cachedAnnotation;
          if (user && user !== this.parameters.user) {
            throw new Error(`Unable to delete annotation owned by ${user}.`);
          }
        }
        const idInfo = parseAnnotationId(id);
        const key = idInfo ? idInfo.key : id;
        return makeRequestWithCredentials2(this.credentialsProvider, {
          method: "DELETE",
          url: clioInstance.getDeleteAnnotationUrl(key),
          responseType: ""
        }).then(() => {
          annotationStore.remove(id);
        });
      } else {
        annotationStore.remove(id);
        return Promise.resolve();
      }
    }
    delete(id) {
      if (isAnnotationIdValid(id)) {
        try {
          return this.deleteAnnotation(id);
        } catch (e) {
          return Promise.reject(e);
        }
      } else {
        return Promise.resolve();
      }
    }
  };
  ClioAnnotationSource = __decorate([
    registerSharedObject()
  ], ClioAnnotationSource);

  // src/neuroglancer/datasource/render/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class RenderBaseSourceParameters {
  }
  class RenderSourceParameters extends RenderBaseSourceParameters {
  }
  class TileChunkSourceParameters extends RenderSourceParameters {
  }
  TileChunkSourceParameters.RPC_ID = "render/TileChunkSource";

  // src/neuroglancer/datasource/render/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const chunkDecoders2 = new Map();
  chunkDecoders2.set("jpg", async (chunk, cancellationToken, response) => {
    const chunkDataSize = chunk.chunkDataSize;
    const decoded = await requestAsyncComputation(decodeJpeg, cancellationToken, [response], new Uint8Array(response), chunkDataSize[0], chunkDataSize[1] * chunkDataSize[2], 3, true);
    await postProcessRawData(chunk, cancellationToken, decoded);
  });
  chunkDecoders2.set("raw16", (chunk, cancellationToken, response) => {
    return decodeRawChunk(chunk, cancellationToken, response, Endianness.BIG);
  });
  let TileChunkSource = class extends WithParameters(VolumeChunkSource, TileChunkSourceParameters) {
    constructor() {
      super(...arguments);
      this.chunkDecoder = chunkDecoders2.get(this.parameters.encoding);
      this.queryString = (() => {
        let {parameters} = this;
        let query_params = [];
        if (parameters.channel !== void 0) {
          query_params.push("channels=" + parameters.channel);
        }
        if (parameters.minIntensity !== void 0) {
          query_params.push(`minIntensity=${JSON.stringify(parameters.minIntensity)}`);
        }
        if (parameters.maxIntensity !== void 0) {
          query_params.push(`maxIntensity=${JSON.stringify(parameters.maxIntensity)}`);
        }
        if (parameters.maxTileSpecsToRender !== void 0) {
          query_params.push(`maxTileSpecsToRender=${JSON.stringify(parameters.maxTileSpecsToRender)}`);
        }
        if (parameters.filter !== void 0) {
          query_params.push(`filter=${JSON.stringify(parameters.filter)}`);
        }
        return query_params.join("&");
      })();
    }
    async download(chunk, cancellationToken) {
      let {parameters} = this;
      let {chunkGridPosition} = chunk;
      let scale6 = 1 / Math.pow(2, parameters.level);
      chunk.chunkDataSize = this.spec.chunkDataSize;
      let xTileSize = chunk.chunkDataSize[0] * Math.pow(2, parameters.level);
      let yTileSize = chunk.chunkDataSize[1] * Math.pow(2, parameters.level);
      let chunkPosition = vec3_exports.create();
      chunkPosition[0] = chunkGridPosition[0] * xTileSize;
      chunkPosition[1] = chunkGridPosition[1] * yTileSize;
      chunkPosition[2] = chunkGridPosition[2];
      let imageMethod;
      if (parameters.encoding === "raw16") {
        imageMethod = "raw16-image";
      } else {
        imageMethod = "jpeg-image";
      }
      let path = `/render-ws/v1/owner/${parameters.owner}/project/${parameters.project}/stack/${parameters.stack}/z/${chunkPosition[2]}/box/${chunkPosition[0]},${chunkPosition[1]},${xTileSize},${yTileSize},${scale6}/${imageMethod}`;
      const response = await cancellableFetchOk(`${parameters.baseUrl}${path}?${this.queryString}`, {}, responseArrayBuffer, cancellationToken);
      await this.chunkDecoder(chunk, cancellationToken, response);
    }
  };
  TileChunkSource = __decorate([
    registerSharedObject()
  ], TileChunkSource);

  // src/neuroglancer/util/object_id.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const OBJECT_ID_SYMBOL = Symbol("objectId");
  let nextObjectId = 0;
  function getObjectId(x) {
    if (x instanceof Object) {
      let id = x[OBJECT_ID_SYMBOL];
      if (id === void 0) {
        id = x[OBJECT_ID_SYMBOL] = nextObjectId++;
      }
      return `o${id}`;
    } else {
      return "" + JSON.stringify(x);
    }
  }

  // src/neuroglancer/util/special_protocol_request.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function cancellableFetchSpecialOk(credentialsProvider, url, init, transformResponse, cancellationToken = uncancelableToken) {
    const u = parseUrl(url);
    switch (u.protocol) {
      case "gs":
        return fetchWithOAuth2Credentials(credentialsProvider, `https://www.googleapis.com/storage/v1/b/${u.host}/o/${encodeURIComponent(u.path.substring(1))}?alt=media`, init, transformResponse, cancellationToken);
      case "gs+xml":
        return fetchWithOAuth2Credentials(credentialsProvider, `https://storage.googleapis.com/${u.host}${u.path}`, init, transformResponse, cancellationToken);
      default:
        return fetchWithOAuth2Credentials(credentialsProvider, url, init, transformResponse, cancellationToken);
    }
  }

  // src/neuroglancer/chunk_manager/generic_file_source.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class GenericSharedDataChunk extends Chunk {
    constructor() {
      super(...arguments);
      this.backendOnly = true;
    }
    initialize(key) {
      super.initialize(key);
      this.requesters = new Set();
    }
    downloadSucceeded() {
      super.downloadSucceeded();
      let {requesters, data} = this;
      this.requesters = void 0;
      for (let requester of requesters) {
        requester.resolve(data);
      }
    }
    downloadFailed(error) {
      super.downloadFailed(error);
      let {requesters} = this;
      this.requesters = void 0;
      for (let requester of requesters) {
        requester.reject(error);
      }
    }
    freeSystemMemory() {
      this.data = void 0;
    }
  }
  class GenericSharedDataSource extends ChunkSourceBase {
    constructor(chunkManager, options) {
      super(chunkManager);
      this.registerDisposer(chunkManager);
      const {encodeKey = stableStringify} = options;
      this.downloadFunction = options.download;
      this.encodeKeyFunction = encodeKey;
      const {sourceQueueLevel = 0} = options;
      this.sourceQueueLevel = sourceQueueLevel;
      this.registerDisposer(this.chunkManager.recomputeChunkPrioritiesLate.add(() => {
        this.updateChunkPriorities();
      }));
    }
    updateChunkPriorities() {
      let {chunkManager} = this;
      for (let chunk of this.chunks.values()) {
        let {requesters} = chunk;
        if (requesters !== void 0) {
          for (let requester of requesters) {
            const {priorityTier, priority} = requester.getPriority();
            if (priorityTier === ChunkPriorityTier.RECENT)
              continue;
            chunkManager.requestChunk(chunk, priorityTier, priority);
          }
        }
      }
    }
    async download(chunk, cancellationToken) {
      const {size, data} = await this.downloadFunction(chunk.decodedKey, cancellationToken);
      chunk.systemMemoryBytes = size;
      chunk.data = data;
    }
    getData(key, getPriority, cancellationToken) {
      const encodedKey = this.encodeKeyFunction(key);
      let chunk = this.chunks.get(encodedKey);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(GenericSharedDataChunk);
        chunk.decodedKey = key;
        chunk.initialize(encodedKey);
        this.addChunk(chunk);
      }
      return makeCancelablePromise(cancellationToken, (resolve, reject, token) => {
        switch (chunk.state) {
          case ChunkState.FAILED:
            reject(chunk.error);
            return;
          case ChunkState.SYSTEM_MEMORY_WORKER:
            resolve(chunk.data);
            return;
        }
        const requester = {resolve, reject, getPriority};
        chunk.requesters.add(requester);
        token.add(() => {
          let {requesters} = chunk;
          if (requesters !== void 0) {
            requesters.delete(requester);
            this.chunkManager.scheduleUpdateChunkPriorities();
          }
          reject(CANCELED);
        });
        this.chunkManager.scheduleUpdateChunkPriorities();
      });
    }
    static get(chunkManager, memoizeKey, options) {
      return chunkManager.memoize.get(`getFileSource:${memoizeKey}`, () => new GenericSharedDataSource(chunkManager.addRef(), options));
    }
    static getData(chunkManager, memoizeKey, options, key, getPriority, cancellationToken) {
      const source = GenericSharedDataSource.get(chunkManager, memoizeKey, options);
      const result = source.getData(key, getPriority, cancellationToken);
      source.dispose();
      return result;
    }
    static getUrl(chunkManager, credentialsProvider, decodeFunction, url, getPriority, cancellationToken) {
      return GenericSharedDataSource.getData(chunkManager, `${getObjectId(decodeFunction)}`, {
        download: (url2, cancellationToken2) => cancellableFetchSpecialOk(credentialsProvider, url2, {}, responseArrayBuffer, cancellationToken2).then((response) => decodeFunction(response, cancellationToken2))
      }, url, getPriority, cancellationToken);
    }
  }

  // src/neuroglancer/datasource/precomputed/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VolumeChunkEncoding3;
  (function(VolumeChunkEncoding5) {
    VolumeChunkEncoding5[VolumeChunkEncoding5["RAW"] = 0] = "RAW";
    VolumeChunkEncoding5[VolumeChunkEncoding5["JPEG"] = 1] = "JPEG";
    VolumeChunkEncoding5[VolumeChunkEncoding5["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
  })(VolumeChunkEncoding3 || (VolumeChunkEncoding3 = {}));
  class VolumeChunkSourceParameters3 {
  }
  VolumeChunkSourceParameters3.RPC_ID = "precomputed/VolumeChunkSource";
  class MeshSourceParameters4 {
  }
  MeshSourceParameters4.RPC_ID = "precomputed/MeshSource";
  var DataEncoding;
  (function(DataEncoding2) {
    DataEncoding2[DataEncoding2["RAW"] = 0] = "RAW";
    DataEncoding2[DataEncoding2["GZIP"] = 1] = "GZIP";
  })(DataEncoding || (DataEncoding = {}));
  var ShardingHashFunction;
  (function(ShardingHashFunction2) {
    ShardingHashFunction2[ShardingHashFunction2["IDENTITY"] = 0] = "IDENTITY";
    ShardingHashFunction2[ShardingHashFunction2["MURMURHASH3_X86_128"] = 1] = "MURMURHASH3_X86_128";
  })(ShardingHashFunction || (ShardingHashFunction = {}));
  class MultiscaleMeshSourceParameters2 {
  }
  MultiscaleMeshSourceParameters2.RPC_ID = "precomputed/MultiscaleMeshSource";
  class SkeletonSourceParameters3 {
  }
  SkeletonSourceParameters3.RPC_ID = "precomputed/SkeletonSource";
  class AnnotationSpatialIndexSourceParameters2 {
  }
  AnnotationSpatialIndexSourceParameters2.RPC_ID = "precomputed/AnnotationSpatialIndexSource";
  class AnnotationSourceParameters3 {
  }
  AnnotationSourceParameters3.RPC_ID = "precomputed/AnnotationSource";
  class IndexedSegmentPropertySourceParameters {
  }
  IndexedSegmentPropertySourceParameters.RPC_ID = "precomputed/IndexedSegmentPropertySource";

  // src/neuroglancer/skeleton/decode_precomputed_skeleton.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function decodeSkeletonChunk2(chunk, response, vertexAttributes) {
    let dv = new DataView(response);
    let numVertices = dv.getUint32(0, true);
    let numEdges = dv.getUint32(4, true);
    const vertexPositionsStartOffset = 8;
    let curOffset = 8 + numVertices * 4 * 3;
    decodeSkeletonVertexPositionsAndIndices(chunk, response, Endianness.LITTLE, vertexPositionsStartOffset, numVertices, curOffset, numEdges);
    curOffset += numEdges * 4 * 2;
    let attributes = [];
    for (let info of vertexAttributes.values()) {
      const bytesPerVertex = DATA_TYPE_BYTES[info.dataType] * info.numComponents;
      const totalBytes = bytesPerVertex * numVertices;
      const attribute = new Uint8Array(response, curOffset, totalBytes);
      switch (bytesPerVertex) {
        case 2:
          convertEndian16(attribute, Endianness.LITTLE);
          break;
        case 4:
        case 8:
          convertEndian32(attribute, Endianness.LITTLE);
          break;
      }
      attributes.push(attribute);
      curOffset += totalBytes;
    }
    chunk.vertexAttributes = attributes;
  }

  // src/neuroglancer/util/byte_range_http_requests.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const cacheMode = navigator.userAgent.indexOf("Chrome") !== -1 ? "no-store" : "default";
  function fetchSpecialHttpByteRange(credentialsProvider, url, startOffset, endOffset, cancellationToken) {
    return cancellableFetchSpecialOk(credentialsProvider, url, {
      headers: getByteRangeHeader(startOffset, endOffset),
      cache: cacheMode
    }, responseArrayBuffer, cancellationToken);
  }

  // src/neuroglancer/util/hash.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function murmurHash3_x86_128Mix(h) {
    h ^= h >>> 16;
    h = Math.imul(h, 2246822507);
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909);
    h ^= h >>> 16;
    return h;
  }
  function rotl32(x, r) {
    return x << r | x >>> 32 - r;
  }
  function murmurHash3_x86_128Hash64Bits(out, seed, low, high) {
    let h1 = seed, h2 = seed, h3 = seed, h4 = seed;
    const c1 = 597399067;
    const c2 = 2869860233;
    const c3 = 951274213;
    let k22 = Math.imul(high, c2);
    k22 = rotl32(k22, 16);
    k22 = Math.imul(k22, c3);
    h2 ^= k22;
    let k12 = Math.imul(low, c1);
    k12 = rotl32(k12, 15);
    k12 = Math.imul(k12, c2);
    h1 ^= k12;
    const len4 = 8;
    h1 ^= len4;
    h2 ^= len4;
    h3 ^= len4;
    h4 ^= len4;
    h1 = h1 + h2 >>> 0;
    h1 = h1 + h3 >>> 0;
    h1 = h1 + h4 >>> 0;
    h2 = h2 + h1 >>> 0;
    h3 = h3 + h1 >>> 0;
    h4 = h4 + h1 >>> 0;
    h1 = murmurHash3_x86_128Mix(h1);
    h2 = murmurHash3_x86_128Mix(h2);
    h3 = murmurHash3_x86_128Mix(h3);
    h4 = murmurHash3_x86_128Mix(h4);
    h1 = h1 + h2 >>> 0;
    h1 = h1 + h3 >>> 0;
    h1 = h1 + h4 >>> 0;
    h2 = h2 + h1 >>> 0;
    out.low = h1;
    out.high = h2;
    return out;
  }

  // src/neuroglancer/datasource/precomputed/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const shardingHashFunctions = new Map([
    [
      ShardingHashFunction.MURMURHASH3_X86_128,
      (out) => {
        murmurHash3_x86_128Hash64Bits(out, 0, out.low, out.high);
      }
    ],
    [ShardingHashFunction.IDENTITY, (_out) => {
    }]
  ]);
  function getMinishardIndexDataSource(chunkManager, credentialsProvider, parameters) {
    const {url, sharding} = parameters;
    if (sharding === void 0)
      return void 0;
    const source = GenericSharedDataSource.get(chunkManager, stableStringify({
      type: "precomputed:shardedDataSource",
      url,
      sharding,
      credentialsProvider: getObjectId(credentialsProvider)
    }), {
      download: async function(shardAndMinishard, cancellationToken) {
        const minishard = Uint64.lowMask(new Uint64(), sharding.minishardBits);
        Uint64.and(minishard, minishard, shardAndMinishard);
        const shard = Uint64.lowMask(new Uint64(), sharding.shardBits);
        const temp = new Uint64();
        Uint64.rshift(temp, shardAndMinishard, sharding.minishardBits);
        Uint64.and(shard, shard, temp);
        const shardUrl = `${url}/${shard.toString(16).padStart(Math.ceil(sharding.shardBits / 4), "0")}.shard`;
        const shardIndexSize = new Uint64(16);
        Uint64.lshift(shardIndexSize, shardIndexSize, sharding.minishardBits);
        const shardIndexStart = Uint64.lshift(new Uint64(), minishard, 4);
        const shardIndexEnd = Uint64.addUint32(new Uint64(), shardIndexStart, 16);
        let shardIndexResponse;
        try {
          shardIndexResponse = await fetchSpecialHttpByteRange(credentialsProvider, shardUrl, shardIndexStart, shardIndexEnd, cancellationToken);
        } catch (e) {
          if (isNotFoundError(e))
            return {data: void 0, size: 0};
          throw e;
        }
        if (shardIndexResponse.byteLength !== 16) {
          throw new Error(`Failed to retrieve minishard offset`);
        }
        const shardIndexDv = new DataView(shardIndexResponse);
        const minishardStartOffset = new Uint64(shardIndexDv.getUint32(0, true), shardIndexDv.getUint32(4, true));
        const minishardEndOffset = new Uint64(shardIndexDv.getUint32(8, true), shardIndexDv.getUint32(12, true));
        if (Uint64.equal(minishardStartOffset, minishardEndOffset)) {
          return {data: void 0, size: 0};
        }
        Uint64.add(minishardStartOffset, minishardStartOffset, shardIndexSize);
        Uint64.add(minishardEndOffset, minishardEndOffset, shardIndexSize);
        let minishardIndexResponse = await fetchSpecialHttpByteRange(credentialsProvider, shardUrl, minishardStartOffset, minishardEndOffset, cancellationToken);
        if (sharding.minishardIndexEncoding === DataEncoding.GZIP) {
          minishardIndexResponse = (await requestAsyncComputation(decodeGzip, cancellationToken, [minishardIndexResponse], new Uint8Array(minishardIndexResponse))).buffer;
        }
        if (minishardIndexResponse.byteLength % 24 !== 0) {
          throw new Error(`Invalid minishard index length: ${minishardIndexResponse.byteLength}`);
        }
        const minishardIndex = new Uint32Array(minishardIndexResponse);
        convertEndian32(minishardIndex, Endianness.LITTLE);
        const minishardIndexSize = minishardIndex.byteLength / 24;
        let prevEntryKeyLow = 0, prevEntryKeyHigh = 0;
        let prevStartLow = shardIndexSize.low, prevStartHigh = shardIndexSize.high;
        for (let i = 0; i < minishardIndexSize; ++i) {
          let entryKeyLow = prevEntryKeyLow + minishardIndex[i * 2];
          let entryKeyHigh = prevEntryKeyHigh + minishardIndex[i * 2 + 1];
          if (entryKeyLow >= 4294967296) {
            entryKeyLow -= 4294967296;
            entryKeyHigh += 1;
          }
          prevEntryKeyLow = minishardIndex[i * 2] = entryKeyLow;
          prevEntryKeyHigh = minishardIndex[i * 2 + 1] = entryKeyHigh;
          let startLow = prevStartLow + minishardIndex[(minishardIndexSize + i) * 2];
          let startHigh = prevStartHigh + minishardIndex[(minishardIndexSize + i) * 2 + 1];
          if (startLow >= 4294967296) {
            startLow -= 4294967296;
            startHigh += 1;
          }
          minishardIndex[(minishardIndexSize + i) * 2] = startLow;
          minishardIndex[(minishardIndexSize + i) * 2 + 1] = startHigh;
          const sizeLow = minishardIndex[(2 * minishardIndexSize + i) * 2];
          const sizeHigh = minishardIndex[(2 * minishardIndexSize + i) * 2 + 1];
          let endLow = startLow + sizeLow;
          let endHigh = startHigh + sizeHigh;
          if (endLow >= 4294967296) {
            endLow -= 4294967296;
            endHigh += 1;
          }
          prevStartLow = endLow;
          prevStartHigh = endHigh;
          minishardIndex[(2 * minishardIndexSize + i) * 2] = endLow;
          minishardIndex[(2 * minishardIndexSize + i) * 2 + 1] = endHigh;
        }
        return {data: {data: minishardIndex, shardUrl}, size: minishardIndex.byteLength};
      },
      encodeKey: (key) => key.toString(),
      sourceQueueLevel: 1
    });
    source.sharding = sharding;
    source.credentialsProvider = credentialsProvider;
    return source;
  }
  function findMinishardEntry(minishardIndex, key) {
    const minishardIndexData = minishardIndex.data;
    const minishardIndexSize = minishardIndexData.length / 6;
    const keyLow = key.low, keyHigh = key.high;
    for (let i = 0; i < minishardIndexSize; ++i) {
      if (minishardIndexData[i * 2] !== keyLow || minishardIndexData[i * 2 + 1] !== keyHigh) {
        continue;
      }
      const startOffset = new Uint64(minishardIndexData[(minishardIndexSize + i) * 2], minishardIndexData[(minishardIndexSize + i) * 2 + 1]);
      const endOffset = new Uint64(minishardIndexData[(2 * minishardIndexSize + i) * 2], minishardIndexData[(2 * minishardIndexSize + i) * 2 + 1]);
      return {startOffset, endOffset};
    }
    return void 0;
  }
  async function getShardedData(minishardIndexSource, chunk, key, cancellationToken) {
    const {sharding} = minishardIndexSource;
    const hashFunction = shardingHashFunctions.get(sharding.hash);
    const hashCode = Uint64.rshift(new Uint64(), key, sharding.preshiftBits);
    hashFunction(hashCode);
    const shardAndMinishard = Uint64.lowMask(new Uint64(), sharding.minishardBits + sharding.shardBits);
    Uint64.and(shardAndMinishard, shardAndMinishard, hashCode);
    const getPriority = () => ({priorityTier: chunk.priorityTier, priority: chunk.priority});
    const minishardIndex = await minishardIndexSource.getData(shardAndMinishard, getPriority, cancellationToken);
    if (minishardIndex === void 0)
      return void 0;
    const minishardEntry = findMinishardEntry(minishardIndex, key);
    if (minishardEntry === void 0)
      return void 0;
    const {startOffset, endOffset} = minishardEntry;
    let data = await fetchSpecialHttpByteRange(minishardIndexSource.credentialsProvider, minishardIndex.shardUrl, startOffset, endOffset, cancellationToken);
    if (minishardIndexSource.sharding.dataEncoding === DataEncoding.GZIP) {
      data = (await requestAsyncComputation(decodeGzip, cancellationToken, [data], new Uint8Array(data))).buffer;
    }
    return {data, shardInfo: {shardUrl: minishardIndex.shardUrl, offset: startOffset}};
  }
  function getOrNotFoundError(v) {
    if (v === void 0)
      throw new Error("not found");
    return v;
  }
  const chunkDecoders3 = new Map();
  chunkDecoders3.set(VolumeChunkEncoding3.RAW, decodeRawChunk);
  chunkDecoders3.set(VolumeChunkEncoding3.JPEG, decodeJpegChunk);
  chunkDecoders3.set(VolumeChunkEncoding3.COMPRESSED_SEGMENTATION, decodeCompressedSegmentationChunk);
  let PrecomputedVolumeChunkSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(VolumeChunkSource), VolumeChunkSourceParameters3) {
    constructor() {
      super(...arguments);
      this.chunkDecoder = chunkDecoders3.get(this.parameters.encoding);
      this.minishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, this.parameters);
      this.gridShape = (() => {
        const gridShape = new Uint32Array(3);
        const {upperVoxelBound, chunkDataSize} = this.spec;
        for (let i = 0; i < 3; ++i) {
          gridShape[i] = Math.ceil(upperVoxelBound[i] / chunkDataSize[i]);
        }
        return gridShape;
      })();
    }
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      const {minishardIndexSource} = this;
      let response;
      if (minishardIndexSource === void 0) {
        let url;
        {
          let chunkPosition = this.computeChunkBounds(chunk);
          let chunkDataSize = chunk.chunkDataSize;
          url = `${parameters.url}/${chunkPosition[0]}-${chunkPosition[0] + chunkDataSize[0]}_${chunkPosition[1]}-${chunkPosition[1] + chunkDataSize[1]}_${chunkPosition[2]}-${chunkPosition[2] + chunkDataSize[2]}`;
        }
        response = await cancellableFetchSpecialOk(this.credentialsProvider, url, {}, responseArrayBuffer, cancellationToken);
      } else {
        this.computeChunkBounds(chunk);
        const {gridShape} = this;
        const {chunkGridPosition} = chunk;
        const xBits = Math.ceil(Math.log2(gridShape[0])), yBits = Math.ceil(Math.log2(gridShape[1])), zBits = Math.ceil(Math.log2(gridShape[2]));
        const chunkIndex = encodeZIndexCompressed(new Uint64(), xBits, yBits, zBits, chunkGridPosition[0], chunkGridPosition[1], chunkGridPosition[2]);
        response = getOrNotFoundError(await getShardedData(minishardIndexSource, chunk, chunkIndex, cancellationToken)).data;
      }
      await this.chunkDecoder(chunk, cancellationToken, response);
    }
  };
  PrecomputedVolumeChunkSource = __decorate([
    registerSharedObject()
  ], PrecomputedVolumeChunkSource);
  function decodeManifestChunk2(chunk, response) {
    return decodeJsonManifestChunk(chunk, response, "fragments");
  }
  function decodeFragmentChunk3(chunk, response) {
    let dv = new DataView(response);
    let numVertices = dv.getUint32(0, true);
    assignMeshFragmentData(chunk, decodeTriangleVertexPositionsAndIndices(response, Endianness.LITTLE, 4, numVertices));
  }
  let PrecomputedMeshSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(MeshSource), MeshSourceParameters4) {
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      const response = await cancellableFetchSpecialOk(this.credentialsProvider, `${parameters.url}/${chunk.objectId}:${parameters.lod}`, {}, responseJson, cancellationToken);
      decodeManifestChunk2(chunk, response);
    }
    async downloadFragment(chunk, cancellationToken) {
      const {parameters} = this;
      const response = await cancellableFetchSpecialOk(this.credentialsProvider, `${parameters.url}/${chunk.fragmentId}`, {}, responseArrayBuffer, cancellationToken);
      decodeFragmentChunk3(chunk, response);
    }
  };
  PrecomputedMeshSource = __decorate([
    registerSharedObject()
  ], PrecomputedMeshSource);
  function decodeMultiscaleManifestChunk2(chunk, response) {
    if (response.byteLength < 28 || response.byteLength % 4 !== 0) {
      throw new Error(`Invalid index file size: ${response.byteLength}`);
    }
    const dv = new DataView(response);
    let offset = 0;
    const chunkShape = vec3_exports.fromValues(dv.getFloat32(offset, true), dv.getFloat32(offset + 4, true), dv.getFloat32(offset + 8, true));
    offset += 12;
    const gridOrigin = vec3_exports.fromValues(dv.getFloat32(offset, true), dv.getFloat32(offset + 4, true), dv.getFloat32(offset + 8, true));
    offset += 12;
    const numStoredLods = dv.getUint32(offset, true);
    offset += 4;
    if (response.byteLength < offset + (4 + 4 + 4 * 3) * numStoredLods) {
      throw new Error(`Invalid index file size for ${numStoredLods} lods: ${response.byteLength}`);
    }
    const storedLodScales = new Float32Array(response, offset, numStoredLods);
    offset += 4 * numStoredLods;
    convertEndian32(storedLodScales, Endianness.LITTLE);
    const vertexOffsets = new Float32Array(response, offset, numStoredLods * 3);
    convertEndian32(vertexOffsets, Endianness.LITTLE);
    offset += 12 * numStoredLods;
    const numFragmentsPerLod = new Uint32Array(response, offset, numStoredLods);
    offset += 4 * numStoredLods;
    convertEndian32(numFragmentsPerLod, Endianness.LITTLE);
    const totalFragments = numFragmentsPerLod.reduce((a, b) => a + b);
    if (response.byteLength !== offset + 16 * totalFragments) {
      throw new Error(`Invalid index file size for ${numStoredLods} lods and ${totalFragments} total fragments: ${response.byteLength}`);
    }
    const fragmentInfo = new Uint32Array(response, offset);
    convertEndian32(fragmentInfo, Endianness.LITTLE);
    const clipUpperBound = vec3_exports.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    const clipLowerBound = vec3_exports.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    let numLods = Math.max(1, storedLodScales.length);
    {
      let fragmentBase = 0;
      for (let lodIndex = 0; lodIndex < numStoredLods; ++lodIndex) {
        const numFragments = numFragmentsPerLod[lodIndex];
        for (let i = 0; i < 3; ++i) {
          let upperBoundValue = Number.NEGATIVE_INFINITY;
          let lowerBoundValue = Number.POSITIVE_INFINITY;
          const base39 = fragmentBase + numFragments * i;
          for (let j = 0; j < numFragments; ++j) {
            const v = fragmentInfo[base39 + j];
            upperBoundValue = Math.max(upperBoundValue, v);
            lowerBoundValue = Math.min(lowerBoundValue, v);
          }
          if (numFragments != 0) {
            while (upperBoundValue >>> numLods - lodIndex - 1 != lowerBoundValue >>> numLods - lodIndex - 1) {
              ++numLods;
            }
            if (lodIndex === 0) {
              clipLowerBound[i] = Math.min(clipLowerBound[i], (1 << lodIndex) * lowerBoundValue);
              clipUpperBound[i] = Math.max(clipUpperBound[i], (1 << lodIndex) * (upperBoundValue + 1));
            }
          }
        }
        fragmentBase += numFragments * 4;
      }
    }
    let maxFragments = 0;
    {
      let prevNumFragments = 0;
      let prevLodIndex = 0;
      for (let lodIndex = 0; lodIndex < numStoredLods; ++lodIndex) {
        const numFragments = numFragmentsPerLod[lodIndex];
        maxFragments += prevNumFragments * (lodIndex - prevLodIndex);
        prevLodIndex = lodIndex;
        prevNumFragments = numFragments;
        maxFragments += numFragments;
      }
      maxFragments += (numLods - 1 - prevLodIndex) * prevNumFragments;
    }
    const octreeTemp = new Uint32Array(5 * maxFragments);
    const offsetsTemp = new Float64Array(maxFragments + 1);
    let octree;
    {
      let priorStart = 0;
      let baseRow = 0;
      let dataOffset = 0;
      let fragmentBase = 0;
      for (let lodIndex = 0; lodIndex < numStoredLods; ++lodIndex) {
        const numFragments = numFragmentsPerLod[lodIndex];
        for (let j = 0; j < numFragments; ++j) {
          for (let i = 0; i < 3; ++i) {
            octreeTemp[5 * (baseRow + j) + i] = fragmentInfo[fragmentBase + j + i * numFragments];
          }
          const dataSize = fragmentInfo[fragmentBase + j + 3 * numFragments];
          dataOffset += dataSize;
          offsetsTemp[baseRow + j + 1] = dataOffset;
          if (dataSize === 0) {
            octreeTemp[5 * (baseRow + j) + 4] = 2147483648;
          }
        }
        fragmentBase += 4 * numFragments;
        if (lodIndex !== 0) {
          computeOctreeChildOffsets(octreeTemp, priorStart, baseRow, baseRow + numFragments);
        }
        priorStart = baseRow;
        baseRow += numFragments;
        while (lodIndex + 1 < numLods && (lodIndex + 1 >= storedLodScales.length || storedLodScales[lodIndex + 1] === 0)) {
          const curEnd = generateHigherOctreeLevel(octreeTemp, priorStart, baseRow);
          offsetsTemp.fill(dataOffset, baseRow + 1, curEnd + 1);
          priorStart = baseRow;
          baseRow = curEnd;
          ++lodIndex;
        }
      }
      octree = octreeTemp.slice(0, 5 * baseRow);
      chunk.offsets = offsetsTemp.slice(0, baseRow + 1);
    }
    const source = chunk.source;
    const {lodScaleMultiplier} = source.parameters.metadata;
    const lodScales = new Float32Array(numLods);
    lodScales.set(storedLodScales, 0);
    for (let i = 0; i < storedLodScales.length; ++i) {
      lodScales[i] *= lodScaleMultiplier;
    }
    chunk.manifest = {
      chunkShape,
      chunkGridSpatialOrigin: gridOrigin,
      clipLowerBound: vec3_exports.add(clipLowerBound, gridOrigin, vec3_exports.multiply(clipLowerBound, clipLowerBound, chunkShape)),
      clipUpperBound: vec3_exports.add(clipUpperBound, gridOrigin, vec3_exports.multiply(clipUpperBound, clipUpperBound, chunkShape)),
      octree,
      lodScales,
      vertexOffsets
    };
  }

  // src/neuroglancer/mesh/draco/neuroglancer_draco.wasm
  var neuroglancer_draco_default = "data:application/wasm;base64,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ACACQQJIDQUaIAAgAkF+ajYCBCAAQQhqIgMgAiAFakF+aiIALQABQQh0QYD+AHEgAC0AAHIiADYCAAwCC0EAIAJBA0gNBBogACACQX1qNgIEIABBCGoiAyACIAVqQX1qIgAtAAJBEHRBgID8AXEgAC0AACAALQABQQh0cnIiADYCAAwBC0EADAMLIAMgAEGAIGoiADYCACAAQYCAwABJBH8gASAIIAl8NwMQQQEFQQALCwsLIQcgBCQDIAcLXQEBfyABIABIIAAgASACakhxBEAgASACaiEBIAAiAyACaiEAA0AgAkEASgRAIAJBAWshAiAAQQFrIgAgAUEBayIBLAAAOgAADAELCyADIQAFIAAgASACEA4aCyAAC24CAX8BfiABKQMIIAEpAxAiA1cEQEEADwsgASgCACADp2osAAAhAiABIANCAXw3AxAgACACQQBIBH4gACABEB8EfiAAIAApAwBCB4YiAzcDACADIAJB/wBxrYQFQQAPCwUgAkH/AXGtCzcDAEEBC4ACAQN/IwMhAyMDQSBqJAMgACgCCEEFdCABTwRAIAMkAw8LIANBEGoiAkEANgIAIAJBADYCBCACQQA2AgggAUEASARAEAALIAIgAUF/akEFdkEBaiIBQQJ0EAs2AgAgAkEANgIEIAIgATYCCCADQQhqIgEgACgCACIENgIAIAFBADYCBCADIAQgACgCBCIEQQV2QQJ0ajYCACADIARBH3E2AgQgAiABIAMQmgEgACgCACEBIAAgAigCADYCACACIAE2AgAgACgCBCEEIAAgAigCBDYCBCACIAQ2AgQgACgCCCEEIAAgAigCCDYCCCACIAQ2AgggAQRAIAEQCgsgAyQDC5cBAQJ/IABB/BE2AgAgACgCECEBIABBADYCECABRQRADwsgASgCWCEAIAFBADYCWCAABEAgACgCCCICBEAgACACNgIMIAIQCgsgABAKCyABKAJEIgAEQCABIAA2AkggABAKCyABQUBrIgIoAgAhACACQQA2AgAgAARAIAAoAgAiAgRAIAAgAjYCBCACEAoLIAAQCgsgARAKCwQAQQALggMBBH8jAyEDIwNBQGskAyADQgA3AgAgA0IANwIIIANCADcCECADQgA3AhggA0IANwIgIANCADcCKCADQQA2AjAgAyABEJABBH8CfyAARSIFRQRAQQAgAygC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QCABKAIIEAoLIAEQCiADBEAgAyEBDAELCwsgAigCACEBIAJBADYCACABBEAgARAKCyACEAoLIAAsAAtBAE4EQA8LIAAoAgAQCguTAQECfyABQQFGBEBBAiEBBSABIAFBf2pxBEAgARA9IQELCyABIAAoAgQiA0sEQCAAIAEQeA8LIAEgA08EQA8LIAAoAgyzIAAqAhCVjakhAiADQX9qIANxRSADQQJLcQR/IAJBAUEgIAJBf2pna3QgAkECSRsFIAIQPQsiAiABIAEgAkkbIgEgA08EQA8LIAAgARB4C10AIABCADcCACAAQgA3AgggAEIANwIQIABBAToAGCAAQgA3AhwgAEIANwIkIABCADcCLCAAQgA3AjQgAEIANwI8IAAgADYCRCAAQgA3AkggAEIANwJQIABCADcCWAvyAgEGfyAAKAIAIgUhBCAAKAIIIgMgBWtBAnUgAUkEQCAFBEAgACAFNgIEIAUQCiAAQQA2AgggAEEANgIEIABBADYCAEEAIQMLIAFB/////wNLBEAQAAsgASADQQF1IgQgBCABSRtB/////wMgA0ECdUH/////AUkbIgNB/////wNLBEAQAAsgACIGQQRqIANBAnQQCyIENgIAIAAgBDYCACAAIANBAnQgBGo2AgggASEDIAQhAANAIAAgAigCADYCACAAQQRqIQAgA0F/aiIDDQALIAYgAUECdCAEajYCBAUgACIHQQRqKAIAIgYgBWtBAnUiBSABSSEIIAUgASAIGyIDBEAgBCEAA0AgACACKAIANgIAIABBBGohACADQX9qIgMNAAsLIAhFBEAgByABQQJ0IARqNgIEDwsgASAFayIDIQEgBiEAA0AgACACKAIANgIAIABBBGohACABQX9qIgENAAsgByADQQJ0IAZqNgIECwtDACAAIAEQ9AEiASAAQQRqRwRAIAFBHGoiACwAC0EASAR/IAAoAgAFIAALEM4BIgBBAEchASAAQX9HBEAgAQ8LC0EAC5oHAg1/A34jAyECIwNB0ABqJAMgAkHMAGohCAJAIAAoAhwtACRBCHRBgARIBEAgASkDCCABKQMQIg9CBHwiEVMEQAwCBSAIIAEoAgAgD6dqKAAAIgY2AgAgASARNwMQCwUgCCABEBBFDQEgCCgCACEGCyAGRQ0AIAYgACgCCCAAQQRqIgwoAgAiBWtBAnUiB0sEQCAMIAYgB2sQEiAIKAIARQRAIAIkA0EBDwsFIAYgB0kEQCAAIAZBAnQgBWo2AggLCyACIgdByABqIQkgAkFAayEKIAJBxABqIQ0gACgCICEOIABBEGohC0EAIQYCQANAAkAgASkDCCIRIAEpAxAiD1cEQEEAIQAMAwsgASgCACICIA+nai0AACEEIAEgD0IBfCIQNwMQIBEgEFcEQEEAIQAMAwsgAiAQp2osAAAhBSABIA9CAnwiEDcDECARIBBXBEBBACEADAMLIAIgEKdqLAAAIQMgASAPQgN8IhA3AxAgESAQVwRAQQAhAAwDCyACIBCnaiwAACECIAEgD0IEfDcDECAFQX9qQRh0QRh1Qf8BcUEKSgRAQQAhAAwDCyAHEI0BIAcgBEH/AXEgAyAFQf8BcSIFIAJBAEcgBRA/IANB/wFxbKwQiwEgACgCHCICLQAkQQh0IAItACVyQYMCSARAIAEpAwggASkDECIPQgJ8IhFTDQEgASgCACAPp2ovAAAhAiABIBE3AxAgCSACQf//A3EiAjYCAAUgCSABEBAaIAkoAgAhAgsgByACNgI8QeAAEAsiAiAHEIcBIAogAjYCACAOIAoQ2gEhBSAKKAIAIQIgCkEANgIAIAIEQCACKAJYIQMgAkEANgJYIAMEQCADKAIIIgQEQCADIAQ2AgwgBBAKCyADEAoLIAIoAkQiAwRAIAIgAzYCSCADEAoLIAJBQGsiBCgCACEDIARBADYCACADBEAgAygCACIEBEAgAyAENgIEIAQQCgsgAxAKCyACEAoLIA4oAgggBUECdGooAgAgCSgCADYCPCAMKAIAIAZBAnRqIAU2AgAgBSAAKAIUIAsoAgAiAmtBAnUiA04EQCANQX82AgAgBUEBaiIEIANLBEAgCyAEIANrIA0QGCALKAIAIQIFIAQgA0kEQCAAIARBAnQgAmo2AhQLCwsgBUECdCACaiAGNgIAIAZBAWoiBiAIKAIASQ0BQQEhAAwCCwsgByQDQQAPCyAHJAMgAA8LIAIkA0EACwsAIAAgASACEPYBC5sFAgJ/An4jAyEDIwNBEGokAwJAAkAgASkDCCABKQMQIgVCBXxTDQAgAiABKAIAIAWnaiIEKAAANgAAIAIgBCwABDoABCABIAEpAxBCBXwiBTcDECACQbMhQQUQFQRAIANBIBALIgE2AgAgA0GggICAeDYCCCADQRE2AgQgAUG5ISkAADcAACABQcEhKQAANwAIIAFBySEsAAA6ABAgAUEAOgARIABBfzYCAAwCCyABKQMIIAVXDQAgAiABKAIAIAWnaiwAADoABSABIAEpAxBCAXwiBTcDECABKQMIIAVXDQAgAiABKAIAIAWnaiwAADoABiABIAEpAxBCAXwiBTcDECABKQMIIAVXDQAgAiABKAIAIAWnaiwAADoAByABIAEpAxBCAXwiBTcDECABKQMIIAVXDQAgAiABKAIAIAWnaiwAADoACCABIAEpAxAiBkIBfCIFNwMQIAEpAwggBkIDfFkEQCACIAEoAgAgBadqLgAAOwAKIAEgASkDEEICfDcDECAAQgA3AgAgAEIANwIIIAMkAw8LIANBIBALIgE2AgAgA0GggICAeDYCCCADQR02AgQgAUGgCikAADcAACABQagKKQAANwAIIAFBsAopAAA3ABAgAUG4CigAADYAGCABQbwKLAAAOgAcIAFBADoAHSAAQX42AgAgAEEEaiADEBogAywAC0EASARAIAMoAgAQCgsgAyQDDwsgA0EgEAsiATYCACADQaCAgIB4NgIIIANBHTYCBCABQaAKKQAANwAAIAFBqAopAAA3AAggAUGwCikAADcAECABQbgKKAAANgAYIAFBvAosAAA6ABwgAUEAOgAdIABBfjYCAAsgAEEEaiADEBogAywAC0EASARAIAMoAgAQCgsgAyQDC/EDAQJ/IABBlBw2AgAgAEHoAWoQiQIgAEHYAWoQUSAAKALEASIBBEAgACABNgLIASABEAoLIAAoArgBIgEEQCAAIAE2ArwBIAEQCgsgACgCrAEiAQRAIAAgATYCsAEgARAKCyAAKAKgASIBBEAgACABNgKkASABEAoLIAAoApABIgEEQANAIAEoAgAhAiABEAogAgRAIAIhAQwBCwsLIAAoAogBIQEgAEEANgKIASABBEAgARAKCyAAKAJ4IgEEQCABEAoLIAAoAmwiAQRAIAEQCgsgACgCYCIBBEAgARAKCyAAKAJIIgEEQCAAIAE2AkwgARAKCyAAKAI8IgEEQCABEAoLIAAoAjAiAQRAIAAgATYCNCABEAoLIAAoAiQiAQRAIAAgATYCKCABEAoLIAAoAhgiAQRAIAAgATYCHCABEAoLIAAoAgwiAQRAIAAgATYC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NwMAIAAgAikDCDcDCCAAIAIpAxA3AxAgACACKQMYNwMYIAAgAikDIDcDICADKQMAIgQgACkDCCAAKQMQIgV9WARAIAAgBCAFfDcDEAwCCwsMBAsFIABB0ABqIAAQHUUNAwsgABCIAUUNAiABIAApAwA3AwAgASAAKQMINwMIIAEgACkDEDcDECABIAApAxg3AxggASAAKQMgNwMgIAMkA0EBDwsLIAMkA0EADwsgAyQDQQALNgAgAEEANgIAIAAgAjoAGCAAIAM2AhwgACAEQQFxOgAgIAAgBTcDKCAAQgA3AzAgACABNgI4C6kEAQN/IABBgBo2AgAgACgC8AIhAiAAQQA2AvACIAIEQCACQXxqIgMoAgAiAQRAIAFBBHQgAmohAQNAIAFBcGoiASACRw0ACwsgAxAKCyAAQdgBahBRIAAoAsQBIgEEQCAAIAE2AsgBIAEQCgsgACgCuAEiAQRAIAAgATYCvAEgARAKCyAAKAKsASIBBEAgACABNgKwASABEAoLIAAoAqABIgEEQCAAIAE2AqQBIAEQCgsgACgCkAEiAQRAA0AgASgCACECIAEQCiACBEAgAiEBDAELCwsgACgCiAEhASAAQQA2AogBIAEEQCABEAoLIAAoAngiAQRAIAEQCgsgACgCbCIBBEAgARAKCyAAKAJgIgEEQCABEAoLIAAoAkgiAQRAIAAgATYCTCABEAoLIAAoAjwiAQRAIAEQCgsgACgCMCIBBEAgACABNgI0IAEQCgsgACgCJCIBBEAgACABNgIoIAEQCgsgACgCGCIBBEAgACABNgIcIAEQCgsgACgCDCIBBEAgACABNgIQIAEQCgsgACgCCCEBIABBADYCCCABRQRADwsgASgCTCIABEAgASAANgJQIAAQCgsgAUFAaygCACIABEAgASAANgJEIAAQCgsgASgCMCIABEAgASAANgI0IAAQCgsgASgCGCIABEAgASAANgIcIAAQCgsgASgCDCIABEAgASAANgIQIAAQCgsgASgCACIABEAgASAANgIEIAAQCgsgARAKC0EAIABBADYCACAAQgA3AwggAEIANwMQIABBAToAGCAAQQk2AhwgAEIANwMoIABCADcDMCAAQX82AjggAEEANgI8CxYAIAAQ/AEgAEGIGTYCACAAQQA2AiwL3AMCBn8DfiMDIQIjA0EQaiQDAkAg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IBAgEiARIA8gBBACIBEEQCAREAoLBSAEQQA2AgAgBCAQQQNsNgIEIBAgEiALIA8gBBACCyALBEAgCxAKC0EABUELCwVBBQsFQQQLBUEDCwsLIQMgBCgCYCECIARBADYCYCACBEAgAiACKAIAKAIEQf8AcUHiAWoRAAALIAQsAF9BAEgEQCAEKAJUEAoLIA5BDGogDigCEBBBIA4gDigCBBArIABFBEAgBCQDIAMPCyAAEAogBCQDIAML6wEBBH8gAEGsEjYCACAAKAI8IQEgAEEANgI8IAEEQCABIAEoAgAoAgRB/wBxQeIBahEAAAsgACgCMCIBBEAgACABNgI0IAEQCgsgACgCJCICBEACfyACIAAoAigiAUYEfyACBQNAIAFBfGoiASgCACEDIAFBADYCACADBEAgAyADKAIAKAIEQf8AcUHiAWoRAAALIAEgAkcNAAsgACgCJAshBCAAIAI2AiggBAsQCgsgAEHEETYCACAAKAIQIgEEQCAAIAE2AhQgARAKCyAAKAIEIgFFBEAgABAKDwsgACABNgIIIAEQCiAAEAoL4wEBBH8gAEGsEjYCACAAKAI8IQEgAEEANgI8IAEEQCABIAEoAgAoAgRB/wBxQeIBahEAAAsgACgCMCIBBEAgACABNgI0IAEQCgsgACgCJCICBEACfyACIAAoAigiAUYEfyACBQNAIAFBfGoiASgCACEDIAFBADYCACADBEAgAyADKAIAKAIEQf8AcUHiAWoRAAALIAEgAkcNAAsgACgCJAshBCAAIAI2AiggBAsQCgsgAEHEETYCACAAKAIQIgEEQCAAIAE2AhQgARAKCyAAKAIEIgFFBEAPCyAAIAE2AgggARAKC7IBAgV/A34gASgCBCABKAIAayEBIAAoAggpAygiCKciBBALIQMgAUEATARAIAMQCkEBDwsgAUECdSEFIAhC/////w+DIQhBACEBA38Cf0EAIAIpAwggCCACKQMQIgl8IgpTDQAaIAMgAigCACAJp2ogBBAOGiACIAo3AxAgASAAKAIIQUBrKAIAKAIAaiADIAQQDhogASAEaiEBIAZBAWoiBiAFSA0BQQELCyEHIAMQCiAHC+8BAQR/IAEoAgAoAhQhAyABIANB/wBxEQMAQQBMBEBBAQ8LQQAhAwN/An8gASgCACgCGCECQQAgACgCBCgCBCABIAMgAkE/cUGAAWoRAgAQ3AEiAkF/Rg0AGiAAKAIEIgQtACRBCHRBgARIBEAgASgCACgCHCEFQQAgASAEKAIEKAIIIAJBAnRqKAIAIAVBP3FBgAFqEQIARQ0BGgVBACAEIAIQ+AEiAkUNARogASgCACgCHCEEQQAgASACIARBP3FBgAFqEQIARQ0BGgsgASgCACgCFCECIANBAWoiAyABIAJB/wBxEQMASA0BQQELCwsEAEEBC00BAX8gACgCCCIDLAAYQQFIBEBBAA8LIAMgASgCBCABKAIAa0ECdRCEAUUEQEEADwsgACgCACgCICEDIAAgASACIANBD3FBwAFqEQQACxIAIAAgATYCCCAAQX82AgxBAQsKACAAECEgABAKCwYAQQgQAQsGAEEGEAELBgBBBBABC80BAQZ/IAAoAgAiBUUEQA8LAn8gBSAAKAIEIgRGBH8gBQUDQCAEQXxqIgQoAgAhAiAEQQA2AgAgAgRAIAIoAlghASACQQA2AlggAQRAIAEoAggiAwRAIAEgAzYCDCADEAoLIAEQCgsgAigCRCIBBEAgAiABNgJIIAEQCgsgAkFAayIDKAIAIQEgA0EANgIAIAEEQCABKAIAIgMEQCABIAM2AgQgAxAKCyABEAoLIAIQCgsgBCAFRw0ACyAAKAIACyEGIAAgBTYCBCAGCxAKCxEAIAEgAEH/AHFB4gFqEQAACw4AIABBAXFB4AFqEQgAC8oBAQR/IAAoAgQiBCAAKAIIIgJHBEADQCAAIAJBfGoiATYCCCABKAIAIQIgAUEANgIAIAIEQCACKAJYIQEgAkEANgJYIAEEQCABKAIIIgMEQCABIAM2AgwgAxAKCyABEAoLIAIoAkQiAQRAIAIgATYCSCABEAoLIAJBQGsiAygCACEBIANBADYCACABBEAgASgCACIDBEAgASADNgIEIAMQCgsgARAKCyACEAoLIAAoAggiAiAERw0ACwsgACgCACIARQRADwsgABAKC8cBAQN/IwMhBCMDQRBqJAMgASwACyICQQBIBH8gASgCBAUgAkH/AXELIQMDQAJAIAJBGHRBGHVBAEgEfyABKAIABSABCyECIARBATYCACABIAIgA0EBaiAEEM8BIgJBf0oEfyACIANNDQEgAgUgA0EBdEEBcgsiAxA3IAEsAAshAgwBCwsgASACEDcgACABKQIANwIAIAAgASgCCDYCCEEAIQADQCAAQQNHBEAgAEECdCABakEANgIAIABBAWohAAwBCwsgBCQDC1QBAX8gAEIANwIAIABBADYCCANAIAFBA0cEQCABQQJ0IABqQQA2AgAgAUEBaiEBDAELCyAAIAAsAAtBAEgEfyAAKAIIQf////8HcUF/agVBCgsQNwsxAQF/IwMhASMDQRBqJAMgARDIASAAIAEQxwEgASwAC0EASARAIAEoAgAQCgsgASQDC6UBAQJ/QW8gAWsgAkkEQBAACyAALAALQQBIBH8gACgCAAUgAAshBiABQef///8HSQR/QQsgAUEBdCIFIAEgAmoiAiACIAVJGyICQRBqQXBxIAJBC0kbBUFvCyICEAshBSAEBEAgBSAGIAQQLAsgAyAEayIDBEAgBCAFaiAEIAZqIAMQLAsgAUEKRwRAIAYQCgsgACAFNgIAIAAgAkGAgICAeHI2AggLygEBBH8jAyEFIwNBEGokAyABBEAgACwACyIDQQBIBH8gACgCBCECIAAoAghB/////wdxQX9qBSADQf8BcSECQQoLIgQgAmsgAUkEfyAAIAQgASACaiAEayACIAIQygEgACwACwUgAwtBGHRBGHVBAEgEfyAAKAIABSAACyIDIAJqIQQgAQRAIARBACABEBEaCyABIAJqIQEgACwAC0EASARAIAAgATYCBAUgACABOgALCyAFQQA6AAAgASADaiAFLAAAOgAACyAFJAMLmAIBBn8gACwACyIDQQBIIgQEfyAAKAIEIQUgACgCCEH/////B3FBf2oFIANB/wFxIQVBCgshAiAFQQAgBUEASxsiBkELSSEBQQogBkEQakFwcUF/aiABGyIGIAJHBEACQAJAAkAgAQRAIAAoAgAhASAEBH9BACEEIAEhAiAABSAAIAEgA0H/AXFBAWoQLCABEAoMAwshAQUgBkEBaiICEAshASAEBH9BASEEIAAoAgAFIAEgACADQf8BcUEBahAsIABBBGohAwwCCyECCyABIAIgAEEEaiIDKAIAQQFqECwgAhAKIARFDQEgBkEBaiECCyAAIAJBgICAgHhyNgIIIAMgBTYCACAAIAE2AgAMAQsgACAFOgALCwsLdQEDfyMDIQMjA0EQaiQDIAJBb0sEQBAACyACQQtJBEAgACACOgALBSAAIAJBEGpBcHEiBBALIgU2AgAg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ADcCSAsHACAAKAIcC6MDAQp/IwMhAiMDQSBqJAMgACgCBCIEIQcgACgCCCIIIARrQQJ1IAFPBEAgBEEAIAFBAnQQERogACABQQJ0IAdqNgIEIAIkAw8LIAEgBCAAKAIAIgZrQQJ1IgpqIgNB/////wNLBEAQAAsgAkEANgIMIAIgAEEIajYCECADIAggBmsiBUEBdSILIAsgA0kbQf////8DIAVBAnVB/////wFJGyIFBEAgBUH/////A0sEQBAABSAFQQJ0EAshCQsLIAIgCTYCACACIApBAnQgCWoiAzYCBCACIAVBAnQgCWoiBTYCDCADQQAgAUECdBARGiACQQhqIAFBAnQgA2oiATYCACAGIAdGBH8gBQUgByEBA0AgAUF8aiIBKAIAIQQgAUEANgIAIANBfGogBDYCACACIAIoAgRBfGoiAzYCBCABIAZHDQALIAAoAgAhBiACKAIIIQEgACgCBCEEIAAoAgghCCACKAIMCyEHIAAgAzYCACACIAY2AgQgACABNgIEIAIgBDYCCCAAIAc2AgggAiAINgIMIAIgBjYCACACEMYBIAIkAwvjAQEEfyAAKAIEIgMgACgCACIFa0ECdSICIAFJBEAgACABIAJrEN8BDwsgAiABTQRADwsgAUECdCAFaiIFIAMiAUcEQANAIAFBfGoiASgCACEDIAFBADYCACADBEAgAygCWCECIANBADYCWCACBEAgAigCCCIEBEAgAiAENgIMIAQQCgsgAhAKCyADKAJEIgIEQCADIAI2AkggAhAKCyADQUBrIgQoAgAhAiAEQQA2AgAgAgRAIAIoAgAiBARAIAIgBDYCBCAEEAoLIAIQCgsgAxAKCyABIAVHDQALCyAAIAU2AgQL7wEBBH8gACgCKCIEIAAoAiwiBUYEQA8LIAQiAiEDAkACQANAIAMoAgAoAiggAUcEQCADQQRqIgIgBUYNAiACIQMMAQsLDAELDwsCQAJAIAIgBGtBAnVBAnQgBGoiAUEEaiICIAVGBEAgBSECDAEFA0AgAigCACEEIAJBADYCACABKAIAIQMgASAENgIAIAMEQCADEBwgAxAKCyABQQRqIQEgBSACQQRqIgJHDQALIAEgACgCLCICRw0BCwwBCwNAIAJBfGoiAigCACEDIAJBADYCACADBEAgAxAcIAMQCgsgASACRw0ACwsgACAB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IAIFA0AgAUF8aiIBKAIAIQMgAUEANgIAIAMEQCADIAMoAgAoAgRB/wBxQeIBahEAAAsgASACRw0ACyAAKAIICyEEIAAgAjYCDCAECxAKIAAQCguPAwEBfyAAQZQcNgIAIABBBGoiAUIANwIAIAFCADcCCCABQgA3AhAgAUIANwIYIAFCADcCICABQgA3AiggAUIANwIwIAFCADcCOCABQUBrQgA3AgAgAUIANwJIIABBfzYCVCAAQX82AlggAEF/NgJcIABCADcCYCAAQgA3AmggAEIANwJwIABCADcCeCAAQgA3AoABIABCADcCiAEgAEIANwKQASAAQYCAgPwDNgKYASAAQgA3ApwBIABCADcCpAEgAEIANwKsASAAQgA3ArQBIABCADcCvAEgAEIANwLEASAAQgA3AswBIABBfzYC1AEgAEEANgLYASAAQQA2AtwBIABBADYC4AEgAEHoAWoQFyAAQZACahAXIABCADcCuAIgAEEANgLAAiAAQQA6AMQCIABByAJqEBcgAEIANwLwAiAAQgA3AvgCIABCADcCgAMgAEIANwKIAyAAQX82ApADIABBfzYClAMgAEECNgKYAyAAQQc2ApwDIABCADcCoAMgAEIANwKoAyAAQgA3ArADC/8CAQF/IABB5Bs2AgAgAEEEaiIBQgA3AgAgAUIANwIIIAFCADcCECABQgA3AhggAUIANwIgIAFCADcCKCABQgA3AjAgAUIANwI4IAFBQGtCADcCACABQgA3AkggAEF/NgJUIABBfzYCWCAAQX82AlwgAEIANwJgIABCADcCaCAAQgA3AnAgAEIANwJ4IABCADcCgAEgAEIANwKIASAAQgA3ApABIABBgICA/AM2ApgBIABCADcCnAEgAEIANwKkASAAQgA3AqwBIABCADcCtAEgAEIANwK8ASAAQgA3AsQBIABCADcCzAEgAEF/NgLUASAAQQA2AtgBIABBADYC3AEgAEEANgLgASAAQegBahAXIABBkAJqEBcgAEIANwK4AiAAQQA2AsACIABBADoAxAIgAEHIAmoQFyAAQgA3AvACIABCADcC+AIgAEIANwKAAyAAQgA3AogDIABCADcCkAMgAEEANgKYAyAAQQA6AJwDIABBfzYCoAMgAEF/NgKkAwvPAgEBfyAAQYAaNgIAIABBBGoiAUIANwIAIAFCADcCCCABQgA3AhAgAUIANwIYIAFCADcCICABQgA3AiggAUIANwIwIAFCADcCOCABQUBrQgA3AgAgAUIANwJIIABBfzYCVCAAQX82AlggAEF/NgJcIABCADcCYCAAQgA3AmggAEIANwJwIABCADcCeCAAQgA3AoABIABCADcCiAEgAEIANwKQASAAQYCAgPwDNgKYASAAQgA3ApwBIABCADcCpAEgAEIANwKsASAAQgA3ArQBIABCADcCvAEgAEIANwLEASAAQgA3AswBIABBfzYC1AEgAEEANgLYASAAQQA2AtwBIABBADYC4AEgAEHoAWoQFyAAQZACahAXIABCADcCuAIgAEEANgLAAiAAQQA6AMQCIABByAJqEBcgAEEANgLwAiAAQQA2AvQCIABBADYC+AIL1gEBBX8gACgCxAEiAQRAIAAgATYCyAEgARAKCyAAKAK4ASICBEACfyAAKAK8ASIBIAJGBH8gAgUDQCABQXRqIgMoAgAiBARAIAFBeGogBDYCACAEEAoLIAIgA0cEQCADIQEMAQsLIAAoArgBCyEFIAAgAjYCvAEgBQsQCgsgACgCnAEiAQRAIAAgATYCoAEgARAKCyAAKAKIASEBIABBADYCiAEgAUUEQA8LIAFBfGoiAygCACIABEAgAEEEdCABaiEAA0AgAEFwaiIAIAFHDQALCyADEAoLtgMBCX8gACgCBCICIQMgACgCCCIEIAJrQQxtIAFPBEAgAkEAIAFBDGwQERogACABQQxsIANqNgIEDwsgASACIAAoAgAiAmtBDG0iBmoiBUHVqtWqAUsEQBAACyAFIAQgAmtBDG0iBEEBdCIHIAcgBUkbQdWq1aoBIARBqtWq1QBJGyIHBEAgB0HVqtWqAUsEQBAABSAHQQxsEAshCQsLIAZBDGwgCWoiBEEAIAFBDGwQERogAiIGIANGBEAgBCEFBSAEIQIDQCACQXRqIgVBADYCACACQXhqIghBADYCACACQXxqIgpBADYCACAFIANBdGoiAigCADYCACAIIANBeGoiCCgCADYCACAKIANBfGoiAygCADYCACADQQA2AgAgCEEANgIAIAJBADYCACACIAZHBEAgAiEDIAUhAgwBCwsgACgCACICIQYgACgCBCEDCyAAIAU2AgAgACABQQxsIARqNgIEIAAgB0EMbCAJajYCCCADIAZHBEAg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aiABIAYQGyADIAU2AgggAyACNgIMIAMgBzYCECADIAQ2AhQgBCADEJsCIAAgBDYCACADQdAbNgIAIAMoAlgiAARAIAMgADYCXCAAEAoLIAMoAkgiAARAIAMgADYCTCAAEAoLIAMoAjwiAARAIANBQGsgADYCACAAEAoLIAMoAjAiAARAIAMgADYCNCAAEAoLIANBpBs2AgAgAygCJCIABEAgABAKCyADKAIYIgBFBEAgAyQDDwsgABAKIAMkAwv+BQEBfyAAIAEoAgA2AgAgACABKAIENgIEIAAgASgCCDYCCCAAIAEoAgw2AgwgAUEANgIEIAFBADYCCCABQQA2AgwgACABKAIQNgIQIAAgASgCFDYCFCAAIAEoAhg2AhggAUEANgIQIAFBADYCFCABQQA2AhggACABLAAcOgAcIABBADYCICAAQQA2AiQgAEEANgIoIAAgASgCIDYCICAAIAEoAiQ2AiQgACABKAIoNgIoIAFBADYCKCABQQA2AiQgAUEANgIgIABBADYCLCAAQQA2AjAgAEEANgI0IAAgASgCLDYCLCAAIAEoAjA2AjAgACABKAI0NgI0IAFBADYCNCABQQA2AjAgAUEANgIsIABBADYCOCAAQQA2AjwgAEFAayICQQA2AgAgACABKAI4NgI4IAAgASgCPDYCPCACIAFBQGsiAigCADYCACACQQA2AgAgAUEANgI8IAFBADYCOCAAIAEoAkQ2AkQgACABKAJINgJIIABBADYCTCAAQQA2AlAgAEEANgJUIAAgASgCTDYCTCAAIAEoAlA2AlAgACABKAJUNgJUIAFBADYCVCABQQA2AlAgAUEANgJMIABBADYCWCAAQQA2AlwgAEEANgJgIAAgASgCWDYCWCAAIAEoAlw2AlwgACABKAJgNgJgIAFBADYCYCABQQA2AlwgAUEANgJYIAAgASwAZDoAZCAAQQA2AmggAEEANgJsIABBADYCcCAAIAEoAmg2AmggACABKAJsNgJsIAAgASgCcDYCcCABQQA2AnAgAUEANgJsIAFBADYCaCAAQQA2AnQgAEEANgJ4IABBADYCfCAAIAEoAnQ2AnQgACABKAJ4NgJ4IAAgASgCfDYCfCABQQA2AnwgAUEANgJ4IAFBADYCdCAAIAEoAoABNgKAASAAQQA2AoQBIABBADYCiAEgAEEANgKMASAA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AAAACgAAAB4AAAAKAEGMGAstHAAAAB0AAAAiAAAABwAAACMAAAAkAAAAHwAAACAAAAAJAAAACgAAACEAAAALAEHEGAs5HgAAAB8AAAAJAAAABwAAAAMAAAAKAAAADwAAAAkAAAAHAAAACwAAAAEAAAAGAAAAIgAAACUAAAAjAEGIGQsxIAAAACEAAAAmAAAAJwAAAAEAAAAoAAAAKQAAACoAAAArAAAALAAAACQAAAAlAAAAAQBBxBkLMSIAAAAjAAAAJgAAAC0AAAAmAAAAKAAAACkAAAAqAAAALgAAAC8AAAAnAAAAKAAAADAAQYAaCywkAAAAJQAAACkAAAAqAAAAKwAAACwAAAAxAAAAMgAAADMAAAA0AAAA/////wBBtBoLDSYAAAAnAAAALQAAADUAQcwaCwkoAAAAKQAAAAIAQeAaCxAqAAAAKwAAAAIAAAD/////AEH4GgsNLAAAAC0AAAAuAAAANgBBkBsLCS4AAAAvAAAAAwBBpBsLCTAAAAAxAAAAAwBBuBsLDTIAAAAzAAAALwAAADcAQdAbCwk0AAAANQAAAAMAQeQbCyU2AAAANwAAADAAAAAxAAAAMgAAADMAAAA4AAAAOQAAADoAAAA7AEGUHAslOAAAADkAAAA0AAAANQAAADYAAAA3AAAAPAAAAD0AAAA+AAAAPwBBxBwLMSAAAAA6AAAAJgAAACcAAAA4AAAAKAAAACkAAAAqAAAAKwAAACwAAAAkAAAAJQAAAEAAQYAdCw07AAAAPAAAADkAAABBAEGYHQssIAAAAD0AAABCAAAAJwAAAAEAAABDAAAAKQAAACoAAAArAAAA//////////8AQcwdCxQ+AAAAPwAAAAQAAAACAAAA/////wBB6B0LDUAAAABBAAAABQAAAAMAQZweCwEMAEHDHgsF//////8AQbAgCwKYEgBB6CAL/AJVbnN1cHBvcnRlZCBlbmNvZGluZyBtZXRob2QuAElucHV0IGlzIG5vdCBhIG1lc2guAHNraXBfYXR0cmlidXRlX3RyYW5zZm9ybQBEUkFDTwBOb3QgYSBEcmFjbyBmaWxlLgBGYWlsZWQgdG8gZGVjb2RlIG1ldGFkYXRhLgBVc2luZyBpbmNvbXBhdGlibGUgZGVjb2RlciBmb3IgdGhlIGlucHV0IGdlb21ldHJ5LgBVbmtub3duIG1ham9yIHZlcnNpb24uAFVua25vd24gbWlub3IgdmVyc2lvbi4ARmFpbGVkIHRvIGluaXRpYWxpemUgdGhlIGRlY29kZXIuAEZhaWxlZCB0byBkZWNvZGUgZ2VvbWV0cnkgZGF0YS4ARmFpbGVkIHRvIGRlY29kZSBwb2ludCBhdHRyaWJ1dGVzLgAtKyAgIDBYMHgAKG51bGwpAC0wWCswWCAwWC0weCsweCAweABpbmYASU5GAG5hbgBOQU4ALgAlZA==";

  // src/neuroglancer/datasource/precomputed/backend.ts
  async function decodeMultiscaleFragmentChunk(chunk, response) {
    const {lod} = chunk;
    const source = chunk.manifestChunk.source;
    const m = await Promise.resolve().then(() => __toModule(require_draco()));
    const rawMesh = await m.decodeDracoPartitioned(new Uint8Array(response), source.parameters.metadata.vertexQuantizationBits, lod !== 0);
    assignMultiscaleMeshFragmentData(chunk, rawMesh, source.format.vertexPositionFormat);
  }
  let PrecomputedMultiscaleMeshSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(MultiscaleMeshSource), MultiscaleMeshSourceParameters2) {
    constructor() {
      super(...arguments);
      this.minishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, {url: this.parameters.url, sharding: this.parameters.metadata.sharding});
    }
    async download(chunk, cancellationToken) {
      const {parameters, minishardIndexSource} = this;
      let data;
      if (minishardIndexSource === void 0) {
        data = await cancellableFetchSpecialOk(this.credentialsProvider, `${parameters.url}/${chunk.objectId}.index`, {}, responseArrayBuffer, cancellationToken);
      } else {
        ({data, shardInfo: chunk.shardInfo} = getOrNotFoundError(await getShardedData(minishardIndexSource, chunk, chunk.objectId, cancellationToken)));
      }
      decodeMultiscaleManifestChunk2(chunk, data);
    }
    async downloadFragment(chunk, cancellationToken) {
      const {parameters} = this;
      const manifestChunk = chunk.manifestChunk;
      const chunkIndex = chunk.chunkIndex;
      const {shardInfo, offsets} = manifestChunk;
      const startOffset = offsets[chunkIndex];
      const endOffset = offsets[chunkIndex + 1];
      let requestUrl;
      let adjustedStartOffset, adjustedEndOffset;
      if (shardInfo !== void 0) {
        requestUrl = shardInfo.shardUrl;
        const fullDataSize = offsets[offsets.length - 1];
        let startLow = shardInfo.offset.low - fullDataSize + startOffset;
        let startHigh = shardInfo.offset.high;
        let endLow = startLow + endOffset - startOffset;
        let endHigh = startHigh;
        while (startLow < 0) {
          startLow += 4294967296;
          startHigh -= 1;
        }
        while (endLow < 0) {
          endLow += 4294967296;
          endHigh -= 1;
        }
        while (endLow > 4294967296) {
          endLow -= 4294967296;
          endHigh += 1;
        }
        adjustedStartOffset = new Uint64(startLow, startHigh);
        adjustedEndOffset = new Uint64(endLow, endHigh);
      } else {
        requestUrl = `${parameters.url}/${manifestChunk.objectId}`;
        adjustedStartOffset = startOffset;
        adjustedEndOffset = endOffset;
      }
      const response = await fetchSpecialHttpByteRange(this.credentialsProvider, requestUrl, adjustedStartOffset, adjustedEndOffset, cancellationToken);
      await decodeMultiscaleFragmentChunk(chunk, response);
    }
  };
  PrecomputedMultiscaleMeshSource = __decorate([
    registerSharedObject()
  ], PrecomputedMultiscaleMeshSource);
  async function fetchByUint64(credentialsProvider, url, chunk, minishardIndexSource, id, cancellationToken) {
    if (minishardIndexSource === void 0) {
      try {
        return await cancellableFetchSpecialOk(credentialsProvider, `${url}/${id}`, {}, responseArrayBuffer, cancellationToken);
      } catch (e) {
        if (isNotFoundError(e))
          return void 0;
        throw e;
      }
    }
    const result = await getShardedData(minishardIndexSource, chunk, id, cancellationToken);
    if (result === void 0)
      return void 0;
    return result.data;
  }
  let PrecomputedSkeletonSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(SkeletonSource), SkeletonSourceParameters3) {
    constructor() {
      super(...arguments);
      this.minishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, {url: this.parameters.url, sharding: this.parameters.metadata.sharding});
    }
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      const response = getOrNotFoundError(await fetchByUint64(this.credentialsProvider, parameters.url, chunk, this.minishardIndexSource, chunk.objectId, cancellationToken));
      decodeSkeletonChunk2(chunk, response, parameters.metadata.vertexAttributes);
    }
  };
  PrecomputedSkeletonSource = __decorate([
    registerSharedObject()
  ], PrecomputedSkeletonSource);
  function parseAnnotations3(buffer, parameters, propertySerializer) {
    const dv = new DataView(buffer);
    if (buffer.byteLength <= 8)
      throw new Error("Expected at least 8 bytes");
    const countLow = dv.getUint32(0, true);
    const countHigh = dv.getUint32(4, true);
    if (countHigh !== 0)
      throw new Error("Annotation count too high");
    const numBytes = annotationTypeHandlers[parameters.type].serializedBytes(parameters.rank) + propertySerializer.serializedBytes;
    const expectedBytes = 8 + (numBytes + 8) * countLow;
    if (buffer.byteLength !== expectedBytes) {
      throw new Error(`Expected ${expectedBytes} bytes, but received: ${buffer.byteLength} bytes`);
    }
    const idOffset = 8 + numBytes * countLow;
    const id = new Uint64();
    const ids = new Array(countLow);
    for (let i = 0; i < countLow; ++i) {
      id.low = dv.getUint32(idOffset + i * 8, true);
      id.high = dv.getUint32(idOffset + i * 8 + 4, true);
      ids[i] = id.toString();
    }
    const geometryData = new AnnotationGeometryData();
    const data = geometryData.data = new Uint8Array(buffer, 8, numBytes * countLow);
    convertEndian32(data, Endianness.LITTLE);
    const typeToOffset = geometryData.typeToOffset = new Array(annotationTypes.length);
    typeToOffset.fill(0);
    typeToOffset[parameters.type] = 0;
    const typeToIds = geometryData.typeToIds = new Array(annotationTypes.length);
    const typeToIdMaps = geometryData.typeToIdMaps = new Array(annotationTypes.length);
    typeToIds.fill([]);
    typeToIds[parameters.type] = ids;
    typeToIdMaps.fill(new Map());
    typeToIdMaps[parameters.type] = new Map(ids.map((id2, i) => [id2, i]));
    return geometryData;
  }
  function parseSingleAnnotation(buffer, parameters, propertySerializer, id) {
    const handler = annotationTypeHandlers[parameters.type];
    const baseNumBytes = handler.serializedBytes(parameters.rank);
    const numRelationships = parameters.relationships.length;
    const minNumBytes = baseNumBytes + 4 * numRelationships;
    if (buffer.byteLength < minNumBytes) {
      throw new Error(`Expected at least ${minNumBytes} bytes, but received: ${buffer.byteLength}`);
    }
    const dv = new DataView(buffer);
    const annotation9 = handler.deserialize(dv, 0, true, parameters.rank, id);
    propertySerializer.deserialize(dv, baseNumBytes, true, annotation9.properties = new Array(parameters.properties.length));
    let offset = baseNumBytes + propertySerializer.serializedBytes;
    const relatedSegments = annotation9.relatedSegments = [];
    relatedSegments.length = numRelationships;
    for (let i = 0; i < numRelationships; ++i) {
      const count = dv.getUint32(offset, true);
      if (buffer.byteLength < minNumBytes + count * 8) {
        throw new Error(`Expected at least ${minNumBytes} bytes, but received: ${buffer.byteLength}`);
      }
      offset += 4;
      const segments = relatedSegments[i] = [];
      for (let j = 0; j < count; ++j) {
        segments[j] = new Uint64(dv.getUint32(offset, true), dv.getUint32(offset + 4, true));
        offset += 8;
      }
    }
    if (offset !== buffer.byteLength) {
      throw new Error(`Expected ${offset} bytes, but received: ${buffer.byteLength}`);
    }
    return annotation9;
  }
  let PrecomputedAnnotationSpatialIndexSourceBackend = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(AnnotationGeometryChunkSourceBackend), AnnotationSpatialIndexSourceParameters2) {
    constructor() {
      super(...arguments);
      this.minishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, this.parameters);
    }
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      const {minishardIndexSource} = this;
      const {parent} = this;
      let response;
      const {chunkGridPosition} = chunk;
      if (minishardIndexSource === void 0) {
        const url = `${parameters.url}/${chunkGridPosition.join("_")}`;
        try {
          response = await cancellableFetchSpecialOk(this.credentialsProvider, url, {}, responseArrayBuffer, cancellationToken);
        } catch (e) {
          if (!isNotFoundError(e))
            throw e;
        }
      } else {
        const {upperChunkBound} = this.spec;
        const {chunkGridPosition: chunkGridPosition2} = chunk;
        const xBits = Math.ceil(Math.log2(upperChunkBound[0])), yBits = Math.ceil(Math.log2(upperChunkBound[1])), zBits = Math.ceil(Math.log2(upperChunkBound[2]));
        const chunkIndex = encodeZIndexCompressed(new Uint64(), xBits, yBits, zBits, chunkGridPosition2[0], chunkGridPosition2[1], chunkGridPosition2[2]);
        const result = await getShardedData(minishardIndexSource, chunk, chunkIndex, cancellationToken);
        if (result !== void 0)
          response = result.data;
      }
      if (response !== void 0) {
        chunk.data = parseAnnotations3(response, parent.parameters, parent.annotationPropertySerializer);
      }
    }
  };
  PrecomputedAnnotationSpatialIndexSourceBackend = __decorate([
    registerSharedObject()
  ], PrecomputedAnnotationSpatialIndexSourceBackend);
  let PrecomputedAnnotationSourceBackend = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(AnnotationSource2), AnnotationSourceParameters3) {
    constructor() {
      super(...arguments);
      this.byIdMinishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, this.parameters.byId);
      this.relationshipIndexSource = this.parameters.relationships.map((x) => getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, x));
      this.annotationPropertySerializer = new AnnotationPropertySerializer(this.parameters.rank, this.parameters.properties);
    }
    async downloadSegmentFilteredGeometry(chunk, relationshipIndex, cancellationToken) {
      const {parameters} = this;
      const response = await fetchByUint64(this.credentialsProvider, parameters.relationships[relationshipIndex].url, chunk, this.relationshipIndexSource[relationshipIndex], chunk.objectId, cancellationToken);
      if (response !== void 0) {
        chunk.data = parseAnnotations3(response, this.parameters, this.annotationPropertySerializer);
      }
    }
    async downloadMetadata(chunk, cancellationToken) {
      const {parameters} = this;
      const id = Uint64.parseString(chunk.key);
      const response = await fetchByUint64(this.credentialsProvider, parameters.byId.url, chunk, this.byIdMinishardIndexSource, id, cancellationToken);
      if (response === void 0) {
        chunk.annotation = null;
      } else {
        chunk.annotation = parseSingleAnnotation(response, this.parameters, this.annotationPropertySerializer, chunk.key);
      }
    }
  };
  PrecomputedAnnotationSourceBackend = __decorate([
    registerSharedObject()
  ], PrecomputedAnnotationSourceBackend);
  let PrecomputedIndexedSegmentPropertySourceBackend = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(IndexedSegmentPropertySourceBackend), IndexedSegmentPropertySourceParameters) {
    constructor() {
      super(...arguments);
      this.minishardIndexSource = getMinishardIndexDataSource(this.chunkManager, this.credentialsProvider, this.parameters);
    }
  };
  PrecomputedIndexedSegmentPropertySourceBackend = __decorate([
    registerSharedObject()
  ], PrecomputedIndexedSegmentPropertySourceBackend);

  // src/neuroglancer/datasource/nifti/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const GET_NIFTI_VOLUME_INFO_RPC_ID = "nifti/getNiftiVolumeInfo";
  class VolumeSourceParameters2 {
  }
  VolumeSourceParameters2.RPC_ID = "nifti/VolumeChunkSource";

  // src/neuroglancer/sliceview/volume/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VolumeType;
  (function(VolumeType2) {
    VolumeType2[VolumeType2["UNKNOWN"] = 0] = "UNKNOWN";
    VolumeType2[VolumeType2["IMAGE"] = 1] = "IMAGE";
    VolumeType2[VolumeType2["SEGMENTATION"] = 2] = "SEGMENTATION";
  })(VolumeType || (VolumeType = {}));

  // src/neuroglancer/datasource/nifti/backend.ts
  const nifti_reader_js = __toModule(require_nifti());
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  class NiftiFileData {
  }
  async function decodeNiftiFile(buffer, cancellationToken) {
    if (nifti_reader_js.isCompressed(buffer)) {
      buffer = (await requestAsyncComputation(decodeGzip, cancellationToken, [buffer], new Uint8Array(buffer))).buffer;
    }
    let data = new NiftiFileData();
    data.uncompressedData = buffer;
    let header = nifti_reader_js.readHeader(buffer);
    if (header === null) {
      throw new Error("Failed to parse NIFTI header.");
    }
    data.header = header;
    return {data, size: buffer.byteLength};
  }
  function getNiftiFileData(chunkManager, credentialsProvider, url, getPriority, cancellationToken) {
    return GenericSharedDataSource.getUrl(chunkManager, credentialsProvider, decodeNiftiFile, url, getPriority, cancellationToken);
  }
  const NIFTI_HEADER_INFO_PRIORITY = 1e3;
  async function getNiftiHeaderInfo(chunkManager, credentialsProvider, url, cancellationToken) {
    const data = await getNiftiFileData(chunkManager, credentialsProvider, url, () => ({priorityTier: ChunkPriorityTier.VISIBLE, priority: NIFTI_HEADER_INFO_PRIORITY}), cancellationToken);
    return data.header;
  }
  function convertAffine(affine) {
    return mat4_exports.fromValues(affine[0][0], affine[1][0], affine[2][0], affine[3][0], affine[0][1], affine[1][1], affine[2][1], affine[3][1], affine[0][2], affine[1][2], affine[2][2], affine[3][2], affine[0][3], affine[1][3], affine[2][3], affine[3][3]);
  }
  var NiftiDataType;
  (function(NiftiDataType2) {
    NiftiDataType2[NiftiDataType2["NONE"] = 0] = "NONE";
    NiftiDataType2[NiftiDataType2["BINARY"] = 1] = "BINARY";
    NiftiDataType2[NiftiDataType2["UINT8"] = 2] = "UINT8";
    NiftiDataType2[NiftiDataType2["INT16"] = 4] = "INT16";
    NiftiDataType2[NiftiDataType2["INT32"] = 8] = "INT32";
    NiftiDataType2[NiftiDataType2["FLOAT32"] = 16] = "FLOAT32";
    NiftiDataType2[NiftiDataType2["COMPLEX64"] = 32] = "COMPLEX64";
    NiftiDataType2[NiftiDataType2["FLOAT64"] = 64] = "FLOAT64";
    NiftiDataType2[NiftiDataType2["RGB24"] = 128] = "RGB24";
    NiftiDataType2[NiftiDataType2["INT8"] = 256] = "INT8";
    NiftiDataType2[NiftiDataType2["UINT16"] = 512] = "UINT16";
    NiftiDataType2[NiftiDataType2["UINT32"] = 768] = "UINT32";
    NiftiDataType2[NiftiDataType2["INT64"] = 1024] = "INT64";
    NiftiDataType2[NiftiDataType2["UINT64"] = 1280] = "UINT64";
    NiftiDataType2[NiftiDataType2["FLOAT128"] = 1536] = "FLOAT128";
    NiftiDataType2[NiftiDataType2["COMPLEX128"] = 1792] = "COMPLEX128";
    NiftiDataType2[NiftiDataType2["COMPLEX256"] = 2048] = "COMPLEX256";
  })(NiftiDataType || (NiftiDataType = {}));
  const DATA_TYPE_CONVERSIONS = new Map([
    [256, {dataType: DataType.INT8}],
    [2, {dataType: DataType.UINT8}],
    [4, {dataType: DataType.INT16}],
    [512, {dataType: DataType.UINT16}],
    [8, {dataType: DataType.INT32}],
    [768, {dataType: DataType.UINT32}],
    [1024, {dataType: DataType.UINT64}],
    [1280, {dataType: DataType.UINT64}],
    [16, {dataType: DataType.FLOAT32}]
  ]);
  registerPromiseRPC(GET_NIFTI_VOLUME_INFO_RPC_ID, async function(x, cancellationToken) {
    const chunkManager = this.getRef(x["chunkManager"]);
    const credentialsProvider = this.getOptionalRef(x["credentialsProvider"]);
    try {
      const header = await getNiftiHeaderInfo(chunkManager, credentialsProvider, x["url"], cancellationToken);
      let dataTypeInfo = DATA_TYPE_CONVERSIONS.get(header.datatypeCode);
      if (dataTypeInfo === void 0) {
        throw new Error(`Unsupported data type: ${NiftiDataType[header.datatypeCode] || header.datatypeCode}.`);
      }
      let spatialInvScale = 1;
      let spatialUnit = "";
      switch (header.xyzt_units & nifti_reader_js.NIFTI1.SPATIAL_UNITS_MASK) {
        case nifti_reader_js.NIFTI1.UNITS_METER:
          spatialInvScale = 1;
          spatialUnit = "m";
          break;
        case nifti_reader_js.NIFTI1.UNITS_MM:
          spatialInvScale = 1e3;
          spatialUnit = "m";
          break;
        case nifti_reader_js.NIFTI1.UNITS_MICRON:
          spatialInvScale = 1e6;
          spatialUnit = "m";
          break;
      }
      let timeUnit = "";
      let timeInvScale = 1;
      switch (header.xyzt_units & nifti_reader_js.NIFTI1.TEMPORAL_UNITS_MASK) {
        case nifti_reader_js.NIFTI1.UNITS_SEC:
          timeUnit = "s";
          timeInvScale = 1;
          break;
        case nifti_reader_js.NIFTI1.UNITS_MSEC:
          timeUnit = "s";
          timeInvScale = 1e3;
          break;
        case nifti_reader_js.NIFTI1.UNITS_USEC:
          timeUnit = "s";
          timeInvScale = 1e6;
          break;
        case nifti_reader_js.NIFTI1.UNITS_HZ:
          timeUnit = "Hz";
          timeInvScale = 1;
          break;
        case nifti_reader_js.NIFTI1.UNITS_RADS:
          timeUnit = "rad/s";
          timeInvScale = 1;
          break;
      }
      let units = [spatialUnit, spatialUnit, spatialUnit, timeUnit, "", "", ""];
      let sourceScales = Float64Array.of(header.pixDims[1] / spatialInvScale, header.pixDims[2] / spatialInvScale, header.pixDims[3] / spatialInvScale, header.pixDims[4] / timeInvScale, header.pixDims[5], header.pixDims[6], header.pixDims[7]);
      let viewScales = Float64Array.of(1 / spatialInvScale, 1 / spatialInvScale, 1 / spatialInvScale, 1 / timeInvScale, 1, 1, 1);
      let sourceNames = ["i", "j", "k", "m", "c^", "c1^", "c2^"];
      let viewNames = ["x", "y", "z", "t", "c^", "c1^", "c2^"];
      const rank = header.dims[0];
      sourceNames = sourceNames.slice(0, rank);
      viewNames = viewNames.slice(0, rank);
      units = units.slice(0, rank);
      sourceScales = sourceScales.slice(0, rank);
      viewScales = viewScales.slice(0, rank);
      const {quatern_b, quatern_c, quatern_d} = header;
      const quatern_a = Math.sqrt(1 - quatern_b * quatern_b - quatern_c * quatern_c - quatern_d * quatern_d);
      const qfac = header.pixDims[0] === -1 ? -1 : 1;
      const qoffset = vec3_exports.fromValues(header.qoffset_x, header.qoffset_y, header.qoffset_z);
      const method3Transform = convertAffine(header.affine);
      method3Transform;
      const method2Transform = translationRotationScaleZReflectionToMat4(mat4_exports.create(), qoffset, quat_exports.fromValues(quatern_b, quatern_c, quatern_d, quatern_a), kOneVec, qfac);
      const transform = createIdentity(Float64Array, rank + 1);
      const copyRank = Math.min(3, rank);
      for (let row = 0; row < copyRank; ++row) {
        for (let col = 0; col < copyRank; ++col) {
          transform[col * (rank + 1) + row] = method2Transform[col * 4 + row];
        }
        transform[rank * (rank + 1) + row] = method2Transform[12 + row];
      }
      let info = {
        rank,
        sourceNames,
        viewNames,
        units,
        sourceScales,
        viewScales,
        description: header.description,
        transform,
        dataType: dataTypeInfo.dataType,
        volumeSize: Uint32Array.from(header.dims.slice(1, 1 + rank))
      };
      return {value: info};
    } finally {
      chunkManager.dispose();
      credentialsProvider == null ? void 0 : credentialsProvider.dispose();
    }
  });
  let NiftiVolumeChunkSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(VolumeChunkSource), VolumeSourceParameters2) {
    async download(chunk, cancellationToken) {
      chunk.chunkDataSize = this.spec.chunkDataSize;
      const data = await getNiftiFileData(this.chunkManager, this.credentialsProvider, this.parameters.url, () => ({priorityTier: chunk.priorityTier, priority: chunk.priority}), cancellationToken);
      const imageBuffer = nifti_reader_js.readImage(data.header, data.uncompressedData);
      await decodeRawChunk(chunk, cancellationToken, imageBuffer, data.header.littleEndian ? Endianness.LITTLE : Endianness.BIG);
    }
  };
  NiftiVolumeChunkSource = __decorate([
    registerSharedObject()
  ], NiftiVolumeChunkSource);

  // src/neuroglancer/async_computation/decode_blosc_request.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const decodeBlosc = asyncComputation("decodeBlosc");

  // src/neuroglancer/datasource/n5/base.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var VolumeChunkEncoding4;
  (function(VolumeChunkEncoding5) {
    VolumeChunkEncoding5[VolumeChunkEncoding5["RAW"] = 0] = "RAW";
    VolumeChunkEncoding5[VolumeChunkEncoding5["GZIP"] = 1] = "GZIP";
    VolumeChunkEncoding5[VolumeChunkEncoding5["BLOSC"] = 2] = "BLOSC";
  })(VolumeChunkEncoding4 || (VolumeChunkEncoding4 = {}));
  class VolumeChunkSourceParameters4 {
  }
  VolumeChunkSourceParameters4.RPC_ID = "n5/VolumeChunkSource";

  // src/neuroglancer/datasource/n5/backend.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeChunk(chunk, cancellationToken, response, encoding) {
    const dv = new DataView(response);
    const mode = dv.getUint16(0, false);
    if (mode !== 0) {
      throw new Error(`Unsupported mode: ${mode}.`);
    }
    const numDimensions = dv.getUint16(2, false);
    if (numDimensions !== chunk.source.spec.rank) {
      throw new Error(`Number of dimensions must be 3.`);
    }
    let offset = 4;
    const shape = new Uint32Array(numDimensions);
    for (let i = 0; i < numDimensions; ++i) {
      shape[i] = dv.getUint32(offset, false);
      offset += 4;
    }
    chunk.chunkDataSize = shape;
    let buffer = new Uint8Array(response, offset);
    switch (encoding) {
      case VolumeChunkEncoding4.GZIP:
        buffer = await requestAsyncComputation(decodeGzip, cancellationToken, [buffer.buffer], buffer);
        break;
      case VolumeChunkEncoding4.BLOSC:
        buffer = await requestAsyncComputation(decodeBlosc, cancellationToken, [buffer.buffer], buffer);
        break;
    }
    await decodeRawChunk(chunk, cancellationToken, buffer.buffer, Endianness.BIG, buffer.byteOffset, buffer.byteLength);
  }
  let PrecomputedVolumeChunkSource2 = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(VolumeChunkSource), VolumeChunkSourceParameters4) {
    async download(chunk, cancellationToken) {
      const {parameters} = this;
      const {chunkGridPosition} = chunk;
      let url = parameters.url;
      const rank = this.spec.rank;
      for (let i = 0; i < rank; ++i) {
        url += `/${chunkGridPosition[i]}`;
      }
      const response = await cancellableFetchSpecialOk(this.credentialsProvider, url, {}, responseArrayBuffer, cancellationToken);
      await decodeChunk(chunk, cancellationToken, response, parameters.encoding);
    }
  };
  PrecomputedVolumeChunkSource2 = __decorate([
    registerSharedObject()
  ], PrecomputedVolumeChunkSource2);

  // src/neuroglancer/datasource/zarr/base.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var ZarrCompressor;
  (function(ZarrCompressor2) {
    ZarrCompressor2[ZarrCompressor2["RAW"] = 0] = "RAW";
    ZarrCompressor2[ZarrCompressor2["GZIP"] = 1] = "GZIP";
    ZarrCompressor2[ZarrCompressor2["BLOSC"] = 2] = "BLOSC";
  })(ZarrCompressor || (ZarrCompressor = {}));
  class VolumeChunkSourceParameters5 {
  }
  VolumeChunkSourceParameters5.RPC_ID = "zarr/VolumeChunkSource";

  // src/neuroglancer/datasource/zarr/backend.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  async function decodeChunk2(chunk, cancellationToken, response, encoding) {
    let buffer = new Uint8Array(response);
    switch (encoding.compressor) {
      case ZarrCompressor.GZIP:
        buffer = await requestAsyncComputation(decodeGzip, cancellationToken, [buffer.buffer], buffer);
        break;
      case ZarrCompressor.RAW:
        break;
      case ZarrCompressor.BLOSC:
        buffer = await requestAsyncComputation(decodeBlosc, cancellationToken, [buffer.buffer], buffer);
    }
    await decodeRawChunk(chunk, cancellationToken, buffer.buffer, encoding.endianness);
  }
  let PrecomputedVolumeChunkSource3 = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(VolumeChunkSource), VolumeChunkSourceParameters5) {
    async download(chunk, cancellationToken) {
      chunk.chunkDataSize = this.spec.chunkDataSize;
      const {parameters} = this;
      const {chunkGridPosition} = chunk;
      let {url, separator} = parameters;
      const rank = this.spec.rank;
      for (let i = rank; i > 0; --i) {
        url += `${i == rank ? "/" : separator}${chunkGridPosition[i - 1]}`;
      }
      const response = await cancellableFetchSpecialOk(this.credentialsProvider, url, {}, responseArrayBuffer, cancellationToken);
      await decodeChunk2(chunk, cancellationToken, response, parameters.encoding);
    }
  };
  PrecomputedVolumeChunkSource3 = __decorate([
    registerSharedObject()
  ], PrecomputedVolumeChunkSource3);

  // src/neuroglancer/async_computation/vtk_mesh_request.ts
  /**
   * @license
   * Copyright 2019 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const parseVTKFromArrayBuffer = asyncComputation("parseVTKFromArrayBuffer");

  // src/neuroglancer/single_mesh/base.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const SINGLE_MESH_LAYER_RPC_ID = "single_mesh/SingleMeshLayer";
  const GET_SINGLE_MESH_INFO_RPC_ID = "single_mesh/getSingleMeshInfo";
  const SINGLE_MESH_CHUNK_KEY = "";
  class SingleMeshSourceParameters {
  }
  class SingleMeshSourceParametersWithInfo extends SingleMeshSourceParameters {
  }
  SingleMeshSourceParametersWithInfo.RPC_ID = "single_mesh/SingleMeshSource";

  // src/neuroglancer/single_mesh/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const SINGLE_MESH_CHUNK_PRIORITY = 50;
  class SingleMeshChunk extends Chunk {
    constructor() {
      super();
      this.data = null;
    }
    freeSystemMemory() {
      this.data = null;
    }
    serialize(msg, transfers) {
      super.serialize(msg, transfers);
      let {vertexPositions, indices, vertexNormals, vertexAttributes} = this.data;
      msg["vertexPositions"] = vertexPositions;
      msg["indices"] = indices;
      msg["vertexNormals"] = vertexNormals;
      msg["vertexAttributes"] = vertexAttributes;
      const transferSet = new Set();
      transferSet.add(vertexPositions.buffer);
      transferSet.add(indices.buffer);
      transferSet.add(vertexNormals.buffer);
      for (const data of vertexAttributes) {
        transferSet.add(data.buffer);
      }
      transfers.push(...transferSet);
      this.data = null;
    }
    downloadSucceeded() {
      let {vertexPositions, indices, vertexNormals, vertexAttributes} = this.data;
      let totalBytes = this.gpuMemoryBytes = vertexPositions.byteLength + indices.byteLength + vertexNormals.byteLength;
      for (const data of vertexAttributes) {
        totalBytes += data.byteLength;
      }
      this.systemMemoryBytes = this.gpuMemoryBytes = totalBytes;
      super.downloadSucceeded();
    }
  }
  const singleMeshFactories = new Map();
  function registerSingleMeshFactory(name, factory) {
    singleMeshFactories.set(name, factory);
  }
  const protocolPattern = /^(?:([a-zA-Z-+_]+):\/\/)?(.*)$/;
  function getDataSource(factories, url) {
    let m = url.match(protocolPattern);
    if (m === null || m[1] === void 0) {
      throw new Error(`Data source URL must have the form "<protocol>://<path>".`);
    }
    let dataSource = m[1];
    let factory = factories.get(dataSource);
    if (factory === void 0) {
      throw new Error(`Unsupported data source: ${JSON.stringify(dataSource)}.`);
    }
    return [factory, m[2], dataSource];
  }
  function getMesh(chunkManager, credentialsProvider, url, getPriority, cancellationToken) {
    let [factory, path] = getDataSource(singleMeshFactories, url);
    return factory.getMesh(chunkManager, credentialsProvider, path, getPriority, cancellationToken);
  }
  function getCombinedMesh(chunkManager, credentialsProvider, parameters, getPriority, cancellationToken) {
    return getMesh(chunkManager, credentialsProvider, parameters.meshSourceUrl, getPriority, cancellationToken);
  }
  let SingleMeshSource = class extends WithParameters(WithSharedCredentialsProviderCounterpart()(ChunkSource), SingleMeshSourceParametersWithInfo) {
    getChunk() {
      const key = SINGLE_MESH_CHUNK_KEY;
      let chunk = this.chunks.get(key);
      if (chunk === void 0) {
        chunk = this.getNewChunk_(SingleMeshChunk);
        chunk.initialize(key);
        this.addChunk(chunk);
      }
      return chunk;
    }
    download(chunk, cancellationToken) {
      const getPriority = () => ({priorityTier: chunk.priorityTier, priority: chunk.priority});
      return getCombinedMesh(this.chunkManager, this.credentialsProvider, this.parameters, getPriority, cancellationToken).then((data) => {
        if (stableStringify(data.info) !== stableStringify(this.parameters.info)) {
          throw new Error(`Mesh info has changed.`);
        }
        if (data.vertexNormals === void 0) {
          data.vertexNormals = computeVertexNormals(data.vertexPositions, data.indices);
        }
        chunk.data = data;
      });
    }
  };
  SingleMeshSource = __decorate([
    registerSharedObject()
  ], SingleMeshSource);
  const SingleMeshLayerBase = withSharedVisibility(withChunkManager(SharedObjectCounterpart));
  let SingleMeshLayer = class extends SingleMeshLayerBase {
    constructor(rpc2, options) {
      super(rpc2, options);
      this.source = this.registerDisposer(rpc2.getRef(options["source"]));
      this.registerDisposer(this.chunkManager.recomputeChunkPriorities.add(() => {
        this.updateChunkPriorities();
      }));
    }
    updateChunkPriorities() {
      const visibility = this.visibility.value;
      if (visibility === Number.NEGATIVE_INFINITY) {
        return;
      }
      const priorityTier = getPriorityTier(visibility);
      const basePriority = getBasePriority(visibility);
      const {source, chunkManager} = this;
      const chunk = source.getChunk();
      chunkManager.requestChunk(chunk, priorityTier, basePriority + SINGLE_MESH_CHUNK_PRIORITY);
    }
  };
  SingleMeshLayer = __decorate([
    registerSharedObject(SINGLE_MESH_LAYER_RPC_ID)
  ], SingleMeshLayer);
  const INFO_PRIORITY = 1e3;
  registerPromiseRPC(GET_SINGLE_MESH_INFO_RPC_ID, async function(x, cancellationToken) {
    const chunkManager = this.getRef(x["chunkManager"]);
    const credentialsProvider = this.getOptionalRef(x["credentialsProvider"]);
    try {
      let parameters = x["parameters"];
      const mesh = await getCombinedMesh(chunkManager, credentialsProvider, parameters, () => ({priorityTier: ChunkPriorityTier.VISIBLE, priority: INFO_PRIORITY}), cancellationToken);
      return {value: mesh.info};
    } finally {
      chunkManager.dispose();
      credentialsProvider == null ? void 0 : credentialsProvider.dispose();
    }
  });

  // src/neuroglancer/datasource/vtk/backend.ts
  /**
   * @license
   * Copyright 2016 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function parse(buffer, cancellationToken) {
    return requestAsyncComputation(parseVTKFromArrayBuffer, cancellationToken, [buffer], buffer);
  }
  registerSingleMeshFactory("vtk", {
    description: "VTK",
    getMesh: (chunkManager, credentialsProvider, url, getPriority, cancellationToken) => GenericSharedDataSource.getUrl(chunkManager, credentialsProvider, parse, url, getPriority, cancellationToken).then((mesh) => {
      let result = {
        info: {
          numTriangles: mesh.numTriangles,
          numVertices: mesh.numVertices,
          vertexAttributes: []
        },
        indices: mesh.indices,
        vertexPositions: mesh.vertexPositions,
        vertexAttributes: []
      };
      for (const attribute of mesh.vertexAttributes) {
        result.info.vertexAttributes.push({
          name: attribute.name,
          dataType: DataType.FLOAT32,
          numComponents: attribute.numComponents
        });
        result.vertexAttributes.push(attribute.data);
      }
      return result;
    })
  });

  // src/neuroglancer/async_computation/obj_mesh_request.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  const parseOBJFromArrayBuffer = asyncComputation("parseOBJFromArrayBuffer");

  // src/neuroglancer/datasource/obj/backend.ts
  /**
   * @license
   * Copyright 2020 Google Inc.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  function parse2(buffer, cancellationToken) {
    return requestAsyncComputation(parseOBJFromArrayBuffer, cancellationToken, [buffer], buffer);
  }
  registerSingleMeshFactory("obj", {
    description: "OBJ",
    getMesh: (chunkManager, credentialsProvider, url, getPriority, cancellationToken) => GenericSharedDataSource.getUrl(chunkManager, credentialsProvider, parse2, url, getPriority, cancellationToken)
  });
})();
