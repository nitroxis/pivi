#include <iostream>
#include <cmath>

int main(){
  std::cout << "polyline ";
  for(int i=0; i<200; i++){
    std::cout << i  << " " << sin(i*0.1)*50+100 << " ";
  }
  std::cout << std::endl;
  return 0;
}
