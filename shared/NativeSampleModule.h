#pragma once

#include <AppSpecsJSI.h>
#include <jsi/jsi.h>
#include <memory>
#include <string>
#include <vector>
#include <unordered_map>

namespace facebook::react
{
  class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule>
  {
  public:
    NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

    std::string reverseString(jsi::Runtime &rt, std::string input);
    std::vector<double> sortArray(jsi::Runtime &rt, const std::vector<double> &input);
    std::vector<jsi::Value> sortByName(jsi::Runtime &rt, const std::vector<jsi::Value> &input);
  };

} // namespace facebook::react
