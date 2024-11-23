#include "NativeSampleModule.h"
#include <iostream>
#include <vector>
#include <algorithm>

namespace facebook::react
{

    NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
        : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

    std::string NativeSampleModule::reverseString(jsi::Runtime &rt, std::string input)
    {
        return std::string(input.rbegin(), input.rend());
    }

    std::vector<double> NativeSampleModule::sortArray(jsi::Runtime &rt, const std::vector<double> &input)
    {
        std::vector<double> sortedArray = input;
        std::sort(sortedArray.begin(), sortedArray.end(), std::greater<double>());
        return sortedArray;
    }

    std::vector<jsi::Value> NativeSampleModule::sortByName(jsi::Runtime &rt, const std::vector<jsi::Value> &input)
    {
        std::vector<jsi::Value> sortedArray;
        sortedArray.reserve(input.size());

        for (const auto &val : input)
        {
            sortedArray.emplace_back(jsi::Value(rt, val));
        }

        std::sort(sortedArray.begin(), sortedArray.end(), [&](const jsi::Value &a, const jsi::Value &b)
                  {
                      if (!a.isObject() || !b.isObject())
                      {
                          return false;
                      }

                      jsi::Object objA = a.asObject(rt);
                      jsi::Object objB = b.asObject(rt);

                      std::string nameA = objA.getProperty(rt, "beneficiary_name").asString(rt).utf8(rt);
                      std::string nameB = objB.getProperty(rt, "beneficiary_name").asString(rt).utf8(rt);

                      return nameA > nameB; });

        return sortedArray;
    }

} // namespace facebook::react
