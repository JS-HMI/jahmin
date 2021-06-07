window.lunrData = {
  "index": {
    "version": "1.0.0",
    "fields": [
      {
        "name": "longname",
        "boost": 1000
      },
      {
        "name": "name",
        "boost": 500
      },
      {
        "name": "tags",
        "boost": 300
      },
      {
        "name": "kind",
        "boost": 110
      },
      {
        "name": "title",
        "boost": 100
      },
      {
        "name": "summary",
        "boost": 70
      },
      {
        "name": "description",
        "boost": 50
      },
      {
        "name": "body",
        "boost": 1
      }
    ],
    "ref": "id",
    "tokenizer": "default",
    "documentStore": {
      "store": {
        "index.html": [
          "build",
          "framework",
          "human",
          "index",
          "interfac",
          "iot",
          "jahmin",
          "javascript",
          "machin",
          "readm"
        ],
        "global.html": [
          "document",
          "global"
        ],
        "undefined": [
          "get",
          "start",
          "tutori"
        ],
        "list_class.html": [
          "class",
          "document",
          "list",
          "list:class"
        ],
        "list_tutorial.html": [
          "avail",
          "list",
          "list:tutori",
          "tutori"
        ],
        "ServiceManager.html": [
          "class",
          "organizz",
          "servicemanag"
        ],
        "ServiceManager.html#AddEngine": [
          "addengin",
          "engin",
          "function",
          "servicemanager#addengin",
          "subsystemnam"
        ],
        "DataTree.html": [
          "app",
          "automat",
          "class",
          "connect",
          "contain",
          "data",
          "datatre",
          "element",
          "here",
          "save",
          "schedul",
          "state",
          "structur",
          "subsystem",
          "ui",
          "updat"
        ],
        "DataTree.html#GetVar": [
          "assign",
          "current",
          "datatree#getvar",
          "function",
          "getvar",
          "protect",
          "proxi",
          "readonli",
          "real",
          "relat",
          "return",
          "statevari",
          "statu",
          "throw",
          "tri",
          "valu",
          "varid"
        ],
        "DataTree.html#Update": [
          "automat",
          "call",
          "connect",
          "datatree#upd",
          "element",
          "function",
          "list",
          "ui",
          "upadt",
          "updat",
          "variabl"
        ],
        "DataTree.html#ExistVar": [
          "check",
          "current",
          "datatree#existvar",
          "exist",
          "existvar",
          "function",
          "state",
          "tree",
          "variabl",
          "varid"
        ],
        "DataCommsEngine.html": [
          "abstract",
          "class",
          "comun",
          "data",
          "datacommsengin",
          "defin",
          "engin",
          "i/o",
          "server"
        ],
        "DataCommsEngine.html#Initialize": [
          "abstract",
          "action",
          "anyth",
          "basicrespons",
          "datacommsengine#initi",
          "engin",
          "function",
          "here",
          "initi",
          "lt;abstract&gt",
          "method",
          "need",
          "place"
        ],
        "DataCommsEngine.html#Subscribe": [
          "abstract",
          "action",
          "automat",
          "datacommsengine#subscrib",
          "function",
          "list",
          "lt;abstract&gt",
          "method",
          "name",
          "promise.&lt;array.&lt;varresponse&gt;&gt",
          "subscrib",
          "updat",
          "variabl"
        ],
        "DataCommsEngine.html#Unsubscribe": [
          "abstract",
          "action",
          "automat",
          "datacommsengine#unsubscrib",
          "function",
          "list",
          "lt;abstract&gt",
          "method",
          "name",
          "promise.&lt;array.&lt;varresponse&gt;&gt",
          "unsubscrib",
          "unubscrib",
          "updat",
          "variabl"
        ],
        "DataCommsEngine.html#Write": [
          "abstract",
          "action",
          "call",
          "datacommsengine#writ",
          "element",
          "function",
          "list",
          "lt;abstract&gt",
          "method",
          "promise.&lt;array.&lt;varresponse&gt;&gt",
          "provid",
          "rel",
          "server",
          "target",
          "ui",
          "valu",
          "variabl",
          "write"
        ],
        "DataCommsEngine.html#Read": [
          "abstract",
          "action",
          "call",
          "datacommsengine#read",
          "element",
          "even",
          "forc",
          "function",
          "list",
          "lt;abstract&gt",
          "method",
          "name",
          "promise.&lt;array.&lt;varresponse&gt;&gt",
          "read",
          "schedul",
          "server",
          "ui",
          "variabl"
        ],
        "DataCommsEngine.html#UpdateData": [
          "action",
          "automat",
          "compon",
          "connect",
          "data",
          "datacommsengine#updatedata",
          "datamanag",
          "dispatch",
          "function",
          "list",
          "status",
          "those",
          "ui",
          "updat",
          "updatedata",
          "valu",
          "variabl"
        ],
        "ServiceStatusCodes.html": [
          "class",
          "code",
          "data",
          "defin",
          "engin",
          "servicestatuscod",
          "static",
          "statu"
        ],
        "ErrorCodes.html": [
          "appear",
          "class",
          "code",
          "commun",
          "defin",
          "dure",
          "error",
          "errorcod",
          "relat",
          "server",
          "static",
          "variabl"
        ],
        "systemObject.html": [
          "belong",
          "class",
          "gener",
          "object",
          "repres",
          "specif",
          "system",
          "systemobject"
        ],
        "systemError.html": [
          "action",
          "class",
          "describ",
          "dure",
          "error",
          "etc",
          "occur",
          "request",
          "subscrib",
          "system",
          "systemerror",
          "write"
        ],
        "VarResponse.html": [
          "action",
          "class",
          "etc",
          "gener",
          "implemet",
          "involv",
          "read",
          "respons",
          "subscrib",
          "variabl",
          "varrespons",
          "write"
        ],
        "VarResponse.html#setError": [
          "error",
          "function",
          "helper",
          "properti",
          "set",
          "seterror",
          "varresponse#seterror"
        ],
        "systemVariable.html": [
          "anyth",
          "bound",
          "class",
          "compat",
          "defin",
          "function",
          "gener",
          "good",
          "json",
          "localstorag",
          "object",
          "persist",
          "specif",
          "system",
          "systemvari",
          "valu",
          "variabl"
        ]
      },
      "length": 25
    },
    "tokenStore": {
      "root": {
        "docs": {},
        "b": {
          "docs": {},
          "u": {
            "docs": {},
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "d": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 10
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "c": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "s": {
                                "docs": {
                                  "DataCommsEngine.html#Initialize": {
                                    "ref": "DataCommsEngine.html#Initialize",
                                    "tf": 33.33333333333333
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
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "o": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "systemObject.html": {
                        "ref": "systemObject.html",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "d": {
                  "docs": {
                    "systemVariable.html": {
                      "ref": "systemVariable.html",
                      "tf": 3.125
                    }
                  }
                }
              }
            }
          }
        },
        "f": {
          "docs": {},
          "r": {
            "docs": {},
            "a": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "w": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "k": {
                          "docs": {
                            "index.html": {
                              "ref": "index.html",
                              "tf": 10
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "c": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "ServiceManager.html#AddEngine": {
                            "ref": "ServiceManager.html#AddEngine",
                            "tf": 110
                          },
                          "DataTree.html#GetVar": {
                            "ref": "DataTree.html#GetVar",
                            "tf": 110
                          },
                          "DataTree.html#Update": {
                            "ref": "DataTree.html#Update",
                            "tf": 110
                          },
                          "DataTree.html#ExistVar": {
                            "ref": "DataTree.html#ExistVar",
                            "tf": 110
                          },
                          "DataCommsEngine.html#Initialize": {
                            "ref": "DataCommsEngine.html#Initialize",
                            "tf": 110
                          },
                          "DataCommsEngine.html#Subscribe": {
                            "ref": "DataCommsEngine.html#Subscribe",
                            "tf": 110
                          },
                          "DataCommsEngine.html#Unsubscribe": {
                            "ref": "DataCommsEngine.html#Unsubscribe",
                            "tf": 110
                          },
                          "DataCommsEngine.html#Write": {
                            "ref": "DataCommsEngine.html#Write",
                            "tf": 110
                          },
                          "DataCommsEngine.html#Read": {
                            "ref": "DataCommsEngine.html#Read",
                            "tf": 110
                          },
                          "DataCommsEngine.html#UpdateData": {
                            "ref": "DataCommsEngine.html#UpdateData",
                            "tf": 110
                          },
                          "VarResponse.html#setError": {
                            "ref": "VarResponse.html#setError",
                            "tf": 110
                          },
                          "systemVariable.html": {
                            "ref": "systemVariable.html",
                            "tf": 3.125
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "c": {
                "docs": {
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 3.571428571428571
                  }
                }
              }
            }
          }
        },
        "h": {
          "docs": {},
          "u": {
            "docs": {},
            "m": {
              "docs": {},
              "a": {
                "docs": {},
                "n": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 10
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {
                  "DataTree.html": {
                    "ref": "DataTree.html",
                    "tf": 3.125
                  },
                  "DataCommsEngine.html#Initialize": {
                    "ref": "DataCommsEngine.html#Initialize",
                    "tf": 5
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "VarResponse.html#setError": {
                        "ref": "VarResponse.html#setError",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "i": {
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 1300
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "c": {
                        "docs": {
                          "index.html": {
                            "ref": "index.html",
                            "tf": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {
                    "DataCommsEngine.html#Initialize": {
                      "ref": "DataCommsEngine.html#Initialize",
                      "tf": 693.3333333333334
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "o": {
                "docs": {},
                "l": {
                  "docs": {},
                  "v": {
                    "docs": {
                      "VarResponse.html": {
                        "ref": "VarResponse.html",
                        "tf": 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "t": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 10
                }
              }
            }
          },
          "/": {
            "docs": {},
            "o": {
              "docs": {
                "DataCommsEngine.html": {
                  "ref": "DataCommsEngine.html",
                  "tf": 6.25
                }
              }
            }
          },
          "m": {
            "docs": {},
            "p": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "VarResponse.html": {
                            "ref": "VarResponse.html",
                            "tf": 4.545454545454546
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "j": {
          "docs": {},
          "a": {
            "docs": {},
            "h": {
              "docs": {},
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 600
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "a": {
                "docs": {},
                "s": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "index.html": {
                                "ref": "index.html",
                                "tf": 10
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
          },
          "s": {
            "docs": {},
            "o": {
              "docs": {},
              "n": {
                "docs": {
                  "systemVariable.html": {
                    "ref": "systemVariable.html",
                    "tf": 3.125
                  }
                }
              }
            }
          }
        },
        "m": {
          "docs": {},
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "DataCommsEngine.html#Initialize": {
                        "ref": "DataCommsEngine.html#Initialize",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Subscribe": {
                        "ref": "DataCommsEngine.html#Subscribe",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Unsubscribe": {
                        "ref": "DataCommsEngine.html#Unsubscribe",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Write": {
                        "ref": "DataCommsEngine.html#Write",
                        "tf": 3.571428571428571
                      },
                      "DataCommsEngine.html#Read": {
                        "ref": "DataCommsEngine.html#Read",
                        "tf": 3.571428571428571
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "r": {
          "docs": {},
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 682.1428571428571
                  },
                  "VarResponse.html": {
                    "ref": "VarResponse.html",
                    "tf": 4.545454545454546
                  }
                },
                "m": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 110
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "DataTree.html#GetVar": {
                            "ref": "DataTree.html#GetVar",
                            "tf": 3.3333333333333335
                          }
                        }
                      }
                    }
                  }
                }
              },
              "l": {
                "docs": {
                  "DataTree.html#GetVar": {
                    "ref": "DataTree.html#GetVar",
                    "tf": 3.3333333333333335
                  }
                }
              }
            },
            "l": {
              "docs": {
                "DataCommsEngine.html#Write": {
                  "ref": "DataCommsEngine.html#Write",
                  "tf": 3.571428571428571
                }
              },
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "DataTree.html#GetVar": {
                      "ref": "DataTree.html#GetVar",
                      "tf": 3.3333333333333335
                    },
                    "ErrorCodes.html": {
                      "ref": "ErrorCodes.html",
                      "tf": 4.166666666666666
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "DataTree.html#GetVar": {
                        "ref": "DataTree.html#GetVar",
                        "tf": 3.3333333333333335
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "systemObject.html": {
                        "ref": "systemObject.html",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            },
            "q": {
              "docs": {},
              "u": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "systemError.html": {
                          "ref": "systemError.html",
                          "tf": 5
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "VarResponse.html": {
                          "ref": "VarResponse.html",
                          "tf": 4.545454545454546
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "d": {
          "docs": {},
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "global.html": {
                            "ref": "global.html",
                            "tf": 35
                          },
                          "list_class.html": {
                            "ref": "list_class.html",
                            "tf": 35
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {
                  "DataTree.html": {
                    "ref": "DataTree.html",
                    "tf": 3.125
                  },
                  "DataCommsEngine.html": {
                    "ref": "DataCommsEngine.html",
                    "tf": 6.25
                  },
                  "DataCommsEngine.html#UpdateData": {
                    "ref": "DataCommsEngine.html#UpdateData",
                    "tf": 50
                  },
                  "ServiceStatusCodes.html": {
                    "ref": "ServiceStatusCodes.html",
                    "tf": 6.25
                  }
                },
                "t": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 1900
                        }
                      },
                      "e": {
                        "docs": {},
                        "#": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "v": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "r": {
                                      "docs": {
                                        "DataTree.html#GetVar": {
                                          "ref": "DataTree.html#GetVar",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "d": {
                                "docs": {
                                  "DataTree.html#Update": {
                                    "ref": "DataTree.html#Update",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          },
                          "e": {
                            "docs": {},
                            "x": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "v": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "r": {
                                          "docs": {
                                            "DataTree.html#ExistVar": {
                                              "ref": "DataTree.html#ExistVar",
                                              "tf": 1150
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
                        }
                      }
                    }
                  }
                },
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "n": {
                                    "docs": {
                                      "DataCommsEngine.html": {
                                        "ref": "DataCommsEngine.html",
                                        "tf": 1900
                                      }
                                    },
                                    "e": {
                                      "docs": {},
                                      "#": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {
                                                    "DataCommsEngine.html#Initialize": {
                                                      "ref": "DataCommsEngine.html#Initialize",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "s": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "b": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "c": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {
                                                          "DataCommsEngine.html#Subscribe": {
                                                            "ref": "DataCommsEngine.html#Subscribe",
                                                            "tf": 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "u": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "b": {
                                                            "docs": {
                                                              "DataCommsEngine.html#Unsubscribe": {
                                                                "ref": "DataCommsEngine.html#Unsubscribe",
                                                                "tf": 1150
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
                                          },
                                          "p": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {
                                                              "DataCommsEngine.html#UpdateData": {
                                                                "ref": "DataCommsEngine.html#UpdateData",
                                                                "tf": 1150
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
                                          }
                                        },
                                        "w": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "DataCommsEngine.html#Write": {
                                                    "ref": "DataCommsEngine.html#Write",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "r": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "d": {
                                                "docs": {
                                                  "DataCommsEngine.html#Read": {
                                                    "ref": "DataCommsEngine.html#Read",
                                                    "tf": 1150
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
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "m": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "g": {
                          "docs": {
                            "DataCommsEngine.html#UpdateData": {
                              "ref": "DataCommsEngine.html#UpdateData",
                              "tf": 3.125
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "f": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "DataCommsEngine.html": {
                      "ref": "DataCommsEngine.html",
                      "tf": 6.25
                    },
                    "ServiceStatusCodes.html": {
                      "ref": "ServiceStatusCodes.html",
                      "tf": 6.25
                    },
                    "ErrorCodes.html": {
                      "ref": "ErrorCodes.html",
                      "tf": 4.166666666666666
                    },
                    "systemVariable.html": {
                      "ref": "systemVariable.html",
                      "tf": 3.125
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "c": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "b": {
                      "docs": {
                        "systemError.html": {
                          "ref": "systemError.html",
                          "tf": 5
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "p": {
                "docs": {},
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {
                          "DataCommsEngine.html#UpdateData": {
                            "ref": "DataCommsEngine.html#UpdateData",
                            "tf": 3.125
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {
                  "ErrorCodes.html": {
                    "ref": "ErrorCodes.html",
                    "tf": 4.166666666666666
                  },
                  "systemError.html": {
                    "ref": "systemError.html",
                    "tf": 5
                  }
                }
              }
            }
          }
        },
        "g": {
          "docs": {},
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "global.html": {
                        "ref": "global.html",
                        "tf": 2045
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "undefined": {
                  "tf": 950
                }
              },
              "v": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "DataTree.html#GetVar": {
                        "ref": "DataTree.html#GetVar",
                        "tf": 700
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "systemObject.html": {
                      "ref": "systemObject.html",
                      "tf": 8.333333333333332
                    },
                    "VarResponse.html": {
                      "ref": "VarResponse.html",
                      "tf": 4.545454545454546
                    },
                    "systemVariable.html": {
                      "ref": "systemVariable.html",
                      "tf": 3.125
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "d": {
                "docs": {
                  "systemVariable.html": {
                    "ref": "systemVariable.html",
                    "tf": 3.125
                  }
                }
              }
            }
          }
        },
        "s": {
          "docs": {},
          "t": {
            "docs": {},
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "t": {
                  "docs": {
                    "undefined": {
                      "tf": 950
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "e": {
                  "docs": {
                    "DataTree.html": {
                      "ref": "DataTree.html",
                      "tf": 3.125
                    },
                    "DataTree.html#ExistVar": {
                      "ref": "DataTree.html#ExistVar",
                      "tf": 8.333333333333332
                    }
                  },
                  "v": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {
                            "DataTree.html#GetVar": {
                              "ref": "DataTree.html#GetVar",
                              "tf": 6.666666666666667
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "u": {
                  "docs": {
                    "DataTree.html#GetVar": {
                      "ref": "DataTree.html#GetVar",
                      "tf": 3.3333333333333335
                    },
                    "ServiceStatusCodes.html": {
                      "ref": "ServiceStatusCodes.html",
                      "tf": 12.5
                    }
                  },
                  "s": {
                    "docs": {
                      "DataCommsEngine.html#UpdateData": {
                        "ref": "DataCommsEngine.html#UpdateData",
                        "tf": 3.125
                      }
                    }
                  }
                },
                "i": {
                  "docs": {},
                  "c": {
                    "docs": {
                      "ServiceStatusCodes.html": {
                        "ref": "ServiceStatusCodes.html",
                        "tf": 6.25
                      },
                      "ErrorCodes.html": {
                        "ref": "ErrorCodes.html",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "u": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "DataTree.html": {
                            "ref": "DataTree.html",
                            "tf": 3.125
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "g": {
                                "docs": {
                                  "ServiceManager.html": {
                                    "ref": "ServiceManager.html",
                                    "tf": 1900
                                  }
                                },
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "#": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "d": {
                                          "docs": {},
                                          "d": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "g": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "n": {
                                                      "docs": {
                                                        "ServiceManager.html#AddEngine": {
                                                          "ref": "ServiceManager.html#AddEngine",
                                                          "tf": 1150
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
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "d": {
                                        "docs": {
                                          "ServiceStatusCodes.html": {
                                            "ref": "ServiceStatusCodes.html",
                                            "tf": 1900
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
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "DataCommsEngine.html": {
                        "ref": "DataCommsEngine.html",
                        "tf": 6.25
                      },
                      "DataCommsEngine.html#Write": {
                        "ref": "DataCommsEngine.html#Write",
                        "tf": 3.571428571428571
                      },
                      "DataCommsEngine.html#Read": {
                        "ref": "DataCommsEngine.html#Read",
                        "tf": 3.571428571428571
                      },
                      "ErrorCodes.html": {
                        "ref": "ErrorCodes.html",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {
                "VarResponse.html#setError": {
                  "ref": "VarResponse.html#setError",
                  "tf": 12.5
                }
              },
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "VarResponse.html#setError": {
                            "ref": "VarResponse.html#setError",
                            "tf": 750
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "b": {
              "docs": {},
              "s": {
                "docs": {},
                "y": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "m": {
                          "docs": {
                            "DataTree.html": {
                              "ref": "DataTree.html",
                              "tf": 3.125
                            }
                          },
                          "n": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "m": {
                                "docs": {
                                  "ServiceManager.html#AddEngine": {
                                    "ref": "ServiceManager.html#AddEngine",
                                    "tf": 33.33333333333333
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "c": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "DataCommsEngine.html#Subscribe": {
                            "ref": "DataCommsEngine.html#Subscribe",
                            "tf": 685
                          },
                          "systemError.html": {
                            "ref": "systemError.html",
                            "tf": 5
                          },
                          "VarResponse.html": {
                            "ref": "VarResponse.html",
                            "tf": 4.545454545454546
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {
                  "DataTree.html": {
                    "ref": "DataTree.html",
                    "tf": 3.125
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "h": {
              "docs": {},
              "e": {
                "docs": {},
                "d": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 3.125
                        },
                        "DataCommsEngine.html#Read": {
                          "ref": "DataCommsEngine.html#Read",
                          "tf": 3.571428571428571
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "i": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "systemObject.html": {
                        "ref": "systemObject.html",
                        "tf": 8.333333333333332
                      },
                      "systemVariable.html": {
                        "ref": "systemVariable.html",
                        "tf": 3.125
                      }
                    }
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "systemObject.html": {
                        "ref": "systemObject.html",
                        "tf": 8.333333333333332
                      },
                      "systemError.html": {
                        "ref": "systemError.html",
                        "tf": 5
                      },
                      "systemVariable.html": {
                        "ref": "systemVariable.html",
                        "tf": 3.125
                      }
                    },
                    "o": {
                      "docs": {},
                      "b": {
                        "docs": {},
                        "j": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "systemObject.html": {
                                    "ref": "systemObject.html",
                                    "tf": 1900
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "systemError.html": {
                                  "ref": "systemError.html",
                                  "tf": 1900
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "v": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "i": {
                            "docs": {
                              "systemVariable.html": {
                                "ref": "systemVariable.html",
                                "tf": 1900
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
          }
        },
        "t": {
          "docs": {},
          "u": {
            "docs": {},
            "t": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "undefined": {
                        "tf": 110
                      },
                      "list_tutorial.html": {
                        "ref": "list_tutorial.html",
                        "tf": 635
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "w": {
                  "docs": {
                    "DataTree.html#GetVar": {
                      "ref": "DataTree.html#GetVar",
                      "tf": 3.3333333333333335
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {
                    "DataCommsEngine.html#UpdateData": {
                      "ref": "DataCommsEngine.html#UpdateData",
                      "tf": 3.125
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "i": {
              "docs": {
                "DataTree.html#GetVar": {
                  "ref": "DataTree.html#GetVar",
                  "tf": 3.3333333333333335
                }
              }
            },
            "e": {
              "docs": {},
              "e": {
                "docs": {
                  "DataTree.html#ExistVar": {
                    "ref": "DataTree.html#ExistVar",
                    "tf": 8.333333333333332
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "g": {
                "docs": {},
                "e": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "DataCommsEngine.html#Write": {
                        "ref": "DataCommsEngine.html#Write",
                        "tf": 20
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "docs": {},
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {
                    "list_class.html": {
                      "ref": "list_class.html",
                      "tf": 635
                    },
                    "ServiceManager.html": {
                      "ref": "ServiceManager.html",
                      "tf": 135
                    },
                    "DataTree.html": {
                      "ref": "DataTree.html",
                      "tf": 113.125
                    },
                    "DataCommsEngine.html": {
                      "ref": "DataCommsEngine.html",
                      "tf": 116.25
                    },
                    "ServiceStatusCodes.html": {
                      "ref": "ServiceStatusCodes.html",
                      "tf": 116.25
                    },
                    "ErrorCodes.html": {
                      "ref": "ErrorCodes.html",
                      "tf": 114.16666666666667
                    },
                    "systemObject.html": {
                      "ref": "systemObject.html",
                      "tf": 110
                    },
                    "systemError.html": {
                      "ref": "systemError.html",
                      "tf": 110
                    },
                    "VarResponse.html": {
                      "ref": "VarResponse.html",
                      "tf": 114.54545454545455
                    },
                    "systemVariable.html": {
                      "ref": "systemVariable.html",
                      "tf": 110
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "n": {
              "docs": {},
              "n": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 3.125
                        },
                        "DataTree.html#Update": {
                          "ref": "DataTree.html#Update",
                          "tf": 5
                        },
                        "DataCommsEngine.html#UpdateData": {
                          "ref": "DataCommsEngine.html#UpdateData",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "u": {
                "docs": {},
                "n": {
                  "docs": {
                    "DataCommsEngine.html": {
                      "ref": "DataCommsEngine.html",
                      "tf": 6.25
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "DataCommsEngine.html#UpdateData": {
                        "ref": "DataCommsEngine.html#UpdateData",
                        "tf": 3.125
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "systemVariable.html": {
                        "ref": "systemVariable.html",
                        "tf": 3.125
                      }
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "u": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "ErrorCodes.html": {
                        "ref": "ErrorCodes.html",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "ServiceStatusCodes.html": {
                    "ref": "ServiceStatusCodes.html",
                    "tf": 6.25
                  },
                  "ErrorCodes.html": {
                    "ref": "ErrorCodes.html",
                    "tf": 4.166666666666666
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "r": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "DataTree.html#GetVar": {
                          "ref": "DataTree.html#GetVar",
                          "tf": 3.3333333333333335
                        },
                        "DataTree.html#ExistVar": {
                          "ref": "DataTree.html#ExistVar",
                          "tf": 8.333333333333332
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "DataTree.html#Update": {
                    "ref": "DataTree.html#Update",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Write": {
                    "ref": "DataCommsEngine.html#Write",
                    "tf": 3.571428571428571
                  },
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 3.571428571428571
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "k": {
                  "docs": {
                    "DataTree.html#ExistVar": {
                      "ref": "DataTree.html#ExistVar",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          }
        },
        "l": {
          "docs": {},
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "list_tutorial.html": {
                    "ref": "list_tutorial.html",
                    "tf": 110
                  },
                  "DataTree.html#Update": {
                    "ref": "DataTree.html#Update",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Subscribe": {
                    "ref": "DataCommsEngine.html#Subscribe",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Unsubscribe": {
                    "ref": "DataCommsEngine.html#Unsubscribe",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Write": {
                    "ref": "DataCommsEngine.html#Write",
                    "tf": 3.571428571428571
                  },
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 3.571428571428571
                  },
                  "DataCommsEngine.html#UpdateData": {
                    "ref": "DataCommsEngine.html#UpdateData",
                    "tf": 3.125
                  }
                },
                ":": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "list_class.html": {
                                "ref": "list_class.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "t": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "i": {
                              "docs": {
                                "list_tutorial.html": {
                                  "ref": "list_tutorial.html",
                                  "tf": 1300
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
            }
          },
          "t": {
            "docs": {},
            ";": {
              "docs": {},
              "a": {
                "docs": {},
                "b": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "&": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "DataCommsEngine.html#Initialize": {
                                        "ref": "DataCommsEngine.html#Initialize",
                                        "tf": 33.33333333333333
                                      },
                                      "DataCommsEngine.html#Subscribe": {
                                        "ref": "DataCommsEngine.html#Subscribe",
                                        "tf": 25
                                      },
                                      "DataCommsEngine.html#Unsubscribe": {
                                        "ref": "DataCommsEngine.html#Unsubscribe",
                                        "tf": 25
                                      },
                                      "DataCommsEngine.html#Write": {
                                        "ref": "DataCommsEngine.html#Write",
                                        "tf": 20
                                      },
                                      "DataCommsEngine.html#Read": {
                                        "ref": "DataCommsEngine.html#Read",
                                        "tf": 25
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
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "g": {
                              "docs": {
                                "systemVariable.html": {
                                  "ref": "systemVariable.html",
                                  "tf": 3.125
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
            }
          }
        },
        "a": {
          "docs": {},
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "list_tutorial.html": {
                      "ref": "list_tutorial.html",
                      "tf": 35
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "ServiceManager.html#AddEngine": {
                            "ref": "ServiceManager.html#AddEngine",
                            "tf": 683.3333333333334
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "p": {
              "docs": {
                "DataTree.html": {
                  "ref": "DataTree.html",
                  "tf": 6.25
                }
              },
              "e": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "ErrorCodes.html": {
                        "ref": "ErrorCodes.html",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "t": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 3.125
                        },
                        "DataTree.html#Update": {
                          "ref": "DataTree.html#Update",
                          "tf": 5
                        },
                        "DataCommsEngine.html#Subscribe": {
                          "ref": "DataCommsEngine.html#Subscribe",
                          "tf": 5
                        },
                        "DataCommsEngine.html#Unsubscribe": {
                          "ref": "DataCommsEngine.html#Unsubscribe",
                          "tf": 5
                        },
                        "DataCommsEngine.html#UpdateData": {
                          "ref": "DataCommsEngine.html#UpdateData",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "g": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "DataTree.html#GetVar": {
                        "ref": "DataTree.html#GetVar",
                        "tf": 3.3333333333333335
                      }
                    }
                  }
                }
              }
            }
          },
          "b": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "DataCommsEngine.html": {
                            "ref": "DataCommsEngine.html",
                            "tf": 6.25
                          },
                          "DataCommsEngine.html#Initialize": {
                            "ref": "DataCommsEngine.html#Initialize",
                            "tf": 5
                          },
                          "DataCommsEngine.html#Subscribe": {
                            "ref": "DataCommsEngine.html#Subscribe",
                            "tf": 5
                          },
                          "DataCommsEngine.html#Unsubscribe": {
                            "ref": "DataCommsEngine.html#Unsubscribe",
                            "tf": 5
                          },
                          "DataCommsEngine.html#Write": {
                            "ref": "DataCommsEngine.html#Write",
                            "tf": 3.571428571428571
                          },
                          "DataCommsEngine.html#Read": {
                            "ref": "DataCommsEngine.html#Read",
                            "tf": 3.571428571428571
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "DataCommsEngine.html#Initialize": {
                        "ref": "DataCommsEngine.html#Initialize",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Subscribe": {
                        "ref": "DataCommsEngine.html#Subscribe",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Unsubscribe": {
                        "ref": "DataCommsEngine.html#Unsubscribe",
                        "tf": 5
                      },
                      "DataCommsEngine.html#Write": {
                        "ref": "DataCommsEngine.html#Write",
                        "tf": 3.571428571428571
                      },
                      "DataCommsEngine.html#Read": {
                        "ref": "DataCommsEngine.html#Read",
                        "tf": 3.571428571428571
                      },
                      "DataCommsEngine.html#UpdateData": {
                        "ref": "DataCommsEngine.html#UpdateData",
                        "tf": 3.125
                      },
                      "systemError.html": {
                        "ref": "systemError.html",
                        "tf": 5
                      },
                      "VarResponse.html": {
                        "ref": "VarResponse.html",
                        "tf": 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "y": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {
                    "DataCommsEngine.html#Initialize": {
                      "ref": "DataCommsEngine.html#Initialize",
                      "tf": 5
                    },
                    "systemVariable.html": {
                      "ref": "systemVariable.html",
                      "tf": 3.125
                    }
                  }
                }
              }
            }
          }
        },
        "o": {
          "docs": {},
          "r": {
            "docs": {},
            "g": {
              "docs": {},
              "a": {
                "docs": {},
                "n": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "z": {
                      "docs": {},
                      "z": {
                        "docs": {
                          "ServiceManager.html": {
                            "ref": "ServiceManager.html",
                            "tf": 25
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "b": {
            "docs": {},
            "j": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "systemObject.html": {
                        "ref": "systemObject.html",
                        "tf": 8.333333333333332
                      },
                      "systemVariable.html": {
                        "ref": "systemVariable.html",
                        "tf": 3.125
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {
                    "systemError.html": {
                      "ref": "systemError.html",
                      "tf": 5
                    }
                  }
                }
              }
            }
          }
        },
        "e": {
          "docs": {},
          "n": {
            "docs": {},
            "g": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "ServiceManager.html#AddEngine": {
                      "ref": "ServiceManager.html#AddEngine",
                      "tf": 33.33333333333333
                    },
                    "DataCommsEngine.html": {
                      "ref": "DataCommsEngine.html",
                      "tf": 6.25
                    },
                    "DataCommsEngine.html#Initialize": {
                      "ref": "DataCommsEngine.html#Initialize",
                      "tf": 5
                    },
                    "ServiceStatusCodes.html": {
                      "ref": "ServiceStatusCodes.html",
                      "tf": 6.25
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "e": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "DataTree.html": {
                          "ref": "DataTree.html",
                          "tf": 3.125
                        },
                        "DataTree.html#Update": {
                          "ref": "DataTree.html#Update",
                          "tf": 5
                        },
                        "DataCommsEngine.html#Write": {
                          "ref": "DataCommsEngine.html#Write",
                          "tf": 3.571428571428571
                        },
                        "DataCommsEngine.html#Read": {
                          "ref": "DataCommsEngine.html#Read",
                          "tf": 3.571428571428571
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "x": {
            "docs": {},
            "i": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "DataTree.html#ExistVar": {
                      "ref": "DataTree.html#ExistVar",
                      "tf": 8.333333333333332
                    }
                  },
                  "v": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "DataTree.html#ExistVar": {
                            "ref": "DataTree.html#ExistVar",
                            "tf": 700
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 3.571428571428571
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {
                    "ErrorCodes.html": {
                      "ref": "ErrorCodes.html",
                      "tf": 8.333333333333332
                    },
                    "systemError.html": {
                      "ref": "systemError.html",
                      "tf": 5
                    },
                    "VarResponse.html#setError": {
                      "ref": "VarResponse.html#setError",
                      "tf": 12.5
                    }
                  },
                  "c": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "ErrorCodes.html": {
                            "ref": "ErrorCodes.html",
                            "tf": 1900
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "c": {
              "docs": {
                "systemError.html": {
                  "ref": "systemError.html",
                  "tf": 5
                },
                "VarResponse.html": {
                  "ref": "VarResponse.html",
                  "tf": 4.545454545454546
                }
              }
            }
          }
        },
        "u": {
          "docs": {},
          "i": {
            "docs": {
              "DataTree.html": {
                "ref": "DataTree.html",
                "tf": 3.125
              },
              "DataTree.html#Update": {
                "ref": "DataTree.html#Update",
                "tf": 5
              },
              "DataCommsEngine.html#Write": {
                "ref": "DataCommsEngine.html#Write",
                "tf": 3.571428571428571
              },
              "DataCommsEngine.html#Read": {
                "ref": "DataCommsEngine.html#Read",
                "tf": 3.571428571428571
              },
              "DataCommsEngine.html#UpdateData": {
                "ref": "DataCommsEngine.html#UpdateData",
                "tf": 3.125
              }
            }
          },
          "p": {
            "docs": {},
            "d": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "DataTree.html": {
                      "ref": "DataTree.html",
                      "tf": 3.125
                    },
                    "DataTree.html#Update": {
                      "ref": "DataTree.html#Update",
                      "tf": 705
                    },
                    "DataCommsEngine.html#Subscribe": {
                      "ref": "DataCommsEngine.html#Subscribe",
                      "tf": 5
                    },
                    "DataCommsEngine.html#Unsubscribe": {
                      "ref": "DataCommsEngine.html#Unsubscribe",
                      "tf": 5
                    },
                    "DataCommsEngine.html#UpdateData": {
                      "ref": "DataCommsEngine.html#UpdateData",
                      "tf": 9.375
                    }
                  },
                  "e": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "a": {
                            "docs": {
                              "DataCommsEngine.html#UpdateData": {
                                "ref": "DataCommsEngine.html#UpdateData",
                                "tf": 700
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "t": {
                  "docs": {
                    "DataTree.html#Update": {
                      "ref": "DataTree.html#Update",
                      "tf": 5
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "s": {
              "docs": {},
              "u": {
                "docs": {},
                "b": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "b": {
                            "docs": {
                              "DataCommsEngine.html#Unsubscribe": {
                                "ref": "DataCommsEngine.html#Unsubscribe",
                                "tf": 680
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "b": {
                "docs": {},
                "s": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "b": {
                          "docs": {
                            "DataCommsEngine.html#Unsubscribe": {
                              "ref": "DataCommsEngine.html#Unsubscribe",
                              "tf": 5
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
        },
        "p": {
          "docs": {},
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "DataTree.html#GetVar": {
                          "ref": "DataTree.html#GetVar",
                          "tf": 3.3333333333333335
                        }
                      }
                    }
                  }
                }
              },
              "x": {
                "docs": {},
                "i": {
                  "docs": {
                    "DataTree.html#GetVar": {
                      "ref": "DataTree.html#GetVar",
                      "tf": 3.3333333333333335
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              ";": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "y": {
                                          "docs": {},
                                          ".": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  ";": {
                                                    "docs": {},
                                                    "v": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "p": {
                                                                  "docs": {},
                                                                  "o": {
                                                                    "docs": {},
                                                                    "n": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "e": {
                                                                          "docs": {},
                                                                          "&": {
                                                                            "docs": {},
                                                                            "g": {
                                                                              "docs": {},
                                                                              "t": {
                                                                                "docs": {},
                                                                                ";": {
                                                                                  "docs": {},
                                                                                  "&": {
                                                                                    "docs": {},
                                                                                    "g": {
                                                                                      "docs": {},
                                                                                      "t": {
                                                                                        "docs": {
                                                                                          "DataCommsEngine.html#Subscribe": {
                                                                                            "ref": "DataCommsEngine.html#Subscribe",
                                                                                            "tf": 25
                                                                                          },
                                                                                          "DataCommsEngine.html#Unsubscribe": {
                                                                                            "ref": "DataCommsEngine.html#Unsubscribe",
                                                                                            "tf": 25
                                                                                          },
                                                                                          "DataCommsEngine.html#Write": {
                                                                                            "ref": "DataCommsEngine.html#Write",
                                                                                            "tf": 20
                                                                                          },
                                                                                          "DataCommsEngine.html#Read": {
                                                                                            "ref": "DataCommsEngine.html#Read",
                                                                                            "tf": 25
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
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "DataCommsEngine.html#Write": {
                        "ref": "DataCommsEngine.html#Write",
                        "tf": 3.571428571428571
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "VarResponse.html#setError": {
                            "ref": "VarResponse.html#setError",
                            "tf": 12.5
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "c": {
                "docs": {},
                "e": {
                  "docs": {
                    "DataCommsEngine.html#Initialize": {
                      "ref": "DataCommsEngine.html#Initialize",
                      "tf": 5
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "s": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "systemVariable.html": {
                          "ref": "systemVariable.html",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "v": {
          "docs": {},
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "u": {
                "docs": {
                  "DataTree.html#GetVar": {
                    "ref": "DataTree.html#GetVar",
                    "tf": 6.666666666666667
                  },
                  "DataCommsEngine.html#Write": {
                    "ref": "DataCommsEngine.html#Write",
                    "tf": 23.57142857142857
                  },
                  "DataCommsEngine.html#UpdateData": {
                    "ref": "DataCommsEngine.html#UpdateData",
                    "tf": 3.125
                  },
                  "systemVariable.html": {
                    "ref": "systemVariable.html",
                    "tf": 6.25
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "d": {
                  "docs": {
                    "DataTree.html#GetVar": {
                      "ref": "DataTree.html#GetVar",
                      "tf": 50
                    },
                    "DataTree.html#ExistVar": {
                      "ref": "DataTree.html#ExistVar",
                      "tf": 50
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "DataTree.html#Update": {
                          "ref": "DataTree.html#Update",
                          "tf": 60
                        },
                        "DataTree.html#ExistVar": {
                          "ref": "DataTree.html#ExistVar",
                          "tf": 8.333333333333332
                        },
                        "DataCommsEngine.html#Subscribe": {
                          "ref": "DataCommsEngine.html#Subscribe",
                          "tf": 30
                        },
                        "DataCommsEngine.html#Unsubscribe": {
                          "ref": "DataCommsEngine.html#Unsubscribe",
                          "tf": 30
                        },
                        "DataCommsEngine.html#Write": {
                          "ref": "DataCommsEngine.html#Write",
                          "tf": 3.571428571428571
                        },
                        "DataCommsEngine.html#Read": {
                          "ref": "DataCommsEngine.html#Read",
                          "tf": 3.571428571428571
                        },
                        "DataCommsEngine.html#UpdateData": {
                          "ref": "DataCommsEngine.html#UpdateData",
                          "tf": 6.25
                        },
                        "ErrorCodes.html": {
                          "ref": "ErrorCodes.html",
                          "tf": 4.166666666666666
                        },
                        "VarResponse.html": {
                          "ref": "VarResponse.html",
                          "tf": 4.545454545454546
                        },
                        "systemVariable.html": {
                          "ref": "systemVariable.html",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "VarResponse.html": {
                                "ref": "VarResponse.html",
                                "tf": 1900
                              }
                            },
                            "e": {
                              "docs": {},
                              "#": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "r": {
                                                "docs": {
                                                  "VarResponse.html#setError": {
                                                    "ref": "VarResponse.html#setError",
                                                    "tf": 1150
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
          }
        },
        "n": {
          "docs": {},
          "e": {
            "docs": {},
            "e": {
              "docs": {},
              "d": {
                "docs": {
                  "DataCommsEngine.html#Initialize": {
                    "ref": "DataCommsEngine.html#Initialize",
                    "tf": 5
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "DataCommsEngine.html#Subscribe": {
                    "ref": "DataCommsEngine.html#Subscribe",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Unsubscribe": {
                    "ref": "DataCommsEngine.html#Unsubscribe",
                    "tf": 5
                  },
                  "DataCommsEngine.html#Read": {
                    "ref": "DataCommsEngine.html#Read",
                    "tf": 25
                  }
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "r": {
            "docs": {},
            "i": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {
                    "DataCommsEngine.html#Write": {
                      "ref": "DataCommsEngine.html#Write",
                      "tf": 677.1428571428571
                    },
                    "systemError.html": {
                      "ref": "systemError.html",
                      "tf": 5
                    },
                    "VarResponse.html": {
                      "ref": "VarResponse.html",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            }
          }
        }
      },
      "length": 263
    },
    "corpusTokens": [
      "abstract",
      "action",
      "addengin",
      "anyth",
      "app",
      "appear",
      "assign",
      "automat",
      "avail",
      "basicrespons",
      "belong",
      "bound",
      "build",
      "call",
      "check",
      "class",
      "code",
      "commun",
      "compat",
      "compon",
      "comun",
      "connect",
      "contain",
      "current",
      "data",
      "datacommsengin",
      "datacommsengine#initi",
      "datacommsengine#read",
      "datacommsengine#subscrib",
      "datacommsengine#unsubscrib",
      "datacommsengine#updatedata",
      "datacommsengine#writ",
      "datamanag",
      "datatre",
      "datatree#existvar",
      "datatree#getvar",
      "datatree#upd",
      "defin",
      "describ",
      "dispatch",
      "document",
      "dure",
      "element",
      "engin",
      "error",
      "errorcod",
      "etc",
      "even",
      "exist",
      "existvar",
      "forc",
      "framework",
      "function",
      "gener",
      "get",
      "getvar",
      "global",
      "good",
      "helper",
      "here",
      "human",
      "i/o",
      "implemet",
      "index",
      "initi",
      "interfac",
      "involv",
      "iot",
      "jahmin",
      "javascript",
      "json",
      "list",
      "list:class",
      "list:tutori",
      "localstorag",
      "lt;abstract&gt",
      "machin",
      "method",
      "name",
      "need",
      "object",
      "occur",
      "organizz",
      "persist",
      "place",
      "promise.&lt;array.&lt;varresponse&gt;&gt",
      "properti",
      "protect",
      "provid",
      "proxi",
      "read",
      "readm",
      "readonli",
      "real",
      "rel",
      "relat",
      "repres",
      "request",
      "respons",
      "return",
      "save",
      "schedul",
      "server",
      "servicemanag",
      "servicemanager#addengin",
      "servicestatuscod",
      "set",
      "seterror",
      "specif",
      "start",
      "state",
      "statevari",
      "static",
      "statu",
      "status",
      "structur",
      "subscrib",
      "subsystem",
      "subsystemnam",
      "system",
      "systemerror",
      "systemobject",
      "systemvari",
      "target",
      "those",
      "throw",
      "tree",
      "tri",
      "tutori",
      "ui",
      "unsubscrib",
      "unubscrib",
      "upadt",
      "updat",
      "updatedata",
      "valu",
      "variabl",
      "varid",
      "varrespons",
      "varresponse#seterror",
      "write"
    ],
    "pipeline": [
      "trimmer",
      "stopWordFilter",
      "stemmer"
    ]
  },
  "store": {
    "index.html": {
      "id": "index.html",
      "kind": "readme",
      "title": "JaHMIn",
      "longname": "index",
      "name": "JaHMIn",
      "tags": "index",
      "summary": "A Javascript framework to build Human Machine Interfaces for IoT",
      "description": "",
      "body": ""
    },
    "global.html": {
      "id": "global.html",
      "kind": "global",
      "title": "Globals",
      "longname": "global",
      "name": "Globals",
      "tags": "global",
      "summary": "All documented globals.",
      "description": "",
      "body": ""
    },
    "undefined": {
      "kind": "tutorial",
      "title": "Getting-Started",
      "longname": "Getting-Started",
      "name": "Getting-Started",
      "tags": "Getting-Started",
      "summary": "",
      "description": "",
      "body": ""
    },
    "list_class.html": {
      "id": "list_class.html",
      "kind": "list",
      "title": "Classes",
      "longname": "list:class",
      "name": "Classes",
      "tags": "list:class",
      "summary": "All documented classes.",
      "description": "",
      "body": ""
    },
    "list_tutorial.html": {
      "id": "list_tutorial.html",
      "kind": "list",
      "title": "Tutorials",
      "longname": "list:tutorial",
      "name": "Tutorials",
      "tags": "list:tutorial",
      "summary": "All available tutorials.",
      "description": "",
      "body": ""
    },
    "ServiceManager.html": {
      "id": "ServiceManager.html",
      "kind": "class",
      "title": "ServiceManager",
      "longname": "ServiceManager",
      "name": "ServiceManager",
      "tags": "ServiceManager",
      "summary": "",
      "description": "Organizzational class",
      "body": ""
    },
    "ServiceManager.html#AddEngine": {
      "id": "ServiceManager.html#AddEngine",
      "kind": "function",
      "title": "AddEngine( subsystemName, engine )",
      "longname": "ServiceManager#AddEngine",
      "name": "AddEngine",
      "tags": "ServiceManager#AddEngine AddEngine",
      "summary": "",
      "description": ""
    },
    "DataTree.html": {
      "id": "DataTree.html",
      "kind": "class",
      "title": "DataTree",
      "longname": "DataTree",
      "name": "DataTree",
      "tags": "DataTree",
      "summary": "",
      "description": "Class that contains all the data structure of the App for all the subsystems. The app state is saved in here. It is connected automatically to UI element and schedule updates on them.",
      "body": ""
    },
    "DataTree.html#GetVar": {
      "id": "DataTree.html#GetVar",
      "kind": "function",
      "title": "GetVar( varID )",
      "longname": "DataTree#GetVar",
      "name": "GetVar",
      "tags": "DataTree#GetVar GetVar",
      "summary": "",
      "description": "Get the current value and status of the related stateVariable. It returns a proxy to the real stateVariable, this is readonly, as a protection it will throw if you try to assign a value."
    },
    "DataTree.html#Update": {
      "id": "DataTree.html#Update",
      "kind": "function",
      "title": "Update( variables )",
      "longname": "DataTree#Update",
      "name": "Update",
      "tags": "DataTree#Update Update",
      "summary": "",
      "description": "It upadtes with the variable or the list of variables. This will automatically call UI update of all connected elements."
    },
    "DataTree.html#ExistVar": {
      "id": "DataTree.html#ExistVar",
      "kind": "function",
      "title": "ExistVar( varID )",
      "longname": "DataTree#ExistVar",
      "name": "ExistVar",
      "tags": "DataTree#ExistVar ExistVar",
      "summary": "",
      "description": "Checks if the variable exist in the current state tree"
    },
    "DataCommsEngine.html": {
      "id": "DataCommsEngine.html",
      "kind": "class",
      "title": "DataCommsEngine",
      "longname": "DataCommsEngine",
      "name": "DataCommsEngine",
      "tags": "DataCommsEngine",
      "summary": "",
      "description": "Abstract class defining a Comunication Engine for data I/O with a server.",
      "body": ""
    },
    "DataCommsEngine.html#Initialize": {
      "id": "DataCommsEngine.html#Initialize",
      "kind": "function",
      "title": "&lt;abstract&gt; Initialize() → {basicResponse}",
      "longname": "DataCommsEngine#Initialize",
      "name": "Initialize",
      "tags": "DataCommsEngine#Initialize Initialize",
      "summary": "",
      "description": "Abstract method. Action Initialize. Place here anything that is needed for initialization of this engine."
    },
    "DataCommsEngine.html#Subscribe": {
      "id": "DataCommsEngine.html#Subscribe",
      "kind": "function",
      "title": "&lt;abstract&gt; Subscribe( variables ) → {Promise.&lt;Array.&lt;VarResponse&gt;&gt;}",
      "longname": "DataCommsEngine#Subscribe",
      "name": "Subscribe",
      "tags": "DataCommsEngine#Subscribe Subscribe",
      "summary": "",
      "description": "Abstract method. Action Subscribe. It subscribes the list of variables names for automatic updates."
    },
    "DataCommsEngine.html#Unsubscribe": {
      "id": "DataCommsEngine.html#Unsubscribe",
      "kind": "function",
      "title": "&lt;abstract&gt; Unsubscribe( variables ) → {Promise.&lt;Array.&lt;VarResponse&gt;&gt;}",
      "longname": "DataCommsEngine#Unsubscribe",
      "name": "Unsubscribe",
      "tags": "DataCommsEngine#Unsubscribe Unsubscribe",
      "summary": "",
      "description": "Abstract method. Action Unsubscribe. It unubscribes the list of variables names from automatic updates."
    },
    "DataCommsEngine.html#Write": {
      "id": "DataCommsEngine.html#Write",
      "kind": "function",
      "title": "&lt;abstract&gt; Write( targets, values ) → {Promise.&lt;Array.&lt;VarResponse&gt;&gt;}",
      "longname": "DataCommsEngine#Write",
      "name": "Write",
      "tags": "DataCommsEngine#Write Write",
      "summary": "",
      "description": "Abstract method. Action Write, this can be called by a UI element. It writes to server the provided list of values to the relative variables."
    },
    "DataCommsEngine.html#Read": {
      "id": "DataCommsEngine.html#Read",
      "kind": "function",
      "title": "&lt;abstract&gt; Read( names ) → {Promise.&lt;Array.&lt;VarResponse&gt;&gt;}",
      "longname": "DataCommsEngine#Read",
      "name": "Read",
      "tags": "DataCommsEngine#Read Read",
      "summary": "",
      "description": "Abstract method. Action Read, this can be called by a UI element. Forces a list of variables to be read from server even if not scheduled."
    },
    "DataCommsEngine.html#UpdateData": {
      "id": "DataCommsEngine.html#UpdateData",
      "kind": "function",
      "title": "UpdateData( data )",
      "longname": "DataCommsEngine#UpdateData",
      "name": "UpdateData",
      "tags": "DataCommsEngine#UpdateData UpdateData",
      "summary": "",
      "description": "Action Update. It updates a list of variable values and statuses in the DataManager. The updates will be automatically dispatched to all UI component connected to those variables."
    },
    "ServiceStatusCodes.html": {
      "id": "ServiceStatusCodes.html",
      "kind": "class",
      "title": "ServiceStatusCodes",
      "longname": "ServiceStatusCodes",
      "name": "ServiceStatusCodes",
      "tags": "ServiceStatusCodes",
      "summary": "",
      "description": "Static class defining status codes for the data engine status.",
      "body": ""
    },
    "ErrorCodes.html": {
      "id": "ErrorCodes.html",
      "kind": "class",
      "title": "ErrorCodes",
      "longname": "ErrorCodes",
      "name": "ErrorCodes",
      "tags": "ErrorCodes",
      "summary": "",
      "description": "Static class defining Error codes that appear during communication with the server. These are variables related errors.",
      "body": ""
    },
    "systemObject.html": {
      "id": "systemObject.html",
      "kind": "class",
      "title": "systemObject",
      "longname": "systemObject",
      "name": "systemObject",
      "tags": "systemObject",
      "summary": "",
      "description": "It represent a generic object belonging to a specific system.",
      "body": ""
    },
    "systemError.html": {
      "id": "systemError.html",
      "kind": "class",
      "title": "systemError",
      "longname": "systemError",
      "name": "systemError",
      "tags": "systemError",
      "summary": "",
      "description": "Describe a system error occurred during a requested Action (like subscribe, write, etc.).",
      "body": ""
    },
    "VarResponse.html": {
      "id": "VarResponse.html",
      "kind": "class",
      "title": "VarResponse",
      "longname": "VarResponse",
      "name": "VarResponse",
      "tags": "VarResponse",
      "summary": "",
      "description": "Class that implemets a general response to actions that involve variable read, write, subscribe, etc.",
      "body": ""
    },
    "VarResponse.html#setError": {
      "id": "VarResponse.html#setError",
      "kind": "function",
      "title": "setError()",
      "longname": "VarResponse#setError",
      "name": "setError",
      "tags": "VarResponse#setError setError",
      "summary": "",
      "description": "helper to set the \"error\" property."
    },
    "systemVariable.html": {
      "id": "systemVariable.html",
      "kind": "class",
      "title": "systemVariable",
      "longname": "systemVariable",
      "name": "systemVariable",
      "tags": "systemVariable",
      "summary": "",
      "description": "Defines a generic variable bound to a specific system. The \"value\" must be a JSON compatible object, since these values are persisted in localstorage. So anything is good but functions.",
      "body": ""
    }
  }
};