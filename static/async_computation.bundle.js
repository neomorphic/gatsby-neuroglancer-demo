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

  // third_party/jpgjs/jpg.js
  var require_jpg = __commonJS((exports, module) => {
    /**
     * @license
     * Copyright 2015 Mozilla Foundation
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function loadURLasArrayBuffer(path, callback) {
      if (path.indexOf("data:") === 0) {
        var offset = path.indexOf("base64,") + 7;
        var data = atob(path.substring(offset));
        var arr = new Uint8Array(data.length);
        for (var i = data.length - 1; i >= 0; i--) {
          arr[i] = data.charCodeAt(i);
        }
        callback(arr.buffer);
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        callback(xhr.response);
      };
      xhr.send(null);
    }
    var JpegImage = function jpegImage() {
      function JpegImage2() {
        this._src = null;
        this._parser = new PDFJS.JpegImage();
        this.onload = null;
      }
      JpegImage2.prototype = {
        get src() {
          return this._src;
        },
        set src(value) {
          this.load(value);
        },
        get width() {
          return this._parser.width;
        },
        get height() {
          return this._parser.height;
        },
        load: function load(path) {
          this._src = path;
          loadURLasArrayBuffer(path, function(buffer) {
            this.parse(new Uint8Array(buffer));
            if (this.onload) {
              this.onload();
            }
          }.bind(this));
        },
        parse: function(data) {
          this._parser.parse(data);
        },
        getData: function(width, height) {
          return this._parser.getData(width, height, false);
        },
        copyToImageData: function copyToImageData(imageData) {
          if (this._parser.numComponents === 2 || this._parser.numComponents > 4) {
            throw new Error("Unsupported amount of components");
          }
          var width = imageData.width, height = imageData.height;
          var imageDataBytes = width * height * 4;
          var imageDataArray = imageData.data;
          var i, j;
          if (this._parser.numComponents === 1) {
            var values = this._parser.getData(width, height, false);
            for (i = 0, j = 0; i < imageDataBytes; ) {
              var value = values[j++];
              imageDataArray[i++] = value;
              imageDataArray[i++] = value;
              imageDataArray[i++] = value;
              imageDataArray[i++] = 255;
            }
            return;
          }
          var rgb = this._parser.getData(width, height, true);
          for (i = 0, j = 0; i < imageDataBytes; ) {
            imageDataArray[i++] = rgb[j++];
            imageDataArray[i++] = rgb[j++];
            imageDataArray[i++] = rgb[j++];
            imageDataArray[i++] = 255;
          }
        }
      };
      return JpegImage2;
    }();
    var PDFJS;
    (function(PDFJS2) {
      "use strict";
      var JpegImage2 = function jpegImage() {
        var dctZigZag = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
        var dctCos1 = 4017;
        var dctSin1 = 799;
        var dctCos3 = 3406;
        var dctSin3 = 2276;
        var dctCos6 = 1567;
        var dctSin6 = 3784;
        var dctSqrt2 = 5793;
        var dctSqrt1d2 = 2896;
        function constructor() {
        }
        function buildHuffmanTable(codeLengths, values) {
          var k = 0, code = [], i, j, length = 16;
          while (length > 0 && !codeLengths[length - 1]) {
            length--;
          }
          code.push({
            children: [],
            index: 0
          });
          var p = code[0], q;
          for (i = 0; i < length; i++) {
            for (j = 0; j < codeLengths[i]; j++) {
              p = code.pop();
              p.children[p.index] = values[k];
              while (p.index > 0) {
                p = code.pop();
              }
              p.index++;
              code.push(p);
              while (code.length <= i) {
                code.push(q = {
                  children: [],
                  index: 0
                });
                p.children[p.index] = q.children;
                p = q;
              }
              k++;
            }
            if (i + 1 < length) {
              code.push(q = {
                children: [],
                index: 0
              });
              p.children[p.index] = q.children;
              p = q;
            }
          }
          return code[0].children;
        }
        function getBlockBufferOffset(component, row, col) {
          return 64 * ((component.blocksPerLine + 1) * row + col);
        }
        function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
          var precision = frame.precision;
          var samplesPerLine = frame.samplesPerLine;
          var scanLines = frame.scanLines;
          var mcusPerLine = frame.mcusPerLine;
          var progressive = frame.progressive;
          var maxH = frame.maxH, maxV = frame.maxV;
          var startOffset = offset, bitsData = 0, bitsCount = 0;
          function readBit() {
            if (bitsCount > 0) {
              bitsCount--;
              return bitsData >> bitsCount & 1;
            }
            bitsData = data[offset++];
            if (bitsData === 255) {
              var nextByte = data[offset++];
              if (nextByte) {
                throw "unexpected marker: " + (bitsData << 8 | nextByte).toString(16);
              }
            }
            bitsCount = 7;
            return bitsData >>> 7;
          }
          function decodeHuffman(tree) {
            var node = tree;
            while (true) {
              node = node[readBit()];
              if (typeof node === "number") {
                return node;
              }
              if (typeof node !== "object") {
                throw "invalid huffman sequence";
              }
            }
          }
          function receive(length) {
            var n2 = 0;
            while (length > 0) {
              n2 = n2 << 1 | readBit();
              length--;
            }
            return n2;
          }
          function receiveAndExtend(length) {
            if (length === 1) {
              return readBit() === 1 ? 1 : -1;
            }
            var n2 = receive(length);
            if (n2 >= 1 << length - 1) {
              return n2;
            }
            return n2 + (-1 << length) + 1;
          }
          function decodeBaseline(component2, offset2) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t);
            component2.blockData[offset2] = component2.pred += diff;
            var k2 = 1;
            while (k2 < 64) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15) {
                  break;
                }
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              component2.blockData[offset2 + z] = receiveAndExtend(s);
              k2++;
            }
          }
          function decodeDCFirst(component2, offset2) {
            var t = decodeHuffman(component2.huffmanTableDC);
            var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
            component2.blockData[offset2] = component2.pred += diff;
          }
          function decodeDCSuccessive(component2, offset2) {
            component2.blockData[offset2] |= readBit() << successive;
          }
          var eobrun = 0;
          function decodeACFirst(component2, offset2) {
            if (eobrun > 0) {
              eobrun--;
              return;
            }
            var k2 = spectralStart, e = spectralEnd;
            while (k2 <= e) {
              var rs = decodeHuffman(component2.huffmanTableAC);
              var s = rs & 15, r = rs >> 4;
              if (s === 0) {
                if (r < 15) {
                  eobrun = receive(r) + (1 << r) - 1;
                  break;
                }
                k2 += 16;
                continue;
              }
              k2 += r;
              var z = dctZigZag[k2];
              component2.blockData[offset2 + z] = receiveAndExtend(s) * (1 << successive);
              k2++;
            }
          }
          var successiveACState = 0, successiveACNextValue;
          function decodeACSuccessive(component2, offset2) {
            var k2 = spectralStart;
            var e = spectralEnd;
            var r = 0;
            var s;
            var rs;
            while (k2 <= e) {
              var z = dctZigZag[k2];
              switch (successiveACState) {
                case 0:
                  rs = decodeHuffman(component2.huffmanTableAC);
                  s = rs & 15;
                  r = rs >> 4;
                  if (s === 0) {
                    if (r < 15) {
                      eobrun = receive(r) + (1 << r);
                      successiveACState = 4;
                    } else {
                      r = 16;
                      successiveACState = 1;
                    }
                  } else {
                    if (s !== 1) {
                      throw "invalid ACn encoding";
                    }
                    successiveACNextValue = receiveAndExtend(s);
                    successiveACState = r ? 2 : 3;
                  }
                  continue;
                case 1:
                case 2:
                  if (component2.blockData[offset2 + z]) {
                    component2.blockData[offset2 + z] += readBit() << successive;
                  } else {
                    r--;
                    if (r === 0) {
                      successiveACState = successiveACState === 2 ? 3 : 0;
                    }
                  }
                  break;
                case 3:
                  if (component2.blockData[offset2 + z]) {
                    component2.blockData[offset2 + z] += readBit() << successive;
                  } else {
                    component2.blockData[offset2 + z] = successiveACNextValue << successive;
                    successiveACState = 0;
                  }
                  break;
                case 4:
                  if (component2.blockData[offset2 + z]) {
                    component2.blockData[offset2 + z] += readBit() << successive;
                  }
                  break;
              }
              k2++;
            }
            if (successiveACState === 4) {
              eobrun--;
              if (eobrun === 0) {
                successiveACState = 0;
              }
            }
          }
          function decodeMcu(component2, decode, mcu2, row, col) {
            var mcuRow = mcu2 / mcusPerLine | 0;
            var mcuCol = mcu2 % mcusPerLine;
            var blockRow = mcuRow * component2.v + row;
            var blockCol = mcuCol * component2.h + col;
            var offset2 = getBlockBufferOffset(component2, blockRow, blockCol);
            decode(component2, offset2);
          }
          function decodeBlock(component2, decode, mcu2) {
            var blockRow = mcu2 / component2.blocksPerLine | 0;
            var blockCol = mcu2 % component2.blocksPerLine;
            var offset2 = getBlockBufferOffset(component2, blockRow, blockCol);
            decode(component2, offset2);
          }
          var componentsLength = components.length;
          var component, i, j, k, n;
          var decodeFn;
          if (progressive) {
            if (spectralStart === 0) {
              decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
            } else {
              decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
            }
          } else {
            decodeFn = decodeBaseline;
          }
          var mcu = 0, marker;
          var mcuExpected;
          if (componentsLength === 1) {
            mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
          } else {
            mcuExpected = mcusPerLine * frame.mcusPerColumn;
          }
          if (!resetInterval) {
            resetInterval = mcuExpected;
          }
          var h, v;
          while (mcu < mcuExpected) {
            for (i = 0; i < componentsLength; i++) {
              components[i].pred = 0;
            }
            eobrun = 0;
            if (componentsLength === 1) {
              component = components[0];
              for (n = 0; n < resetInterval; n++) {
                decodeBlock(component, decodeFn, mcu);
                mcu++;
              }
            } else {
              for (n = 0; n < resetInterval; n++) {
                for (i = 0; i < componentsLength; i++) {
                  component = components[i];
                  h = component.h;
                  v = component.v;
                  for (j = 0; j < v; j++) {
                    for (k = 0; k < h; k++) {
                      decodeMcu(component, decodeFn, mcu, j, k);
                    }
                  }
                }
                mcu++;
              }
            }
            bitsCount = 0;
            marker = data[offset] << 8 | data[offset + 1];
            if (marker <= 65280) {
              throw "marker was not found";
            }
            if (marker >= 65488 && marker <= 65495) {
              offset += 2;
            } else {
              break;
            }
          }
          return offset - startOffset;
        }
        function quantizeAndInverse(component, blockBufferOffset, p) {
          var qt = component.quantizationTable, blockData = component.blockData;
          var v0, v1, v2, v3, v4, v5, v6, v7;
          var p0, p1, p2, p3, p4, p5, p6, p7;
          var t;
          for (var row = 0; row < 64; row += 8) {
            p0 = blockData[blockBufferOffset + row];
            p1 = blockData[blockBufferOffset + row + 1];
            p2 = blockData[blockBufferOffset + row + 2];
            p3 = blockData[blockBufferOffset + row + 3];
            p4 = blockData[blockBufferOffset + row + 4];
            p5 = blockData[blockBufferOffset + row + 5];
            p6 = blockData[blockBufferOffset + row + 6];
            p7 = blockData[blockBufferOffset + row + 7];
            p0 *= qt[row];
            if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
              t = dctSqrt2 * p0 + 512 >> 10;
              p[row] = t;
              p[row + 1] = t;
              p[row + 2] = t;
              p[row + 3] = t;
              p[row + 4] = t;
              p[row + 5] = t;
              p[row + 6] = t;
              p[row + 7] = t;
              continue;
            }
            p1 *= qt[row + 1];
            p2 *= qt[row + 2];
            p3 *= qt[row + 3];
            p4 *= qt[row + 4];
            p5 *= qt[row + 5];
            p6 *= qt[row + 6];
            p7 *= qt[row + 7];
            v0 = dctSqrt2 * p0 + 128 >> 8;
            v1 = dctSqrt2 * p4 + 128 >> 8;
            v2 = p2;
            v3 = p6;
            v4 = dctSqrt1d2 * (p1 - p7) + 128 >> 8;
            v7 = dctSqrt1d2 * (p1 + p7) + 128 >> 8;
            v5 = p3 << 4;
            v6 = p5 << 4;
            v0 = v0 + v1 + 1 >> 1;
            v1 = v0 - v1;
            t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
            v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
            v3 = t;
            v4 = v4 + v6 + 1 >> 1;
            v6 = v4 - v6;
            v7 = v7 + v5 + 1 >> 1;
            v5 = v7 - v5;
            v0 = v0 + v3 + 1 >> 1;
            v3 = v0 - v3;
            v1 = v1 + v2 + 1 >> 1;
            v2 = v1 - v2;
            t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
            v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
            v7 = t;
            t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
            v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
            v6 = t;
            p[row] = v0 + v7;
            p[row + 7] = v0 - v7;
            p[row + 1] = v1 + v6;
            p[row + 6] = v1 - v6;
            p[row + 2] = v2 + v5;
            p[row + 5] = v2 - v5;
            p[row + 3] = v3 + v4;
            p[row + 4] = v3 - v4;
          }
          for (var col = 0; col < 8; ++col) {
            p0 = p[col];
            p1 = p[col + 8];
            p2 = p[col + 16];
            p3 = p[col + 24];
            p4 = p[col + 32];
            p5 = p[col + 40];
            p6 = p[col + 48];
            p7 = p[col + 56];
            if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
              t = dctSqrt2 * p0 + 8192 >> 14;
              t = t < -2040 ? 0 : t >= 2024 ? 255 : t + 2056 >> 4;
              blockData[blockBufferOffset + col] = t;
              blockData[blockBufferOffset + col + 8] = t;
              blockData[blockBufferOffset + col + 16] = t;
              blockData[blockBufferOffset + col + 24] = t;
              blockData[blockBufferOffset + col + 32] = t;
              blockData[blockBufferOffset + col + 40] = t;
              blockData[blockBufferOffset + col + 48] = t;
              blockData[blockBufferOffset + col + 56] = t;
              continue;
            }
            v0 = dctSqrt2 * p0 + 2048 >> 12;
            v1 = dctSqrt2 * p4 + 2048 >> 12;
            v2 = p2;
            v3 = p6;
            v4 = dctSqrt1d2 * (p1 - p7) + 2048 >> 12;
            v7 = dctSqrt1d2 * (p1 + p7) + 2048 >> 12;
            v5 = p3;
            v6 = p5;
            v0 = (v0 + v1 + 1 >> 1) + 4112;
            v1 = v0 - v1;
            t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
            v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
            v3 = t;
            v4 = v4 + v6 + 1 >> 1;
            v6 = v4 - v6;
            v7 = v7 + v5 + 1 >> 1;
            v5 = v7 - v5;
            v0 = v0 + v3 + 1 >> 1;
            v3 = v0 - v3;
            v1 = v1 + v2 + 1 >> 1;
            v2 = v1 - v2;
            t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
            v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
            v7 = t;
            t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
            v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
            v6 = t;
            p0 = v0 + v7;
            p7 = v0 - v7;
            p1 = v1 + v6;
            p6 = v1 - v6;
            p2 = v2 + v5;
            p5 = v2 - v5;
            p3 = v3 + v4;
            p4 = v3 - v4;
            p0 = p0 < 16 ? 0 : p0 >= 4080 ? 255 : p0 >> 4;
            p1 = p1 < 16 ? 0 : p1 >= 4080 ? 255 : p1 >> 4;
            p2 = p2 < 16 ? 0 : p2 >= 4080 ? 255 : p2 >> 4;
            p3 = p3 < 16 ? 0 : p3 >= 4080 ? 255 : p3 >> 4;
            p4 = p4 < 16 ? 0 : p4 >= 4080 ? 255 : p4 >> 4;
            p5 = p5 < 16 ? 0 : p5 >= 4080 ? 255 : p5 >> 4;
            p6 = p6 < 16 ? 0 : p6 >= 4080 ? 255 : p6 >> 4;
            p7 = p7 < 16 ? 0 : p7 >= 4080 ? 255 : p7 >> 4;
            blockData[blockBufferOffset + col] = p0;
            blockData[blockBufferOffset + col + 8] = p1;
            blockData[blockBufferOffset + col + 16] = p2;
            blockData[blockBufferOffset + col + 24] = p3;
            blockData[blockBufferOffset + col + 32] = p4;
            blockData[blockBufferOffset + col + 40] = p5;
            blockData[blockBufferOffset + col + 48] = p6;
            blockData[blockBufferOffset + col + 56] = p7;
          }
        }
        function buildComponentData(frame, component) {
          var blocksPerLine = component.blocksPerLine;
          var blocksPerColumn = component.blocksPerColumn;
          var computationBuffer = new Int16Array(64);
          for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
            for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
              var offset = getBlockBufferOffset(component, blockRow, blockCol);
              quantizeAndInverse(component, offset, computationBuffer);
            }
          }
          return component.blockData;
        }
        function clamp0to255(a) {
          return a <= 0 ? 0 : a >= 255 ? 255 : a;
        }
        constructor.prototype = {
          parse: function parse2(data) {
            function readUint162() {
              var value = data[offset] << 8 | data[offset + 1];
              offset += 2;
              return value;
            }
            function readDataBlock() {
              var length2 = readUint162();
              var array4 = data.subarray(offset, offset + length2 - 2);
              offset += array4.length;
              return array4;
            }
            function prepareComponents(frame2) {
              var mcusPerLine = Math.ceil(frame2.samplesPerLine / 8 / frame2.maxH);
              var mcusPerColumn = Math.ceil(frame2.scanLines / 8 / frame2.maxV);
              for (var i2 = 0; i2 < frame2.components.length; i2++) {
                component = frame2.components[i2];
                var blocksPerLine = Math.ceil(Math.ceil(frame2.samplesPerLine / 8) * component.h / frame2.maxH);
                var blocksPerColumn = Math.ceil(Math.ceil(frame2.scanLines / 8) * component.v / frame2.maxV);
                var blocksPerLineForMcu = mcusPerLine * component.h;
                var blocksPerColumnForMcu = mcusPerColumn * component.v;
                var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
                component.blockData = new Int16Array(blocksBufferSize);
                component.blocksPerLine = blocksPerLine;
                component.blocksPerColumn = blocksPerColumn;
              }
              frame2.mcusPerLine = mcusPerLine;
              frame2.mcusPerColumn = mcusPerColumn;
            }
            var offset = 0, length = data.length;
            var jfif = null;
            var adobe = null;
            var pixels = null;
            var frame, resetInterval;
            var quantizationTables = [];
            var huffmanTablesAC = [], huffmanTablesDC = [];
            var fileMarker = readUint162();
            if (fileMarker !== 65496) {
              throw "SOI not found";
            }
            fileMarker = readUint162();
            while (fileMarker !== 65497) {
              var i, j, l;
              switch (fileMarker) {
                case 65504:
                case 65505:
                case 65506:
                case 65507:
                case 65508:
                case 65509:
                case 65510:
                case 65511:
                case 65512:
                case 65513:
                case 65514:
                case 65515:
                case 65516:
                case 65517:
                case 65518:
                case 65519:
                case 65534:
                  var appData = readDataBlock();
                  if (fileMarker === 65504) {
                    if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                      jfif = {
                        version: {
                          major: appData[5],
                          minor: appData[6]
                        },
                        densityUnits: appData[7],
                        xDensity: appData[8] << 8 | appData[9],
                        yDensity: appData[10] << 8 | appData[11],
                        thumbWidth: appData[12],
                        thumbHeight: appData[13],
                        thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                      };
                    }
                  }
                  if (fileMarker === 65518) {
                    if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                      adobe = {
                        version: appData[6],
                        flags0: appData[7] << 8 | appData[8],
                        flags1: appData[9] << 8 | appData[10],
                        transformCode: appData[11]
                      };
                    }
                  }
                  break;
                case 65499:
                  var quantizationTablesLength = readUint162();
                  var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                  var z;
                  while (offset < quantizationTablesEnd) {
                    var quantizationTableSpec = data[offset++];
                    var tableData = new Uint16Array(64);
                    if (quantizationTableSpec >> 4 === 0) {
                      for (j = 0; j < 64; j++) {
                        z = dctZigZag[j];
                        tableData[z] = data[offset++];
                      }
                    } else if (quantizationTableSpec >> 4 === 1) {
                      for (j = 0; j < 64; j++) {
                        z = dctZigZag[j];
                        tableData[z] = readUint162();
                      }
                    } else {
                      throw "DQT: invalid table spec";
                    }
                    quantizationTables[quantizationTableSpec & 15] = tableData;
                  }
                  break;
                case 65472:
                case 65473:
                case 65474:
                  if (frame) {
                    throw "Only single frame JPEGs supported";
                  }
                  readUint162();
                  frame = {};
                  frame.extended = fileMarker === 65473;
                  frame.progressive = fileMarker === 65474;
                  frame.precision = data[offset++];
                  frame.scanLines = readUint162();
                  frame.samplesPerLine = readUint162();
                  frame.components = [];
                  frame.componentIds = {};
                  var componentsCount = data[offset++], componentId;
                  var maxH = 0, maxV = 0;
                  for (i = 0; i < componentsCount; i++) {
                    componentId = data[offset];
                    var h = data[offset + 1] >> 4;
                    var v = data[offset + 1] & 15;
                    if (maxH < h) {
                      maxH = h;
                    }
                    if (maxV < v) {
                      maxV = v;
                    }
                    var qId = data[offset + 2];
                    l = frame.components.push({
                      h,
                      v,
                      quantizationTable: quantizationTables[qId]
                    });
                    frame.componentIds[componentId] = l - 1;
                    offset += 3;
                  }
                  frame.maxH = maxH;
                  frame.maxV = maxV;
                  prepareComponents(frame);
                  break;
                case 65476:
                  var huffmanLength = readUint162();
                  for (i = 2; i < huffmanLength; ) {
                    var huffmanTableSpec = data[offset++];
                    var codeLengths = new Uint8Array(16);
                    var codeLengthSum = 0;
                    for (j = 0; j < 16; j++, offset++) {
                      codeLengthSum += codeLengths[j] = data[offset];
                    }
                    var huffmanValues = new Uint8Array(codeLengthSum);
                    for (j = 0; j < codeLengthSum; j++, offset++) {
                      huffmanValues[j] = data[offset];
                    }
                    i += 17 + codeLengthSum;
                    (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                  }
                  break;
                case 65501:
                  readUint162();
                  resetInterval = readUint162();
                  break;
                case 65498:
                  var scanLength = readUint162();
                  var selectorsCount = data[offset++];
                  var components = [], component;
                  for (i = 0; i < selectorsCount; i++) {
                    var componentIndex = frame.componentIds[data[offset++]];
                    component = frame.components[componentIndex];
                    var tableSpec = data[offset++];
                    component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                    component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                    components.push(component);
                  }
                  var spectralStart = data[offset++];
                  var spectralEnd = data[offset++];
                  var successiveApproximation = data[offset++];
                  var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
                  offset += processed;
                  break;
                case 65535:
                  if (data[offset] !== 255) {
                    offset--;
                  }
                  break;
                default:
                  if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                    offset -= 3;
                    break;
                  }
                  throw "unknown JPEG marker " + fileMarker.toString(16);
              }
              fileMarker = readUint162();
            }
            this.width = frame.samplesPerLine;
            this.height = frame.scanLines;
            this.jfif = jfif;
            this.adobe = adobe;
            this.components = [];
            for (i = 0; i < frame.components.length; i++) {
              component = frame.components[i];
              this.components.push({
                output: buildComponentData(frame, component),
                scaleX: component.h / frame.maxH,
                scaleY: component.v / frame.maxV,
                blocksPerLine: component.blocksPerLine,
                blocksPerColumn: component.blocksPerColumn
              });
            }
            this.numComponents = this.components.length;
          },
          _getLinearizedBlockData: function getLinearizedBlockData(width, height) {
            var scaleX = this.width / width, scaleY = this.height / height;
            var component, componentScaleX, componentScaleY, blocksPerScanline;
            var x, y, i, j, k;
            var index;
            var offset = 0;
            var output;
            var numComponents = this.components.length;
            var dataLength = width * height * numComponents;
            var data = new Uint8Array(dataLength);
            var xScaleBlockOffset = new Uint32Array(width);
            var mask3LSB = 4294967288;
            for (i = 0; i < numComponents; i++) {
              component = this.components[i];
              componentScaleX = component.scaleX * scaleX;
              componentScaleY = component.scaleY * scaleY;
              offset = i;
              output = component.output;
              blocksPerScanline = component.blocksPerLine + 1 << 3;
              for (x = 0; x < width; x++) {
                j = 0 | x * componentScaleX;
                xScaleBlockOffset[x] = (j & mask3LSB) << 3 | j & 7;
              }
              for (y = 0; y < height; y++) {
                j = 0 | y * componentScaleY;
                index = blocksPerScanline * (j & mask3LSB) | (j & 7) << 3;
                for (x = 0; x < width; x++) {
                  data[offset] = output[index + xScaleBlockOffset[x]];
                  offset += numComponents;
                }
              }
            }
            var transform = this.decodeTransform;
            if (transform) {
              for (i = 0; i < dataLength; ) {
                for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
                  data[i] = (data[i] * transform[k] >> 8) + transform[k + 1];
                }
              }
            }
            return data;
          },
          _isColorConversionNeeded: function isColorConversionNeeded() {
            if (this.adobe && this.adobe.transformCode) {
              return true;
            } else if (this.numComponents === 3) {
              return true;
            } else {
              return false;
            }
          },
          _convertYccToRgb: function convertYccToRgb(data) {
            var Y, Cb, Cr;
            for (var i = 0, length = data.length; i < length; i += 3) {
              Y = data[i];
              Cb = data[i + 1];
              Cr = data[i + 2];
              data[i] = clamp0to255(Y - 179.456 + 1.402 * Cr);
              data[i + 1] = clamp0to255(Y + 135.459 - 0.344 * Cb - 0.714 * Cr);
              data[i + 2] = clamp0to255(Y - 226.816 + 1.772 * Cb);
            }
            return data;
          },
          _convertYcckToRgb: function convertYcckToRgb(data) {
            var Y, Cb, Cr, k;
            var offset = 0;
            for (var i = 0, length = data.length; i < length; i += 4) {
              Y = data[i];
              Cb = data[i + 1];
              Cr = data[i + 2];
              k = data[i + 3];
              var r = -122.67195406894 + Cb * (-660635669420364e-19 * Cb + 437130475926232e-18 * Cr - 54080610064599e-18 * Y + 48449797120281e-17 * k - 0.154362151871126) + Cr * (-957964378445773e-18 * Cr + 817076911346625e-18 * Y - 0.00477271405408747 * k + 1.53380253221734) + Y * (961250184130688e-18 * Y - 0.00266257332283933 * k + 0.48357088451265) + k * (-336197177618394e-18 * k + 0.484791561490776);
              var g = 107.268039397724 + Cb * (219927104525741e-19 * Cb - 640992018297945e-18 * Cr + 659397001245577e-18 * Y + 426105652938837e-18 * k - 0.176491792462875) + Cr * (-778269941513683e-18 * Cr + 0.00130872261408275 * Y + 770482631801132e-18 * k - 0.151051492775562) + Y * (0.00126935368114843 * Y - 0.00265090189010898 * k + 0.25802910206845) + k * (-318913117588328e-18 * k - 0.213742400323665);
              var b = -20.810012546947 + Cb * (-570115196973677e-18 * Cb - 263409051004589e-19 * Cr + 0.0020741088115012 * Y - 0.00288260236853442 * k + 0.814272968359295) + Cr * (-153496057440975e-19 * Cr - 132689043961446e-18 * Y + 560833691242812e-18 * k - 0.195152027534049) + Y * (0.00174418132927582 * Y - 0.00255243321439347 * k + 0.116935020465145) + k * (-343531996510555e-18 * k + 0.24165260232407);
              data[offset++] = clamp0to255(r);
              data[offset++] = clamp0to255(g);
              data[offset++] = clamp0to255(b);
            }
            return data;
          },
          _convertYcckToCmyk: function convertYcckToCmyk(data) {
            var Y, Cb, Cr;
            for (var i = 0, length = data.length; i < length; i += 4) {
              Y = data[i];
              Cb = data[i + 1];
              Cr = data[i + 2];
              data[i] = clamp0to255(434.456 - Y - 1.402 * Cr);
              data[i + 1] = clamp0to255(119.541 - Y + 0.344 * Cb + 0.714 * Cr);
              data[i + 2] = clamp0to255(481.816 - Y - 1.772 * Cb);
            }
            return data;
          },
          _convertCmykToRgb: function convertCmykToRgb(data) {
            var c, m, y, k;
            var offset = 0;
            var min = -255 * 255 * 255;
            var scale = 1 / 255 / 255;
            for (var i = 0, length = data.length; i < length; i += 4) {
              c = data[i];
              m = data[i + 1];
              y = data[i + 2];
              k = data[i + 3];
              var r = c * (-4.387332384609988 * c + 54.48615194189176 * m + 18.82290502165302 * y + 212.25662451639585 * k - 72734.4411664936) + m * (1.7149763477362134 * m - 5.6096736904047315 * y - 17.873870861415444 * k - 1401.7366389350734) + y * (-2.5217340131683033 * y - 21.248923337353073 * k + 4465.541406466231) - k * (21.86122147463605 * k + 48317.86113160301);
              var g = c * (8.841041422036149 * c + 60.118027045597366 * m + 6.871425592049007 * y + 31.159100130055922 * k - 20220.756542821975) + m * (-15.310361306967817 * m + 17.575251261109482 * y + 131.35250912493976 * k - 48691.05921601825) + y * (4.444339102852739 * y + 9.8632861493405 * k - 6341.191035517494) - k * (20.737325471181034 * k + 47890.15695978492);
              var b = c * (0.8842522430003296 * c + 8.078677503112928 * m + 30.89978309703729 * y - 0.23883238689178934 * k - 3616.812083916688) + m * (10.49593273432072 * m + 63.02378494754052 * y + 50.606957656360734 * k - 28620.90484698408) + y * (0.03296041114873217 * y + 115.60384449646641 * k - 49363.43385999684) - k * (22.33816807309886 * k + 45932.16563550634);
              data[offset++] = r >= 0 ? 255 : r <= min ? 0 : 255 + r * scale | 0;
              data[offset++] = g >= 0 ? 255 : g <= min ? 0 : 255 + g * scale | 0;
              data[offset++] = b >= 0 ? 255 : b <= min ? 0 : 255 + b * scale | 0;
            }
            return data;
          },
          getData: function getData(width, height, forceRGBoutput) {
            if (this.numComponents > 4) {
              throw "Unsupported color mode";
            }
            var data = this._getLinearizedBlockData(width, height);
            if (this.numComponents === 3) {
              return this._convertYccToRgb(data);
            } else if (this.numComponents === 4) {
              if (this._isColorConversionNeeded()) {
                if (forceRGBoutput) {
                  return this._convertYcckToRgb(data);
                } else {
                  return this._convertYcckToCmyk(data);
                }
              } else if (forceRGBoutput) {
                return this._convertCmykToRgb(data);
              }
            }
            return data;
          }
        };
        return constructor;
      }();
      "use strict";
      var ArithmeticDecoder = function ArithmeticDecoderClosure() {
        var QeTable = [{
          qe: 22017,
          nmps: 1,
          nlps: 1,
          switchFlag: 1
        }, {
          qe: 13313,
          nmps: 2,
          nlps: 6,
          switchFlag: 0
        }, {
          qe: 6145,
          nmps: 3,
          nlps: 9,
          switchFlag: 0
        }, {
          qe: 2753,
          nmps: 4,
          nlps: 12,
          switchFlag: 0
        }, {
          qe: 1313,
          nmps: 5,
          nlps: 29,
          switchFlag: 0
        }, {
          qe: 545,
          nmps: 38,
          nlps: 33,
          switchFlag: 0
        }, {
          qe: 22017,
          nmps: 7,
          nlps: 6,
          switchFlag: 1
        }, {
          qe: 21505,
          nmps: 8,
          nlps: 14,
          switchFlag: 0
        }, {
          qe: 18433,
          nmps: 9,
          nlps: 14,
          switchFlag: 0
        }, {
          qe: 14337,
          nmps: 10,
          nlps: 14,
          switchFlag: 0
        }, {
          qe: 12289,
          nmps: 11,
          nlps: 17,
          switchFlag: 0
        }, {
          qe: 9217,
          nmps: 12,
          nlps: 18,
          switchFlag: 0
        }, {
          qe: 7169,
          nmps: 13,
          nlps: 20,
          switchFlag: 0
        }, {
          qe: 5633,
          nmps: 29,
          nlps: 21,
          switchFlag: 0
        }, {
          qe: 22017,
          nmps: 15,
          nlps: 14,
          switchFlag: 1
        }, {
          qe: 21505,
          nmps: 16,
          nlps: 14,
          switchFlag: 0
        }, {
          qe: 20737,
          nmps: 17,
          nlps: 15,
          switchFlag: 0
        }, {
          qe: 18433,
          nmps: 18,
          nlps: 16,
          switchFlag: 0
        }, {
          qe: 14337,
          nmps: 19,
          nlps: 17,
          switchFlag: 0
        }, {
          qe: 13313,
          nmps: 20,
          nlps: 18,
          switchFlag: 0
        }, {
          qe: 12289,
          nmps: 21,
          nlps: 19,
          switchFlag: 0
        }, {
          qe: 10241,
          nmps: 22,
          nlps: 19,
          switchFlag: 0
        }, {
          qe: 9217,
          nmps: 23,
          nlps: 20,
          switchFlag: 0
        }, {
          qe: 8705,
          nmps: 24,
          nlps: 21,
          switchFlag: 0
        }, {
          qe: 7169,
          nmps: 25,
          nlps: 22,
          switchFlag: 0
        }, {
          qe: 6145,
          nmps: 26,
          nlps: 23,
          switchFlag: 0
        }, {
          qe: 5633,
          nmps: 27,
          nlps: 24,
          switchFlag: 0
        }, {
          qe: 5121,
          nmps: 28,
          nlps: 25,
          switchFlag: 0
        }, {
          qe: 4609,
          nmps: 29,
          nlps: 26,
          switchFlag: 0
        }, {
          qe: 4353,
          nmps: 30,
          nlps: 27,
          switchFlag: 0
        }, {
          qe: 2753,
          nmps: 31,
          nlps: 28,
          switchFlag: 0
        }, {
          qe: 2497,
          nmps: 32,
          nlps: 29,
          switchFlag: 0
        }, {
          qe: 2209,
          nmps: 33,
          nlps: 30,
          switchFlag: 0
        }, {
          qe: 1313,
          nmps: 34,
          nlps: 31,
          switchFlag: 0
        }, {
          qe: 1089,
          nmps: 35,
          nlps: 32,
          switchFlag: 0
        }, {
          qe: 673,
          nmps: 36,
          nlps: 33,
          switchFlag: 0
        }, {
          qe: 545,
          nmps: 37,
          nlps: 34,
          switchFlag: 0
        }, {
          qe: 321,
          nmps: 38,
          nlps: 35,
          switchFlag: 0
        }, {
          qe: 273,
          nmps: 39,
          nlps: 36,
          switchFlag: 0
        }, {
          qe: 133,
          nmps: 40,
          nlps: 37,
          switchFlag: 0
        }, {
          qe: 73,
          nmps: 41,
          nlps: 38,
          switchFlag: 0
        }, {
          qe: 37,
          nmps: 42,
          nlps: 39,
          switchFlag: 0
        }, {
          qe: 21,
          nmps: 43,
          nlps: 40,
          switchFlag: 0
        }, {
          qe: 9,
          nmps: 44,
          nlps: 41,
          switchFlag: 0
        }, {
          qe: 5,
          nmps: 45,
          nlps: 42,
          switchFlag: 0
        }, {
          qe: 1,
          nmps: 45,
          nlps: 43,
          switchFlag: 0
        }, {
          qe: 22017,
          nmps: 46,
          nlps: 46,
          switchFlag: 0
        }];
        function ArithmeticDecoder2(data, start, end) {
          this.data = data;
          this.bp = start;
          this.dataEnd = end;
          this.chigh = data[start];
          this.clow = 0;
          this.byteIn();
          this.chigh = this.chigh << 7 & 65535 | this.clow >> 9 & 127;
          this.clow = this.clow << 7 & 65535;
          this.ct -= 7;
          this.a = 32768;
        }
        ArithmeticDecoder2.prototype = {
          byteIn: function ArithmeticDecoder_byteIn() {
            var data = this.data;
            var bp = this.bp;
            if (data[bp] === 255) {
              var b1 = data[bp + 1];
              if (b1 > 143) {
                this.clow += 65280;
                this.ct = 8;
              } else {
                bp++;
                this.clow += data[bp] << 9;
                this.ct = 7;
                this.bp = bp;
              }
            } else {
              bp++;
              this.clow += bp < this.dataEnd ? data[bp] << 8 : 65280;
              this.ct = 8;
              this.bp = bp;
            }
            if (this.clow > 65535) {
              this.chigh += this.clow >> 16;
              this.clow &= 65535;
            }
          },
          readBit: function ArithmeticDecoder_readBit(contexts, pos) {
            var cx_index = contexts[pos] >> 1, cx_mps = contexts[pos] & 1;
            var qeTableIcx = QeTable[cx_index];
            var qeIcx = qeTableIcx.qe;
            var d;
            var a = this.a - qeIcx;
            if (this.chigh < qeIcx) {
              if (a < qeIcx) {
                a = qeIcx;
                d = cx_mps;
                cx_index = qeTableIcx.nmps;
              } else {
                a = qeIcx;
                d = 1 ^ cx_mps;
                if (qeTableIcx.switchFlag === 1) {
                  cx_mps = d;
                }
                cx_index = qeTableIcx.nlps;
              }
            } else {
              this.chigh -= qeIcx;
              if ((a & 32768) !== 0) {
                this.a = a;
                return cx_mps;
              }
              if (a < qeIcx) {
                d = 1 ^ cx_mps;
                if (qeTableIcx.switchFlag === 1) {
                  cx_mps = d;
                }
                cx_index = qeTableIcx.nlps;
              } else {
                d = cx_mps;
                cx_index = qeTableIcx.nmps;
              }
            }
            do {
              if (this.ct === 0) {
                this.byteIn();
              }
              a <<= 1;
              this.chigh = this.chigh << 1 & 65535 | this.clow >> 15 & 1;
              this.clow = this.clow << 1 & 65535;
              this.ct--;
            } while ((a & 32768) === 0);
            this.a = a;
            contexts[pos] = cx_index << 1 | cx_mps;
            return d;
          }
        };
        return ArithmeticDecoder2;
      }();
      "use strict";
      var JpxImage = function JpxImageClosure() {
        var SubbandsGainLog2 = {
          LL: 0,
          LH: 1,
          HL: 1,
          HH: 2
        };
        function JpxImage2() {
          this.failOnCorruptedImage = false;
        }
        JpxImage2.prototype = {
          parse: function JpxImage_parse(data) {
            var head = readUint16(data, 0);
            if (head === 65359) {
              this.parseCodestream(data, 0, data.length);
              return;
            }
            var position = 0, length = data.length;
            while (position < length) {
              var headerSize = 8;
              var lbox = readUint32(data, position);
              var tbox = readUint32(data, position + 4);
              position += headerSize;
              if (lbox === 1) {
                lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
                position += 8;
                headerSize += 8;
              }
              if (lbox === 0) {
                lbox = length - position + headerSize;
              }
              if (lbox < headerSize) {
                throw new Error("JPX Error: Invalid box field size");
              }
              var dataLength = lbox - headerSize;
              var jumpDataLength = true;
              switch (tbox) {
                case 1785737832:
                  jumpDataLength = false;
                  break;
                case 1668246642:
                  var method = data[position];
                  var precedence = data[position + 1];
                  var approximation = data[position + 2];
                  if (method === 1) {
                    var colorspace = readUint32(data, position + 3);
                    switch (colorspace) {
                      case 16:
                      case 17:
                      case 18:
                        break;
                      default:
                        warn("Unknown colorspace " + colorspace);
                        break;
                    }
                  } else if (method === 2) {
                    info("ICC profile not supported");
                  }
                  break;
                case 1785737827:
                  this.parseCodestream(data, position, position + dataLength);
                  break;
                case 1783636e3:
                  if (readUint32(data, position) !== 218793738) {
                    warn("Invalid JP2 signature");
                  }
                  break;
                case 1783634458:
                case 1718909296:
                case 1920099697:
                case 1919251232:
                case 1768449138:
                  break;
                default:
                  var headerType = String.fromCharCode(tbox >> 24 & 255, tbox >> 16 & 255, tbox >> 8 & 255, tbox & 255);
                  warn("Unsupported header type " + tbox + " (" + headerType + ")");
                  break;
              }
              if (jumpDataLength) {
                position += dataLength;
              }
            }
          },
          parseImageProperties: function JpxImage_parseImageProperties(stream) {
            var newByte = stream.getByte();
            while (newByte >= 0) {
              var oldByte = newByte;
              newByte = stream.getByte();
              var code = oldByte << 8 | newByte;
              if (code === 65361) {
                stream.skip(4);
                var Xsiz = stream.getInt32() >>> 0;
                var Ysiz = stream.getInt32() >>> 0;
                var XOsiz = stream.getInt32() >>> 0;
                var YOsiz = stream.getInt32() >>> 0;
                stream.skip(16);
                var Csiz = stream.getUint16();
                this.width = Xsiz - XOsiz;
                this.height = Ysiz - YOsiz;
                this.componentsCount = Csiz;
                this.bitsPerComponent = 8;
                return;
              }
            }
            throw new Error("JPX Error: No size marker found in JPX stream");
          },
          parseCodestream: function JpxImage_parseCodestream(data, start, end) {
            var context = {};
            try {
              var doNotRecover = false;
              var position = start;
              while (position + 1 < end) {
                var code = readUint16(data, position);
                position += 2;
                var length = 0, j, sqcd, spqcds, spqcdSize, scalarExpounded, tile;
                switch (code) {
                  case 65359:
                    context.mainHeader = true;
                    break;
                  case 65497:
                    break;
                  case 65361:
                    length = readUint16(data, position);
                    var siz = {};
                    siz.Xsiz = readUint32(data, position + 4);
                    siz.Ysiz = readUint32(data, position + 8);
                    siz.XOsiz = readUint32(data, position + 12);
                    siz.YOsiz = readUint32(data, position + 16);
                    siz.XTsiz = readUint32(data, position + 20);
                    siz.YTsiz = readUint32(data, position + 24);
                    siz.XTOsiz = readUint32(data, position + 28);
                    siz.YTOsiz = readUint32(data, position + 32);
                    var componentsCount = readUint16(data, position + 36);
                    siz.Csiz = componentsCount;
                    var components = [];
                    j = position + 38;
                    for (var i = 0; i < componentsCount; i++) {
                      var component = {
                        precision: (data[j] & 127) + 1,
                        isSigned: !!(data[j] & 128),
                        XRsiz: data[j + 1],
                        YRsiz: data[j + 1]
                      };
                      calculateComponentDimensions(component, siz);
                      components.push(component);
                    }
                    context.SIZ = siz;
                    context.components = components;
                    calculateTileGrids(context, components);
                    context.QCC = [];
                    context.COC = [];
                    break;
                  case 65372:
                    length = readUint16(data, position);
                    var qcd = {};
                    j = position + 2;
                    sqcd = data[j++];
                    switch (sqcd & 31) {
                      case 0:
                        spqcdSize = 8;
                        scalarExpounded = true;
                        break;
                      case 1:
                        spqcdSize = 16;
                        scalarExpounded = false;
                        break;
                      case 2:
                        spqcdSize = 16;
                        scalarExpounded = true;
                        break;
                      default:
                        throw new Error("JPX Error: Invalid SQcd value " + sqcd);
                    }
                    qcd.noQuantization = spqcdSize === 8;
                    qcd.scalarExpounded = scalarExpounded;
                    qcd.guardBits = sqcd >> 5;
                    spqcds = [];
                    while (j < length + position) {
                      var spqcd = {};
                      if (spqcdSize === 8) {
                        spqcd.epsilon = data[j++] >> 3;
                        spqcd.mu = 0;
                      } else {
                        spqcd.epsilon = data[j] >> 3;
                        spqcd.mu = (data[j] & 7) << 8 | data[j + 1];
                        j += 2;
                      }
                      spqcds.push(spqcd);
                    }
                    qcd.SPqcds = spqcds;
                    if (context.mainHeader) {
                      context.QCD = qcd;
                    } else {
                      context.currentTile.QCD = qcd;
                      context.currentTile.QCC = [];
                    }
                    break;
                  case 65373:
                    length = readUint16(data, position);
                    var qcc = {};
                    j = position + 2;
                    var cqcc;
                    if (context.SIZ.Csiz < 257) {
                      cqcc = data[j++];
                    } else {
                      cqcc = readUint16(data, j);
                      j += 2;
                    }
                    sqcd = data[j++];
                    switch (sqcd & 31) {
                      case 0:
                        spqcdSize = 8;
                        scalarExpounded = true;
                        break;
                      case 1:
                        spqcdSize = 16;
                        scalarExpounded = false;
                        break;
                      case 2:
                        spqcdSize = 16;
                        scalarExpounded = true;
                        break;
                      default:
                        throw new Error("JPX Error: Invalid SQcd value " + sqcd);
                    }
                    qcc.noQuantization = spqcdSize === 8;
                    qcc.scalarExpounded = scalarExpounded;
                    qcc.guardBits = sqcd >> 5;
                    spqcds = [];
                    while (j < length + position) {
                      spqcd = {};
                      if (spqcdSize === 8) {
                        spqcd.epsilon = data[j++] >> 3;
                        spqcd.mu = 0;
                      } else {
                        spqcd.epsilon = data[j] >> 3;
                        spqcd.mu = (data[j] & 7) << 8 | data[j + 1];
                        j += 2;
                      }
                      spqcds.push(spqcd);
                    }
                    qcc.SPqcds = spqcds;
                    if (context.mainHeader) {
                      context.QCC[cqcc] = qcc;
                    } else {
                      context.currentTile.QCC[cqcc] = qcc;
                    }
                    break;
                  case 65362:
                    length = readUint16(data, position);
                    var cod = {};
                    j = position + 2;
                    var scod = data[j++];
                    cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
                    cod.sopMarkerUsed = !!(scod & 2);
                    cod.ephMarkerUsed = !!(scod & 4);
                    cod.progressionOrder = data[j++];
                    cod.layersCount = readUint16(data, j);
                    j += 2;
                    cod.multipleComponentTransform = data[j++];
                    cod.decompositionLevelsCount = data[j++];
                    cod.xcb = (data[j++] & 15) + 2;
                    cod.ycb = (data[j++] & 15) + 2;
                    var blockStyle = data[j++];
                    cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
                    cod.resetContextProbabilities = !!(blockStyle & 2);
                    cod.terminationOnEachCodingPass = !!(blockStyle & 4);
                    cod.verticalyStripe = !!(blockStyle & 8);
                    cod.predictableTermination = !!(blockStyle & 16);
                    cod.segmentationSymbolUsed = !!(blockStyle & 32);
                    cod.reversibleTransformation = data[j++];
                    if (cod.entropyCoderWithCustomPrecincts) {
                      var precinctsSizes = [];
                      while (j < length + position) {
                        var precinctsSize = data[j++];
                        precinctsSizes.push({
                          PPx: precinctsSize & 15,
                          PPy: precinctsSize >> 4
                        });
                      }
                      cod.precinctsSizes = precinctsSizes;
                    }
                    var unsupported = [];
                    if (cod.selectiveArithmeticCodingBypass) {
                      unsupported.push("selectiveArithmeticCodingBypass");
                    }
                    if (cod.resetContextProbabilities) {
                      unsupported.push("resetContextProbabilities");
                    }
                    if (cod.terminationOnEachCodingPass) {
                      unsupported.push("terminationOnEachCodingPass");
                    }
                    if (cod.verticalyStripe) {
                      unsupported.push("verticalyStripe");
                    }
                    if (cod.predictableTermination) {
                      unsupported.push("predictableTermination");
                    }
                    if (unsupported.length > 0) {
                      doNotRecover = true;
                      throw new Error("JPX Error: Unsupported COD options (" + unsupported.join(", ") + ")");
                    }
                    if (context.mainHeader) {
                      context.COD = cod;
                    } else {
                      context.currentTile.COD = cod;
                      context.currentTile.COC = [];
                    }
                    break;
                  case 65424:
                    length = readUint16(data, position);
                    tile = {};
                    tile.index = readUint16(data, position + 2);
                    tile.length = readUint32(data, position + 4);
                    tile.dataEnd = tile.length + position - 2;
                    tile.partIndex = data[position + 8];
                    tile.partsCount = data[position + 9];
                    context.mainHeader = false;
                    if (tile.partIndex === 0) {
                      tile.COD = context.COD;
                      tile.COC = context.COC.slice(0);
                      tile.QCD = context.QCD;
                      tile.QCC = context.QCC.slice(0);
                    }
                    context.currentTile = tile;
                    break;
                  case 65427:
                    tile = context.currentTile;
                    if (tile.partIndex === 0) {
                      initializeTile(context, tile.index);
                      buildPackets(context);
                    }
                    length = tile.dataEnd - position;
                    parseTilePackets(context, data, position, length);
                    break;
                  case 65365:
                  case 65367:
                  case 65368:
                  case 65380:
                    length = readUint16(data, position);
                    break;
                  case 65363:
                    throw new Error("JPX Error: Codestream code 0xFF53 (COC) is not implemented");
                  default:
                    throw new Error("JPX Error: Unknown codestream code: " + code.toString(16));
                }
                position += length;
              }
            } catch (e) {
              if (doNotRecover || this.failOnCorruptedImage) {
                throw e;
              } else {
                warn("Trying to recover from " + e.message);
              }
            }
            this.tiles = transformComponents(context);
            this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
            this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
            this.componentsCount = context.SIZ.Csiz;
          }
        };
        function calculateComponentDimensions(component, siz) {
          component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
          component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
          component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
          component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
          component.width = component.x1 - component.x0;
          component.height = component.y1 - component.y0;
        }
        function calculateTileGrids(context, components) {
          var siz = context.SIZ;
          var tile, tiles = [];
          var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
          var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
          for (var q = 0; q < numYtiles; q++) {
            for (var p = 0; p < numXtiles; p++) {
              tile = {};
              tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
              tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
              tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
              tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
              tile.width = tile.tx1 - tile.tx0;
              tile.height = tile.ty1 - tile.ty0;
              tile.components = [];
              tiles.push(tile);
            }
          }
          context.tiles = tiles;
          var componentsCount = siz.Csiz;
          for (var i = 0, ii = componentsCount; i < ii; i++) {
            var component = components[i];
            for (var j = 0, jj = tiles.length; j < jj; j++) {
              var tileComponent = {};
              tile = tiles[j];
              tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
              tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
              tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
              tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
              tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
              tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
              tile.components[i] = tileComponent;
            }
          }
        }
        function getBlocksDimensions(context, component, r) {
          var codOrCoc = component.codingStyleParameters;
          var result = {};
          if (!codOrCoc.entropyCoderWithCustomPrecincts) {
            result.PPx = 15;
            result.PPy = 15;
          } else {
            result.PPx = codOrCoc.precinctsSizes[r].PPx;
            result.PPy = codOrCoc.precinctsSizes[r].PPy;
          }
          result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
          result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
          return result;
        }
        function buildPrecincts(context, resolution, dimensions) {
          var precinctWidth = 1 << dimensions.PPx;
          var precinctHeight = 1 << dimensions.PPy;
          var isZeroRes = resolution.resLevel === 0;
          var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
          var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
          var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
          var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
          var numprecincts = numprecinctswide * numprecinctshigh;
          resolution.precinctParameters = {
            precinctWidth,
            precinctHeight,
            numprecinctswide,
            numprecinctshigh,
            numprecincts,
            precinctWidthInSubband,
            precinctHeightInSubband
          };
        }
        function buildCodeblocks(context, subband, dimensions) {
          var xcb_ = dimensions.xcb_;
          var ycb_ = dimensions.ycb_;
          var codeblockWidth = 1 << xcb_;
          var codeblockHeight = 1 << ycb_;
          var cbx0 = subband.tbx0 >> xcb_;
          var cby0 = subband.tby0 >> ycb_;
          var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
          var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
          var precinctParameters = subband.resolution.precinctParameters;
          var codeblocks = [];
          var precincts = [];
          var i, j, codeblock, precinctNumber;
          for (j = cby0; j < cby1; j++) {
            for (i = cbx0; i < cbx1; i++) {
              codeblock = {
                cbx: i,
                cby: j,
                tbx0: codeblockWidth * i,
                tby0: codeblockHeight * j,
                tbx1: codeblockWidth * (i + 1),
                tby1: codeblockHeight * (j + 1)
              };
              codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
              codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
              codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
              codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
              var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
              var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
              precinctNumber = pi + pj * precinctParameters.numprecinctswide;
              codeblock.precinctNumber = precinctNumber;
              codeblock.subbandType = subband.type;
              codeblock.Lblock = 3;
              if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
                continue;
              }
              codeblocks.push(codeblock);
              var precinct = precincts[precinctNumber];
              if (precinct !== void 0) {
                if (i < precinct.cbxMin) {
                  precinct.cbxMin = i;
                } else if (i > precinct.cbxMax) {
                  precinct.cbxMax = i;
                }
                if (j < precinct.cbyMin) {
                  precinct.cbxMin = j;
                } else if (j > precinct.cbyMax) {
                  precinct.cbyMax = j;
                }
              } else {
                precincts[precinctNumber] = precinct = {
                  cbxMin: i,
                  cbyMin: j,
                  cbxMax: i,
                  cbyMax: j
                };
              }
              codeblock.precinct = precinct;
            }
          }
          subband.codeblockParameters = {
            codeblockWidth: xcb_,
            codeblockHeight: ycb_,
            numcodeblockwide: cbx1 - cbx0 + 1,
            numcodeblockhigh: cby1 - cby0 + 1
          };
          subband.codeblocks = codeblocks;
          subband.precincts = precincts;
        }
        function createPacket(resolution, precinctNumber, layerNumber) {
          var precinctCodeblocks = [];
          var subbands = resolution.subbands;
          for (var i = 0, ii = subbands.length; i < ii; i++) {
            var subband = subbands[i];
            var codeblocks = subband.codeblocks;
            for (var j = 0, jj = codeblocks.length; j < jj; j++) {
              var codeblock = codeblocks[j];
              if (codeblock.precinctNumber !== precinctNumber) {
                continue;
              }
              precinctCodeblocks.push(codeblock);
            }
          }
          return {
            layerNumber,
            codeblocks: precinctCodeblocks
          };
        }
        function LayerResolutionComponentPositionIterator(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var layersCount = tile.codingStyleDefaultParameters.layersCount;
          var componentsCount = siz.Csiz;
          var maxDecompositionLevelsCount = 0;
          for (var q = 0; q < componentsCount; q++) {
            maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
          }
          var l = 0, r = 0, i = 0, k = 0;
          this.nextPacket = function JpxImage_nextPacket() {
            for (; l < layersCount; l++) {
              for (; r <= maxDecompositionLevelsCount; r++) {
                for (; i < componentsCount; i++) {
                  var component = tile.components[i];
                  if (r > component.codingStyleParameters.decompositionLevelsCount) {
                    continue;
                  }
                  var resolution = component.resolutions[r];
                  var numprecincts = resolution.precinctParameters.numprecincts;
                  for (; k < numprecincts; ) {
                    var packet = createPacket(resolution, k, l);
                    k++;
                    return packet;
                  }
                  k = 0;
                }
                i = 0;
              }
              r = 0;
            }
            throw new Error("JPX Error: Out of packets");
          };
        }
        function ResolutionLayerComponentPositionIterator(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var layersCount = tile.codingStyleDefaultParameters.layersCount;
          var componentsCount = siz.Csiz;
          var maxDecompositionLevelsCount = 0;
          for (var q = 0; q < componentsCount; q++) {
            maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
          }
          var r = 0, l = 0, i = 0, k = 0;
          this.nextPacket = function JpxImage_nextPacket() {
            for (; r <= maxDecompositionLevelsCount; r++) {
              for (; l < layersCount; l++) {
                for (; i < componentsCount; i++) {
                  var component = tile.components[i];
                  if (r > component.codingStyleParameters.decompositionLevelsCount) {
                    continue;
                  }
                  var resolution = component.resolutions[r];
                  var numprecincts = resolution.precinctParameters.numprecincts;
                  for (; k < numprecincts; ) {
                    var packet = createPacket(resolution, k, l);
                    k++;
                    return packet;
                  }
                  k = 0;
                }
                i = 0;
              }
              l = 0;
            }
            throw new Error("JPX Error: Out of packets");
          };
        }
        function ResolutionPositionComponentLayerIterator(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var layersCount = tile.codingStyleDefaultParameters.layersCount;
          var componentsCount = siz.Csiz;
          var l, r, c, p;
          var maxDecompositionLevelsCount = 0;
          for (c = 0; c < componentsCount; c++) {
            var component = tile.components[c];
            maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
          }
          var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);
          for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
            var maxNumPrecincts = 0;
            for (c = 0; c < componentsCount; ++c) {
              var resolutions = tile.components[c].resolutions;
              if (r < resolutions.length) {
                maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
              }
            }
            maxNumPrecinctsInLevel[r] = maxNumPrecincts;
          }
          l = 0;
          r = 0;
          c = 0;
          p = 0;
          this.nextPacket = function JpxImage_nextPacket() {
            for (; r <= maxDecompositionLevelsCount; r++) {
              for (; p < maxNumPrecinctsInLevel[r]; p++) {
                for (; c < componentsCount; c++) {
                  var component2 = tile.components[c];
                  if (r > component2.codingStyleParameters.decompositionLevelsCount) {
                    continue;
                  }
                  var resolution = component2.resolutions[r];
                  var numprecincts = resolution.precinctParameters.numprecincts;
                  if (p >= numprecincts) {
                    continue;
                  }
                  for (; l < layersCount; ) {
                    var packet = createPacket(resolution, p, l);
                    l++;
                    return packet;
                  }
                  l = 0;
                }
                c = 0;
              }
              p = 0;
            }
            throw new Error("JPX Error: Out of packets");
          };
        }
        function PositionComponentResolutionLayerIterator(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var layersCount = tile.codingStyleDefaultParameters.layersCount;
          var componentsCount = siz.Csiz;
          var precinctsSizes = getPrecinctSizesInImageScale(tile);
          var precinctsIterationSizes = precinctsSizes;
          var l = 0, r = 0, c = 0, px = 0, py = 0;
          this.nextPacket = function JpxImage_nextPacket() {
            for (; py < precinctsIterationSizes.maxNumHigh; py++) {
              for (; px < precinctsIterationSizes.maxNumWide; px++) {
                for (; c < componentsCount; c++) {
                  var component = tile.components[c];
                  var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
                  for (; r <= decompositionLevelsCount; r++) {
                    var resolution = component.resolutions[r];
                    var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
                    var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
                    if (k === null) {
                      continue;
                    }
                    for (; l < layersCount; ) {
                      var packet = createPacket(resolution, k, l);
                      l++;
                      return packet;
                    }
                    l = 0;
                  }
                  r = 0;
                }
                c = 0;
              }
              px = 0;
            }
            throw new Error("JPX Error: Out of packets");
          };
        }
        function ComponentPositionResolutionLayerIterator(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var layersCount = tile.codingStyleDefaultParameters.layersCount;
          var componentsCount = siz.Csiz;
          var precinctsSizes = getPrecinctSizesInImageScale(tile);
          var l = 0, r = 0, c = 0, px = 0, py = 0;
          this.nextPacket = function JpxImage_nextPacket() {
            for (; c < componentsCount; ++c) {
              var component = tile.components[c];
              var precinctsIterationSizes = precinctsSizes.components[c];
              var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
              for (; py < precinctsIterationSizes.maxNumHigh; py++) {
                for (; px < precinctsIterationSizes.maxNumWide; px++) {
                  for (; r <= decompositionLevelsCount; r++) {
                    var resolution = component.resolutions[r];
                    var sizeInImageScale = precinctsIterationSizes.resolutions[r];
                    var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
                    if (k === null) {
                      continue;
                    }
                    for (; l < layersCount; ) {
                      var packet = createPacket(resolution, k, l);
                      l++;
                      return packet;
                    }
                    l = 0;
                  }
                  r = 0;
                }
                px = 0;
              }
              py = 0;
            }
            throw new Error("JPX Error: Out of packets");
          };
        }
        function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
          var posX = pxIndex * precinctIterationSizes.minWidth;
          var posY = pyIndex * precinctIterationSizes.minHeight;
          if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
            return null;
          }
          var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
          return posX / sizeInImageScale.height + startPrecinctRowIndex;
        }
        function getPrecinctSizesInImageScale(tile) {
          var componentsCount = tile.components.length;
          var minWidth = Number.MAX_VALUE;
          var minHeight = Number.MAX_VALUE;
          var maxNumWide = 0;
          var maxNumHigh = 0;
          var sizePerComponent = new Array(componentsCount);
          for (var c = 0; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
            var sizePerResolution = new Array(decompositionLevelsCount + 1);
            var minWidthCurrentComponent = Number.MAX_VALUE;
            var minHeightCurrentComponent = Number.MAX_VALUE;
            var maxNumWideCurrentComponent = 0;
            var maxNumHighCurrentComponent = 0;
            var scale = 1;
            for (var r = decompositionLevelsCount; r >= 0; --r) {
              var resolution = component.resolutions[r];
              var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
              var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
              minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
              minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
              maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
              maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
              sizePerResolution[r] = {
                width: widthCurrentResolution,
                height: heightCurrentResolution
              };
              scale <<= 1;
            }
            minWidth = Math.min(minWidth, minWidthCurrentComponent);
            minHeight = Math.min(minHeight, minHeightCurrentComponent);
            maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
            maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
            sizePerComponent[c] = {
              resolutions: sizePerResolution,
              minWidth: minWidthCurrentComponent,
              minHeight: minHeightCurrentComponent,
              maxNumWide: maxNumWideCurrentComponent,
              maxNumHigh: maxNumHighCurrentComponent
            };
          }
          return {
            components: sizePerComponent,
            minWidth,
            minHeight,
            maxNumWide,
            maxNumHigh
          };
        }
        function buildPackets(context) {
          var siz = context.SIZ;
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var componentsCount = siz.Csiz;
          for (var c = 0; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
            var resolutions = [];
            var subbands = [];
            for (var r = 0; r <= decompositionLevelsCount; r++) {
              var blocksDimensions = getBlocksDimensions(context, component, r);
              var resolution = {};
              var scale = 1 << decompositionLevelsCount - r;
              resolution.trx0 = Math.ceil(component.tcx0 / scale);
              resolution.try0 = Math.ceil(component.tcy0 / scale);
              resolution.trx1 = Math.ceil(component.tcx1 / scale);
              resolution.try1 = Math.ceil(component.tcy1 / scale);
              resolution.resLevel = r;
              buildPrecincts(context, resolution, blocksDimensions);
              resolutions.push(resolution);
              var subband;
              if (r === 0) {
                subband = {};
                subband.type = "LL";
                subband.tbx0 = Math.ceil(component.tcx0 / scale);
                subband.tby0 = Math.ceil(component.tcy0 / scale);
                subband.tbx1 = Math.ceil(component.tcx1 / scale);
                subband.tby1 = Math.ceil(component.tcy1 / scale);
                subband.resolution = resolution;
                buildCodeblocks(context, subband, blocksDimensions);
                subbands.push(subband);
                resolution.subbands = [subband];
              } else {
                var bscale = 1 << decompositionLevelsCount - r + 1;
                var resolutionSubbands = [];
                subband = {};
                subband.type = "HL";
                subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
                subband.tby0 = Math.ceil(component.tcy0 / bscale);
                subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
                subband.tby1 = Math.ceil(component.tcy1 / bscale);
                subband.resolution = resolution;
                buildCodeblocks(context, subband, blocksDimensions);
                subbands.push(subband);
                resolutionSubbands.push(subband);
                subband = {};
                subband.type = "LH";
                subband.tbx0 = Math.ceil(component.tcx0 / bscale);
                subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
                subband.tbx1 = Math.ceil(component.tcx1 / bscale);
                subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
                subband.resolution = resolution;
                buildCodeblocks(context, subband, blocksDimensions);
                subbands.push(subband);
                resolutionSubbands.push(subband);
                subband = {};
                subband.type = "HH";
                subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
                subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
                subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
                subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
                subband.resolution = resolution;
                buildCodeblocks(context, subband, blocksDimensions);
                subbands.push(subband);
                resolutionSubbands.push(subband);
                resolution.subbands = resolutionSubbands;
              }
            }
            component.resolutions = resolutions;
            component.subbands = subbands;
          }
          var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
          switch (progressionOrder) {
            case 0:
              tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
              break;
            case 1:
              tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
              break;
            case 2:
              tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
              break;
            case 3:
              tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
              break;
            case 4:
              tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
              break;
            default:
              throw new Error("JPX Error: Unsupported progression order " + progressionOrder);
          }
        }
        function parseTilePackets(context, data, offset, dataLength) {
          var position = 0;
          var buffer, bufferSize = 0, skipNextBit = false;
          function readBits(count) {
            while (bufferSize < count) {
              var b = data[offset + position];
              position++;
              if (skipNextBit) {
                buffer = buffer << 7 | b;
                bufferSize += 7;
                skipNextBit = false;
              } else {
                buffer = buffer << 8 | b;
                bufferSize += 8;
              }
              if (b === 255) {
                skipNextBit = true;
              }
            }
            bufferSize -= count;
            return buffer >>> bufferSize & (1 << count) - 1;
          }
          function skipMarkerIfEqual(value) {
            if (data[offset + position - 1] === 255 && data[offset + position] === value) {
              skipBytes(1);
              return true;
            } else if (data[offset + position] === 255 && data[offset + position + 1] === value) {
              skipBytes(2);
              return true;
            }
            return false;
          }
          function skipBytes(count) {
            position += count;
          }
          function alignToByte() {
            bufferSize = 0;
            if (skipNextBit) {
              position++;
              skipNextBit = false;
            }
          }
          function readCodingpasses() {
            if (readBits(1) === 0) {
              return 1;
            }
            if (readBits(1) === 0) {
              return 2;
            }
            var value = readBits(2);
            if (value < 3) {
              return value + 3;
            }
            value = readBits(5);
            if (value < 31) {
              return value + 6;
            }
            value = readBits(7);
            return value + 37;
          }
          var tileIndex = context.currentTile.index;
          var tile = context.tiles[tileIndex];
          var sopMarkerUsed = context.COD.sopMarkerUsed;
          var ephMarkerUsed = context.COD.ephMarkerUsed;
          var packetsIterator = tile.packetsIterator;
          while (position < dataLength) {
            alignToByte();
            if (sopMarkerUsed && skipMarkerIfEqual(145)) {
              skipBytes(4);
            }
            var packet = packetsIterator.nextPacket();
            if (!readBits(1)) {
              continue;
            }
            var layerNumber = packet.layerNumber;
            var queue = [], codeblock;
            for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
              codeblock = packet.codeblocks[i];
              var precinct = codeblock.precinct;
              var codeblockColumn = codeblock.cbx - precinct.cbxMin;
              var codeblockRow = codeblock.cby - precinct.cbyMin;
              var codeblockIncluded = false;
              var firstTimeInclusion = false;
              var valueReady;
              if (codeblock["included"] !== void 0) {
                codeblockIncluded = !!readBits(1);
              } else {
                precinct = codeblock.precinct;
                var inclusionTree, zeroBitPlanesTree;
                if (precinct["inclusionTree"] !== void 0) {
                  inclusionTree = precinct.inclusionTree;
                } else {
                  var width = precinct.cbxMax - precinct.cbxMin + 1;
                  var height = precinct.cbyMax - precinct.cbyMin + 1;
                  inclusionTree = new InclusionTree(width, height, layerNumber);
                  zeroBitPlanesTree = new TagTree(width, height);
                  precinct.inclusionTree = inclusionTree;
                  precinct.zeroBitPlanesTree = zeroBitPlanesTree;
                }
                if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
                  while (true) {
                    if (readBits(1)) {
                      valueReady = !inclusionTree.nextLevel();
                      if (valueReady) {
                        codeblock.included = true;
                        codeblockIncluded = firstTimeInclusion = true;
                        break;
                      }
                    } else {
                      inclusionTree.incrementValue(layerNumber);
                      break;
                    }
                  }
                }
              }
              if (!codeblockIncluded) {
                continue;
              }
              if (firstTimeInclusion) {
                zeroBitPlanesTree = precinct.zeroBitPlanesTree;
                zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
                while (true) {
                  if (readBits(1)) {
                    valueReady = !zeroBitPlanesTree.nextLevel();
                    if (valueReady) {
                      break;
                    }
                  } else {
                    zeroBitPlanesTree.incrementValue();
                  }
                }
                codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
              }
              var codingpasses = readCodingpasses();
              while (readBits(1)) {
                codeblock.Lblock++;
              }
              var codingpassesLog2 = log2(codingpasses);
              var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
              var codedDataLength = readBits(bits);
              queue.push({
                codeblock,
                codingpasses,
                dataLength: codedDataLength
              });
            }
            alignToByte();
            if (ephMarkerUsed) {
              skipMarkerIfEqual(146);
            }
            while (queue.length > 0) {
              var packetItem = queue.shift();
              codeblock = packetItem.codeblock;
              if (codeblock["data"] === void 0) {
                codeblock.data = [];
              }
              codeblock.data.push({
                data,
                start: offset + position,
                end: offset + position + packetItem.dataLength,
                codingpasses: packetItem.codingpasses
              });
              position += packetItem.dataLength;
            }
          }
          return position;
        }
        function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
          var x0 = subband.tbx0;
          var y0 = subband.tby0;
          var width = subband.tbx1 - subband.tbx0;
          var codeblocks = subband.codeblocks;
          var right = subband.type.charAt(0) === "H" ? 1 : 0;
          var bottom = subband.type.charAt(1) === "H" ? levelWidth : 0;
          for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
            var codeblock = codeblocks[i];
            var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
            var blockHeight = codeblock.tby1_ - codeblock.tby0_;
            if (blockWidth === 0 || blockHeight === 0) {
              continue;
            }
            if (codeblock["data"] === void 0) {
              continue;
            }
            var bitModel, currentCodingpassType;
            bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
            currentCodingpassType = 2;
            var data = codeblock.data, totalLength = 0, codingpasses = 0;
            var j, jj, dataItem;
            for (j = 0, jj = data.length; j < jj; j++) {
              dataItem = data[j];
              totalLength += dataItem.end - dataItem.start;
              codingpasses += dataItem.codingpasses;
            }
            var encodedData = new Uint8Array(totalLength);
            var position = 0;
            for (j = 0, jj = data.length; j < jj; j++) {
              dataItem = data[j];
              var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
              encodedData.set(chunk, position);
              position += chunk.length;
            }
            var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
            bitModel.setDecoder(decoder);
            for (j = 0; j < codingpasses; j++) {
              switch (currentCodingpassType) {
                case 0:
                  bitModel.runSignificancePropogationPass();
                  break;
                case 1:
                  bitModel.runMagnitudeRefinementPass();
                  break;
                case 2:
                  bitModel.runCleanupPass();
                  if (segmentationSymbolUsed) {
                    bitModel.checkSegmentationSymbol();
                  }
                  break;
              }
              currentCodingpassType = (currentCodingpassType + 1) % 3;
            }
            var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
            var sign = bitModel.coefficentsSign;
            var magnitude = bitModel.coefficentsMagnitude;
            var bitsDecoded = bitModel.bitsDecoded;
            var magnitudeCorrection = reversible ? 0 : 0.5;
            var k, n, nb;
            position = 0;
            var interleave = subband.type !== "LL";
            for (j = 0; j < blockHeight; j++) {
              var row = offset / width | 0;
              var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
              for (k = 0; k < blockWidth; k++) {
                n = magnitude[position];
                if (n !== 0) {
                  n = (n + magnitudeCorrection) * delta;
                  if (sign[position] !== 0) {
                    n = -n;
                  }
                  nb = bitsDecoded[position];
                  var pos = interleave ? levelOffset + (offset << 1) : offset;
                  if (reversible && nb >= mb) {
                    coefficients[pos] = n;
                  } else {
                    coefficients[pos] = n * (1 << mb - nb);
                  }
                }
                offset++;
                position++;
              }
              offset += width - blockWidth;
            }
          }
        }
        function transformTile(context, tile, c) {
          var component = tile.components[c];
          var codingStyleParameters = component.codingStyleParameters;
          var quantizationParameters = component.quantizationParameters;
          var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
          var spqcds = quantizationParameters.SPqcds;
          var scalarExpounded = quantizationParameters.scalarExpounded;
          var guardBits = quantizationParameters.guardBits;
          var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
          var precision = context.components[c].precision;
          var reversible = codingStyleParameters.reversibleTransformation;
          var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
          var subbandCoefficients = [];
          var b = 0;
          for (var i = 0; i <= decompositionLevelsCount; i++) {
            var resolution = component.resolutions[i];
            var width = resolution.trx1 - resolution.trx0;
            var height = resolution.try1 - resolution.try0;
            var coefficients = new Float32Array(width * height);
            for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
              var mu, epsilon;
              if (!scalarExpounded) {
                mu = spqcds[0].mu;
                epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
              } else {
                mu = spqcds[b].mu;
                epsilon = spqcds[b].epsilon;
                b++;
              }
              var subband = resolution.subbands[j];
              var gainLog2 = SubbandsGainLog2[subband.type];
              var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
              var mb = guardBits + epsilon - 1;
              copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
            }
            subbandCoefficients.push({
              width,
              height,
              items: coefficients
            });
          }
          var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
          return {
            left: component.tcx0,
            top: component.tcy0,
            width: result.width,
            height: result.height,
            items: result.items
          };
        }
        function transformComponents(context) {
          var siz = context.SIZ;
          var components = context.components;
          var componentsCount = siz.Csiz;
          var resultImages = [];
          for (var i = 0, ii = context.tiles.length; i < ii; i++) {
            var tile = context.tiles[i];
            var transformedTiles = [];
            var c;
            for (c = 0; c < componentsCount; c++) {
              transformedTiles[c] = transformTile(context, tile, c);
            }
            var tile0 = transformedTiles[0];
            var out = new Uint8Array(tile0.items.length * componentsCount);
            var result = {
              left: tile0.left,
              top: tile0.top,
              width: tile0.width,
              height: tile0.height,
              items: out
            };
            var shift, offset, max, min, maxK;
            var pos = 0, j, jj, y0, y1, y2, r, g, b, k, val;
            if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
              var fourComponents = componentsCount === 4;
              var y0items = transformedTiles[0].items;
              var y1items = transformedTiles[1].items;
              var y2items = transformedTiles[2].items;
              var y3items = fourComponents ? transformedTiles[3].items : null;
              shift = components[0].precision - 8;
              offset = (128 << shift) + 0.5;
              max = 255 * (1 << shift);
              maxK = max * 0.5;
              min = -maxK;
              var component0 = tile.components[0];
              var alpha01 = componentsCount - 3;
              jj = y0items.length;
              if (!component0.codingStyleParameters.reversibleTransformation) {
                for (j = 0; j < jj; j++, pos += alpha01) {
                  y0 = y0items[j] + offset;
                  y1 = y1items[j];
                  y2 = y2items[j];
                  r = y0 + 1.402 * y2;
                  g = y0 - 0.34413 * y1 - 0.71414 * y2;
                  b = y0 + 1.772 * y1;
                  out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
                  out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
                  out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
                }
              } else {
                for (j = 0; j < jj; j++, pos += alpha01) {
                  y0 = y0items[j] + offset;
                  y1 = y1items[j];
                  y2 = y2items[j];
                  g = y0 - (y2 + y1 >> 2);
                  r = g + y2;
                  b = g + y1;
                  out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
                  out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
                  out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
                }
              }
              if (fourComponents) {
                for (j = 0, pos = 3; j < jj; j++, pos += 4) {
                  k = y3items[j];
                  out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
                }
              }
            } else {
              for (c = 0; c < componentsCount; c++) {
                var items = transformedTiles[c].items;
                shift = components[c].precision - 8;
                offset = (128 << shift) + 0.5;
                max = 127.5 * (1 << shift);
                min = -max;
                for (pos = c, j = 0, jj = items.length; j < jj; j++) {
                  val = items[j];
                  out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
                  pos += componentsCount;
                }
              }
            }
            resultImages.push(result);
          }
          return resultImages;
        }
        function initializeTile(context, tileIndex) {
          var siz = context.SIZ;
          var componentsCount = siz.Csiz;
          var tile = context.tiles[tileIndex];
          for (var c = 0; c < componentsCount; c++) {
            var component = tile.components[c];
            var qcdOrQcc = context.currentTile.QCC[c] !== void 0 ? context.currentTile.QCC[c] : context.currentTile.QCD;
            component.quantizationParameters = qcdOrQcc;
            var codOrCoc = context.currentTile.COC[c] !== void 0 ? context.currentTile.COC[c] : context.currentTile.COD;
            component.codingStyleParameters = codOrCoc;
          }
          tile.codingStyleDefaultParameters = context.currentTile.COD;
        }
        var TagTree = function TagTreeClosure() {
          function TagTree2(width, height) {
            var levelsLength = log2(Math.max(width, height)) + 1;
            this.levels = [];
            for (var i = 0; i < levelsLength; i++) {
              var level = {
                width,
                height,
                items: []
              };
              this.levels.push(level);
              width = Math.ceil(width / 2);
              height = Math.ceil(height / 2);
            }
          }
          TagTree2.prototype = {
            reset: function TagTree_reset(i, j) {
              var currentLevel = 0, value = 0, level;
              while (currentLevel < this.levels.length) {
                level = this.levels[currentLevel];
                var index = i + j * level.width;
                if (level.items[index] !== void 0) {
                  value = level.items[index];
                  break;
                }
                level.index = index;
                i >>= 1;
                j >>= 1;
                currentLevel++;
              }
              currentLevel--;
              level = this.levels[currentLevel];
              level.items[level.index] = value;
              this.currentLevel = currentLevel;
              delete this.value;
            },
            incrementValue: function TagTree_incrementValue() {
              var level = this.levels[this.currentLevel];
              level.items[level.index]++;
            },
            nextLevel: function TagTree_nextLevel() {
              var currentLevel = this.currentLevel;
              var level = this.levels[currentLevel];
              var value = level.items[level.index];
              currentLevel--;
              if (currentLevel < 0) {
                this.value = value;
                return false;
              }
              this.currentLevel = currentLevel;
              level = this.levels[currentLevel];
              level.items[level.index] = value;
              return true;
            }
          };
          return TagTree2;
        }();
        var InclusionTree = function InclusionTreeClosure() {
          function InclusionTree2(width, height, defaultValue) {
            var levelsLength = log2(Math.max(width, height)) + 1;
            this.levels = [];
            for (var i = 0; i < levelsLength; i++) {
              var items = new Uint8Array(width * height);
              for (var j = 0, jj = items.length; j < jj; j++) {
                items[j] = defaultValue;
              }
              var level = {
                width,
                height,
                items
              };
              this.levels.push(level);
              width = Math.ceil(width / 2);
              height = Math.ceil(height / 2);
            }
          }
          InclusionTree2.prototype = {
            reset: function InclusionTree_reset(i, j, stopValue) {
              var currentLevel = 0;
              while (currentLevel < this.levels.length) {
                var level = this.levels[currentLevel];
                var index = i + j * level.width;
                level.index = index;
                var value = level.items[index];
                if (value === 255) {
                  break;
                }
                if (value > stopValue) {
                  this.currentLevel = currentLevel;
                  this.propagateValues();
                  return false;
                }
                i >>= 1;
                j >>= 1;
                currentLevel++;
              }
              this.currentLevel = currentLevel - 1;
              return true;
            },
            incrementValue: function InclusionTree_incrementValue(stopValue) {
              var level = this.levels[this.currentLevel];
              level.items[level.index] = stopValue + 1;
              this.propagateValues();
            },
            propagateValues: function InclusionTree_propagateValues() {
              var levelIndex = this.currentLevel;
              var level = this.levels[levelIndex];
              var currentValue = level.items[level.index];
              while (--levelIndex >= 0) {
                level = this.levels[levelIndex];
                level.items[level.index] = currentValue;
              }
            },
            nextLevel: function InclusionTree_nextLevel() {
              var currentLevel = this.currentLevel;
              var level = this.levels[currentLevel];
              var value = level.items[level.index];
              level.items[level.index] = 255;
              currentLevel--;
              if (currentLevel < 0) {
                return false;
              }
              this.currentLevel = currentLevel;
              level = this.levels[currentLevel];
              level.items[level.index] = value;
              return true;
            }
          };
          return InclusionTree2;
        }();
        var BitModel = function BitModelClosure() {
          var UNIFORM_CONTEXT = 17;
          var RUNLENGTH_CONTEXT = 18;
          var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
          var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
          var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
          function BitModel2(width, height, subband, zeroBitPlanes, mb) {
            this.width = width;
            this.height = height;
            this.contextLabelTable = subband === "HH" ? HHContextLabel : subband === "HL" ? HLContextLabel : LLAndLHContextsLabel;
            var coefficientCount = width * height;
            this.neighborsSignificance = new Uint8Array(coefficientCount);
            this.coefficentsSign = new Uint8Array(coefficientCount);
            this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
            this.processingFlags = new Uint8Array(coefficientCount);
            var bitsDecoded = new Uint8Array(coefficientCount);
            if (zeroBitPlanes !== 0) {
              for (var i = 0; i < coefficientCount; i++) {
                bitsDecoded[i] = zeroBitPlanes;
              }
            }
            this.bitsDecoded = bitsDecoded;
            this.reset();
          }
          BitModel2.prototype = {
            setDecoder: function BitModel_setDecoder(decoder) {
              this.decoder = decoder;
            },
            reset: function BitModel_reset() {
              this.contexts = new Int8Array(19);
              this.contexts[0] = 4 << 1 | 0;
              this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
              this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
            },
            setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
              var neighborsSignificance = this.neighborsSignificance;
              var width = this.width, height = this.height;
              var left = column > 0;
              var right = column + 1 < width;
              var i;
              if (row > 0) {
                i = index - width;
                if (left) {
                  neighborsSignificance[i - 1] += 16;
                }
                if (right) {
                  neighborsSignificance[i + 1] += 16;
                }
                neighborsSignificance[i] += 4;
              }
              if (row + 1 < height) {
                i = index + width;
                if (left) {
                  neighborsSignificance[i - 1] += 16;
                }
                if (right) {
                  neighborsSignificance[i + 1] += 16;
                }
                neighborsSignificance[i] += 4;
              }
              if (left) {
                neighborsSignificance[index - 1] += 1;
              }
              if (right) {
                neighborsSignificance[index + 1] += 1;
              }
              neighborsSignificance[index] |= 128;
            },
            runSignificancePropogationPass: function BitModel_runSignificancePropogationPass() {
              var decoder = this.decoder;
              var width = this.width, height = this.height;
              var coefficentsMagnitude = this.coefficentsMagnitude;
              var coefficentsSign = this.coefficentsSign;
              var neighborsSignificance = this.neighborsSignificance;
              var processingFlags = this.processingFlags;
              var contexts = this.contexts;
              var labels = this.contextLabelTable;
              var bitsDecoded = this.bitsDecoded;
              var processedInverseMask = ~1;
              var processedMask = 1;
              var firstMagnitudeBitMask = 2;
              for (var i0 = 0; i0 < height; i0 += 4) {
                for (var j = 0; j < width; j++) {
                  var index = i0 * width + j;
                  for (var i1 = 0; i1 < 4; i1++, index += width) {
                    var i = i0 + i1;
                    if (i >= height) {
                      break;
                    }
                    processingFlags[index] &= processedInverseMask;
                    if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                      continue;
                    }
                    var contextLabel = labels[neighborsSignificance[index]];
                    var decision = decoder.readBit(contexts, contextLabel);
                    if (decision) {
                      var sign = this.decodeSignBit(i, j, index);
                      coefficentsSign[index] = sign;
                      coefficentsMagnitude[index] = 1;
                      this.setNeighborsSignificance(i, j, index);
                      processingFlags[index] |= firstMagnitudeBitMask;
                    }
                    bitsDecoded[index]++;
                    processingFlags[index] |= processedMask;
                  }
                }
              }
            },
            decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
              var width = this.width, height = this.height;
              var coefficentsMagnitude = this.coefficentsMagnitude;
              var coefficentsSign = this.coefficentsSign;
              var contribution, sign0, sign1, significance1;
              var contextLabel, decoded;
              significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;
              if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
                sign1 = coefficentsSign[index + 1];
                if (significance1) {
                  sign0 = coefficentsSign[index - 1];
                  contribution = 1 - sign1 - sign0;
                } else {
                  contribution = 1 - sign1 - sign1;
                }
              } else if (significance1) {
                sign0 = coefficentsSign[index - 1];
                contribution = 1 - sign0 - sign0;
              } else {
                contribution = 0;
              }
              var horizontalContribution = 3 * contribution;
              significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;
              if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
                sign1 = coefficentsSign[index + width];
                if (significance1) {
                  sign0 = coefficentsSign[index - width];
                  contribution = 1 - sign1 - sign0 + horizontalContribution;
                } else {
                  contribution = 1 - sign1 - sign1 + horizontalContribution;
                }
              } else if (significance1) {
                sign0 = coefficentsSign[index - width];
                contribution = 1 - sign0 - sign0 + horizontalContribution;
              } else {
                contribution = horizontalContribution;
              }
              if (contribution >= 0) {
                contextLabel = 9 + contribution;
                decoded = this.decoder.readBit(this.contexts, contextLabel);
              } else {
                contextLabel = 9 - contribution;
                decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
              }
              return decoded;
            },
            runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
              var decoder = this.decoder;
              var width = this.width, height = this.height;
              var coefficentsMagnitude = this.coefficentsMagnitude;
              var neighborsSignificance = this.neighborsSignificance;
              var contexts = this.contexts;
              var bitsDecoded = this.bitsDecoded;
              var processingFlags = this.processingFlags;
              var processedMask = 1;
              var firstMagnitudeBitMask = 2;
              var length = width * height;
              var width4 = width * 4;
              for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
                indexNext = Math.min(length, index0 + width4);
                for (var j = 0; j < width; j++) {
                  for (var index = index0 + j; index < indexNext; index += width) {
                    if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                      continue;
                    }
                    var contextLabel = 16;
                    if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                      processingFlags[index] ^= firstMagnitudeBitMask;
                      var significance = neighborsSignificance[index] & 127;
                      contextLabel = significance === 0 ? 15 : 14;
                    }
                    var bit = decoder.readBit(contexts, contextLabel);
                    coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
                    bitsDecoded[index]++;
                    processingFlags[index] |= processedMask;
                  }
                }
              }
            },
            runCleanupPass: function BitModel_runCleanupPass() {
              var decoder = this.decoder;
              var width = this.width, height = this.height;
              var neighborsSignificance = this.neighborsSignificance;
              var coefficentsMagnitude = this.coefficentsMagnitude;
              var coefficentsSign = this.coefficentsSign;
              var contexts = this.contexts;
              var labels = this.contextLabelTable;
              var bitsDecoded = this.bitsDecoded;
              var processingFlags = this.processingFlags;
              var processedMask = 1;
              var firstMagnitudeBitMask = 2;
              var oneRowDown = width;
              var twoRowsDown = width * 2;
              var threeRowsDown = width * 3;
              var iNext;
              for (var i0 = 0; i0 < height; i0 = iNext) {
                iNext = Math.min(i0 + 4, height);
                var indexBase = i0 * width;
                var checkAllEmpty = i0 + 3 < height;
                for (var j = 0; j < width; j++) {
                  var index0 = indexBase + j;
                  var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
                  var i1 = 0, index = index0;
                  var i = i0, sign;
                  if (allEmpty) {
                    var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);
                    if (!hasSignificantCoefficent) {
                      bitsDecoded[index0]++;
                      bitsDecoded[index0 + oneRowDown]++;
                      bitsDecoded[index0 + twoRowsDown]++;
                      bitsDecoded[index0 + threeRowsDown]++;
                      continue;
                    }
                    i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
                    if (i1 !== 0) {
                      i = i0 + i1;
                      index += i1 * width;
                    }
                    sign = this.decodeSignBit(i, j, index);
                    coefficentsSign[index] = sign;
                    coefficentsMagnitude[index] = 1;
                    this.setNeighborsSignificance(i, j, index);
                    processingFlags[index] |= firstMagnitudeBitMask;
                    index = index0;
                    for (var i2 = i0; i2 <= i; i2++, index += width) {
                      bitsDecoded[index]++;
                    }
                    i1++;
                  }
                  for (i = i0 + i1; i < iNext; i++, index += width) {
                    if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                      continue;
                    }
                    var contextLabel = labels[neighborsSignificance[index]];
                    var decision = decoder.readBit(contexts, contextLabel);
                    if (decision === 1) {
                      sign = this.decodeSignBit(i, j, index);
                      coefficentsSign[index] = sign;
                      coefficentsMagnitude[index] = 1;
                      this.setNeighborsSignificance(i, j, index);
                      processingFlags[index] |= firstMagnitudeBitMask;
                    }
                    bitsDecoded[index]++;
                  }
                }
              }
            },
            checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
              var decoder = this.decoder;
              var contexts = this.contexts;
              var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
              if (symbol !== 10) {
                throw new Error("JPX Error: Invalid segmentation symbol");
              }
            }
          };
          return BitModel2;
        }();
        var Transform = function TransformClosure() {
          function Transform2() {
          }
          Transform2.prototype.calculate = function transformCalculate(subbands, u0, v0) {
            var ll = subbands[0];
            for (var i = 1, ii = subbands.length; i < ii; i++) {
              ll = this.iterate(ll, subbands[i], u0, v0);
            }
            return ll;
          };
          Transform2.prototype.extend = function extend(buffer, offset, size) {
            var i1 = offset - 1, j1 = offset + 1;
            var i2 = offset + size - 2, j2 = offset + size;
            buffer[i1--] = buffer[j1++];
            buffer[j2++] = buffer[i2--];
            buffer[i1--] = buffer[j1++];
            buffer[j2++] = buffer[i2--];
            buffer[i1--] = buffer[j1++];
            buffer[j2++] = buffer[i2--];
            buffer[i1] = buffer[j1];
            buffer[j2] = buffer[i2];
          };
          Transform2.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
            var llWidth = ll.width, llHeight = ll.height, llItems = ll.items;
            var width = hl_lh_hh.width;
            var height = hl_lh_hh.height;
            var items = hl_lh_hh.items;
            var i, j, k, l, u, v;
            for (k = 0, i = 0; i < llHeight; i++) {
              l = i * 2 * width;
              for (j = 0; j < llWidth; j++, k++, l += 2) {
                items[l] = llItems[k];
              }
            }
            llItems = ll.items = null;
            var bufferPadding = 4;
            var rowBuffer = new Float32Array(width + 2 * bufferPadding);
            if (width === 1) {
              if ((u0 & 1) !== 0) {
                for (v = 0, k = 0; v < height; v++, k += width) {
                  items[k] *= 0.5;
                }
              }
            } else {
              for (v = 0, k = 0; v < height; v++, k += width) {
                rowBuffer.set(items.subarray(k, k + width), bufferPadding);
                this.extend(rowBuffer, bufferPadding, width);
                this.filter(rowBuffer, bufferPadding, width);
                items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
              }
            }
            var numBuffers = 16;
            var colBuffers = [];
            for (i = 0; i < numBuffers; i++) {
              colBuffers.push(new Float32Array(height + 2 * bufferPadding));
            }
            var b, currentBuffer = 0;
            ll = bufferPadding + height;
            if (height === 1) {
              if ((v0 & 1) !== 0) {
                for (u = 0; u < width; u++) {
                  items[u] *= 0.5;
                }
              }
            } else {
              for (u = 0; u < width; u++) {
                if (currentBuffer === 0) {
                  numBuffers = Math.min(width - u, numBuffers);
                  for (k = u, l = bufferPadding; l < ll; k += width, l++) {
                    for (b = 0; b < numBuffers; b++) {
                      colBuffers[b][l] = items[k + b];
                    }
                  }
                  currentBuffer = numBuffers;
                }
                currentBuffer--;
                var buffer = colBuffers[currentBuffer];
                this.extend(buffer, bufferPadding, height);
                this.filter(buffer, bufferPadding, height);
                if (currentBuffer === 0) {
                  k = u - numBuffers + 1;
                  for (l = bufferPadding; l < ll; k += width, l++) {
                    for (b = 0; b < numBuffers; b++) {
                      items[k + b] = colBuffers[b][l];
                    }
                  }
                }
              }
            }
            return {
              width,
              height,
              items
            };
          };
          return Transform2;
        }();
        var IrreversibleTransform = function IrreversibleTransformClosure() {
          function IrreversibleTransform2() {
            Transform.call(this);
          }
          IrreversibleTransform2.prototype = Object.create(Transform.prototype);
          IrreversibleTransform2.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
            var len = length >> 1;
            offset = offset | 0;
            var j, n, current, next;
            var alpha = -1.586134342059924;
            var beta = -0.052980118572961;
            var gamma = 0.882911075530934;
            var delta = 0.443506852043971;
            var K = 1.230174104914001;
            var K_ = 1 / K;
            j = offset - 3;
            for (n = len + 4; n--; j += 2) {
              x[j] *= K_;
            }
            j = offset - 2;
            current = delta * x[j - 1];
            for (n = len + 3; n--; j += 2) {
              next = delta * x[j + 1];
              x[j] = K * x[j] - current - next;
              if (n--) {
                j += 2;
                current = delta * x[j + 1];
                x[j] = K * x[j] - current - next;
              } else {
                break;
              }
            }
            j = offset - 1;
            current = gamma * x[j - 1];
            for (n = len + 2; n--; j += 2) {
              next = gamma * x[j + 1];
              x[j] -= current + next;
              if (n--) {
                j += 2;
                current = gamma * x[j + 1];
                x[j] -= current + next;
              } else {
                break;
              }
            }
            j = offset;
            current = beta * x[j - 1];
            for (n = len + 1; n--; j += 2) {
              next = beta * x[j + 1];
              x[j] -= current + next;
              if (n--) {
                j += 2;
                current = beta * x[j + 1];
                x[j] -= current + next;
              } else {
                break;
              }
            }
            if (len !== 0) {
              j = offset + 1;
              current = alpha * x[j - 1];
              for (n = len; n--; j += 2) {
                next = alpha * x[j + 1];
                x[j] -= current + next;
                if (n--) {
                  j += 2;
                  current = alpha * x[j + 1];
                  x[j] -= current + next;
                } else {
                  break;
                }
              }
            }
          };
          return IrreversibleTransform2;
        }();
        var ReversibleTransform = function ReversibleTransformClosure() {
          function ReversibleTransform2() {
            Transform.call(this);
          }
          ReversibleTransform2.prototype = Object.create(Transform.prototype);
          ReversibleTransform2.prototype.filter = function reversibleTransformFilter(x, offset, length) {
            var len = length >> 1;
            offset = offset | 0;
            var j, n;
            for (j = offset, n = len + 1; n--; j += 2) {
              x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
            }
            for (j = offset + 1, n = len; n--; j += 2) {
              x[j] += x[j - 1] + x[j + 1] >> 1;
            }
          };
          return ReversibleTransform2;
        }();
        return JpxImage2;
      }();
      "use strict";
      var Jbig2Image = function Jbig2ImageClosure() {
        function ContextCache() {
        }
        ContextCache.prototype = {
          getContexts: function(id) {
            if (id in this) {
              return this[id];
            }
            return this[id] = new Int8Array(1 << 16);
          }
        };
        function DecodingContext(data, start, end) {
          this.data = data;
          this.start = start;
          this.end = end;
        }
        DecodingContext.prototype = {
          get decoder() {
            var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
            return shadow(this, "decoder", decoder);
          },
          get contextCache() {
            var cache = new ContextCache();
            return shadow(this, "contextCache", cache);
          }
        };
        function decodeInteger(contextCache, procedure, decoder) {
          var contexts = contextCache.getContexts(procedure);
          var prev = 1;
          function readBits(length) {
            var v = 0;
            for (var i = 0; i < length; i++) {
              var bit = decoder.readBit(contexts, prev);
              prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
              v = v << 1 | bit;
            }
            return v >>> 0;
          }
          var sign = readBits(1);
          var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
          return sign === 0 ? value : value > 0 ? -value : null;
        }
        function decodeIAID(contextCache, decoder, codeLength) {
          var contexts = contextCache.getContexts("IAID");
          var prev = 1;
          for (var i = 0; i < codeLength; i++) {
            var bit = decoder.readBit(contexts, prev);
            prev = prev << 1 | bit;
          }
          if (codeLength < 31) {
            return prev & (1 << codeLength) - 1;
          }
          return prev & 2147483647;
        }
        var SegmentTypes = ["SymbolDictionary", null, null, null, "IntermediateTextRegion", null, "ImmediateTextRegion", "ImmediateLosslessTextRegion", null, null, null, null, null, null, null, null, "patternDictionary", null, null, null, "IntermediateHalftoneRegion", null, "ImmediateHalftoneRegion", "ImmediateLosslessHalftoneRegion", null, null, null, null, null, null, null, null, null, null, null, null, "IntermediateGenericRegion", null, "ImmediateGenericRegion", "ImmediateLosslessGenericRegion", "IntermediateGenericRefinementRegion", null, "ImmediateGenericRefinementRegion", "ImmediateLosslessGenericRefinementRegion", null, null, null, null, "PageInformation", "EndOfPage", "EndOfStripe", "EndOfFile", "Profiles", "Tables", null, null, null, null, null, null, null, null, "Extension"];
        var CodingTemplates = [[{
          x: -1,
          y: -2
        }, {
          x: 0,
          y: -2
        }, {
          x: 1,
          y: -2
        }, {
          x: -2,
          y: -1
        }, {
          x: -1,
          y: -1
        }, {
          x: 0,
          y: -1
        }, {
          x: 1,
          y: -1
        }, {
          x: 2,
          y: -1
        }, {
          x: -4,
          y: 0
        }, {
          x: -3,
          y: 0
        }, {
          x: -2,
          y: 0
        }, {
          x: -1,
          y: 0
        }], [{
          x: -1,
          y: -2
        }, {
          x: 0,
          y: -2
        }, {
          x: 1,
          y: -2
        }, {
          x: 2,
          y: -2
        }, {
          x: -2,
          y: -1
        }, {
          x: -1,
          y: -1
        }, {
          x: 0,
          y: -1
        }, {
          x: 1,
          y: -1
        }, {
          x: 2,
          y: -1
        }, {
          x: -3,
          y: 0
        }, {
          x: -2,
          y: 0
        }, {
          x: -1,
          y: 0
        }], [{
          x: -1,
          y: -2
        }, {
          x: 0,
          y: -2
        }, {
          x: 1,
          y: -2
        }, {
          x: -2,
          y: -1
        }, {
          x: -1,
          y: -1
        }, {
          x: 0,
          y: -1
        }, {
          x: 1,
          y: -1
        }, {
          x: -2,
          y: 0
        }, {
          x: -1,
          y: 0
        }], [{
          x: -3,
          y: -1
        }, {
          x: -2,
          y: -1
        }, {
          x: -1,
          y: -1
        }, {
          x: 0,
          y: -1
        }, {
          x: 1,
          y: -1
        }, {
          x: -4,
          y: 0
        }, {
          x: -3,
          y: 0
        }, {
          x: -2,
          y: 0
        }, {
          x: -1,
          y: 0
        }]];
        var RefinementTemplates = [{
          coding: [{
            x: 0,
            y: -1
          }, {
            x: 1,
            y: -1
          }, {
            x: -1,
            y: 0
          }],
          reference: [{
            x: 0,
            y: -1
          }, {
            x: 1,
            y: -1
          }, {
            x: -1,
            y: 0
          }, {
            x: 0,
            y: 0
          }, {
            x: 1,
            y: 0
          }, {
            x: -1,
            y: 1
          }, {
            x: 0,
            y: 1
          }, {
            x: 1,
            y: 1
          }]
        }, {
          coding: [{
            x: -1,
            y: -1
          }, {
            x: 0,
            y: -1
          }, {
            x: 1,
            y: -1
          }, {
            x: -1,
            y: 0
          }],
          reference: [{
            x: 0,
            y: -1
          }, {
            x: -1,
            y: 0
          }, {
            x: 0,
            y: 0
          }, {
            x: 1,
            y: 0
          }, {
            x: 0,
            y: 1
          }, {
            x: 1,
            y: 1
          }]
        }];
        var ReusedContexts = [39717, 1941, 229, 405];
        var RefinementReusedContexts = [32, 8];
        function decodeBitmapTemplate0(width, height, decodingContext) {
          var decoder = decodingContext.decoder;
          var contexts = decodingContext.contextCache.getContexts("GB");
          var contextLabel, i, j, pixel, row, row1, row2, bitmap = [];
          var OLD_PIXEL_MASK = 31735;
          for (i = 0; i < height; i++) {
            row = bitmap[i] = new Uint8Array(width);
            row1 = i < 1 ? row : bitmap[i - 1];
            row2 = i < 2 ? row : bitmap[i - 2];
            contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
            for (j = 0; j < width; j++) {
              row[j] = pixel = decoder.readBit(contexts, contextLabel);
              contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
            }
          }
          return bitmap;
        }
        function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
          if (mmr) {
            error("JBIG2 error: MMR encoding is not supported");
          }
          if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
            return decodeBitmapTemplate0(width, height, decodingContext);
          }
          var useskip = !!skip;
          var template = CodingTemplates[templateIndex].concat(at);
          template.sort(function(a, b) {
            return a.y - b.y || a.x - b.x;
          });
          var templateLength = template.length;
          var templateX = new Int8Array(templateLength);
          var templateY = new Int8Array(templateLength);
          var changingTemplateEntries = [];
          var reuseMask = 0, minX = 0, maxX = 0, minY = 0;
          var c, k;
          for (k = 0; k < templateLength; k++) {
            templateX[k] = template[k].x;
            templateY[k] = template[k].y;
            minX = Math.min(minX, template[k].x);
            maxX = Math.max(maxX, template[k].x);
            minY = Math.min(minY, template[k].y);
            if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
              reuseMask |= 1 << templateLength - 1 - k;
            } else {
              changingTemplateEntries.push(k);
            }
          }
          var changingEntriesLength = changingTemplateEntries.length;
          var changingTemplateX = new Int8Array(changingEntriesLength);
          var changingTemplateY = new Int8Array(changingEntriesLength);
          var changingTemplateBit = new Uint16Array(changingEntriesLength);
          for (c = 0; c < changingEntriesLength; c++) {
            k = changingTemplateEntries[c];
            changingTemplateX[c] = template[k].x;
            changingTemplateY[c] = template[k].y;
            changingTemplateBit[c] = 1 << templateLength - 1 - k;
          }
          var sbb_left = -minX;
          var sbb_top = -minY;
          var sbb_right = width - maxX;
          var pseudoPixelContext = ReusedContexts[templateIndex];
          var row = new Uint8Array(width);
          var bitmap = [];
          var decoder = decodingContext.decoder;
          var contexts = decodingContext.contextCache.getContexts("GB");
          var ltp = 0, j, i0, j0, contextLabel = 0, bit, shift;
          for (var i = 0; i < height; i++) {
            if (prediction) {
              var sltp = decoder.readBit(contexts, pseudoPixelContext);
              ltp ^= sltp;
              if (ltp) {
                bitmap.push(row);
                continue;
              }
            }
            row = new Uint8Array(row);
            bitmap.push(row);
            for (j = 0; j < width; j++) {
              if (useskip && skip[i][j]) {
                row[j] = 0;
                continue;
              }
              if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
                contextLabel = contextLabel << 1 & reuseMask;
                for (k = 0; k < changingEntriesLength; k++) {
                  i0 = i + changingTemplateY[k];
                  j0 = j + changingTemplateX[k];
                  bit = bitmap[i0][j0];
                  if (bit) {
                    bit = changingTemplateBit[k];
                    contextLabel |= bit;
                  }
                }
              } else {
                contextLabel = 0;
                shift = templateLength - 1;
                for (k = 0; k < templateLength; k++, shift--) {
                  j0 = j + templateX[k];
                  if (j0 >= 0 && j0 < width) {
                    i0 = i + templateY[k];
                    if (i0 >= 0) {
                      bit = bitmap[i0][j0];
                      if (bit) {
                        contextLabel |= bit << shift;
                      }
                    }
                  }
                }
              }
              var pixel = decoder.readBit(contexts, contextLabel);
              row[j] = pixel;
            }
          }
          return bitmap;
        }
        function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
          var codingTemplate = RefinementTemplates[templateIndex].coding;
          if (templateIndex === 0) {
            codingTemplate = codingTemplate.concat([at[0]]);
          }
          var codingTemplateLength = codingTemplate.length;
          var codingTemplateX = new Int32Array(codingTemplateLength);
          var codingTemplateY = new Int32Array(codingTemplateLength);
          var k;
          for (k = 0; k < codingTemplateLength; k++) {
            codingTemplateX[k] = codingTemplate[k].x;
            codingTemplateY[k] = codingTemplate[k].y;
          }
          var referenceTemplate = RefinementTemplates[templateIndex].reference;
          if (templateIndex === 0) {
            referenceTemplate = referenceTemplate.concat([at[1]]);
          }
          var referenceTemplateLength = referenceTemplate.length;
          var referenceTemplateX = new Int32Array(referenceTemplateLength);
          var referenceTemplateY = new Int32Array(referenceTemplateLength);
          for (k = 0; k < referenceTemplateLength; k++) {
            referenceTemplateX[k] = referenceTemplate[k].x;
            referenceTemplateY[k] = referenceTemplate[k].y;
          }
          var referenceWidth = referenceBitmap[0].length;
          var referenceHeight = referenceBitmap.length;
          var pseudoPixelContext = RefinementReusedContexts[templateIndex];
          var bitmap = [];
          var decoder = decodingContext.decoder;
          var contexts = decodingContext.contextCache.getContexts("GR");
          var ltp = 0;
          for (var i = 0; i < height; i++) {
            if (prediction) {
              var sltp = decoder.readBit(contexts, pseudoPixelContext);
              ltp ^= sltp;
              if (ltp) {
                error("JBIG2 error: prediction is not supported");
              }
            }
            var row = new Uint8Array(width);
            bitmap.push(row);
            for (var j = 0; j < width; j++) {
              var i0, j0;
              var contextLabel = 0;
              for (k = 0; k < codingTemplateLength; k++) {
                i0 = i + codingTemplateY[k];
                j0 = j + codingTemplateX[k];
                if (i0 < 0 || j0 < 0 || j0 >= width) {
                  contextLabel <<= 1;
                } else {
                  contextLabel = contextLabel << 1 | bitmap[i0][j0];
                }
              }
              for (k = 0; k < referenceTemplateLength; k++) {
                i0 = i + referenceTemplateY[k] + offsetY;
                j0 = j + referenceTemplateX[k] + offsetX;
                if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
                  contextLabel <<= 1;
                } else {
                  contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
                }
              }
              var pixel = decoder.readBit(contexts, contextLabel);
              row[j] = pixel;
            }
          }
          return bitmap;
        }
        function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext) {
          if (huffman) {
            error("JBIG2 error: huffman is not supported");
          }
          var newSymbols = [];
          var currentHeight = 0;
          var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
          var decoder = decodingContext.decoder;
          var contextCache = decodingContext.contextCache;
          while (newSymbols.length < numberOfNewSymbols) {
            var deltaHeight = decodeInteger(contextCache, "IADH", decoder);
            currentHeight += deltaHeight;
            var currentWidth = 0;
            var totalWidth = 0;
            while (true) {
              var deltaWidth = decodeInteger(contextCache, "IADW", decoder);
              if (deltaWidth === null) {
                break;
              }
              currentWidth += deltaWidth;
              totalWidth += currentWidth;
              var bitmap;
              if (refinement) {
                var numberOfInstances = decodeInteger(contextCache, "IAAI", decoder);
                if (numberOfInstances > 1) {
                  bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext);
                } else {
                  var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
                  var rdx = decodeInteger(contextCache, "IARDX", decoder);
                  var rdy = decodeInteger(contextCache, "IARDY", decoder);
                  var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
                  bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
                }
              } else {
                bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
              }
              newSymbols.push(bitmap);
            }
          }
          var exportedSymbols = [];
          var flags = [], currentFlag = false;
          var totalSymbolsLength = symbols.length + numberOfNewSymbols;
          while (flags.length < totalSymbolsLength) {
            var runLength = decodeInteger(contextCache, "IAEX", decoder);
            while (runLength--) {
              flags.push(currentFlag);
            }
            currentFlag = !currentFlag;
          }
          for (var i = 0, ii = symbols.length; i < ii; i++) {
            if (flags[i]) {
              exportedSymbols.push(symbols[i]);
            }
          }
          for (var j = 0; j < numberOfNewSymbols; i++, j++) {
            if (flags[i]) {
              exportedSymbols.push(newSymbols[j]);
            }
          }
          return exportedSymbols;
        }
        function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext) {
          if (huffman) {
            error("JBIG2 error: huffman is not supported");
          }
          var bitmap = [];
          var i, row;
          for (i = 0; i < height; i++) {
            row = new Uint8Array(width);
            if (defaultPixelValue) {
              for (var j = 0; j < width; j++) {
                row[j] = defaultPixelValue;
              }
            }
            bitmap.push(row);
          }
          var decoder = decodingContext.decoder;
          var contextCache = decodingContext.contextCache;
          var stripT = -decodeInteger(contextCache, "IADT", decoder);
          var firstS = 0;
          i = 0;
          while (i < numberOfSymbolInstances) {
            var deltaT = decodeInteger(contextCache, "IADT", decoder);
            stripT += deltaT;
            var deltaFirstS = decodeInteger(contextCache, "IAFS", decoder);
            firstS += deltaFirstS;
            var currentS = firstS;
            do {
              var currentT = stripSize === 1 ? 0 : decodeInteger(contextCache, "IAIT", decoder);
              var t = stripSize * stripT + currentT;
              var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
              var applyRefinement = refinement && decodeInteger(contextCache, "IARI", decoder);
              var symbolBitmap = inputSymbols[symbolId];
              var symbolWidth = symbolBitmap[0].length;
              var symbolHeight = symbolBitmap.length;
              if (applyRefinement) {
                var rdw = decodeInteger(contextCache, "IARDW", decoder);
                var rdh = decodeInteger(contextCache, "IARDH", decoder);
                var rdx = decodeInteger(contextCache, "IARDX", decoder);
                var rdy = decodeInteger(contextCache, "IARDY", decoder);
                symbolWidth += rdw;
                symbolHeight += rdh;
                symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
              }
              var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight);
              var offsetS = currentS - (referenceCorner & 2 ? symbolWidth : 0);
              var s2, t2, symbolRow;
              if (transposed) {
                for (s2 = 0; s2 < symbolHeight; s2++) {
                  row = bitmap[offsetS + s2];
                  if (!row) {
                    continue;
                  }
                  symbolRow = symbolBitmap[s2];
                  var maxWidth = Math.min(width - offsetT, symbolWidth);
                  switch (combinationOperator) {
                    case 0:
                      for (t2 = 0; t2 < maxWidth; t2++) {
                        row[offsetT + t2] |= symbolRow[t2];
                      }
                      break;
                    case 2:
                      for (t2 = 0; t2 < maxWidth; t2++) {
                        row[offsetT + t2] ^= symbolRow[t2];
                      }
                      break;
                    default:
                      error("JBIG2 error: operator " + combinationOperator + " is not supported");
                  }
                }
                currentS += symbolHeight - 1;
              } else {
                for (t2 = 0; t2 < symbolHeight; t2++) {
                  row = bitmap[offsetT + t2];
                  if (!row) {
                    continue;
                  }
                  symbolRow = symbolBitmap[t2];
                  switch (combinationOperator) {
                    case 0:
                      for (s2 = 0; s2 < symbolWidth; s2++) {
                        row[offsetS + s2] |= symbolRow[s2];
                      }
                      break;
                    case 2:
                      for (s2 = 0; s2 < symbolWidth; s2++) {
                        row[offsetS + s2] ^= symbolRow[s2];
                      }
                      break;
                    default:
                      error("JBIG2 error: operator " + combinationOperator + " is not supported");
                  }
                }
                currentS += symbolWidth - 1;
              }
              i++;
              var deltaS = decodeInteger(contextCache, "IADS", decoder);
              if (deltaS === null) {
                break;
              }
              currentS += deltaS + dsOffset;
            } while (true);
          }
          return bitmap;
        }
        function readSegmentHeader(data, start) {
          var segmentHeader = {};
          segmentHeader.number = readUint32(data, start);
          var flags = data[start + 4];
          var segmentType = flags & 63;
          if (!SegmentTypes[segmentType]) {
            error("JBIG2 error: invalid segment type: " + segmentType);
          }
          segmentHeader.type = segmentType;
          segmentHeader.typeName = SegmentTypes[segmentType];
          segmentHeader.deferredNonRetain = !!(flags & 128);
          var pageAssociationFieldSize = !!(flags & 64);
          var referredFlags = data[start + 5];
          var referredToCount = referredFlags >> 5 & 7;
          var retainBits = [referredFlags & 31];
          var position = start + 6;
          if (referredFlags === 7) {
            referredToCount = readUint32(data, position - 1) & 536870911;
            position += 3;
            var bytes = referredToCount + 7 >> 3;
            retainBits[0] = data[position++];
            while (--bytes > 0) {
              retainBits.push(data[position++]);
            }
          } else if (referredFlags === 5 || referredFlags === 6) {
            error("JBIG2 error: invalid referred-to flags");
          }
          segmentHeader.retainBits = retainBits;
          var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
          var referredTo = [];
          var i, ii;
          for (i = 0; i < referredToCount; i++) {
            var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? readUint16(data, position) : readUint32(data, position);
            referredTo.push(number);
            position += referredToSegmentNumberSize;
          }
          segmentHeader.referredTo = referredTo;
          if (!pageAssociationFieldSize) {
            segmentHeader.pageAssociation = data[position++];
          } else {
            segmentHeader.pageAssociation = readUint32(data, position);
            position += 4;
          }
          segmentHeader.length = readUint32(data, position);
          position += 4;
          if (segmentHeader.length === 4294967295) {
            if (segmentType === 38) {
              var genericRegionInfo = readRegionSegmentInformation(data, position);
              var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
              var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
              var searchPatternLength = 6;
              var searchPattern = new Uint8Array(searchPatternLength);
              if (!genericRegionMmr) {
                searchPattern[0] = 255;
                searchPattern[1] = 172;
              }
              searchPattern[2] = genericRegionInfo.height >>> 24 & 255;
              searchPattern[3] = genericRegionInfo.height >> 16 & 255;
              searchPattern[4] = genericRegionInfo.height >> 8 & 255;
              searchPattern[5] = genericRegionInfo.height & 255;
              for (i = position, ii = data.length; i < ii; i++) {
                var j = 0;
                while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
                  j++;
                }
                if (j === searchPatternLength) {
                  segmentHeader.length = i + searchPatternLength;
                  break;
                }
              }
              if (segmentHeader.length === 4294967295) {
                error("JBIG2 error: segment end was not found");
              }
            } else {
              error("JBIG2 error: invalid unknown segment length");
            }
          }
          segmentHeader.headerEnd = position;
          return segmentHeader;
        }
        function readSegments(header, data, start, end) {
          var segments = [];
          var position = start;
          while (position < end) {
            var segmentHeader = readSegmentHeader(data, position);
            position = segmentHeader.headerEnd;
            var segment = {
              header: segmentHeader,
              data
            };
            if (!header.randomAccess) {
              segment.start = position;
              position += segmentHeader.length;
              segment.end = position;
            }
            segments.push(segment);
            if (segmentHeader.type === 51) {
              break;
            }
          }
          if (header.randomAccess) {
            for (var i = 0, ii = segments.length; i < ii; i++) {
              segments[i].start = position;
              position += segments[i].header.length;
              segments[i].end = position;
            }
          }
          return segments;
        }
        function readRegionSegmentInformation(data, start) {
          return {
            width: readUint32(data, start),
            height: readUint32(data, start + 4),
            x: readUint32(data, start + 8),
            y: readUint32(data, start + 12),
            combinationOperator: data[start + 16] & 7
          };
        }
        var RegionSegmentInformationFieldLength = 17;
        function processSegment(segment, visitor) {
          var header = segment.header;
          var data = segment.data, position = segment.start, end = segment.end;
          var args, at, i, atLength;
          switch (header.type) {
            case 0:
              var dictionary = {};
              var dictionaryFlags = readUint16(data, position);
              dictionary.huffman = !!(dictionaryFlags & 1);
              dictionary.refinement = !!(dictionaryFlags & 2);
              dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
              dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
              dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
              dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
              dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
              dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
              dictionary.template = dictionaryFlags >> 10 & 3;
              dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
              position += 2;
              if (!dictionary.huffman) {
                atLength = dictionary.template === 0 ? 4 : 1;
                at = [];
                for (i = 0; i < atLength; i++) {
                  at.push({
                    x: readInt8(data, position),
                    y: readInt8(data, position + 1)
                  });
                  position += 2;
                }
                dictionary.at = at;
              }
              if (dictionary.refinement && !dictionary.refinementTemplate) {
                at = [];
                for (i = 0; i < 2; i++) {
                  at.push({
                    x: readInt8(data, position),
                    y: readInt8(data, position + 1)
                  });
                  position += 2;
                }
                dictionary.refinementAt = at;
              }
              dictionary.numberOfExportedSymbols = readUint32(data, position);
              position += 4;
              dictionary.numberOfNewSymbols = readUint32(data, position);
              position += 4;
              args = [dictionary, header.number, header.referredTo, data, position, end];
              break;
            case 6:
            case 7:
              var textRegion = {};
              textRegion.info = readRegionSegmentInformation(data, position);
              position += RegionSegmentInformationFieldLength;
              var textRegionSegmentFlags = readUint16(data, position);
              position += 2;
              textRegion.huffman = !!(textRegionSegmentFlags & 1);
              textRegion.refinement = !!(textRegionSegmentFlags & 2);
              textRegion.stripSize = 1 << (textRegionSegmentFlags >> 2 & 3);
              textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
              textRegion.transposed = !!(textRegionSegmentFlags & 64);
              textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
              textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
              textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
              textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
              if (textRegion.huffman) {
                var textRegionHuffmanFlags = readUint16(data, position);
                position += 2;
                textRegion.huffmanFS = textRegionHuffmanFlags & 3;
                textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
                textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
                textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
                textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
                textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
                textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
                textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 14);
              }
              if (textRegion.refinement && !textRegion.refinementTemplate) {
                at = [];
                for (i = 0; i < 2; i++) {
                  at.push({
                    x: readInt8(data, position),
                    y: readInt8(data, position + 1)
                  });
                  position += 2;
                }
                textRegion.refinementAt = at;
              }
              textRegion.numberOfSymbolInstances = readUint32(data, position);
              position += 4;
              if (textRegion.huffman) {
                error("JBIG2 error: huffman is not supported");
              }
              args = [textRegion, header.referredTo, data, position, end];
              break;
            case 38:
            case 39:
              var genericRegion = {};
              genericRegion.info = readRegionSegmentInformation(data, position);
              position += RegionSegmentInformationFieldLength;
              var genericRegionSegmentFlags = data[position++];
              genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
              genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
              genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
              if (!genericRegion.mmr) {
                atLength = genericRegion.template === 0 ? 4 : 1;
                at = [];
                for (i = 0; i < atLength; i++) {
                  at.push({
                    x: readInt8(data, position),
                    y: readInt8(data, position + 1)
                  });
                  position += 2;
                }
                genericRegion.at = at;
              }
              args = [genericRegion, data, position, end];
              break;
            case 48:
              var pageInfo = {
                width: readUint32(data, position),
                height: readUint32(data, position + 4),
                resolutionX: readUint32(data, position + 8),
                resolutionY: readUint32(data, position + 12)
              };
              if (pageInfo.height === 4294967295) {
                delete pageInfo.height;
              }
              var pageSegmentFlags = data[position + 16];
              var pageStripingInformatiom = readUint16(data, position + 17);
              pageInfo.lossless = !!(pageSegmentFlags & 1);
              pageInfo.refinement = !!(pageSegmentFlags & 2);
              pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
              pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
              pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
              pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
              args = [pageInfo];
              break;
            case 49:
              break;
            case 50:
              break;
            case 51:
              break;
            case 62:
              break;
            default:
              error("JBIG2 error: segment type " + header.typeName + "(" + header.type + ") is not implemented");
          }
          var callbackName = "on" + header.typeName;
          if (callbackName in visitor) {
            visitor[callbackName].apply(visitor, args);
          }
        }
        function processSegments(segments, visitor) {
          for (var i = 0, ii = segments.length; i < ii; i++) {
            processSegment(segments[i], visitor);
          }
        }
        function parseJbig2(data, start, end) {
          var position = start;
          if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
            error("JBIG2 error: invalid header");
          }
          var header = {};
          position += 8;
          var flags = data[position++];
          header.randomAccess = !(flags & 1);
          if (!(flags & 2)) {
            header.numberOfPages = readUint32(data, position);
            position += 4;
          }
          var segments = readSegments(header, data, position, end);
          error("Not implemented");
        }
        function parseJbig2Chunks(chunks) {
          var visitor = new SimpleSegmentVisitor();
          for (var i = 0, ii = chunks.length; i < ii; i++) {
            var chunk = chunks[i];
            var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
            processSegments(segments, visitor);
          }
          return visitor;
        }
        function SimpleSegmentVisitor() {
        }
        SimpleSegmentVisitor.prototype = {
          onPageInformation: function SimpleSegmentVisitor_onPageInformation(info2) {
            this.currentPageInfo = info2;
            var rowSize = info2.width + 7 >> 3;
            var buffer = new Uint8Array(rowSize * info2.height);
            if (info2.defaultPixelValue) {
              for (var i = 0, ii = buffer.length; i < ii; i++) {
                buffer[i] = 255;
              }
            }
            this.buffer = buffer;
          },
          drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
            var pageInfo = this.currentPageInfo;
            var width = regionInfo.width, height = regionInfo.height;
            var rowSize = pageInfo.width + 7 >> 3;
            var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
            var buffer = this.buffer;
            var mask0 = 128 >> (regionInfo.x & 7);
            var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
            var i, j, mask, offset;
            switch (combinationOperator) {
              case 0:
                for (i = 0; i < height; i++) {
                  mask = mask0;
                  offset = offset0;
                  for (j = 0; j < width; j++) {
                    if (bitmap[i][j]) {
                      buffer[offset] |= mask;
                    }
                    mask >>= 1;
                    if (!mask) {
                      mask = 128;
                      offset++;
                    }
                  }
                  offset0 += rowSize;
                }
                break;
              case 2:
                for (i = 0; i < height; i++) {
                  mask = mask0;
                  offset = offset0;
                  for (j = 0; j < width; j++) {
                    if (bitmap[i][j]) {
                      buffer[offset] ^= mask;
                    }
                    mask >>= 1;
                    if (!mask) {
                      mask = 128;
                      offset++;
                    }
                  }
                  offset0 += rowSize;
                }
                break;
              default:
                error("JBIG2 error: operator " + combinationOperator + " is not supported");
            }
          },
          onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
            var regionInfo = region.info;
            var decodingContext = new DecodingContext(data, start, end);
            var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
            this.drawBitmap(regionInfo, bitmap);
          },
          onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
            this.onImmediateGenericRegion.apply(this, arguments);
          },
          onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
            var huffmanTables;
            if (dictionary.huffman) {
              error("JBIG2 error: huffman is not supported");
            }
            var symbols = this.symbols;
            if (!symbols) {
              this.symbols = symbols = {};
            }
            var inputSymbols = [];
            for (var i = 0, ii = referredSegments.length; i < ii; i++) {
              inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
            }
            var decodingContext = new DecodingContext(data, start, end);
            symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext);
          },
          onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
            var regionInfo = region.info;
            var huffmanTables;
            var symbols = this.symbols;
            var inputSymbols = [];
            for (var i = 0, ii = referredSegments.length; i < ii; i++) {
              inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
            }
            var symbolCodeLength = log2(inputSymbols.length);
            var decodingContext = new DecodingContext(data, start, end);
            var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext);
            this.drawBitmap(regionInfo, bitmap);
          },
          onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
            this.onImmediateTextRegion.apply(this, arguments);
          }
        };
        function Jbig2Image2() {
        }
        Jbig2Image2.prototype = {
          parseChunks: function Jbig2Image_parseChunks(chunks) {
            return parseJbig2Chunks(chunks);
          }
        };
        return Jbig2Image2;
      }();
      function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
          n <<= 1;
          i++;
        }
        return i;
      }
      function readInt8(data, start) {
        return data[start] << 24 >> 24;
      }
      function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
      }
      function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
      }
      function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
          value,
          enumerable: true,
          configurable: true,
          writable: false
        });
        return value;
      }
      var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
      };
      var warn = function() {
        console.warn.apply(console, arguments);
      };
      var info = function() {
        console.info.apply(console, arguments);
      };
      Jbig2Image.prototype.parse = function parseJbig2(data) {
        var position = 0, end = data.length;
        if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
          error("JBIG2 error: invalid header");
        }
        var header = {};
        position += 8;
        var flags = data[position++];
        header.randomAccess = !(flags & 1);
        if (!(flags & 2)) {
          header.numberOfPages = readUint32(data, position);
          position += 4;
        }
        var visitor = this.parseChunks([{
          data,
          start: position,
          end
        }]);
        var width = visitor.currentPageInfo.width;
        var height = visitor.currentPageInfo.height;
        var bitPacked = visitor.buffer;
        var data = new Uint8Array(width * height);
        var q = 0, k = 0;
        for (var i = 0; i < height; i++) {
          var mask = 0, buffer;
          for (var j = 0; j < width; j++) {
            if (!mask) {
              mask = 128;
              buffer = bitPacked[k++];
            }
            data[q++] = buffer & mask ? 0 : 255;
            mask >>= 1;
          }
        }
        this.width = width;
        this.height = height;
        this.data = data;
      };
      PDFJS2.JpegImage = JpegImage2;
      PDFJS2.JpxImage = JpxImage;
      PDFJS2.Jbig2Image = Jbig2Image;
    })(PDFJS || (PDFJS = {}));
    var JpegDecoder2 = PDFJS.JpegImage;
    var JpxDecoder = PDFJS.JpxImage;
    var Jbig2Decoder = PDFJS.Jbig2Image;
    if (typeof exports !== "undefined") {
      module.exports = {
        JpegImage,
        JpegDecoder: JpegDecoder2,
        JpxDecoder,
        Jbig2Decoder
      };
    }
  });

  // src/neuroglancer/util/blosc.ts
  var require_blosc = __commonJS((exports) => {
    __export(exports, {
      Blosc: () => blosc_default
    });
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
  });

  // src/neuroglancer/async_computation/handler.ts
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
  const handlers = new Map();
  self.onmessage = (msg) => {
    const {t, id, args} = msg.data;
    const handler8 = handlers.get(t);
    handler8(...args).then(({value, transfer}) => self.postMessage({id, value}, transfer), (error) => self.postMessage({
      id,
      error: error instanceof Error ? error.message : error.toString()
    }));
  };
  function registerAsyncComputation(request, handler8) {
    handlers.set(request.id, handler8);
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

  // src/neuroglancer/sliceview/compressed_segmentation/encode_common.ts
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
  const BLOCK_HEADER_SIZE = 2;
  function newCache() {
    return new Map();
  }
  function writeEncodedRepresentation(outputData, outputOffset, encodingBuffer, indexBuffer, encodedBits, encodedSize32Bits) {
    if (encodedBits > 0) {
      switch (encodedBits) {
        case 1:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 1;
              word |= indexBuffer[encodingBuffer[elementIndex + 2]] << 2;
              word |= indexBuffer[encodingBuffer[elementIndex + 3]] << 3;
              word |= indexBuffer[encodingBuffer[elementIndex + 4]] << 4;
              word |= indexBuffer[encodingBuffer[elementIndex + 5]] << 5;
              word |= indexBuffer[encodingBuffer[elementIndex + 6]] << 6;
              word |= indexBuffer[encodingBuffer[elementIndex + 7]] << 7;
              word |= indexBuffer[encodingBuffer[elementIndex + 8]] << 8;
              word |= indexBuffer[encodingBuffer[elementIndex + 9]] << 9;
              word |= indexBuffer[encodingBuffer[elementIndex + 10]] << 10;
              word |= indexBuffer[encodingBuffer[elementIndex + 11]] << 11;
              word |= indexBuffer[encodingBuffer[elementIndex + 12]] << 12;
              word |= indexBuffer[encodingBuffer[elementIndex + 13]] << 13;
              word |= indexBuffer[encodingBuffer[elementIndex + 14]] << 14;
              word |= indexBuffer[encodingBuffer[elementIndex + 15]] << 15;
              word |= indexBuffer[encodingBuffer[elementIndex + 16]] << 16;
              word |= indexBuffer[encodingBuffer[elementIndex + 17]] << 17;
              word |= indexBuffer[encodingBuffer[elementIndex + 18]] << 18;
              word |= indexBuffer[encodingBuffer[elementIndex + 19]] << 19;
              word |= indexBuffer[encodingBuffer[elementIndex + 20]] << 20;
              word |= indexBuffer[encodingBuffer[elementIndex + 21]] << 21;
              word |= indexBuffer[encodingBuffer[elementIndex + 22]] << 22;
              word |= indexBuffer[encodingBuffer[elementIndex + 23]] << 23;
              word |= indexBuffer[encodingBuffer[elementIndex + 24]] << 24;
              word |= indexBuffer[encodingBuffer[elementIndex + 25]] << 25;
              word |= indexBuffer[encodingBuffer[elementIndex + 26]] << 26;
              word |= indexBuffer[encodingBuffer[elementIndex + 27]] << 27;
              word |= indexBuffer[encodingBuffer[elementIndex + 28]] << 28;
              word |= indexBuffer[encodingBuffer[elementIndex + 29]] << 29;
              word |= indexBuffer[encodingBuffer[elementIndex + 30]] << 30;
              word |= indexBuffer[encodingBuffer[elementIndex + 31]] << 31;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 32;
            }
          }
          break;
        case 2:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 2;
              word |= indexBuffer[encodingBuffer[elementIndex + 2]] << 4;
              word |= indexBuffer[encodingBuffer[elementIndex + 3]] << 6;
              word |= indexBuffer[encodingBuffer[elementIndex + 4]] << 8;
              word |= indexBuffer[encodingBuffer[elementIndex + 5]] << 10;
              word |= indexBuffer[encodingBuffer[elementIndex + 6]] << 12;
              word |= indexBuffer[encodingBuffer[elementIndex + 7]] << 14;
              word |= indexBuffer[encodingBuffer[elementIndex + 8]] << 16;
              word |= indexBuffer[encodingBuffer[elementIndex + 9]] << 18;
              word |= indexBuffer[encodingBuffer[elementIndex + 10]] << 20;
              word |= indexBuffer[encodingBuffer[elementIndex + 11]] << 22;
              word |= indexBuffer[encodingBuffer[elementIndex + 12]] << 24;
              word |= indexBuffer[encodingBuffer[elementIndex + 13]] << 26;
              word |= indexBuffer[encodingBuffer[elementIndex + 14]] << 28;
              word |= indexBuffer[encodingBuffer[elementIndex + 15]] << 30;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 16;
            }
          }
          break;
        case 4:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 4;
              word |= indexBuffer[encodingBuffer[elementIndex + 2]] << 8;
              word |= indexBuffer[encodingBuffer[elementIndex + 3]] << 12;
              word |= indexBuffer[encodingBuffer[elementIndex + 4]] << 16;
              word |= indexBuffer[encodingBuffer[elementIndex + 5]] << 20;
              word |= indexBuffer[encodingBuffer[elementIndex + 6]] << 24;
              word |= indexBuffer[encodingBuffer[elementIndex + 7]] << 28;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 8;
            }
          }
          break;
        case 8:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 8;
              word |= indexBuffer[encodingBuffer[elementIndex + 2]] << 16;
              word |= indexBuffer[encodingBuffer[elementIndex + 3]] << 24;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 4;
            }
          }
          break;
        case 16:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 16;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 2;
            }
          }
          break;
        case 32:
          {
            for (let wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
              let word = 0;
              word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
              outputData[outputOffset + wordIndex] = word;
              elementIndex += 1;
            }
          }
          break;
      }
    }
  }
  function writeBlock(output, baseOffset, cache, numBlockElements, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement3) {
    let encodedBits;
    if (numUniqueValues === 1) {
      encodedBits = 0;
    } else {
      encodedBits = 1;
      while (1 << encodedBits < numUniqueValues) {
        encodedBits *= 2;
      }
    }
    let encodedSize32bits = Math.ceil(encodedBits * numBlockElements / 32);
    let encodedValueBaseOffset = output.length;
    let elementsToWrite = encodedSize32bits;
    let writeTable = false;
    let key = Array.prototype.join.call(valuesBuffer2.subarray(0, numUniqueValues * uint32sPerElement3), ",");
    let tableOffset = cache.get(key);
    if (tableOffset === void 0) {
      writeTable = true;
      elementsToWrite += numUniqueValues * uint32sPerElement3;
      tableOffset = encodedValueBaseOffset + encodedSize32bits - baseOffset;
      cache.set(key, tableOffset);
    }
    output.resize(encodedValueBaseOffset + elementsToWrite);
    let outputData = output.data;
    writeEncodedRepresentation(outputData, encodedValueBaseOffset, encodingBuffer, indexBuffer2, encodedBits, encodedSize32bits);
    if (writeTable) {
      let curOutputOff = encodedValueBaseOffset + encodedSize32bits;
      for (let i = 0, length = numUniqueValues * uint32sPerElement3; i < length; ++i) {
        outputData[curOutputOff++] = valuesBuffer2[i];
      }
    }
    return [encodedBits, tableOffset];
  }
  function encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock3) {
    let cache = newCache();
    let gridSize = new Array(3);
    let blockIndexSize = BLOCK_HEADER_SIZE;
    for (let i = 0; i < 3; ++i) {
      let curGridSize = gridSize[i] = Math.ceil(volumeSize[i] / blockSize[i]);
      blockIndexSize *= curGridSize;
    }
    const gx = gridSize[0], gy = gridSize[1], gz = gridSize[2];
    const xSize = volumeSize[0], ySize = volumeSize[1], zSize = volumeSize[2];
    const xBlockSize = blockSize[0], yBlockSize = blockSize[1], zBlockSize = blockSize[2];
    const baseOffset = output.length;
    let headerOffset = baseOffset;
    const actualSize = [0, 0, 0];
    output.resize(baseOffset + blockIndexSize);
    let sx = inputStrides[0], sy = inputStrides[1], sz = inputStrides[2];
    for (let bz = 0; bz < gz; ++bz) {
      actualSize[2] = Math.min(zBlockSize, zSize - bz * zBlockSize);
      for (let by = 0; by < gy; ++by) {
        actualSize[1] = Math.min(yBlockSize, ySize - by * yBlockSize);
        for (let bx = 0; bx < gx; ++bx) {
          actualSize[0] = Math.min(xBlockSize, xSize - bx * xBlockSize);
          let inputOffset = bz * zBlockSize * sz + by * yBlockSize * sy + bx * xBlockSize * sx;
          let encodedValueBaseOffset = output.length - baseOffset;
          let [encodedBits, tableOffset] = encodeBlock3(rawData, baseInputOffset + inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output);
          let outputData = output.data;
          outputData[headerOffset++] = tableOffset | encodedBits << 24;
          outputData[headerOffset++] = encodedValueBaseOffset;
        }
      }
    }
  }
  function encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock3) {
    let channelOffsetOutputBase = output.length;
    const numChannels = volumeSize[3];
    output.resize(channelOffsetOutputBase + numChannels);
    for (let channel = 0; channel < numChannels; ++channel) {
      output.data[channelOffsetOutputBase + channel] = output.length;
      encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset + inputStrides[3] * channel, inputStrides, encodeBlock3);
    }
  }

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
  function getFortranOrderStrides(size, baseStride = 1) {
    let length = size.length;
    let strides = new Array(length);
    let stride = strides[0] = baseStride;
    for (let i = 1; i < length; ++i) {
      stride *= size[i - 1];
      strides[i] = stride;
    }
    return strides;
  }
  function transposeArray2d(array4, majorSize, minorSize) {
    let transpose = new array4.constructor(array4.length);
    for (let i = 0; i < majorSize * minorSize; i += minorSize) {
      for (let j = 0; j < minorSize; j++) {
        let index = i / minorSize;
        transpose[j * majorSize + index] = array4[i + j];
      }
    }
    return transpose;
  }

  // src/neuroglancer/sliceview/compressed_segmentation/encode_uint32.ts
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
  let tempEncodingBuffer;
  let tempValuesBuffer1;
  let tempValuesBuffer2;
  let tempIndexBuffer1;
  let tempIndexBuffer2;
  const uint32sPerElement = 1;
  function encodeBlock(rawData, inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output) {
    const ax = actualSize[0], ay = actualSize[1], az = actualSize[2];
    const bx = blockSize[0], by = blockSize[1], bz = blockSize[2];
    let sx = inputStrides[0], sy = inputStrides[1], sz = inputStrides[2];
    sz -= sy * ay;
    sy -= sx * ax;
    if (ax * ay * az === 0) {
      return [0, 0];
    }
    let numBlockElements = bx * by * bz + 31;
    if (tempEncodingBuffer === void 0 || tempEncodingBuffer.length < numBlockElements) {
      tempEncodingBuffer = new Uint32Array(numBlockElements);
      tempValuesBuffer1 = new Uint32Array(numBlockElements * uint32sPerElement);
      tempValuesBuffer2 = new Uint32Array(numBlockElements * uint32sPerElement);
      tempIndexBuffer1 = new Uint32Array(numBlockElements);
      tempIndexBuffer2 = new Uint32Array(numBlockElements);
    }
    const encodingBuffer = tempEncodingBuffer.subarray(0, numBlockElements);
    encodingBuffer.fill(0);
    const valuesBuffer1 = tempValuesBuffer1;
    const valuesBuffer2 = tempValuesBuffer2;
    const indexBuffer1 = tempIndexBuffer1;
    const indexBuffer2 = tempIndexBuffer2;
    let noAdjacentDuplicateIndex = 0;
    {
      let prevLow = rawData[inputOffset] + 1 >>> 0;
      let curInputOff = inputOffset;
      let blockElementIndex = 0;
      let bsy = bx - ax;
      let bsz = bx * by - bx * ay;
      for (let z = 0; z < az; ++z, curInputOff += sz, blockElementIndex += bsz) {
        for (let y = 0; y < ay; ++y, curInputOff += sy, blockElementIndex += bsy) {
          for (let x = 0; x < ax; ++x, curInputOff += sx) {
            let valueLow = rawData[curInputOff];
            if (valueLow !== prevLow) {
              prevLow = valuesBuffer1[noAdjacentDuplicateIndex * 1] = valueLow;
              indexBuffer1[noAdjacentDuplicateIndex] = noAdjacentDuplicateIndex++;
            }
            encodingBuffer[blockElementIndex++] = noAdjacentDuplicateIndex;
          }
        }
      }
    }
    indexBuffer1.subarray(0, noAdjacentDuplicateIndex).sort((a, b) => {
      return valuesBuffer1[a] - valuesBuffer1[b];
    });
    let numUniqueValues = -1;
    {
      let prevLow = valuesBuffer1[indexBuffer1[0] * uint32sPerElement] + 1 >>> 0;
      for (let i = 0; i < noAdjacentDuplicateIndex; ++i) {
        let index = indexBuffer1[i];
        let valueIndex = index * uint32sPerElement;
        let valueLow = valuesBuffer1[valueIndex];
        if (valueLow !== prevLow) {
          ++numUniqueValues;
          let outputIndex2 = numUniqueValues * uint32sPerElement;
          prevLow = valuesBuffer2[outputIndex2] = valueLow;
        }
        indexBuffer2[index + 1] = numUniqueValues;
      }
      ++numUniqueValues;
    }
    return writeBlock(output, baseOffset, cache, bx * by * bz, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement);
  }
  function encodeChannels2(output, blockSize, rawData, volumeSize, baseInputOffset = 0, inputStrides = getFortranOrderStrides(volumeSize, 1)) {
    return encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock);
  }

  // src/neuroglancer/sliceview/compressed_segmentation/encode_uint64.ts
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
  let tempEncodingBuffer2;
  let tempValuesBuffer12;
  let tempValuesBuffer22;
  let tempIndexBuffer12;
  let tempIndexBuffer22;
  const uint32sPerElement2 = 2;
  function encodeBlock2(rawData, inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output) {
    const ax = actualSize[0], ay = actualSize[1], az = actualSize[2];
    const bx = blockSize[0], by = blockSize[1], bz = blockSize[2];
    let sx = inputStrides[0], sy = inputStrides[1], sz = inputStrides[2];
    sz -= sy * ay;
    sy -= sx * ax;
    if (ax * ay * az === 0) {
      return [0, 0];
    }
    let numBlockElements = bx * by * bz + 31;
    if (tempEncodingBuffer2 === void 0 || tempEncodingBuffer2.length < numBlockElements) {
      tempEncodingBuffer2 = new Uint32Array(numBlockElements);
      tempValuesBuffer12 = new Uint32Array(numBlockElements * uint32sPerElement2);
      tempValuesBuffer22 = new Uint32Array(numBlockElements * uint32sPerElement2);
      tempIndexBuffer12 = new Uint32Array(numBlockElements);
      tempIndexBuffer22 = new Uint32Array(numBlockElements);
    }
    const encodingBuffer = tempEncodingBuffer2.subarray(0, numBlockElements);
    encodingBuffer.fill(0);
    const valuesBuffer1 = tempValuesBuffer12;
    const valuesBuffer2 = tempValuesBuffer22;
    const indexBuffer1 = tempIndexBuffer12;
    const indexBuffer2 = tempIndexBuffer22;
    let noAdjacentDuplicateIndex = 0;
    {
      let prevLow = rawData[inputOffset] + 1 >>> 0;
      let prevHigh = 0;
      let curInputOff = inputOffset;
      let blockElementIndex = 0;
      let bsy = bx - ax;
      let bsz = bx * by - bx * ay;
      for (let z = 0; z < az; ++z, curInputOff += sz, blockElementIndex += bsz) {
        for (let y = 0; y < ay; ++y, curInputOff += sy, blockElementIndex += bsy) {
          for (let x = 0; x < ax; ++x, curInputOff += sx) {
            let valueLow = rawData[curInputOff];
            let valueHigh = rawData[curInputOff + 1];
            if (valueLow !== prevLow || valueHigh !== prevHigh) {
              prevLow = valuesBuffer1[noAdjacentDuplicateIndex * 2] = valueLow;
              prevHigh = valuesBuffer1[noAdjacentDuplicateIndex * 2 + 1] = valueHigh;
              indexBuffer1[noAdjacentDuplicateIndex] = noAdjacentDuplicateIndex++;
            }
            encodingBuffer[blockElementIndex++] = noAdjacentDuplicateIndex;
          }
        }
      }
    }
    indexBuffer1.subarray(0, noAdjacentDuplicateIndex).sort((a, b) => {
      let aHigh = valuesBuffer1[2 * a + 1];
      let bHigh = valuesBuffer1[2 * b + 1];
      let aLow = valuesBuffer1[2 * a];
      let bLow = valuesBuffer1[2 * b];
      return aHigh - bHigh || aLow - bLow;
    });
    let numUniqueValues = -1;
    {
      let prevLow = valuesBuffer1[indexBuffer1[0] * uint32sPerElement2] + 1 >>> 0;
      let prevHigh = 0;
      for (let i = 0; i < noAdjacentDuplicateIndex; ++i) {
        let index = indexBuffer1[i];
        let valueIndex = index * uint32sPerElement2;
        let valueLow = valuesBuffer1[valueIndex];
        let valueHigh = valuesBuffer1[valueIndex + 1];
        if (valueLow !== prevLow || valueHigh !== prevHigh) {
          ++numUniqueValues;
          let outputIndex2 = numUniqueValues * uint32sPerElement2;
          prevLow = valuesBuffer2[outputIndex2] = valueLow;
          prevHigh = valuesBuffer2[outputIndex2 + 1] = valueHigh;
        }
        indexBuffer2[index + 1] = numUniqueValues;
      }
      ++numUniqueValues;
    }
    return writeBlock(output, baseOffset, cache, bx * by * bz, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement2);
  }
  function encodeChannels3(output, blockSize, rawData, volumeSize, baseInputOffset = 0, inputStrides = getFortranOrderStrides(volumeSize, 2)) {
    return encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock2);
  }

  // src/neuroglancer/util/uint32array_builder.ts
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
  class Uint32ArrayBuilder {
    constructor(initialCapacity = 16) {
      this.length = 0;
      this.data = new Uint32Array(initialCapacity);
    }
    resize(newLength) {
      let {data} = this;
      if (newLength > data.length) {
        let newData = new Uint32Array(Math.max(newLength, data.length * 2));
        newData.set(data.subarray(0, this.length));
        this.data = newData;
      }
      this.length = newLength;
    }
    get view() {
      let {data} = this;
      return new Uint32Array(data.buffer, data.byteOffset, this.length);
    }
    shrinkToFit() {
      this.data = new Uint32Array(this.view);
    }
    clear() {
      this.length = 0;
    }
    appendArray(other) {
      let {length} = this;
      this.resize(length + other.length);
      this.data.set(other, length);
    }
    eraseRange(start, end) {
      this.data.copyWithin(start, end, this.length);
      this.length -= end - start;
    }
  }

  // src/neuroglancer/async_computation/encode_compressed_segmentation.ts
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
  const tempBuffer = new Uint32ArrayBuilder(2e4);
  registerAsyncComputation(encodeCompressedSegmentationUint32, async function(rawData, shape, blockSize) {
    tempBuffer.clear();
    encodeChannels2(tempBuffer, blockSize, rawData, shape);
    return {value: tempBuffer.view};
  });
  registerAsyncComputation(encodeCompressedSegmentationUint64, async function(rawData, shape, blockSize) {
    tempBuffer.clear();
    encodeChannels3(tempBuffer, blockSize, rawData, shape);
    return {value: tempBuffer.view};
  });

  // src/neuroglancer/async_computation/decode_jpeg.ts
  const jpgjs = __toModule(require_jpg());

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

  // src/neuroglancer/async_computation/decode_jpeg.ts
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
  registerAsyncComputation(decodeJpeg, async function(data, width, height, numComponents, convertToGrayscale) {
    let parser = new jpgjs.JpegDecoder();
    parser.parse(data);
    if (parser.width * parser.height !== width * height) {
      throw new Error(`JPEG data does not have the expected dimensions: width=${parser.width}, height=${parser.height}, expected width=${width}, expected height=${height}`);
    }
    if (parser.numComponents !== numComponents) {
      throw new Error(`JPEG data does not have the expected number of components: components=${parser.numComponents}, expected=${numComponents}`);
    }
    let result;
    if (parser.numComponents === 1) {
      result = parser.getData(parser.width, parser.height, false);
    } else if (parser.numComponents === 3) {
      result = parser.getData(parser.width, parser.height, false);
      if (convertToGrayscale) {
        const length = width * height;
        const converted = new Uint8Array(length);
        for (let i = 0; i < length; ++i) {
          converted[i] = result[i * 3];
        }
        result = converted;
      } else {
        result = transposeArray2d(result, parser.width * parser.height, 3);
      }
    } else {
      throw new Error(`JPEG data has an unsupported number of components: components=${parser.numComponents}`);
    }
    return {value: result, transfer: [result.buffer]};
  });

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

  // node_modules/pako/dist/pako.esm.mjs
  /*! pako 2.0.1 https://github.com/nodeca/pako @license (MIT AND Zlib) */
  const Z_FIXED = 4;
  const Z_BINARY = 0;
  const Z_TEXT = 1;
  const Z_UNKNOWN = 2;
  function zero(buf) {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
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
  zero(static_ltree);
  const static_dtree = new Array(D_CODES * 2);
  zero(static_dtree);
  const _dist_code = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  const _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  const base_length = new Array(LENGTH_CODES);
  zero(base_length);
  const base_dist = new Array(D_CODES);
  zero(base_dist);
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
  const d_code = (dist) => {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  };
  const put_short = (s, w) => {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  };
  const send_bits = (s, value, length) => {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  };
  const send_code = (s, c, tree) => {
    send_bits(s, tree[c * 2], tree[c * 2 + 1]);
  };
  const bi_reverse = (code, len) => {
    let res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
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
    const base = desc.stat_desc.extra_base;
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
      if (n >= base) {
        xbits = extra[n - base];
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
      let len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  };
  const tr_static_init = () => {
    let n;
    let bits;
    let length;
    let code;
    let dist;
    const bl_count = new Array(MAX_BITS + 1);
    length = 0;
    for (code = 0; code < LENGTH_CODES - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (; code < D_CODES; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
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
  const copy_block = (s, buf, len, header) => {
    bi_windup(s);
    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    }
    s.pending_buf.set(s.window.subarray(buf, buf + len), s.pending);
    s.pending += len;
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
    let dist;
    let lc;
    let lx = 0;
    let code;
    let extra;
    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
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
  const _tr_tally = (s, dist, lc) => {
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
    s.last_lit++;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
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
  const adler32 = (adler, buf, len, pos) => {
    let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2e3 ? 2e3 : len;
      len -= n;
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
  const crc32 = (crc, buf, len, pos) => {
    const t = crcTable;
    const end = pos + len;
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
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  };
  let HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
  let HASH = HASH_ZLIB;
  const flush_pending = (strm) => {
    const s = strm.state;
    let len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
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
    let len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  };
  const longest_match = (s, cur_match) => {
    let chain_length = s.max_chain_length;
    let scan = s.strstart;
    let match;
    let len;
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
      len = MAX_MATCH$1 - (strend - scan);
      scan = strend - MAX_MATCH$1;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
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
    let p, n, m, more, str;
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
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
        while (s.insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
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
    const status = strm.state.status;
    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR);
    }
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
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
      let str = s.strstart;
      let n = s.lookahead - (MIN_MATCH$1 - 1);
      do {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH$1 - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
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
    let len = 0;
    for (let i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }
    const result = new Uint8Array(len);
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
  var string2buf = (str) => {
    let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new Uint8Array(buf_len);
    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
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
  const buf2binstring = (buf, len) => {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }
    let result = "";
    for (let i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  };
  var buf2string = (buf, max) => {
    let i, out;
    const len = max || buf.length;
    const utf16buf = new Array(len * 2);
    for (out = 0, i = 0; i < len; ) {
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
      while (c_len > 1 && i < len) {
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
  var utf8border = (buf, max) => {
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    let pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
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
    let status = deflate_1.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
    if (status !== Z_OK$1) {
      throw new Error(messages[status]);
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
      status = deflate_1.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$1) {
        throw new Error(messages[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    let status, _flush_mode;
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
      status = deflate_1.deflate(strm, _flush_mode);
      if (status === Z_STREAM_END$1) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }
        status = deflate_1.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK$1;
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
  Deflate.prototype.onEnd = function(status) {
    if (status === Z_OK$1) {
      this.result = common.flattenChunks(this.chunks);
    }
    this.chunks = [];
    this.err = status;
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
    let len;
    let dist;
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
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
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
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
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
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        output[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output[_out++] = from_source[from++];
                        if (len > 1) {
                          output[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        output[_out++] = output[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output[_out++] = output[from++];
                        if (len > 1) {
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
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
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
    let len = 0;
    let sym = 0;
    let min = 0, max = 0;
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
    let base = null;
    let base_index = 0;
    let end;
    const count = new Uint16Array(MAXBITS + 1);
    const offs = new Uint16Array(MAXBITS + 1);
    let extra = null;
    let extra_index = 0;
    let here_bits, here_op, here_val;
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES) {
      base = extra = work;
      end = 19;
    } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      base = dbase;
      extra = dext;
      end = -1;
    }
    huff = 0;
    sym = 0;
    len = min;
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
      here_bits = len - drop;
      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
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
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
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
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
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
  const updatewindow = (strm, src, end, copy) => {
    let dist;
    const state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new Uint8Array(state.wsize);
    }
    if (copy >= state.wsize) {
      state.window.set(src.subarray(end - state.wsize, end), 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
      copy -= dist;
      if (copy) {
        state.window.set(src.subarray(end - copy, end), 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
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
    let copy;
    let from;
    let from_source;
    let here = 0;
    let here_bits, here_op, here_val;
    let last_bits, last_op, last_val;
    let len;
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
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            } else if (len > state.wbits) {
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
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Uint8Array(state.head.extra_len);
                  }
                  state.head.extra.set(input.subarray(next, next + copy), len);
                }
                if (state.flags & 512) {
                  state.check = crc32_1(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
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
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
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
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
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
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              output.set(input.subarray(next, next + copy), put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
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
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
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
                  len = 0;
                  copy = 3 + (hold & 7);
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
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD$1;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
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
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD$1;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output[put++] = from_source[from++];
            } while (--copy);
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
    let status = inflate_1.inflateInit2(this.strm, opt.windowBits);
    if (status !== Z_OK$3) {
      throw new Error(messages[status]);
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
        status = inflate_1.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== Z_OK$3) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  Inflate.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    const dictionary = this.options.dictionary;
    let status, _flush_mode, last_avail_out;
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
      status = inflate_1.inflate(strm, _flush_mode);
      if (status === Z_NEED_DICT$1 && dictionary) {
        status = inflate_1.inflateSetDictionary(strm, dictionary);
        if (status === Z_OK$3) {
          status = inflate_1.inflate(strm, _flush_mode);
        } else if (status === Z_DATA_ERROR$2) {
          status = Z_NEED_DICT$1;
        }
      }
      while (strm.avail_in > 0 && status === Z_STREAM_END$3 && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
        inflate_1.inflateReset(strm);
        status = inflate_1.inflate(strm, _flush_mode);
      }
      switch (status) {
        case Z_STREAM_ERROR$2:
        case Z_DATA_ERROR$2:
        case Z_NEED_DICT$1:
        case Z_MEM_ERROR$1:
          this.onEnd(status);
          this.ended = true;
          return false;
      }
      last_avail_out = strm.avail_out;
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === Z_STREAM_END$3) {
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
      if (status === Z_OK$3 && last_avail_out === 0)
        continue;
      if (status === Z_STREAM_END$3) {
        status = inflate_1.inflateEnd(this.strm);
        this.onEnd(status);
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
  Inflate.prototype.onEnd = function(status) {
    if (status === Z_OK$3) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
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

  // src/neuroglancer/async_computation/decode_gzip.ts
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
  registerAsyncComputation(decodeGzip, async function(data) {
    const result = pako_esm_default.inflate(data);
    return {value: result, transfer: [result.buffer]};
  });

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

  // src/neuroglancer/async_computation/decode_blosc.ts
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

  // node_modules/numcodecs/dist/blosc.mjs
  function base64ToBytes(src) {
    const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
    if (isNode) {
      return Buffer.from(src, "base64");
    }
    const raw = globalThis.atob(src);
    const len = raw.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = raw.charCodeAt(i);
    }
    return buffer;
  }
  function initEmscriptenModule(moduleFactory, src) {
    const wasmBinary = base64ToBytes(src);
    return new Promise((resolve) => {
      const module = moduleFactory({
        noInitialRun: true,
        onRuntimeInitialized() {
          delete module.then;
          resolve(module);
        },
        wasmBinary
      });
    });
  }
  var blosc_codec = function() {
    var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
    return function(blosc_codec2) {
      blosc_codec2 = blosc_codec2 || {};
      var d;
      d || (d = typeof blosc_codec2 !== "undefined" ? blosc_codec2 : {});
      var r = {}, t;
      for (t in d)
        d.hasOwnProperty(t) && (r[t] = d[t]);
      var aa = "./this.program", ba = d.print || console.log.bind(console), u = d.printErr || console.warn.bind(console);
      for (t in r)
        r.hasOwnProperty(t) && (d[t] = r[t]);
      r = null;
      d.thisProgram && (aa = d.thisProgram);
      var v;
      d.wasmBinary && (v = d.wasmBinary);
      var noExitRuntime;
      d.noExitRuntime && (noExitRuntime = d.noExitRuntime);
      typeof WebAssembly !== "object" && u("no native wasm support detected");
      var w, ca = new WebAssembly.Table({initial: 86, maximum: 86, element: "anyfunc"}), da = false, ea = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
      function fa(a, b, c) {
        var e = b + c;
        for (c = b; a[c] && !(c >= e); )
          ++c;
        if (16 < c - b && a.subarray && ea)
          return ea.decode(a.subarray(b, c));
        for (e = ""; b < c; ) {
          var f = a[b++];
          if (f & 128) {
            var g = a[b++] & 63;
            if ((f & 224) == 192)
              e += String.fromCharCode((f & 31) << 6 | g);
            else {
              var m = a[b++] & 63;
              f = (f & 240) == 224 ? (f & 15) << 12 | g << 6 | m : (f & 7) << 18 | g << 12 | m << 6 | a[b++] & 63;
              65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
            }
          } else
            e += String.fromCharCode(f);
        }
        return e;
      }
      function ha(a, b, c) {
        var e = y;
        if (0 < c) {
          c = b + c - 1;
          for (var f = 0; f < a.length; ++f) {
            var g = a.charCodeAt(f);
            if (55296 <= g && 57343 >= g) {
              var m = a.charCodeAt(++f);
              g = 65536 + ((g & 1023) << 10) | m & 1023;
            }
            if (127 >= g) {
              if (b >= c)
                break;
              e[b++] = g;
            } else {
              if (2047 >= g) {
                if (b + 1 >= c)
                  break;
                e[b++] = 192 | g >> 6;
              } else {
                if (65535 >= g) {
                  if (b + 2 >= c)
                    break;
                  e[b++] = 224 | g >> 12;
                } else {
                  if (b + 3 >= c)
                    break;
                  e[b++] = 240 | g >> 18;
                  e[b++] = 128 | g >> 12 & 63;
                }
                e[b++] = 128 | g >> 6 & 63;
              }
              e[b++] = 128 | g & 63;
            }
          }
          e[b] = 0;
        }
      }
      var ia = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : void 0;
      function ja(a) {
        var b;
        for (b = a >> 1; z[b]; )
          ++b;
        b <<= 1;
        if (32 < b - a && ia)
          return ia.decode(y.subarray(a, b));
        b = 0;
        for (var c = ""; ; ) {
          var e = z[a + 2 * b >> 1];
          if (e == 0)
            return c;
          ++b;
          c += String.fromCharCode(e);
        }
      }
      function ka(a, b, c) {
        c === void 0 && (c = 2147483647);
        if (2 > c)
          return 0;
        c -= 2;
        var e = b;
        c = c < 2 * a.length ? c / 2 : a.length;
        for (var f = 0; f < c; ++f)
          z[b >> 1] = a.charCodeAt(f), b += 2;
        z[b >> 1] = 0;
        return b - e;
      }
      function la(a) {
        return 2 * a.length;
      }
      function ma(a) {
        for (var b = 0, c = ""; ; ) {
          var e = A[a + 4 * b >> 2];
          if (e == 0)
            return c;
          ++b;
          65536 <= e ? (e -= 65536, c += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : c += String.fromCharCode(e);
        }
      }
      function na(a, b, c) {
        c === void 0 && (c = 2147483647);
        if (4 > c)
          return 0;
        var e = b;
        c = e + c - 4;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var m = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | m & 1023;
          }
          A[b >> 2] = g;
          b += 4;
          if (b + 4 > c)
            break;
        }
        A[b >> 2] = 0;
        return b - e;
      }
      function oa(a) {
        for (var b = 0, c = 0; c < a.length; ++c) {
          var e = a.charCodeAt(c);
          55296 <= e && 57343 >= e && ++c;
          b += 4;
        }
        return b;
      }
      var B, C, y, z, D, A, E, pa, qa;
      function ra(a) {
        B = a;
        d.HEAP8 = C = new Int8Array(a);
        d.HEAP16 = z = new Int16Array(a);
        d.HEAP32 = A = new Int32Array(a);
        d.HEAPU8 = y = new Uint8Array(a);
        d.HEAPU16 = D = new Uint16Array(a);
        d.HEAPU32 = E = new Uint32Array(a);
        d.HEAPF32 = pa = new Float32Array(a);
        d.HEAPF64 = qa = new Float64Array(a);
      }
      var sa = d.INITIAL_MEMORY || 16777216;
      d.wasmMemory ? w = d.wasmMemory : w = new WebAssembly.Memory({initial: sa / 65536, maximum: 32768});
      w && (B = w.buffer);
      sa = B.byteLength;
      ra(B);
      A[8104] = 5275456;
      function F(a) {
        for (; 0 < a.length; ) {
          var b = a.shift();
          if (typeof b == "function")
            b(d);
          else {
            var c = b.ba;
            typeof c === "number" ? b.Y === void 0 ? d.dynCall_v(c) : d.dynCall_vi(c, b.Y) : c(b.Y === void 0 ? null : b.Y);
          }
        }
      }
      var ta = [], ua = [], va = [], wa = [];
      function xa() {
        var a = d.preRun.shift();
        ta.unshift(a);
      }
      var G = 0, L = null;
      d.preloadedImages = {};
      d.preloadedAudios = {};
      function ya(a) {
        if (d.onAbort)
          d.onAbort(a);
        ba(a);
        u(a);
        da = true;
        throw new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
      }
      function za(a) {
        var b = N;
        return String.prototype.startsWith ? b.startsWith(a) : b.indexOf(a) === 0;
      }
      function Aa() {
        return za("data:application/octet-stream;base64,");
      }
      var N = "blosc_codec.wasm";
      if (!Aa()) {
        var Ba = N;
        N = d.locateFile ? d.locateFile(Ba, "") : "" + Ba;
      }
      function Ca() {
        return new Promise(function(a) {
          a: {
            try {
              if (v) {
                var b = new Uint8Array(v);
                break a;
              }
              throw "both async and sync fetching of the wasm failed";
            } catch (c) {
              ya(c);
            }
            b = void 0;
          }
          a(b);
        });
      }
      ua.push({ba: function() {
        Da();
      }});
      function Ea(a) {
        switch (a) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + a);
        }
      }
      var Fa = void 0;
      function P(a) {
        for (var b = ""; y[a]; )
          b += Fa[y[a++]];
        return b;
      }
      var Q = {}, R = {}, S = {};
      function Ga(a) {
        if (a === void 0)
          return "_unknown";
        a = a.replace(/[^a-zA-Z0-9_]/g, "$");
        var b = a.charCodeAt(0);
        return 48 <= b && 57 >= b ? "_" + a : a;
      }
      function Ha(a, b) {
        a = Ga(a);
        return new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(b);
      }
      function Ia(a) {
        var b = Error, c = Ha(a, function(e) {
          this.name = a;
          this.message = e;
          e = Error(e).stack;
          e !== void 0 && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""));
        });
        c.prototype = Object.create(b.prototype);
        c.prototype.constructor = c;
        c.prototype.toString = function() {
          return this.message === void 0 ? this.name : this.name + ": " + this.message;
        };
        return c;
      }
      var Ja = void 0;
      function T(a) {
        throw new Ja(a);
      }
      var Ka = void 0;
      function La(a, b) {
        function c(h) {
          h = b(h);
          if (h.length !== e.length)
            throw new Ka("Mismatched type converter count");
          for (var l = 0; l < e.length; ++l)
            U(e[l], h[l]);
        }
        var e = [];
        e.forEach(function(h) {
          S[h] = a;
        });
        var f = Array(a.length), g = [], m = 0;
        a.forEach(function(h, l) {
          R.hasOwnProperty(h) ? f[l] = R[h] : (g.push(h), Q.hasOwnProperty(h) || (Q[h] = []), Q[h].push(function() {
            f[l] = R[h];
            ++m;
            m === g.length && c(f);
          }));
        });
        g.length === 0 && c(f);
      }
      function U(a, b, c) {
        c = c || {};
        if (!("argPackAdvance" in b))
          throw new TypeError("registerType registeredInstance requires argPackAdvance");
        var e = b.name;
        a || T('type "' + e + '" must have a positive integer typeid pointer');
        if (R.hasOwnProperty(a)) {
          if (c.ca)
            return;
          T("Cannot register type '" + e + "' twice");
        }
        R[a] = b;
        delete S[a];
        Q.hasOwnProperty(a) && (b = Q[a], delete Q[a], b.forEach(function(f) {
          f();
        }));
      }
      var Ma = [], V = [{}, {value: void 0}, {value: null}, {value: true}, {value: false}];
      function Oa(a) {
        4 < a && --V[a].Z === 0 && (V[a] = void 0, Ma.push(a));
      }
      function Pa(a) {
        switch (a) {
          case void 0:
            return 1;
          case null:
            return 2;
          case true:
            return 3;
          case false:
            return 4;
          default:
            var b = Ma.length ? Ma.pop() : V.length;
            V[b] = {Z: 1, value: a};
            return b;
        }
      }
      function Qa(a) {
        return this.fromWireType(E[a >> 2]);
      }
      function Ra(a) {
        if (a === null)
          return "null";
        var b = typeof a;
        return b === "object" || b === "array" || b === "function" ? a.toString() : "" + a;
      }
      function Sa(a, b) {
        switch (b) {
          case 2:
            return function(c) {
              return this.fromWireType(pa[c >> 2]);
            };
          case 3:
            return function(c) {
              return this.fromWireType(qa[c >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + a);
        }
      }
      function Ta(a) {
        var b = Function;
        if (!(b instanceof Function))
          throw new TypeError("new_ called with constructor type " + typeof b + " which is not a function");
        var c = Ha(b.name || "unknownFunctionName", function() {
        });
        c.prototype = b.prototype;
        c = new c();
        a = b.apply(c, a);
        return a instanceof Object ? a : c;
      }
      function Ua(a) {
        for (; a.length; ) {
          var b = a.pop();
          a.pop()(b);
        }
      }
      function Va(a, b) {
        var c = d;
        if (c[a].W === void 0) {
          var e = c[a];
          c[a] = function() {
            c[a].W.hasOwnProperty(arguments.length) || T("Function '" + b + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c[a].W + ")!");
            return c[a].W[arguments.length].apply(this, arguments);
          };
          c[a].W = [];
          c[a].W[e.aa] = e;
        }
      }
      function Wa(a, b, c) {
        d.hasOwnProperty(a) ? ((c === void 0 || d[a].W !== void 0 && d[a].W[c] !== void 0) && T("Cannot register public name '" + a + "' twice"), Va(a, a), d.hasOwnProperty(c) && T("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), d[a].W[c] = b) : (d[a] = b, c !== void 0 && (d[a].ea = c));
      }
      function Xa(a, b) {
        for (var c = [], e = 0; e < a; e++)
          c.push(A[(b >> 2) + e]);
        return c;
      }
      function Ya(a, b) {
        a = P(a);
        var c = d["dynCall_" + a];
        for (var e = [], f = 1; f < a.length; ++f)
          e.push("a" + f);
        f = "return function dynCall_" + (a + "_" + b) + "(" + e.join(", ") + ") {\n";
        f += "    return dynCall(rawFunction" + (e.length ? ", " : "") + e.join(", ") + ");\n";
        c = new Function("dynCall", "rawFunction", f + "};\n")(c, b);
        typeof c !== "function" && T("unknown function pointer with signature " + a + ": " + b);
        return c;
      }
      var Za = void 0;
      function $a(a) {
        a = ab(a);
        var b = P(a);
        W(a);
        return b;
      }
      function bb(a, b) {
        function c(g) {
          f[g] || R[g] || (S[g] ? S[g].forEach(c) : (e.push(g), f[g] = true));
        }
        var e = [], f = {};
        b.forEach(c);
        throw new Za(a + ": " + e.map($a).join([", "]));
      }
      function cb(a, b, c) {
        switch (b) {
          case 0:
            return c ? function(e) {
              return C[e];
            } : function(e) {
              return y[e];
            };
          case 1:
            return c ? function(e) {
              return z[e >> 1];
            } : function(e) {
              return D[e >> 1];
            };
          case 2:
            return c ? function(e) {
              return A[e >> 2];
            } : function(e) {
              return E[e >> 2];
            };
          default:
            throw new TypeError("Unknown integer type: " + a);
        }
      }
      var db = {};
      function eb() {
        if (!fb) {
          var a = {USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: aa || "./this.program"}, b;
          for (b in db)
            a[b] = db[b];
          var c = [];
          for (b in a)
            c.push(b + "=" + a[b]);
          fb = c;
        }
        return fb;
      }
      for (var fb, gb = [null, [], []], hb = Array(256), X = 0; 256 > X; ++X)
        hb[X] = String.fromCharCode(X);
      Fa = hb;
      Ja = d.BindingError = Ia("BindingError");
      Ka = d.InternalError = Ia("InternalError");
      d.count_emval_handles = function() {
        for (var a = 0, b = 5; b < V.length; ++b)
          V[b] !== void 0 && ++a;
        return a;
      };
      d.get_first_emval = function() {
        for (var a = 5; a < V.length; ++a)
          if (V[a] !== void 0)
            return V[a];
        return null;
      };
      Za = d.UnboundTypeError = Ia("UnboundTypeError");
      var ib = {o: function(a) {
        return Y(a);
      }, n: function(a) {
        throw a;
      }, u: function(a, b, c, e, f) {
        var g = Ea(c);
        b = P(b);
        U(a, {name: b, fromWireType: function(m) {
          return !!m;
        }, toWireType: function(m, h) {
          return h ? e : f;
        }, argPackAdvance: 8, readValueFromPointer: function(m) {
          if (c === 1)
            var h = C;
          else if (c === 2)
            h = z;
          else if (c === 4)
            h = A;
          else
            throw new TypeError("Unknown boolean type size: " + b);
          return this.fromWireType(h[m >> g]);
        }, X: null});
      }, s: function(a, b) {
        b = P(b);
        U(a, {name: b, fromWireType: function(c) {
          var e = V[c].value;
          Oa(c);
          return e;
        }, toWireType: function(c, e) {
          return Pa(e);
        }, argPackAdvance: 8, readValueFromPointer: Qa, X: null});
      }, f: function(a, b, c) {
        c = Ea(c);
        b = P(b);
        U(a, {name: b, fromWireType: function(e) {
          return e;
        }, toWireType: function(e, f) {
          if (typeof f !== "number" && typeof f !== "boolean")
            throw new TypeError('Cannot convert "' + Ra(f) + '" to ' + this.name);
          return f;
        }, argPackAdvance: 8, readValueFromPointer: Sa(b, c), X: null});
      }, d: function(a, b, c, e, f, g) {
        var m = Xa(b, c);
        a = P(a);
        f = Ya(e, f);
        Wa(a, function() {
          bb("Cannot call " + a + " due to unbound types", m);
        }, b - 1);
        La(m, function(h) {
          var l = a, k = a;
          h = [h[0], null].concat(h.slice(1));
          var p = f, q = h.length;
          2 > q && T("argTypes array size mismatch! Must at least get return value and 'this' types!");
          for (var H = h[1] !== null && false, x = false, n = 1; n < h.length; ++n)
            if (h[n] !== null && h[n].X === void 0) {
              x = true;
              break;
            }
          var I = h[0].name !== "void", J = "", M = "";
          for (n = 0; n < q - 2; ++n)
            J += (n !== 0 ? ", " : "") + "arg" + n, M += (n !== 0 ? ", " : "") + "arg" + n + "Wired";
          k = "return function " + Ga(k) + "(" + J + ") {\nif (arguments.length !== " + (q - 2) + ") {\nthrowBindingError('function " + k + " called with ' + arguments.length + ' arguments, expected " + (q - 2) + " args!');\n}\n";
          x && (k += "var destructors = [];\n");
          var Na = x ? "destructors" : "null";
          J = "throwBindingError invoker fn runDestructors retType classParam".split(" ");
          p = [T, p, g, Ua, h[0], h[1]];
          H && (k += "var thisWired = classParam.toWireType(" + Na + ", this);\n");
          for (n = 0; n < q - 2; ++n)
            k += "var arg" + n + "Wired = argType" + n + ".toWireType(" + Na + ", arg" + n + "); // " + h[n + 2].name + "\n", J.push("argType" + n), p.push(h[n + 2]);
          H && (M = "thisWired" + (0 < M.length ? ", " : "") + M);
          k += (I ? "var rv = " : "") + "invoker(fn" + (0 < M.length ? ", " : "") + M + ");\n";
          if (x)
            k += "runDestructors(destructors);\n";
          else
            for (n = H ? 1 : 2; n < h.length; ++n)
              q = n === 1 ? "thisWired" : "arg" + (n - 2) + "Wired", h[n].X !== null && (k += q + "_dtor(" + q + "); // " + h[n].name + "\n", J.push(q + "_dtor"), p.push(h[n].X));
          I && (k += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
          J.push(k + "}\n");
          h = Ta(J).apply(null, p);
          n = b - 1;
          if (!d.hasOwnProperty(l))
            throw new Ka("Replacing nonexistant public symbol");
          d[l].W !== void 0 && n !== void 0 ? d[l].W[n] = h : (d[l] = h, d[l].aa = n);
          return [];
        });
      }, b: function(a, b, c, e, f) {
        function g(k) {
          return k;
        }
        b = P(b);
        f === -1 && (f = 4294967295);
        var m = Ea(c);
        if (e === 0) {
          var h = 32 - 8 * c;
          g = function(k) {
            return k << h >>> h;
          };
        }
        var l = b.indexOf("unsigned") != -1;
        U(a, {name: b, fromWireType: g, toWireType: function(k, p) {
          if (typeof p !== "number" && typeof p !== "boolean")
            throw new TypeError('Cannot convert "' + Ra(p) + '" to ' + this.name);
          if (p < e || p > f)
            throw new TypeError('Passing a number "' + Ra(p) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + e + ", " + f + "]!");
          return l ? p >>> 0 : p | 0;
        }, argPackAdvance: 8, readValueFromPointer: cb(b, m, e !== 0), X: null});
      }, a: function(a, b, c) {
        function e(g) {
          g >>= 2;
          var m = E;
          return new f(B, m[g + 1], m[g]);
        }
        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
        c = P(c);
        U(a, {name: c, fromWireType: e, argPackAdvance: 8, readValueFromPointer: e}, {ca: true});
      }, g: function(a, b) {
        b = P(b);
        var c = b === "std::string";
        U(a, {name: b, fromWireType: function(e) {
          var f = E[e >> 2];
          if (c) {
            var g = y[e + 4 + f], m = 0;
            g != 0 && (m = g, y[e + 4 + f] = 0);
            var h = e + 4;
            for (g = 0; g <= f; ++g) {
              var l = e + 4 + g;
              if (y[l] == 0) {
                h = h ? fa(y, h, void 0) : "";
                if (k === void 0)
                  var k = h;
                else
                  k += String.fromCharCode(0), k += h;
                h = l + 1;
              }
            }
            m != 0 && (y[e + 4 + f] = m);
          } else {
            k = Array(f);
            for (g = 0; g < f; ++g)
              k[g] = String.fromCharCode(y[e + 4 + g]);
            k = k.join("");
          }
          W(e);
          return k;
        }, toWireType: function(e, f) {
          f instanceof ArrayBuffer && (f = new Uint8Array(f));
          var g = typeof f === "string";
          g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || T("Cannot pass non-string to std::string");
          var m = (c && g ? function() {
            for (var k = 0, p = 0; p < f.length; ++p) {
              var q = f.charCodeAt(p);
              55296 <= q && 57343 >= q && (q = 65536 + ((q & 1023) << 10) | f.charCodeAt(++p) & 1023);
              127 >= q ? ++k : k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4;
            }
            return k;
          } : function() {
            return f.length;
          })(), h = Y(4 + m + 1);
          E[h >> 2] = m;
          if (c && g)
            ha(f, h + 4, m + 1);
          else if (g)
            for (g = 0; g < m; ++g) {
              var l = f.charCodeAt(g);
              255 < l && (W(h), T("String has UTF-16 code units that do not fit in 8 bits"));
              y[h + 4 + g] = l;
            }
          else
            for (g = 0; g < m; ++g)
              y[h + 4 + g] = f[g];
          e !== null && e.push(W, h);
          return h;
        }, argPackAdvance: 8, readValueFromPointer: Qa, X: function(e) {
          W(e);
        }});
      }, c: function(a, b, c) {
        c = P(c);
        if (b === 2) {
          var e = ja;
          var f = ka;
          var g = la;
          var m = function() {
            return D;
          };
          var h = 1;
        } else
          b === 4 && (e = ma, f = na, g = oa, m = function() {
            return E;
          }, h = 2);
        U(a, {name: c, fromWireType: function(l) {
          var k = E[l >> 2], p = m(), q = p[l + 4 + k * b >> h], H = 0;
          q != 0 && (H = q, p[l + 4 + k * b >> h] = 0);
          var x = l + 4;
          for (q = 0; q <= k; ++q) {
            var n = l + 4 + q * b;
            if (p[n >> h] == 0) {
              x = e(x);
              if (I === void 0)
                var I = x;
              else
                I += String.fromCharCode(0), I += x;
              x = n + b;
            }
          }
          H != 0 && (p[l + 4 + k * b >> h] = H);
          W(l);
          return I;
        }, toWireType: function(l, k) {
          typeof k !== "string" && T("Cannot pass non-string to C++ string type " + c);
          var p = g(k), q = Y(4 + p + b);
          E[q >> 2] = p >> h;
          f(k, q + 4, p + b);
          l !== null && l.push(W, q);
          return q;
        }, argPackAdvance: 8, readValueFromPointer: Qa, X: function(l) {
          W(l);
        }});
      }, v: function(a, b) {
        b = P(b);
        U(a, {da: true, name: b, argPackAdvance: 0, fromWireType: function() {
        }, toWireType: function() {
        }});
      }, m: Oa, t: function(a) {
        4 < a && (V[a].Z += 1);
      }, B: function(a, b) {
        var c = R[a];
        c === void 0 && T("_emval_take_value has unknown type " + $a(a));
        a = c.readValueFromPointer(b);
        return Pa(a);
      }, w: function() {
        ya();
      }, q: function(a, b, c) {
        y.copyWithin(a, b, b + c);
      }, r: function(a) {
        a >>>= 0;
        var b = y.length;
        if (2147483648 < a)
          return false;
        for (var c = 1; 4 >= c; c *= 2) {
          var e = b * (1 + 0.2 / c);
          e = Math.min(e, a + 100663296);
          e = Math.max(16777216, a, e);
          0 < e % 65536 && (e += 65536 - e % 65536);
          a: {
            try {
              w.grow(Math.min(2147483648, e) - B.byteLength + 65535 >>> 16);
              ra(w.buffer);
              var f = 1;
              break a;
            } catch (g) {
            }
            f = void 0;
          }
          if (f)
            return true;
        }
        return false;
      }, x: function(a, b) {
        var c = 0;
        eb().forEach(function(e, f) {
          var g = b + c;
          f = A[a + 4 * f >> 2] = g;
          for (g = 0; g < e.length; ++g)
            C[f++ >> 0] = e.charCodeAt(g);
          C[f >> 0] = 0;
          c += e.length + 1;
        });
        return 0;
      }, y: function(a, b) {
        var c = eb();
        A[a >> 2] = c.length;
        var e = 0;
        c.forEach(function(f) {
          e += f.length + 1;
        });
        A[b >> 2] = e;
        return 0;
      }, z: function() {
        return 0;
      }, p: function() {
      }, h: function(a, b, c, e) {
        for (var f = 0, g = 0; g < c; g++) {
          for (var m = A[b + 8 * g >> 2], h = A[b + (8 * g + 4) >> 2], l = 0; l < h; l++) {
            var k = y[m + l], p = gb[a];
            k === 0 || k === 10 ? ((a === 1 ? ba : u)(fa(p, 0)), p.length = 0) : p.push(k);
          }
          f += h;
        }
        A[e >> 2] = f;
        return 0;
      }, memory: w, k: function() {
        return 0;
      }, j: function() {
        return 0;
      }, i: function() {
      }, A: function() {
        return 6;
      }, l: function() {
      }, e: function() {
      }, table: ca}, jb = function() {
        function a(f) {
          d.asm = f.exports;
          G--;
          d.monitorRunDependencies && d.monitorRunDependencies(G);
          G == 0 && (L && (f = L, L = null, f()));
        }
        function b(f) {
          a(f.instance);
        }
        function c(f) {
          return Ca().then(function(g) {
            return WebAssembly.instantiate(g, e);
          }).then(f, function(g) {
            u("failed to asynchronously prepare wasm: " + g);
            ya(g);
          });
        }
        var e = {a: ib};
        G++;
        d.monitorRunDependencies && d.monitorRunDependencies(G);
        if (d.instantiateWasm)
          try {
            return d.instantiateWasm(e, a);
          } catch (f) {
            return u("Module.instantiateWasm callback failed with error: " + f), false;
          }
        (function() {
          if (v || typeof WebAssembly.instantiateStreaming !== "function" || Aa() || za("file://") || typeof fetch !== "function")
            return c(b);
          fetch(N, {credentials: "same-origin"}).then(function(f) {
            return WebAssembly.instantiateStreaming(f, e).then(b, function(g) {
              u("wasm streaming compile failed: " + g);
              u("falling back to ArrayBuffer instantiation");
              c(b);
            });
          });
        })();
        return {};
      }();
      d.asm = jb;
      var Da = d.___wasm_call_ctors = function() {
        return (Da = d.___wasm_call_ctors = d.asm.C).apply(null, arguments);
      }, Y = d._malloc = function() {
        return (Y = d._malloc = d.asm.D).apply(null, arguments);
      }, W = d._free = function() {
        return (W = d._free = d.asm.E).apply(null, arguments);
      }, ab = d.___getTypeName = function() {
        return (ab = d.___getTypeName = d.asm.F).apply(null, arguments);
      };
      d.___embind_register_native_and_builtin_types = function() {
        return (d.___embind_register_native_and_builtin_types = d.asm.G).apply(null, arguments);
      };
      d.dynCall_ii = function() {
        return (d.dynCall_ii = d.asm.H).apply(null, arguments);
      };
      d.dynCall_vi = function() {
        return (d.dynCall_vi = d.asm.I).apply(null, arguments);
      };
      d.dynCall_iii = function() {
        return (d.dynCall_iii = d.asm.J).apply(null, arguments);
      };
      d.dynCall_vii = function() {
        return (d.dynCall_vii = d.asm.K).apply(null, arguments);
      };
      d.dynCall_viii = function() {
        return (d.dynCall_viii = d.asm.L).apply(null, arguments);
      };
      d.dynCall_iiii = function() {
        return (d.dynCall_iiii = d.asm.M).apply(null, arguments);
      };
      d.dynCall_iiiiiii = function() {
        return (d.dynCall_iiiiiii = d.asm.N).apply(null, arguments);
      };
      d.dynCall_viiiiii = function() {
        return (d.dynCall_viiiiii = d.asm.O).apply(null, arguments);
      };
      d.dynCall_v = function() {
        return (d.dynCall_v = d.asm.P).apply(null, arguments);
      };
      d.dynCall_iiiii = function() {
        return (d.dynCall_iiiii = d.asm.Q).apply(null, arguments);
      };
      d.dynCall_jiiiii = function() {
        return (d.dynCall_jiiiii = d.asm.R).apply(null, arguments);
      };
      d.dynCall_viiii = function() {
        return (d.dynCall_viiii = d.asm.S).apply(null, arguments);
      };
      d.dynCall_iiiiii = function() {
        return (d.dynCall_iiiiii = d.asm.T).apply(null, arguments);
      };
      d.dynCall_jiji = function() {
        return (d.dynCall_jiji = d.asm.U).apply(null, arguments);
      };
      d.dynCall_viiiii = function() {
        return (d.dynCall_viiiii = d.asm.V).apply(null, arguments);
      };
      d.asm = jb;
      var Z;
      d.then = function(a) {
        if (Z)
          a(d);
        else {
          var b = d.onRuntimeInitialized;
          d.onRuntimeInitialized = function() {
            b && b();
            a(d);
          };
        }
        return d;
      };
      L = function kb() {
        Z || lb();
        Z || (L = kb);
      };
      function lb() {
        function a() {
          if (!Z && (Z = true, d.calledRun = true, !da)) {
            F(ua);
            F(va);
            if (d.onRuntimeInitialized)
              d.onRuntimeInitialized();
            if (d.postRun)
              for (typeof d.postRun == "function" && (d.postRun = [d.postRun]); d.postRun.length; ) {
                var b = d.postRun.shift();
                wa.unshift(b);
              }
            F(wa);
          }
        }
        if (!(0 < G)) {
          if (d.preRun)
            for (typeof d.preRun == "function" && (d.preRun = [d.preRun]); d.preRun.length; )
              xa();
          F(ta);
          0 < G || (d.setStatus ? (d.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              d.setStatus("");
            }, 1);
            a();
          }, 1)) : a());
        }
      }
      d.run = lb;
      if (d.preInit)
        for (typeof d.preInit == "function" && (d.preInit = [d.preInit]); 0 < d.preInit.length; )
          d.preInit.pop()();
      noExitRuntime = true;
      lb();
      return blosc_codec2;
    };
  }();
  const wasmBase64 = `AGFzbQEAAAABygInYAF/AX9gA39/fwF/YAV/f39/fwF/YAJ/fwBgAn9/AX9gAX8AYAN/f38AYAR/f39/AX9gBH9/f38AYAAAYAZ/f39/f38Bf2AFf39/f38AYAZ/f39/f38AYAd/f39/f39/AX9gBH9/f38BfmAFf39/f38BfmAIf39/f39/f38Bf2AJf39/f39/f39/AX9gAn5/AX9gC39/f39/f39/f39/AX9gA39+fwF+YAN/f34AYAN/f34Bf2ADfn9/AX9gAn5+AX5gB39/f39/f38AYAh/f39/f39/fwBgCX9/f39/f39/fwBgBX9+f39/AGAAAX9gDX9/f39/f39/f39/f38Bf2APf39/f39/f39/f39/f39/AX9gBX9/f35/AX9gBn98f39/fwF/YAF/AX5gAn9/AX5gB39+f39/f38BfmABfgF+YAR+f39+AX4CxQEeAWEBYQAGAWEBYgALAWEBYwAGAWEBZAAMAWEBZQAFAWEBZgAGAWEBZwADAWEBaAAHAWEBaQAEAWEBagAAAWEBawAAAWEBbAAEAWEBbQAFAWEBbgAGAWEBbwAAAWEBcAACAWEBcQABAWEBcgAAAWEBcwADAWEBdAAFAWEBdQALAWEBdgADAWEBdwAJAWEBeAAEAWEBeQAEAWEBegAAAWEBQQAHAWEBQgAEAWEGbWVtb3J5AgGAAoCAAgFhBXRhYmxlAXAAVgOyBLAEAwEBBAIACAAAAAMHAQEBAAIBAAMEBAEDAQUEBQUABgABBAAIAgIEAQgBBAYBCwEBAAMYAwEDBwoGBAQLBwgGCAQLBQQEBAYIAQYDBgAHAgYAAAEAAgMDBgMFBAQACwAGDAQAAA0GAhgECQABDAYGCAACABAeAAAFAQMEHAcHBwcEBAYfEwMIAQECAQIKBwYKBgMAAwAEARARBAAFBQUFBQUJCAYEBgAACwYFBQUCAAICBwcFBAMDBxIBEhcmAAMABQMGAQAEBQUABAYKAAUFBAEgBQQEBQUBEQQHCgMABQQHCgoiBgUBAAYGBgUFCAQTDQAAAAEBAQcHBwcHBwEHBwAIBgcEEQIGAgICAggKAgIHAgMIAAUFBQQAAgoMCgsCGQANBwgGAQMEFAAJAAkACQkJCQMJCQkJCQkJCQkJBAkJDAwLCwgICAsMAAEAAQUABQAFCQQAEhcSBAAGAQAUBg0N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aiICQQNLDQACQCACQQFrDgMBAQADCyABKAIAIgNBf2oMAQsgASgCACEDIAEgAkECdGooAgALIQQgAUEEQQggAkEBSxtqKAIAIQEgACADNgIEIAAgATYCCCAAIAQ2AgAPCyAAIAEpAgA3AgAgACABKAIINgIIC1UBAn8gBCABENABIQYgAygCACIFIAQgAGsiBEkEQANAIAIgACAFaiABENABQQJ0aiAFNgIAIAVBAWoiBSAESQ0ACwsgAyAENgIAIAIgBkECdGooAgALtAQBFX8jAEEQayIOJAAgACgCICABIAAoAnwgAxAeQQJ0aiIFKAIAIQMgACgCeCEGIAAoAgghDyAAKAIMIQwgACgCKCESIAAoAoABIQggACgCECETIAUgASAAKAIEIg1rIgk2AgAgEiAJQX8gBkF/anRBf3MiFHFBA3RqIQcgCUEJaiEKAn8gAyATSQRAIAdCADcCAEEADAELQQAgCSAUayIAIAAgCUsbIRUgB0EEaiEGIAwgDWohFiAMIA9qIRdBfyAIdEF/cyERQQghC0EAIQgDQAJ/IARBACAQIAggECAISRsiACADaiAMSRtFBEAgACABaiADIA1qIABqIAIQHSAAaiIAIANqIQUgDQwBCyAPIA0gACABaiADIA9qIABqIAIgFyAWECAgAGoiACADaiIFIAxJGwshGCAFIAogACAKIANrSxsgCiAAIAtLIgUbIQogACALIAUbIQsCQCAAIAFqIhkgAkYNACASIAMgFHFBA3RqIQUCQAJAIAMgGGogAGotAAAgGS0AAEkEQCAHIAM2AgAgAyAVSw0BIA5BDGohBwwDCyAGIAM2AgAgAyAVSwRAIAAhCCAFIQYMAgsgDkEMaiEGDAILIAAhECAFQQRqIgchBQsgEUUNACARQX9qIREgBSgCACIDIBNPDQELCyAGQQA2AgAgB0EANgIAIAtBgH1qIgBBwAEgAEHAAUkbQQAgC0GAA0sbCyEDIA5BEGokACADIAogCWtBeGoiACADIABLGwscAQF/IAAoAgAgACgCBCABECkhAiAAIAEQJiACCywAIAJFBEAgACgCBCABKAIERg8LIAAgAUYEQEEBDwsgACgCBCABKAIEEFxFC6QEAQN/QQEhBgJAIAFFIAJBBGoCfyAAKAKEAUEBTgRAIAAoAgAiBCgCLEECRgRAIAQgABCeBDYC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AQEBAQEBAQEAAQEBAQEBAQEBAQEAAQEBAQEBAQEBAAsCfwJ/An8gASgCCCICBEAgACgCKCACIAAoAiQRAwAgACgCHCEBCyABKAJEIgILBEAgACgCKCACIAAoAiQRAwAgACgCHCEBCyABKAJAIgILBEAgACgCKCACIAAoAiQRAwAgACgCHCEBCyABKAI4IgILBEAgACgCKCACIAAoAiQRAwAgACgCHCEBCyAAKAIoIAEgACgCJBEDACAAQQA2AhxBfUEAIANB8QBGGyECCyACCx0AIABBCSABIAFBAUgbIgBBDCAAQQxIGzsBmIAQC6IDAQZ/IwBBEGsiAyQAAn8gACgCBCIBIAAoAggiAkYEQCAAKAIAIgIgACgCDCACKAIAKAIQEQMAIAAoAgAiAiADQQxqIAIoAgAoAgwRBAAhASAAIAMoAgwiAjYCDCACRQRAIABBAToAEEEADAILIAAgASACaiICNgIICwJAIAIgAWsiAiABLQAAQQF0QcAJai8BAEELdkEBaiIESQRAIABBEWogASACEEohBiAAKAIAIgEgACgCDCABKAIAKAIQEQMAIABBADYCDANAIAAoAgAiASADQQhqIAEoAgAoAgwRBAAhBUEAIAMoAggiAUUNAxogACACakERaiAFIAEgBCACayIFIAEgBUkbIgEQKhogACgCACIFIAEgBSgCACgCEBEDACABIAJqIgIgBEkNAAsgACAGNgIEIAAgACAEakERajYCCAwBCyACQQRNBEAgAEERaiABIAIQSiEBIAAoAgAiBCAAKAIMIAQoAgAoAhARAwAgACABIAJqNgIIIAAgATYCBCAAQQA2AgwMAQsgACABNgIEC0EBCyECIANBEGokACACC8cCACAAIAEtAAA6AAAgACABLQABOgABIAAgAS0AAjoAAiAAIAEtAAM6AAMgACABLQAEOgAEIAAgAS0ABToABSAAIAEtAAY6AAYgACABLQAHOgAHIAAgAS0ACDoACCAAIAEtAAk6AAkgACABLQAKOgAKIAAgAS0ACzoACyAAIAEtAAw6AAwgACABLQANOgANIAAgAS0ADjoADiAAIAEtAA86AA8gACABLQAQOgAQIAAgAS0AEToAESAAIAEtABI6ABIgACABLQATOgATIAAgAS0AFDoAFCAAIAEtABU6ABUgACABLQAWOgAWIAAgAS0AFzoA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ASACEPcCCxIAIABFBEBBAA8LIAAgARDwAgujAgACQAJAIAFBFEsNACABQXdqIgFBCUsNAAJAAkACQAJAAkACQAJAAkAgAUEBaw4JAQIJAwQFBgkHAAsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgACACQQARAwALDwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMAC0QBBH8gACgCACICLAAAIgMQbQRAA0AgACACQQFqIgQ2AgAgAUEKbCADakFQaiEBIAIsAAEhAyAEIQIgAxBtDQALCyABC3UBA38CQAJAA0AgACABQbDEAWotAABHBEBB1wAhAiABQQFqIgFB1wBHDQEMAgsLIAEhAiABDQBBkMUBIQAMAQtBkMUBIQEDQCABLQAAIQMgAUEBaiIAIQEgAw0AIAAhASACQX9qIgINAAsLQeDsASgCABogAAuPBAEDfyMAQRBrIgUkACAFIAI2AgggBSAANgIMIAAgA2ohBgJAIANBB0wEQCADQQFIDQEDQCAAIAItAAA6AAAgAkEBaiECIABBAWoiACAGRw0ACyAFIAY2AgwgBSACNgIIDAELIARBAUYEQCAFQQxqIAVBCGogACACaxB7IAUoAgwhAAsgBiABTQRAIAAgA2ohByAEQQFHIAAgBSgCCCICa0EPSnJFBEADQCAAIAIQZiACQQhqIQIgAEEIaiIAIAdJDQAMAwALAAsgACACEBwgAEEQaiACQRBqEBwgA0EhSA0BIABBIGohAANAIAAgAkEgaiIBEBwgAEEQaiACQTBqEBwgASECIABBIGoiACAHSQ0ACwwBCwJAIAAgAUsEQCAAIQEMAQsCQCAEQQFHIAAgBSgCCCIEa0EPSnJFBEAgACECIAQhAwNAIAIgAxBmIANBCGohAyACQQhqIgIgAUkNAAsMAQsgACAEEBwgAEEQaiAEQRBqEBwgASAAa0EhSA0AIABBIGohAiAE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akEAOwEAIABBhBVqQQA7AQAgAEGAFWpBADsBACAAQfwTakEAOwEAIABB+BNqQQA7AQAgAEH0E2pBADsBACAAQfATakEAOwEAIABB7BNqQQA7AQAgAEHoE2pBADsBACAAQeQTakEAOwEAIABB4BNqQQA7AQAgAEHcE2pBADsBACAAQdgTakEAOwEAIABB1BNqQQA7AQAgAEHQE2pBADsBACAAQcwTakEAOwEAIABByBNqQQA7AQAgAEHEE2pBADsBACAAQcATakEAOwEAIABBvBNqQQA7AQAgAEG4E2pBADsBACAAQbQTakEAOwEAIABBsBNqQQA7AQAgAEGsE2pBADsBACAAQagTakEAOwEAIABBpBNqQQA7AQAgAEGgE2pBADsBACAAQZwTakEAOwEAIABBmBNqQQA7AQAgAEGUE2pBADsBACAAQZATakEAOwEAIABBjBNqQQA7AQAgAEIANwKsLSAAQZQJakEBOwEAIABBADYCqC0gAEEANgKgLQueAQECfyAAIAAvAbgtIANB//8DcSIEIAAoArwtIgN0ciIFOwG4LSAAAn8gA0EOTgRAIAAgACgCFCIDQQFqNgIUIAMgACgCCGogBToAACAAIAAoAhQiA0EBajYCFCADIAAoAghqIABBuS1qLQAAOgAAIAAgBEEQIAAoArwtIgNrdjsBuC0gA0FzagwBCyADQQNqCzYCvC0gACABIAIQoQQLlwQBEH8gACgCfCIEIARBAnYgACgCeCIEIAAoAowBSRshCUEAIAAoAmwiAiAAKAIsa0GGAmoiAyADIAJLGyEMIAAoAnQiByAAKAKQASIDIAMgB0sbIQ0gACgCOCIOIAJqIgVBggJqIQ8gBCAFaiICLQAAIQogAkF/ai0AACELIAAoAjQhECAAKAJAIREDQAJAAkAgASAOaiIDIARqIgItAAAgCkcNACACQX9qLQAAIAtHDQAgAy0AACAFLQAARw0AQQIhBiADLQABIAUtAAFHDQADQAJAIAUgBmoiAi0AASADLQADRwRAIAJBAWohAgwBCyACLQACIAMtAARHBEAgAkECaiECDAELIAItAAMgAy0ABUcEQCACQQNqIQIMAQsgAi0ABCADLQAGRwRAIAJBBGohAgwBCyACLQAFIAMtAAdHBEAgAkEFaiECDAELIAItAAYgAy0ACEcEQCACQQZqIQIMAQsg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CGogAzoAACABKAIcKAIEIQMgASABKAIUIgRBAWo2AhQgBCABKAIIaiADQQh2OgAAIAEoAhwvAQYhAyABIAEoAhQiBEEBajYCFCAEIAEoAghqIAM6AAAgASgCHC0AByEDIAEgASgCFCIEQQFqNgIUIAQgASgCCGogAzoAACABKAKEASIDQQlHBEBBBCABKAKIAUEBSkECdCADQQJIGyECCyABIAEoAhQiA0EBajYCFCADIAEoAghqIAI6AAAgASgCHCgCDCECIAEgASgCFCIDQQFqNgIUIAMgASgCCGogAjoAAAJ/IAEoAhwiBCgCEARAIAQoAhQhAiABIAEoAhQiA0EBajYCFCADIAEoAghqIAI6AAAgASgCHCgCFCECIAEgASgCFCIDQQFqNgIUIAMgASgCCGogAkEIdjoAACABKAIcIQQLIAQoAiwLBEAgACAAKAIwIAEoAgggASgCFBA0NgIwCyABQcUANgIEIAFBADYCIAwCCyABKAIwQQx0QYCQfmohBEEAIQICQCABKAKIAUEBSg0AIAEoAoQBIgNBAkgNAEHAACECIANBBkgNAEGAAUHAASADQQZGGyECCyABQfEANgIEIAEgAiAEciICQSByIAIgASgCbBsiAkEfcCACckEfcxB0IAEoAmwEQCABIAAvATIQdCABIAAvATAQdAsgAEEAQQBBABBkNgIwIAEoAgQhAgsgAkHFAEcNASABKAIcIQQLAkAgBCgCEARAIAEoAhQhAiABKAIgIgUgBC8BFE8NASACIQMDQCABKAIMIAJGBEACQCACIANNDQAgBCgCLEUNACAAIAAoAjAgASgCCCADaiACIANrEDQ2AjALIAAQNSABKAIcIQQgASgCFCICIAEoAgxGDQMgASgCICEFIAIhAwsgBCgCECAFai0AACEEIAEgAkEBajYCFCABKAIIIAJqIAQ6AAAgASABKAIgQQFqIgU2AiAgBSABKAIcIgQvARRPBEAgAyECDAMFIAEoAhQhAgwBCwAACwALIAFByQA2AgQMAgsCQCAEKAIsRQ0AIAEoAhQiAyACTQ0AIAAgACgCMCABKAIIIAJqIAMgAmsQNDYCMAsgASgCICAEKAIURgRAIAFByQA2AgQgAUEANgIgDAILIAEoAgQhAgsgAkHJAEcNASABKAIcIQQLIAQoAhxFDQIgASgCFCICIQMCfwNA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FCADbCEVQQAhBANAIAEgBSACIARsIgZqaiAAIAQgB2pqLQAAOgAAIAEgBiAUamogACAEIBVqai0AADoAACABIAYgEmpqIAAgBCATamotAAA6AAAgASAGIBBqaiAAIAQgEWpqLQAAOgAAIAEgBiAOamogACAEIA9qai0AADoAACABIAYgDGpqIAAgBCANamotAAA6AAAgASAGIApqaiAAIAQgC2pqLQAAOgAAIAEgBiAIamogACAEIAlqai0AADoAACAEQQFqIgQgA0cNAAsLIAVBD2ohBCAFQQhqIQUgBCACSQ0ACwsgAkF4cSIFIAJPDQADQCADBEAgAyAFbCEGQQAhBANAIAEgAiAEbCAFamogACAEIAZqai0AADoAACAEQQFqIgQgA0cNAAsLIAVBAWoiBSACRw0ACwsgAiADbK0LuAEBA38CQCABQQFIDQAgACwAACIEQf8AcSEDAkAgBEF/Sg0AIAFBAkgNASAALAABIgRBB3RBgP8AcSADciEDIARBf0oNACABQQNIDQEgACwAAiIEQQ50QYCA/wBxIANyIQMgBEF/Sg0AIAFBBEgNASAALAADIgRBFXRBgICA/wBxIANyIQMgBEF/Sg0AIAFBBUgNASAALQAEIgBBD0sNASAAQRx0IANyIQMLIAIgAzYCAEEBIQULIAULggEBBn8gASABIABuIgYgAGxrIQcgACABTQRAIAZBASAGQQFLGyEIA0AgAARAIAAgBGwhCUEAIQUDQCADIAUgCWpqIAIgBSAGbCAEamotAAA6AAAgBUEBaiIFIABHDQALCyAEQQFqIgQgCEcNAAsLIAMgASAHayIAaiAAIAJqIAcQKhoLDQAgACABIAIgAxDEBAuCAQEGfyABIAEgAG4iBiAAbGshByAABEAgBkEBIAZBAUsbIQgDQCAAIAFNBEAgBCAGbCEJQQAhBQNAIAMgBSAJamogAiAAIAVsIARqai0AADoAACAFQQFqIgUgCEcNAAsLIARBAWoiBCAARw0ACwsgAyABIAdrIgBqIAAgAmogBxAqGgsNACAAIAEgAiADEMYEC6ICAQJ/IAAgARA2GiACQQN2IgRB+P///wFxIQMgASACQQdxIgJqIQEgACACaiEAAn8gASAEQQdxQX9qIgJBBksNABoCQAJAAkACQAJAAkACQCACQQFrDgYFBAMCAQAGCyAAIAEQNiEAIAFBCGohAQsgACABEDYhACABQQhqIQELIAAgARA2IQAgAUEIaiEBCyAAIAEQNiEAIAFBCGohAQsgACABEDYhACABQQhqIQELIAAgARA2IQAgAUEIaiEBCyAAIAEQNiEAIAFBCGoLIQIgAwRAA0AgACACEDYgAkEIahA2IAJBEGoQNiACQRhqEDYgAkEgahA2IAJBKGoQNiACQTBqEDYgAkE4ahA2IQAgAkFAayECIANBeGoiAw0ACwsgAAstACACBEADQCAAIAEtAAA6AAAgAEEBaiEAIAFBAWohASACQX9qIgINAAsLIAALJgEBf0ECIQQgAygCACABEI8CTwR/IAAgASACIAMQmQRBAAUgBAsLPgAQxwIQ7wJB1A1BAkH4D0HzD0EKQQsQA0HfDUEGQZAOQfwNQQxBDRADQegNQQFB+A1B9A1BDkEPEAMQ3AILC8XcATgAQYAIC4MGTjZzbmFwcHk0U2lua0UAAAxuAAAABAAATjZzbmFwcHk2U291cmNlRQAAAAAMbgAAGAQAAAAAAABsBAAAAQAAAAIAAAADAAAABAAAAAUAAABONnNuYXBweTE1Qnl0ZUFycmF5U291cmNlRQAAgGwAAFAEAAAsBAAAAAAAALQEAAAGAAAABwAAAAgAAAAJAAAATjZzbmFwcHkyMlVuY2hlY2tlZEJ5dGVBcnJheVNpbmtFAAAAgGwAAJAEAAAQBAAAAQAECAEQASACAAUIAhACIAMABggDEAMgBAAHCAQQBCAFAAgIBRAFIAYACQgGEAYgBwAKCAcQByAIAAsICBAIIAkABAkJEAkgCgAFCQoQCiALAAYJCxALIAwABwkMEAwgDQAICQ0QDSAOAAkJDhAOIA8ACgkPEA8gEAALCRAQECARAAQKERARIBIABQoSEBIgEwAGChMQEyAUAAcKFBAUIBUACAoVEBUgFgAJChYQFiAXAAoKFxAXIBgACwoYEBggGQAECxkQGSAaAAULGhAaIBsABgsbEBsgHAAHCxwQHCAdAAgLHRAdIB4ACQseEB4gHwAKCx8QHyAgAAsLIBAgICEABAwhECEgIgAFDCIQIiAjAAYMIxAjICQABwwkECQgJQAIDCUQJSAmAAkMJhAmICcACgwnECcgKAALDCgQKCApAAQNKRApICoABQ0qECogKwAGDSsQKyAsAAcNLBAsIC0ACA0tEC0gLgAJDS4QLiAvAAoNLxAvIDAACw0wEDAgMQAEDjEQMSAyAAUOMhAyIDMABg4zEDMgNAAHDjQQNCA1AAgONRA1IDYACQ42EDYgNwAKDjcQNyA4AAsOOBA4IDkABA85EDkgOgAFDzoQOiA7AAYPOxA7IDwABw88EDwgAQgIDz0QPSABEAkPPhA+IAEYCg8/ED8gASALD0AQQCAAAAAA/wAAAP//AAD///8A/////2RlY29tcHJlc3MAY29tcHJlc3MAZnJlZV9yZXN1bHQAdmkAAGxtAABpaWlpaWlpAEGQDgvUBigHAAAwBwAAMAcAAMBtAADAbQAAwG0AAAxuAAC2BwAANG4AAEgHAAAAAAAAAQAAAIgHAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUAAAxuAACQBwAATlN0M19fMjIxX19iYXNpY19zdHJpbmdfY29tbW9uSUxiMUVFRQBOMTBlbXNjcmlwdGVuM3ZhbEUAAAAADG4AANQHAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUAaWlpAAAoBwAAMAcAABgIAAAgCAAAJAgAACoIAAAxCAAANggAAGJsb3NjbHoAbHo0AGx6NGhjAHNuYXBweQB6bGliAHpzdGQARXJyb3IuICBudGhyZWFkcyBjYW5ub3QgYmUgbGFyZ2VyIHRoYW4gQkxPU0NfTUFYX1RIUkVBRFMgKCVkKQBFcnJvci4gIG50aHJlYWRzIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyAEVSUk9SOyByZXR1cm4gY29kZSBmcm9tIHB0aHJlYWRfY3JlYXRlKCkgaXMgJWQKAAlFcnJvciBkZXRhaWw6ICVzCgBCbG9zYyBoYXMgbm90IGJlZW4gY29tcGlsZWQgd2l0aCAnJXMnIABjb21wcmVzc2lvbiBzdXBwb3J0LiAgUGxlYXNlIHVzZSBvbmUgaGF2aW5nIGl0LgBFcnJvciBhbGxvY2F0aW5nIG1lbW9yeSEARVJST1I7IHJldHVybiBjb2RlIGZyb20gcHRocmVhZF9qb2luKCkgaXMgJWQKAElucHV0IGJ1ZmZlciBzaXplIGNhbm5vdCBleGNlZWQgJWQgYnl0ZXMK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AAAACQAAAAkAAAAKAAAACgAAAAsAAAALAAAADAAAAAwAAAANAAAADQBBgNsAC/8IDAAIAIwACABMAAgAzAAIACwACACsAAgAbAAIAOwACAAcAAgAnAAIAFwACADcAAgAPAAIALwACAB8AAgA/AAIAAIACACCAAgAQgAIAMIACAAiAAgAogAIAGIACADiAAgAEgAIAJIACABSAAgA0gAIADIACACyAAgAcgAIAPIACAAKAAgAigAIAEoACADKAAgAKgAIAKoACABqAAgA6gAIABoACACaAAgAWgAIANoACAA6AAgAugAIAHoACAD6AAgABgAIAIYACABGAAgAxgAIACYACACmAAgAZgAIAOYACAAWAAgAlgAIAFYACADWAAgANgAIALYACAB2AAgA9gAIAA4ACACOAAgATgAIAM4ACAAuAAgArgAIAG4ACADuAAgAHgAIAJ4ACABeAAgA3gAIAD4ACAC+AAgAfgAIAP4ACAABAAgAgQAIAEEACADBAAgAIQAIAKEACABhAAgA4QAIABEACACRAAgAUQAIANEACAAxAAgAsQAIAHEACADxAAgACQAIAIkACABJAAgAyQAIACkACACpAAgAaQAIAOkACAAZAAgAmQAIAFkACADZAAgAOQAIALkACAB5AAgA+QAIAAUACACFAAgARQAIAMUACAAlAAgApQAIAGUACADlAAgAFQAIAJUACABVAAgA1QAIADUACAC1AAgAdQAIAPUACAANAAgAjQAIAE0ACADNAAgALQAIAK0ACABtAAgA7QAIAB0ACACdAAgAXQAIAN0ACAA9AAgAvQAIAH0ACAD9AAgAEwAJABMBCQCTAAkAkwEJAFMACQBTAQkA0wAJANMBCQAzAAkAMwEJALMACQCzAQkAcwAJAHMBCQDzAAkA8wEJAAsACQALAQkAiwAJAIsBCQBLAAkASwEJAMsACQDLAQkAKwAJACsBCQCrAAkAqwEJAGsACQBrAQkA6wAJAOsBCQAbAAkAGwEJAJsACQCbAQkAWwAJAFsBCQDbAAkA2wEJADsACQA7AQkAuwAJALsBCQB7AAkAewEJAPsACQD7AQkABwAJAAcBCQCHAAkAhwEJAEcACQBHAQkAxwAJAMcBCQAnAAkAJwEJAKcACQCnAQkAZwAJAGcBCQDnAAkA5wEJABcACQAXAQkAlwAJAJcBCQBXAAkA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AAAAAAABAAAAFAAAAA8AAAAQAAAAAQAAAAYAAAAAAAAAAQAAABUAAAAQAAAAEQAAAAEAAAAFAAAAAAAAAAIAAAAVAAAAEgAAABIAAAABAAAABQAAAAAAAAACAAAAFQAAABIAAAATAAAAAgAAAAUAAAACAAAAAwAAABUAAAATAAAAEwAAAAMAAAAFAAAABAAAAAMAAAAVAAAAEwAAABMAAAADAAAABQAAAAgAAAAEAAAAFQAAABMAAAATAAAAAwAAAAUAAAAQAAAABQAAABUAAAATAAAAFAAAAAQAAAAFAAAAEAAAAAUAAAAWAAAAFAAAABUAAAAEAAAABQAAABAAAAAFAAAAFgAAABUAAAAWAAAABAAAAAUAAAAQAAAABQAAABYAAAAVAAAAFgAAAAUAAAAFAAAAEAAAAAUAAAAWAAAAFQAAABYAAAAFAAAABQAAACAAAAAGAAAAFgAAABYAAAAXAAAABQAAAAUAAAAgAAAABgAAABYAAAAXAAAAFwAAAAYAAAAFAAAAIAAAAAYAAAAWAAAAFgAAABYAAAAFAAAABQAAADAAAAAHAAAAFwAAABcAAAAWAAAABQAAAAQAAABAAAAABwAAABcAAAAXAAAAFgAAAAYAAAADAAAAQAAAAAgAAAAXAAAAGAAAABYAAAAHAAAAAwAAAAABAAAJAAAAGQAAABkAAAAXAAAABwAAAAMAAAAAAQAACQAAABoAAAAaAAAAGAAAAAcAAAADAAAAAAIAAAkAAAAbAAAAGwAAABkAAAAJAAAAAwAAAOcDAAAJAAAAEgAAAAwAAAANAAAAAQAAAAUAAAABAAAAAQAAABIAAAANAAAADgAAAAEAAAAGAAAAAAAAAAEAAAASAAAADgAAAA4AAAABAAAABQAAAAAAAAACAAAAEgAAABAAAAAQAAAAAQAAAAQAAAAAAAAAAgAAABIAAAAQAAAAEQAAAAIAAAAFAAAAAgAAAAMAAAASAAAAEgAAABIAAAADAAAABQAAAAIAAAADAAAAEgAAABIAAAATAAAAAwAAAAUAAAAEAAAABAAAABIAAAASAAAAEwAAAAQAAAAEAAAABAAAAAQAAAASAAAAEgAAABMAAAAEAAAABAAAAAgAAAAFAAAAEgAAABIAAAATAAAABQAAAAQAAAAIAAAABQAAABIAAAASAAAAEwAAAAYAAAAEAAAACAAAAAUAAAASAAAAEgAAABMAAAAFAAAABAAAAAwAAAAGAAAAEgAAABMAAAATAAAABwAAAAQAAAAMAAAABgAAABIAAAASAAAAEwAAAAQAAAAEAAAAEAAAAAcAAAASAAAAEgAAABMAAAAEAAAAAwAAACAAAAAHAAAAEgAAABIAAAATAAAABgAAAAMAAACAAAAABwAAABIAAAATAAAAEwAAAAYAAAADAAAAgAAAAAgAAAASAAAAEwAAABMAAAAIAAAAAwAAAAABAAAIAAAAEgAAABMAAAATAAAABgAAAAMAAACAAAAACQAAABIAAAATAAAAEwAAAAgAAAADAAAAAAEAAAkAAAASAAAAEwAAABMAAAAKAAAAAwAAAAACAAAJAAAAEgAAABMAAAATAAAADAAAAAMAAAAAAgAACQAAABIAAAATAAAAEwAAAA0AAAADAAAA5wMAAAkAAAARAAAADAAAAAwAAAABAAAABQAAAAEAAAABAAAAEQAAAAwAAAANAAAAAQAAAAYAAAAAAAAAAQAAABEAAAANAAAADwAAAAEAAAAFAAAAAAAAAAEAAAARAAAADwAAABAAAAACAAAABQAAAAAAAAACAAAAEQAAABEAAAARAAAAAgAAAAQAAAAAAAAAAgAAABEAAAAQAAAAEQAAAAMAAAAEAAAAAgAAAAMAAAARAAAAEQAAABEAAAADAAAABAAAAAQAAAAEAAAAEQAAABEAAAARAAAAAwAAAAQAAAAIAAAABQAAABEAAAARAAAAEQAAAAQAAAAEAAAACAAAAAUAAAARAAAAEQAAABEAAAAFAAAABAAAAAgAAAAFAAAAEQAAABEAAAARAAAABgAAAAQAAAAIAAAABQAAABEAAAARAAAAEQAAAAUAAAAEAAAACAAAAAYAAAARAAAAEgAAABEAAAAHAAAABAAAAAwAAAAGAAAAEQAAABIAAAARAAAAAwAAAAQAAAAMAAAABwAAABEAAAASAAAAEQAAAAQAAAADAAAAIAAAAAcAAAARAAAAEgAAABEAAAAGAAAAAwAAAAABAAAHAAAAEQAAABIAAAARAAAABgAAAAMAAACAAAAACAAAABEAAAASAAAAEQAAAAgAAAADAAAAAAEAAAgAAAARAAAAEgAAABEAAAAKAAAAAwAAAAACAAAIAAAAEQAAABIAAAARAAAABQAAAAMAAAAAAQAACQAAABEAAAASAAAAEQAAAAcAAAADAAAAAAIAAAkAAAARAAAAEgAAABEAAAAJAAAAAwAAAAACAAAJAAAAEQAAABIAAAARAAAACwAAAAMAAADnAwAACQAAAA4AAAAMAAAADQAAAAEAAAAFAAAAAQAAAAEAAAAOAAAADgAAAA8AAAABAAAABQAAAAAAAAABAAAADgAAAA4AAAAPAAAAAQAAAAQAAAAAAAAAAQAAAA4AAAAOAAAADwAAAAIAAAAEAAAAAAAAAAIAAAAOAAAADgAAAA4AAAAEAAAABAAAAAIAAAADAAAADgAAAA4AAAAOAAAAAwAAAAQAAAAEAAAABAAAAA4AAAAOAAAADgAAAAQAAAAEAAAACAAAAAUAAAAOAAAADgAAAA4AAAAGAAAABAAAAAgAAAAFAAAADgAAAA4AAAAOAAAACAAAAAQAAAAIAAAABQAAAA4AAAAPAAAADgAAAAUAAAAEAAAACAAAAAYAAAAOAAAADwAAAA4AAAAJAAAABAAAAAgAAAAGAAAADgAAAA8AAAAOAAAAAwAAAAQAAAAMAAAABwAAAA4AAAAPAAAADgAAAAQAAAADAAAAGAAAAAcAAAAOAAAADwAAAA4AAAAFAAAAAwAAACAAAAAIAAAADgAAAA8AAAAPAAAABgAAAAMAAABAAAAACAAAAA4AAAAPAAAADwAAAAcAAAADAAAAAAEAAAgAAAAOAAAADwAAAA8AAAAFAAAAAwAAADAAAAAJAAAADgAAAA8AAAAPAAAABgAAAAMAAACAAAAACQAAAA4AAAAPAAAADwAAAAcAAAADAAAAAAEAAAkAAAAOAAAADwAAAA8AAAAIAAAAAwAAAAABAAAJAAAADgAAAA8AAAAPAAAACAAAAAMAAAAAAgAACQAAAA4AAAAPAAAADwAAAAkAAAADAAAAAAIAAAkAAAAOAAAADwAAAA8AAAAKAAAAAwAAAOcDAAAJAAAAIAAAACAAAAAhAAAAIgAAACMAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADAAAAAxAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA4AEGQmgEL+gEEAAMAAgACAAIAAgACAAIAAgACAAIAAgACAAEAAQABAAIAAgACAAIAAgACAAIAAgACAAMAAgABAAEAAQABAAEA//////////8AAAAAAAAAAAEAAQABAAEAAQABAAIAAgACAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAP////////////8AAAAAAAABAAQAAwACAAIAAgACAAIAAgABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAP//////////////////AEGVnAEL+AcIAAAABwAAagYAAAAGAACtBQAAagUAADEFAAAABQAA1AQAAK0EAACKBAAAagQAAEwEAAAxBAAAFwQAAAAEAADpAwAA1AMAAMADAACtAwAAmwMAAIoDAAB5AwAAagMAAFsDAABMAwAAPgMAADEDAAAkAwAAFwMAAAsDAAAAAwAA9AIAAOkCAADeAgAA1AIAAMoCAADAAgAAtgIAAK0CAACkAgAAmwIAAJICAACKAgAAggIAAHkCAAByAgAAagIAAGICAABbAgAAUwIAAEwCAABFAgAAPgIAADcCAAAxAgAAKgIAACQCAAAeAgAAFwIAABECAAALAgAABQIAAAACAAD6AQAA9AEAAO8BAADpAQAA5AEAAN4BAADZAQAA1AEAAM8BAADKAQAAxQEAAMABAAC7AQAAtgEAALIBAACtAQAAqAEAAKQBAACfAQAAmwEAAJcBAACSAQAAjgEAAIoBAACGAQAAggEAAH4BAAB5AQAAdQEAAHIBAABuAQAAagEAAGYBAABiAQAAXgEAAFsBAABXAQAAUwEAAFABAABMAQAASQEAAEUBAABCAQAAPgEAADsBAAA3AQAANAEAADEBAAAuAQAAKgEAACcBAAAkAQAAIQEAAB4BAAAaAQAAFwEAABQBAAARAQAADgEAAAsBAAAIAQAABQEAAAIBAAAAAQAA/QAAAPoAAAD3AAAA9AAAAPEAAADvAAAA7AAAAOkAAADmAAAA5AAAAOEAAADeAAAA3AAAANkAAADXAAAA1AAAANEAAADPAAAAzAAAAMoAAADHAAAAxQAAAMIAAADAAAAAvgAAALsAAAC5AAAAtgAAALQAAACyAAAArwAAAK0AAACrAAAAqAAAAKYAAACkAAAAogAAAJ8AAACdAAAAmwAAAJkAAACXAAAAlQAAAJIAAACQ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AAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBsLIBC9YEAQAAAAEAAAABAAAAAQAAAAIAAAACAAAAAwAAAAMAAAAEAAAABgAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBlLcBC4MEAQAAAAEAAAAFAAAADQAAAB0AAAA9AAAAfQAAAP0AAAD9AQAA/QMAAP0HAAD9DwAA/R8AAP0/AAD9fwAA/f8AAP3/AQD9/wMA/f8HAP3/DwD9/x8A/f8/AP3/fwD9//8A/f//Af3//wP9//8H/f//D/3//x/9//8//f//fwAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAAQABAQUAAAAAAAAFAAAAAAAABgQ9AAAAAAAJBf0BAAAAAA8F/X8AAAAAFQX9/x8AAAADBQUAAAAAAAcEfQAAAAAADAX9DwAAAAASBf3/AwAAABcF/f9/AAAABQUdAAAAAAAIBP0AAAAAAA4F/T8AAAAAFAX9/w8AAAACBQEAAAAQAAcEfQAAAAAACwX9BwAAAAARBf3/AQAAABYF/f8/AAAABAUNAAAAEAAIBP0AAAAAAA0F/R8AAAAAEwX9/wcAAAABBQEAAAAQAAYEPQAAAAAACgX9AwAAAAAQBf3/AAAAABwF/f//DwAAGwX9//8HAAAaBf3//wMAABkF/f//AQAAGAX9//8AQaC7AQvTAQMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQYC+AQtRAQAAAAEAAAABAAAAAQAAAAIAAAACAAAAAwAAAAMAAAAEAAAABAAAAAUAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAEHgvgELhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABB8MIBC5cCCAAAAAgAAAAIAAAABwAAAAgAAAAJAAAACgAAAAsAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAAAAAABAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/GRJEOwI/LEcUPTMwChsGRktFNw9JDo4XA0AdPGkrNh9KLRwBICUpIQgMFRYiLhA4Pgs0MRhkdHV2L0EJfzkRI0MyQomKiwUEJignDSoeNYwHGkiTE5SVAEGQxQEL0Q5JbGxlZ2FsIGJ5dGUgc2VxdWVuY2UARG9tYWluIGVycm9yAFJlc3VsdCBub3QgcmVwcmVzZW50YWJsZQBOb3QgYSB0dHkAUGVybWlzc2lvbiBkZW5pZWQAT3BlcmF0aW9uIG5vdCBwZXJtaXR0ZWQATm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeQBObyBzdWNoIHByb2Nlc3MARmlsZSBleGlzdHMAVmFsdWUgdG9vIGxhcmdlIGZvciBkYXRhIHR5cGUATm8gc3BhY2UgbGVmdCBvbiBkZXZpY2UAT3V0IG9mIG1lbW9yeQBSZXNvdXJjZSBidXN5AEludGVycnVwdGVkIHN5c3RlbSBjYWxsAFJlc291cmNlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlAEludmFsaWQgc2VlawBDcm9zcy1kZXZpY2UgbGluawBSZWFkLW9ubHkgZmlsZSBzeXN0ZW0ARGlyZWN0b3J5IG5vdCBlbXB0eQBDb25uZWN0aW9uIHJlc2V0IGJ5IHBlZXIAT3BlcmF0aW9uIHRpbWVkIG91dABDb25uZWN0aW9uIHJlZnVzZWQASG9zdCBpcyBkb3duAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MAQmxvY2sgZGV2aWNlIHJlcXVpcmVkAE5vIHN1Y2ggZGV2aWNlAE5vdCBhIGRpcmVjdG9yeQBJcyBhIGRpcmVjdG9yeQBUZXh0IGZpbGUgYnVzeQBFeGVjIGZvcm1hdCBlcnJvcgBJbnZhbGlkIGFyZ3VtZW50AEFyZ3VtZW50IGxpc3QgdG9vIGxvbmcAU3ltYm9saWMgbGluayBsb29wAEZpbGVuYW1lIHRvbyBsb25nAFRvbyBtYW55IG9wZW4gZmlsZXMgaW4gc3lzdGVtAE5vIGZpbGUgZGVzY3JpcHRvcnMgYXZhaWxhYmxlAEJhZCBmaWxlIGRlc2NyaXB0b3IATm8gY2hpbGQgcHJvY2VzcwBCYWQgYWRkcmVzcwBGaWxlIHRvbyBsYXJnZQBUb28gbWFueSBsaW5rcwBObyBsb2NrcyBhdmFpbGFibGUAUmVzb3VyY2UgZGVhZGxvY2sgd291bGQgb2NjdXIAU3RhdGUgbm90IHJlY292ZXJhYmxlAFByZXZpb3VzIG93bmVyIGRpZWQAT3BlcmF0aW9uIGNhbmNlbGVkAEZ1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZABObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZQBJZGVudGlmaWVyIHJlbW92ZWQARGV2aWNlIG5vdCBhIHN0cmVhbQBObyBkYXRhIGF2YWlsYWJsZQBEZXZpY2UgdGltZW91dABPdXQgb2Ygc3RyZWFtcyByZXNvdXJjZXMATGluayBoYXMgYmVlbiBzZXZlcmVkAFByb3RvY29sIGVycm9yAEJhZCBtZXNzYWdlAEZpbGUgZGVzY3JpcHRvciBpbiBiYWQgc3RhdGUATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wg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PgBzdGQ6OndzdHJpbmcAc3RkOjp1MTZzdHJpbmcAc3RkOjp1MzJzdHJpbmcAZW1zY3JpcHRlbjo6dmFsAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGRvdWJsZT4ADG4AAKRxAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAAAxuAADMcQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZkVFAAAMbgAA9HEAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SW1FRQAADG4AABxyAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lsRUUAAAxuAABEcgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJakVFAAAMbgAAbHIAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQAADG4AAJRyAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAAAxuAAC8cgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJc0VFAAAMbgAA5HIAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWFFRQAADG4AAAxzAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ljRUUAADRuAABEcwAAAAAAAAEAAACIBwAAAAAAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEaU5TXzExY2hhcl90cmFpdHNJRGlFRU5TXzlhbGxvY2F0b3JJRGlFRUVFAAAANG4AAKBzAAAAAAAAAQAAAIgHAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURzTlNfMTFjaGFyX3RyYWl0c0lEc0VFTlNfOWFsbG9jYXRvcklEc0VFRUUAAAA0bgAA/HMAAAAAAAABAAAAiAcAAAAAAABOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAANG4AAFR0AAAAAAAAAQAAAIgHAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWhOU18xMWNoYXJfdHJhaXRzSWhFRU5TXzlhbGxvY2F0b3JJaEVFRUUAAGh1AEGY6QELQYAtAAAAMgAAAQEAAB4BAAAPAAAAgCwAAAAtAAAAAAAAHgAAAA8AAAAAAAAAMCwAAAAAAAATAAAABwAAAAAAAAAFAEHk6QELATkAQfzpAQsKOgAAADsAAABsdgBBlOoBCwECAEGj6gELBf//////AEHo6gELAQUAQfTqAQsBVABBjOsBCw46AAAAVQAAAJh6AAAABABBpOsBCwEBAEGz6wELBQr/////`;
  var BloscShuffle;
  (function(BloscShuffle2) {
    BloscShuffle2[BloscShuffle2["NOSHUFFLE"] = 0] = "NOSHUFFLE";
    BloscShuffle2[BloscShuffle2["SHUFFLE"] = 1] = "SHUFFLE";
    BloscShuffle2[BloscShuffle2["BITSHUFFLE"] = 2] = "BITSHUFFLE";
    BloscShuffle2[BloscShuffle2["AUTOSHUFFLE"] = -1] = "AUTOSHUFFLE";
  })(BloscShuffle || (BloscShuffle = {}));
  const COMPRESSORS = new Set([
    "blosclz",
    "lz4",
    "lz4hc",
    "snappy",
    "zlib",
    "zstd"
  ]);
  let emscriptenModule;
  let Blosc = (() => {
    class Blosc2 {
      constructor(clevel = 5, cname = "lz4", shuffle = BloscShuffle.SHUFFLE, blocksize = 0) {
        if (clevel < 0 || clevel > 9) {
          throw new Error(`Invalid compression level: '${clevel}'. It should be between 0 and 9`);
        }
        if (!COMPRESSORS.has(cname)) {
          throw new Error(`Invalid compressor '${cname}'. Valid compressors include
        'blosclz', 'lz4', 'lz4hc','snappy', 'zlib', 'zstd'.`);
        }
        if (shuffle < -1 || shuffle > 2) {
          throw new Error(`Invalid shuffle ${shuffle}. Must be one of 0 (NOSHUFFLE),
        1 (SHUFFLE), 2 (BITSHUFFLE), -1 (AUTOSHUFFLE).`);
        }
        this.blocksize = blocksize;
        this.clevel = clevel;
        this.cname = cname;
        this.shuffle = shuffle;
      }
      static fromConfig({blocksize, clevel, cname, shuffle}) {
        return new Blosc2(clevel, cname, shuffle, blocksize);
      }
      async encode(data) {
        if (!emscriptenModule) {
          emscriptenModule = initEmscriptenModule(blosc_codec, wasmBase64);
        }
        const module = await emscriptenModule;
        const view = module.compress(data, this.cname, this.clevel, this.shuffle, this.blocksize);
        const result = new Uint8Array(view);
        module.free_result();
        return result;
      }
      async decode(data, out) {
        if (!emscriptenModule) {
          emscriptenModule = initEmscriptenModule(blosc_codec, wasmBase64);
        }
        const module = await emscriptenModule;
        const view = module.decompress(data);
        const result = new Uint8Array(view);
        module.free_result();
        if (out !== void 0) {
          out.set(result);
          return out;
        }
        return result;
      }
    }
    Blosc2.codecId = "blosc";
    Blosc2.COMPRESSORS = [...COMPRESSORS];
    Blosc2.NOSHUFFLE = BloscShuffle.NOSHUFFLE;
    Blosc2.SHUFFLE = BloscShuffle.SHUFFLE;
    Blosc2.BITSHUFFLE = BloscShuffle.BITSHUFFLE;
    Blosc2.AUTOSHUFFLE = BloscShuffle.AUTOSHUFFLE;
    return Blosc2;
  })();
  var blosc_default = Blosc;

  // src/neuroglancer/async_computation/decode_blosc.ts
  registerAsyncComputation(decodeBlosc, async function(data) {
    const {Blosc: Blosc2} = await Promise.resolve().then(() => __toModule(require_blosc()));
    const codec = new Blosc2();
    const result = await codec.decode(data);
    return {value: result, transfer: [result.buffer]};
  });

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

  // src/neuroglancer/datasource/vtk/parse.ts
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
  const maxHeaderLength = 1e3;
  const vtkHeaderPattern = /^[ \t]*#[ \t]+vtk[ \t]+DataFile[ \t]+Version[ \t]+([^\s]+)[ \t]*\n(.*)\n[ \t]*(ASCII|BINARY)[ \t]*\n[ \t]*DATASET[ \t]+([^ ]+)[ \t]*\n/;
  const pointDataHeaderPattern = /^[ \t]*POINT_DATA[ \t]+([0-9]+)[ \t]*$/;
  const pointsHeaderPattern = /^[ \t]*POINTS[ \t]+([0-9]+)[ \t]+([^\s]+)[ \t]*$/;
  const scalarsHeaderPattern = /^[ \t]*SCALARS[ \t]+([^\s]+)[ \t]+([^\s]+)(?:[ \t]+([0-9]+))?[ \t]*$/;
  const scalarsLookupTableHeaderPattern = /^[ \t]*LOOKUP_TABLE[ \t]+([^\s]+)[ \t]*$/;
  const polygonsHeaderPattern = /^[ \t]*POLYGONS[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]*$/;
  const trianglePattern = /^[ \t]*3[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]+([0-9]+)[ \t]*$/;
  const blankLinePattern = /^[ \t]*$/;
  class TriangularMesh {
    constructor(header, numVertices, vertexPositions, numTriangles, indices, vertexAttributes) {
      this.header = header;
      this.numVertices = numVertices;
      this.vertexPositions = vertexPositions;
      this.numTriangles = numTriangles;
      this.indices = indices;
      this.vertexAttributes = vertexAttributes;
    }
  }
  function getTriangularMeshSize(mesh) {
    let size = mesh.vertexPositions.byteLength + mesh.indices.byteLength;
    for (const attribute of mesh.vertexAttributes) {
      size += attribute.data.byteLength;
    }
    return size;
  }
  function parsePolydataAscii(header, data) {
    let decoder = new TextDecoder();
    const text = decoder.decode(data);
    const lines = text.split("\n");
    const numLines = lines.length;
    let lineNumber = 0;
    let numVertices = -1;
    let vertexPositions = void 0;
    let numTriangles = -1;
    let indices = void 0;
    let vertexAttributes = new Array();
    function parseArray(fieldName, n, numComponents, _dataType) {
      let pattern = RegExp("^[ 	]*" + "([^s]+)[ 	]+".repeat(numComponents - 1) + "([^s]+)[ 	]*$");
      if (numLines - lineNumber < n) {
        throw new Error(`VTK data ended unexpectedly while parsing ${fieldName}.`);
      }
      let result = new Float32Array(n * numComponents);
      let outIndex = 0;
      for (let i = 0; i < n; ++i) {
        const line = lines[lineNumber++];
        const m = line.match(pattern);
        if (m === null) {
          throw new Error(`Failed to parse ${fieldName} line ${i}: ${JSON.stringify(line)}.`);
        }
        for (let j = 0; j < numComponents; ++j) {
          result[outIndex++] = parseFloat(m[j + 1]);
        }
      }
      return result;
    }
    function parsePoints(nVertices, dataType) {
      if (indices !== void 0) {
        throw new Error(`POINTS specified more than once.`);
      }
      numVertices = nVertices;
      vertexPositions = parseArray("POINTS", nVertices, 3, dataType);
    }
    function parsePolygons(numFaces, numValues) {
      if (indices !== void 0) {
        throw new Error(`VERTICES specified more than once.`);
      }
      if (numLines - lineNumber < numFaces) {
        throw new Error(`VTK data ended unexpectedly`);
      }
      if (numValues !== numFaces * 4) {
        throw new Error(`Only triangular faces are supported.`);
      }
      numTriangles = numFaces;
      indices = new Uint32Array(numFaces * 3);
      let outIndex = 0;
      for (let i = 0; i < numFaces; ++i) {
        let m = lines[lineNumber++].match(trianglePattern);
        if (m === null) {
          throw new Error(`Failed to parse indices for face ${i}`);
        }
        indices[outIndex++] = parseInt(m[1], 10);
        indices[outIndex++] = parseInt(m[2], 10);
        indices[outIndex++] = parseInt(m[3], 10);
      }
    }
    function parseScalars(name, dataType, numComponents) {
      if (lineNumber === numLines) {
        throw new Error(`Expected LOOKUP_TABLE directive.`);
      }
      let firstLine = lines[lineNumber++];
      let match = firstLine.match(scalarsLookupTableHeaderPattern);
      if (match === null) {
        throw new Error(`Expected LOOKUP_TABLE directive in ${JSON.stringify(firstLine)}.`);
      }
      let tableName = match[1];
      const values = parseArray(`SCALARS(${name})`, numVertices, numComponents, dataType);
      vertexAttributes.push({name, data: values, numComponents, dataType, tableName});
    }
    function parsePointData(nVertices) {
      if (numVertices !== nVertices) {
        throw new Error(`Number of vertices specified in POINT_DATA section (${nVertices}) must match number of points (${numVertices}).`);
      }
      while (lineNumber < numLines) {
        let line = lines[lineNumber];
        if (line.match(blankLinePattern)) {
          ++lineNumber;
          continue;
        }
        let match;
        match = line.match(scalarsHeaderPattern);
        if (match !== null) {
          let numComponents;
          if (match[3] === void 0) {
            numComponents = 1;
          } else {
            numComponents = parseInt(match[3], 10);
          }
          ++lineNumber;
          parseScalars(match[1], match[2], numComponents);
          continue;
        }
      }
    }
    while (lineNumber < numLines) {
      let line = lines[lineNumber];
      if (line.match(blankLinePattern)) {
        ++lineNumber;
        continue;
      }
      let match;
      match = line.match(pointsHeaderPattern);
      if (match !== null) {
        ++lineNumber;
        parsePoints(parseInt(match[1], 10), match[2]);
        continue;
      }
      match = line.match(polygonsHeaderPattern);
      if (match !== null) {
        ++lineNumber;
        parsePolygons(parseInt(match[1], 10), parseInt(match[2], 10));
        continue;
      }
      match = line.match(pointDataHeaderPattern);
      if (match !== null) {
        ++lineNumber;
        parsePointData(parseInt(match[1], 10));
        break;
      }
      throw new Error(`Failed to parse VTK line ${JSON.stringify(line)}.`);
    }
    if (vertexPositions === void 0) {
      throw new Error(`Vertex positions not specified.`);
    }
    if (indices === void 0) {
      throw new Error(`Indices not specified.`);
    }
    return new TriangularMesh(header, numVertices, vertexPositions, numTriangles, indices, vertexAttributes);
  }
  const asciiFormatParsers = new Map([["POLYDATA", parsePolydataAscii]]);
  function parseVTK(data) {
    let decoder = new TextDecoder();
    const decodedHeaderString = decoder.decode(new Uint8Array(data.buffer, data.byteOffset, Math.min(data.byteLength, maxHeaderLength)));
    const headerMatch = decodedHeaderString.match(vtkHeaderPattern);
    if (headerMatch === null) {
      throw new Error(`Failed to parse VTK file header.`);
    }
    const byteOffset = headerMatch[0].length;
    const datasetType = headerMatch[4];
    const dataFormat = headerMatch[3];
    const header = {
      version: headerMatch[1],
      comment: headerMatch[2],
      datasetType,
      dataFormat
    };
    const remainingData = new Uint8Array(data.buffer, data.byteOffset + byteOffset, data.byteLength - byteOffset);
    if (dataFormat === "ASCII") {
      const formatParser = asciiFormatParsers.get(datasetType);
      if (formatParser === void 0) {
        throw new Error(`VTK dataset type ${JSON.stringify(datasetType)} is not supported.`);
      }
      return formatParser(header, remainingData);
    }
    throw new Error(`VTK data format ${JSON.stringify(dataFormat)} is not supported.`);
  }

  // src/neuroglancer/util/gzip.ts
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
  function isGzipFormat(data) {
    let view = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return view.length > 2 && view[0] === 31 && view[1] === 139;
  }
  function maybeDecompressGzip(data) {
    let byteView;
    if (data instanceof ArrayBuffer) {
      byteView = new Uint8Array(data);
    } else {
      byteView = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
    if (isGzipFormat(byteView)) {
      return pako_esm_default.inflate(byteView);
    }
    return byteView;
  }

  // src/neuroglancer/async_computation/vtk_mesh.ts
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
  registerAsyncComputation(parseVTKFromArrayBuffer, async function(buffer) {
    const mesh = parseVTK(maybeDecompressGzip(buffer));
    return {
      value: {data: mesh, size: getTriangularMeshSize(mesh)},
      transfer: [
        mesh.indices.buffer,
        mesh.vertexPositions.buffer,
        ...Array.from(mesh.vertexAttributes.values()).map((a) => a.data.buffer)
      ]
    };
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

  // src/neuroglancer/util/float32array_builder.ts
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
  class Float32ArrayBuilder {
    constructor(initialCapacity = 16) {
      this.length = 0;
      this.data = new Float32Array(initialCapacity);
    }
    resize(newLength) {
      let {data} = this;
      if (newLength > data.length) {
        let newData = new Float32Array(Math.max(newLength, data.length * 2));
        newData.set(data.subarray(0, this.length));
        this.data = newData;
      }
      this.length = newLength;
    }
    get view() {
      let {data} = this;
      return new Float32Array(data.buffer, data.byteOffset, this.length);
    }
    shrinkToFit() {
      this.data = new Float32Array(this.view);
    }
    clear() {
      this.length = 0;
    }
    appendArray(other) {
      let {length} = this;
      this.resize(length + other.length);
      this.data.set(other, length);
    }
    eraseRange(start, end) {
      this.data.copyWithin(start, end, this.length);
      this.length -= end - start;
    }
  }

  // src/neuroglancer/async_computation/obj_mesh.ts
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
  registerAsyncComputation(parseOBJFromArrayBuffer, async function(buffer) {
    buffer = maybeDecompressGzip(buffer);
    let text = new TextDecoder().decode(buffer);
    text = text.replace(/#.*/g, "");
    const vertexPositions = new Float32ArrayBuilder();
    const indices = new Uint32ArrayBuilder();
    for (const match of text.matchAll(/^v\s+([\-0-9\.eE]+)\s+([\-0-9\.eE]+)\s+([\-0-9\.eE]+)\s*$/mg)) {
      vertexPositions.appendArray([parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])]);
    }
    for (const match of text.matchAll(/^f\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*$/mg)) {
      indices.appendArray([parseInt(match[1], 10) - 1, parseInt(match[2], 10) - 1, parseInt(match[3], 10) - 1]);
    }
    vertexPositions.shrinkToFit();
    indices.shrinkToFit();
    const mesh = {
      info: {
        numVertices: vertexPositions.length / 3,
        numTriangles: indices.length / 3,
        vertexAttributes: []
      },
      vertexPositions: vertexPositions.view,
      indices: indices.view,
      vertexAttributes: []
    };
    const size = mesh.vertexPositions.byteLength + mesh.indices.byteLength;
    console.log(mesh);
    return {
      value: {data: mesh, size},
      transfer: [
        mesh.indices.buffer,
        mesh.vertexPositions.buffer
      ]
    };
  });
})();
