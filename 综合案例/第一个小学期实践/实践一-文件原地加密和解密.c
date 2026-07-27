#include<stdio.h>
#include<string.h>

typedef struct fileinformation
{
    char sec[9];
    char filename[10];
    int filen;

}file;

int key = 12345;//密钥

void encode(file* File)
{
    // printf("输入密码:");
    // scanf("%s",File->sec);//设置密码
    //加密
    File->filen = File->filen ^ key;
    printf("加密成功");
}

void decode(file* File)//解密
{
    char secre[9];
    printf("输入密码:");
    scanf("%s",secre);
    if(!strcmp(secre,File->sec))
    {
        File->filen = File->filen ^ key;
        printf("解密成功");
    }
    else 
        printf("密码错误");
}

int main()
{
    //  原文件:
    //文件名： wenjian
    //文件密码：12345678
    //文件内容： 789
    file oldfile;
    strcpy(oldfile.filename,"wenjian");
    strcpy(oldfile.sec,"12345678");
    oldfile.filen = 789;

    int choose;
    printf("请输入选择: 0、退出 1、加密 2、解密");
    scanf("%d",&choose);
    if(choose == 0)
        return 0;
    else if(choose == 1)
    {
        // 源文件直接加密:
        file* newfile = &oldfile;
        encode(newfile);
    }
    else if(choose == 2)
    {
        file* newfile = &oldfile;
        decode(newfile);
    }

    return 0;
}